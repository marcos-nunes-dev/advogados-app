import { h, Component } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';

/**
|--------------------------------------------------
| Stars
|--------------------------------------------------
*/

const Stars = ({ number }) => (
  <div style={{ display: 'inline-block' }} >
    {[1, 2, 3, 4, 5].map(star =>
      <Choose>
        <When condition={number >= star}>
          <i class="material-icons" style={{ fontSize: 12, color: '#FFC107' }} >star</i>
        </When>
        <When condition={number < star}>
          <i class="material-icons" style={{ fontSize: 12, color: '#FFC107' }} >star_border</i>
        </When>
      </Choose>
    )}
  </div>
)

/**
|--------------------------------------------------
| Wrapper
|--------------------------------------------------
*/

const Wrapper = styled(Flex)`
  padding: 5px 10px;
`;

/**
|--------------------------------------------------
| LawyerInfo
|--------------------------------------------------
*/

const LawyerInfo = styled.div`
  padding: 10px;
`;

const Name = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

const ReviewsCount = styled.div`
  font-size: 11px;
  color: #bdbdbd;
  margin-left: 5px;
`;

/**
|--------------------------------------------------
| Avatar
|--------------------------------------------------
*/

const Avatar = styled.img`
	width: 40px;
	height: 40px;
	border-radius: 100%;
`;

/**
|--------------------------------------------------
| Button
|--------------------------------------------------
*/

const ButtonIcon = styled.i`
  font-size: 17px!important;
  display: block!important;
  text-align: center;
`;

const Button = styled.div`
  border-left: 1px solid #eee;
  font-size: 10px;
  text-transform: uppercase;
  padding: 10px;
  color: #7986CB;
`;

/**
|--------------------------------------------------
| LawyerApplication
|--------------------------------------------------
*/

const LawyerApplicationWrapper = styled(Flex)`
  border-bottom: 1px solid #eee;
`;

class LawyerApplication extends Component {

  state = {
    user: null
  }

  
  componentDidMount() {
    const { getLawyer, touch } = this.props;

    console.log('touch', touch)

    getLawyer({
      query: {
        lawyer: touch.lawyer,
        $populate: 'lawyer'
      }
    }).payload.promise
    .then(result => {
      const [user] = result.data;
      this.setState({user});
    });

  }
  

  render({ getLawyer, result }) {
    return (
      <If condition={this.state.user}>
        <LawyerApplicationWrapper justify="space-between" align="center" >
          <Box style={{ maxWidth: '50%'}} >
            <Wrapper align="center">
              <Box>
                <Avatar src={this.state.user.photo} />
              </Box>
              <Box>
                <LawyerInfo>
                  <Name>{this.state.user.name}</Name>
                  <Flex align="center">
                    <Box><Stars number={4} /></Box>
                    <Box><ReviewsCount>45 aval.</ReviewsCount></Box>
                  </Flex>
                </LawyerInfo>
              </Box>
            </Wrapper>
          </Box>
          <Box onClick={() => route(`/chat/${this.state.user._id}`)} >
            <Button>
              <ButtonIcon className="material-icons">chat_bubble</ButtonIcon>
              Ver Mensagem
            </Button>
          </Box>
          <Box onClick={() => route(`/lawyer/${this.state.user.lawyer._id}`)} >
            <Button>
              <ButtonIcon className="material-icons">person</ButtonIcon>
              Ver Perfil
            </Button>
          </Box>
        </LawyerApplicationWrapper>
      </If>
    );
  }
}

export default LawyerApplication;
