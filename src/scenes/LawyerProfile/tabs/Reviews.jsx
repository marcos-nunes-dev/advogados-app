import { h, Component } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { Dialog } from '../../../toolbox/components';
import { restClient } from '../../../feathers';

/**
|--------------------------------------------------
| Review Message
|--------------------------------------------------
*/

const ReviewMessageWrapper = styled(Flex)`
  padding: 15px;
  font-size: 13px;
  background-color: #f5f5f5;
  line-height: 16px;
`;

const Reviewbutton = styled.div`
  background-color: #663cb9;
  color: white;
  padding: 6px 12px;
  border-radius: 3px;
  font-size: 12px;
`;

const ReviewMessage = ({ onButtonClick}) => (
  <ReviewMessageWrapper justify="space-between">
    <Box>
      Vocês entrou em contato com esse advogado. <br/>
      Gostaria de avaliar o atendimento?
    </Box>
    <Box onClick={onButtonClick}>
      <Reviewbutton>AVALIAR</Reviewbutton>
    </Box>
  </ReviewMessageWrapper>
);

/**
|--------------------------------------------------
| Featured
|--------------------------------------------------
*/

const SelectedFeaturedWrapper = styled.div`
  border: 1px solid #604ef1;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 3px;
  background-color: #604ef1;
  color: white;
  font-size: 13px;
`;

const FeaturedWrapper = styled.div`
  border: 1px solid #604ef1;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 3px;
  color: #604ef1;
  font-size: 13px;
`;

const Featured = (props) => (
  <Choose>
    <When condition={props.selected}>
      <SelectedFeaturedWrapper {...props}/>
    </When>
    <Otherwise>
      <FeaturedWrapper {...props} />
    </Otherwise>
  </Choose>
)

/**
|--------------------------------------------------
| Stars
|--------------------------------------------------
*/

const Stars = ({ number, setStars }) => (
  <div style={{ display: 'inline-block' }} >
    {[1, 2, 3, 4, 5].map(star =>
      <Choose>
        <When condition={number >= star}>
          <i class="material-icons" style={{ fontSize: 40, color: '#FFC107' }} onClick={() => setStars(star)} >star</i>
        </When>
        <When condition={number < star}>
          <i class="material-icons" style={{ fontSize: 40, color: '#FFC107' }} onClick={() => setStars(star)} >star_border</i>
        </When>
      </Choose>
    )}
  </div>
)

/**
|--------------------------------------------------
| Components
|--------------------------------------------------
*/

class ReviewsTab extends Component {

  state = {
    reviewDialogOpened: false,
    stars: 5,
    featured: '1'
  };

  featured = [
    { value: '1', label: 'Atencioso' },
    { value: '2', label: 'Clareza no Serviço' },
    { value: '4', label: 'Cordialidade' },
    { value: '8', label: 'Rapidez no Atendimento' }
  ]

  setStars = (number) => {
    this.setState({stars: number});
  }

  handleToggle = () => {
    this.setState({ reviewDialogOpened: !this.state.reviewDialogOpened });
  }

  review = (request) => {
    const Lawyer = restClient.service('app/lawyer-profile');
    const Requests = restClient.service('app/requests');
    const {lawyer} = this.props;
    const touch = request.touches.find(t => t.lawyer === lawyer);

    const { userId } = JSON.parse(atob(localStorage["feathers-jwt"].split('.')[1]));

    const patchData = {
      $push: {
        reviews: {
          rate: this.state.stars,
          featured: this.state.featured,
          service: request._id,
          user: userId
        }
      }
    };

    Lawyer
      .patch(lawyer, patchData)
      .then(lawyer => {
        console.log('lawyer reviewed', lawyer);
        Requests
          .patch(request._id, {
            touches: request.touches.map(t => {
              if (t._id === touch._id) {
                touch.reviewed = true;
                return touch;
              }
              return t;
            })
          })
          .then(req => {
            console.log('request updated', req);
            this.handleToggle();
          })
      });
  }

  actions = [
    { label: "Cancel", onClick: this.handleToggle },
    { label: "Avaliar", onClick: () => {
      this.review(this.props.requestsToReview[0])
    }}
  ];

  render({ requestsToReview}) {
    return (
      <div>
        <If condition={requestsToReview.length}>
          <ReviewMessage onButtonClick={this.handleToggle} />
        </If>
        {console.log('requestsToReview', requestsToReview)}
        <Dialog
          active={this.state.reviewDialogOpened}
          actions={this.actions}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Avaliar'
        >
          <h4>Como você avalia o atendimento?</h4>
          <Stars number={this.state.stars} setStars={this.setStars} />
          <h4>Faça um elogio</h4>

          {this.featured.map(f =>
            <Featured selected={this.state.featured === f.value} onClick={() => this.setState({ featured: f.value })}>{f.label}</Featured>
          )}

        </Dialog>
      </div>
    );
  }
};

export default ReviewsTab;
