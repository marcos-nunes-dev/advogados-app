import { h, Component } from 'preact';
import styled from 'styled-components';
import { route } from 'preact-router';
import container from './container';

const Container = styled.div`
  background-color: #7986cb;
  background-image: url('assets/images/bg.jpg');
  background-size: cover;
  background-position: center;
  height: ${window.innerHeight}px;
  padding: 30px;
`;

const Title = styled.div`
  color: white;
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  padding-top: 15px;
  margin-bottom: 30px;
`;

const Button = styled.div`
  text-align: center;
  background-color: #7e57c2;
  text-align: center;
  height: 55px;
  width: 100%;
  bottom: 0;
  color: white;
  line-height: 55px;
  cursor: pointer;
  margin-top: 5px;
`;

/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/

class Tutorial extends Component {
  state = {};

  componentWillReceiveProps(nextProps) {
    (() => {
      if (nextProps.tutorial !== this.props.tutorial) {
        const { tutorial } = nextProps;
        if (!(tutorial && tutorial.url && tutorial.url !== '')) {
          route('/services');
        }
      }
    })();
  }

  render = ({ tutorial }) => (tutorial && tutorial.url && tutorial.url !== '' ? (
    <Container>
      <Title>Tutorial</Title>
      <div style={{ maxWidth: 500, margin: 'auto' }}>
        <iframe
          title="Tutorial"
          src={tutorial.url}
          style={{
            width: '100%',
            height: '70vh',
            margin: 0,
            padding: 0,
            border: 'none',
          }}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <Button
        onClick={() => {
          route('/services');
        }}
      >
          Pular
      </Button>
    </Container>
  ) : null);
}
export default container(Tutorial);
