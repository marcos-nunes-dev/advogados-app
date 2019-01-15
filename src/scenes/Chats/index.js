import { h, Component } from 'preact';
import styled from 'styled-components';
import { Flex, Box } from 'reflexbox';
import { route } from 'preact-router';
import get from 'lodash/get';
import container from './container';
import { Scene, EmptyList } from '../../components';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';
import AppToolbar from '../AppToolbar';

/**
|--------------------------------------------------
| Helpers
|--------------------------------------------------
*/

const getLastMessage = messages => {
  const l = messages.reduce((newer, curr) => {
    const time = new Date(curr.createdAt).getTime();
    return time > new Date(newer.createdAt).getTime() ? curr : newer;
  });

  console.log(l.text);
  return l.text;
};

/**
|--------------------------------------------------
| Styled Components
|--------------------------------------------------
*/

const Scroll = styled.div`
  height: ${window.innerHeight - 9}px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`;

const ChatWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid #fafafa;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const UserName = styled.div`
  font-weight: bolder;
  margin-left: 10px;
  font-size: 14px;
`;
const LastMessage = styled.div`
  font-size: 14px;
  margin-left: 10px;
  color: #7b7b7b;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

/**
|--------------------------------------------------
| ChatItem
|--------------------------------------------------
*/

class ChatItem extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const { getUser, chat, userProfile } = this.props;

    const { members } = chat;
    const [userId] = members.filter(m => m !== userProfile._id);

    getUser(userId).payload.promise.then(user => {
      this.setState({ user });
    });
  }

  render({ chat }) {
    return (
      <ChatWrapper>
        <Flex align="center" onClick={() => route(`/chat/${this.state.user._id}`)}>
          <If condition={this.state.user}>
            <Box>
              <Avatar
                src={
                  this.state.user.photo
                  || 'https://ukings.ca/wp-content/uploads/2016/08/silhouette-male-grey-clip-art-at-clker-com-vector-clip-art-online-R95otz-clipart.png'
                }
              />
            </Box>
            <Box>
              <UserName>{this.state.user.name}</UserName>
              <LastMessage>{getLastMessage(chat.messages)}</LastMessage>
            </Box>
          </If>
        </Flex>
      </ChatWrapper>
    );
  }
}

/**
|--------------------------------------------------
| Chats
|--------------------------------------------------
*/

const Chats = ({
  chats, chatsUnread, toggleDrawer, ...props
}) => (
  <Scene sync private>
    <Container paddingBottom={2}>
      <Navbar
        left={<i className="material-icons ml-10">menu</i>}
        leftClick={toggleDrawer}
        title="Oi Advogado"
      />

      <AppToolbar hideHomeWhenLawyer />

      <div style={{ maxWidth: 500, margin: 'auto' }}>
        <Scroll>
          <If condition={chats || chats.length !== 0}>
            {chats.map(chat => <ChatItem chat={chat} {...props} />)}
          </If>

          <If condition={!chats || chats === 0}>
            <EmptyList text="nenhum chat ainda" icon="help" pb={4} pf={4} />
          </If>
        </Scroll>
      </div>
    </Container>
  </Scene>
);

export default container(Chats);
