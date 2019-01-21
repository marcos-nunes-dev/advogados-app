import { h, Component } from "preact";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import { Field, reduxForm } from "redux-form";
import Dropzone from "react-dropzone";
import axios from "axios";
import Dialog from "react-toolbox/lib/dialog";
import isImageUrl from "is-image-url";
import FontIcon from "react-toolbox/lib/font_icon";
import ReactGA from "react-ga";
import { socketClient } from "../../feathers";
import { Scene } from "../../components";
import Nav from "./components/Nav";
import container from "./container";

const scrollChatToBottom = () => {
  const h = window.innerHeight - 90;
  const el = document.querySelector(".chat-content");
  if (el) {
    const value = el.scrollHeight - h - el.scrollTop;
    if (value < 50 || el.scrollTop === 0) {
      setTimeout(() => {
        el.scrollTop = 8000000;
      }, 1);
    }
  }
};

/**
|--------------------------------------------------
| Nav
|--------------------------------------------------
*/

const Name = styled.div`
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 3px;
  margin-left: 3px;
`;

const Subtitle = styled.div`
  font-size: 13px;
  margin-left: 3px;
`;

const Image = styled.img`
  margin-left: 10px;
  margin-right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const UserInfo = ({ userName, photo }) => (
  <div>
    <Flex align="center">
      <Box>
        <Image src={photo} />
      </Box>
      <Box>
        <Name>{userName}</Name>
        {/* <Subtitle>Trabalhista, Penal e Consumidor</Subtitle> */}
      </Box>
    </Flex>
  </div>
);

/**
|--------------------------------------------------
| FooterField
|--------------------------------------------------
*/

const ChatField = styled.textarea`
  height: 55px;
  width: 100%;
  border: none;
  outline: none;
  padding: 20px;
  resize: none;
`;

const ChatFieldWrapper = ({ input, val, placeholder }) => (
  <ChatField {...input} value={val} placeholder={placeholder} />
);

const FooterFieldWrapper = styled(Flex)`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  padding: 0px;
  background: #ffffff;
`;

function clearChatInput() {
  store.dispatch(change("chatForm", "text", ""));
}

window.clearChatInput = clearChatInput;

const SendIcon = styled.i`
  background-color: #6541c1;
  color: white;
  border-radius: 100%;
  padding: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

const style = {
  borderWidth: 2,
  borderColor: "black",
  borderStyle: "dashed",
  borderRadius: 4,
  margin: 30,
  padding: 30,
  width: 200,
  transition: "all 0.5s"
};

const activeStyle = {
  borderStyle: "solid",
  backgroundColor: "#eee",
  borderRadius: 8
};

class FooterField extends Component {
  state = {
    files: [],
    active: false
  };

  componentDidMount() {
    ReactGA.event({ category: "Navigation", action: "ContatoAdv_Mensagem" });
  }

  onDrop(files) {
    const formData = new FormData();
    formData.append("uri", files[0]);

    axios({
      method: "post",
      url: "https://mysterious-oasis-88871.herokuapp.com/common/upload",
      data: formData
    })
      .then(response => {
        console.log(files[0]);
        Object.assign(files[0], { file: response.data.uri });
        this.setState({
          files
        });
        this.handleToggle();
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleToggle = () => {
    this.setState({ active: !this.state.active });
  };

  render({ create, userId, formData, messages, change, ableToSendMessage }) {
    let dropzoneRef;
    const { files } = this.state;
    return (
      <Dropzone
        ref={node => {
          dropzoneRef = node;
        }}
        style={{ border: "none" }}
        disableClick
        multiple={false}
        onDrop={(accepted, rejected) => {
          this.onDrop(accepted);
        }}
      >
        <FooterFieldWrapper justify="space-between" align="center">
          <Box style={{ width: "100%" }}>
            <Field
              name="text"
              component={ChatFieldWrapper}
              val={formData.text}
              placeholder="Enviar mensagem..."
            />
          </Box>
          <Box>
            <SendIcon
              className="material-icons"
              onClick={() => {
                dropzoneRef.open();
              }}
            >
              attach_file
            </SendIcon>
          </Box>

          <Box>
            <SendIcon
              className="material-icons"
              onClick={() => {
                create({ userId, text: formData.text });
                window.clearChatInput();
                ReactGA.event({
                  category: "Navigation",
                  action: "ContatoAdv_Mensagem_Enviada"
                });
                if (messages.length === 0) {
                  ReactGA.event({
                    category: "Navigation",
                    action: "ContatoAdv_Mensagem_InicioChat"
                  });
                }
              }}
            >
              send
            </SendIcon>
          </Box>

          <Dialog
            active={this.state.active}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            title="Upload de arquivos"
            type="small"
          >
            {files.map((file, idx) => (
              <Flex pt={2} pb={2} pl={0} pr={0} mt={1}>
                <Box w={[1 / 2]}>
                  {file && isImageUrl(file.file) ? (
                    <img src={file.preview} width={100} />
                  ) : (
                    ""
                  )}
                  {file && !isImageUrl(file.file) ? (
                    <FontIcon value="insert_drive_file" />
                  ) : (
                    ""
                  )}
                </Box>

                <Box w={[1 / 2]}>
                  <Flex mb={1} style={{ fontSize: ".9em", fontWeight: "900" }}>
                    {file.name}
                  </Flex>
                  <Flex style={{ fontSize: ".7em", fontWeight: "300" }}>
                    {`${file.size} bytes.`}
                  </Flex>
                </Box>
              </Flex>
            ))}
            <Flex>
              <Box style={{ width: "100%" }}>
                <Field
                  name="text"
                  component={ChatFieldWrapper}
                  val={formData.text}
                  placeholder="Adicione uma descrição..."
                />
              </Box>
              <Box>
                <SendIcon
                  className="material-icons"
                  onClick={() => {
                    create({
                      userId,
                      text: formData.text,
                      file: files[0].file
                    });
                    window.clearChatInput();
                    this.handleToggle();
                  }}
                >
                  send
                </SendIcon>
              </Box>
            </Flex>
          </Dialog>
        </FooterFieldWrapper>
      </Dropzone>
    );
  }
}

FooterField = reduxForm({
  form: "chatForm"
})(FooterField);

/**
|--------------------------------------------------
| CantSendMessage
|--------------------------------------------------
*/

class CantSendMessage extends Component {
  render() {
    return <div>
        <div className="MainError">
          Você precisa ser premium para enviar Mensagens
        </div>
        <style jsx global>{`
          .MainError {
            background: linear-gradient(to right, rgb(254, 83, 83) 0%, rgb(183, 78, 78) 100%);
            width: 100%;
            color: white;
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          }`}</style>
      </div>;
  }
}

CantSendMessage = CantSendMessage;

/**
|--------------------------------------------------
| Messages
|--------------------------------------------------
*/

const MessagesWrapper = styled.div`
  height: ${window.innerHeight - 110}px;
  padding: 10px 10px 10px 0px;
  background-color: #fafafa;
  width: 100%;
  overflow-y: scroll;
`;
const MessageWrapper = styled(Flex)`
  width: 100%;
`;
const MessageBox = styled.div`
  background-color: aliceblue;
  padding: 10px;
  border-radius: 3px;
  font-size: 15px;
  margin-bottom: 0.6em;
`;

const MessageBoxFile = styled.div`
  background-color: aliceblue;
  padding: 10px;
  border-radius: 3px;
  font-size: 15px;
  margin-bottom: 0.6em;
`;

const SelfMessageBox = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
  font-size: 15px;
  margin-bottom: 0.6em;
`;

const SelfMessageBoxFile = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
  font-size: 15px;
  margin-bottom: 0.6em;
`;

const Avatar = styled.img`
  margin-left: 10px;
  margin-right: 5px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;

const Message = ({ text, photo }) => (
  <MessageWrapper style={{ width: "80%" }}>
    <Box>
      <Image src={photo} />
    </Box>
    <Box>
      <MessageBox>{text}</MessageBox>
    </Box>
  </MessageWrapper>
);

const MessageImage = ({ file, photo }) => (
  <MessageWrapper>
    <Box>
      <Image src={photo} />
    </Box>
    <Box>
      <MessageBox>
        <img src={file} width="250" />
      </MessageBox>
    </Box>
  </MessageWrapper>
);

const MessageFile = ({ file }) => (
  <MessageWrapper style={{ flexDirection: "row-reverse" }}>
    <Box p={0}>
      <Image style={{ display: "none" }} />
    </Box>
    <Box p={0}>
      <MessageBoxFile>
        <Flex align="center" pl={3} justify="space-around">
          <Box p={1}>Arquivo</Box>
          <Box pt={1} pb={1} pl={2} pr={2}>
            <a href={file} download="arquivo">
              <FontIcon value="file_download" />
            </a>
          </Box>
        </Flex>
      </MessageBoxFile>
    </Box>
  </MessageWrapper>
);

const SelfMessage = ({ text }) => (
  <MessageWrapper
    style={{ flexDirection: "row-reverse", float: "right", width: "80%" }}
  >
    {scrollChatToBottom()}
    <Box>
      <SelfMessageBox>{text}</SelfMessageBox>
    </Box>
    <Box>
      <Image style={{ display: "none" }} />
    </Box>
  </MessageWrapper>
);

const SelfMessageImage = ({ file }) => (
  <MessageWrapper style={{ flexDirection: "row-reverse" }}>
    <Box>
      <SelfMessageBox>
        <img src={file} width="250" />
      </SelfMessageBox>
    </Box>
    <Box>
      <Image style={{ display: "none" }} />
    </Box>
  </MessageWrapper>
);

const SelfMessageFile = ({ file }) => (
  <MessageWrapper style={{ flexDirection: "row-reverse" }}>
    <Box p={0}>
      <SelfMessageBoxFile>
        <Flex align="center" pl={3} justify="space-around">
          <Box p={1}>Arquivo</Box>
          <Box pt={1} pb={1} pl={2} pr={2}>
            <a href={file} download="arquivo">
              <FontIcon value="file_download" />
            </a>
          </Box>
        </Flex>
      </SelfMessageBoxFile>
    </Box>
    <Box p={0}>
      <Image style={{ display: "none" }} />
    </Box>
  </MessageWrapper>
);

const Messages = ({ chat, userProfile }) => (
  <MessagesWrapper className="chat-content">
    {chat.messages.map(({ _id, text, sender, file }) => (
      <Choose>
        <When condition={userProfile._id === sender._id}>
          {file && isImageUrl(file) ? <SelfMessageImage file={file} /> : ""}
          {file && !isImageUrl(file) ? <SelfMessageFile file={file} /> : ""}
          <SelfMessage text={text} />
        </When>
        <Otherwise>
          {file && isImageUrl(file) ? (
            <MessageImage file={file} photo={sender.photo} />
          ) : (
            ""
          )}
          {file && !isImageUrl(file) ? (
            <fMessageFile file={file} photo={sender.photo} />
          ) : (
            ""
          )}
          <Message text={text} photo={sender.photo} />
        </Otherwise>
      </Choose>
    ))}
    <Box style={{ display: "none" }} className="end-content-chat" />
  </MessagesWrapper>
);

/**
|--------------------------------------------------
| Component
|--------------------------------------------------
*/

class Chat extends Component {
  state = {
    user: null,
    chat: null,
    ableToSendMessage: true
  };

  componentDidMount() {
    this.load();
    const Chat = socketClient.service("app/chat");

    const { userId } = JSON.parse(
      atob(localStorage["feathers-jwt"].split(".")[1])
    );

    this.props.getUser(userId).payload.promise.then(mySelf => {
      // 5c4521205b87f70ec0fe83e9
      this.props
        .getLawyer({
          query: {
            lawyer: mySelf.lawyer,
            $populate: "lawyer"
          }
        })
        .payload.promise.then(result => {
          const [user] = result.data;
          mySelf.lawyer &&
          (!user.lawyer.subscription || user.lawyer.subscription.amount == 0)
            ? this.setState({
                ableToSendMessage: false
              })
            : null;
        });
    });

    Chat.on("patched", chat => {
      if (chat.members.includes(userId)) {
        this.load();
      }
    });
    Chat.on("created", chat => {
      if (chat.members.includes(userId)) {
        this.load();
      }
    });
  }

  load = () => {
    const { getUser, id, getChat, chat, userProfile } = this.props;

    getUser(id).payload.promise.then(user => {
      this.setState({ user });
    });

    const { userId } = JSON.parse(
      atob(localStorage["feathers-jwt"].split(".")[1])
    );

    getChat({
      query: {
        $and: [
          {
            members: {
              $in: [id]
            }
          },
          {
            members: {
              $in: [userId]
            }
          }
        ],
        $populate: "messages.sender"
      }
    }).payload.promise.then(result => {
      this.setState({ chat: result.data[0] });
      this.markAsRead();
    });
  };

  markAsRead = () => {
    const { chat } = this.state;
    const { patch, userProfile } = this.props;

    let willUpdate = false;

    chat.messages.forEach(msg => {
      if (msg.sender._id !== userProfile._id && !msg.read) {
        console.log(msg.sender_, userProfile._id);
        msg.read = true;
        willUpdate = true;
      }
    });

    if (willUpdate) {
      patch(chat._id, chat);
    }
  };

  render({ chat, create, id, formData, change, userProfile }) {
    return (
      <Scene sync>
        <Nav align="center">
          <Box onClick={() => window.history.back()}>
            <i className="material-icons">arrow_back</i>
          </Box>
          <Box>
            <If condition={this.state.user}>
              <UserInfo
                userName={this.state.user.name}
                photo={this.state.user.photo}
              />
            </If>
          </Box>
        </Nav>
        <Choose>
          <When condition={this.state.chat}>
            <div style={{ maxWidth: 500, margin: "auto" }}>
              <Messages chat={this.state.chat} userProfile={userProfile} />
            </div>
          </When>
        </Choose>
        {this.state.ableToSendMessage ? (
          <FooterField
            messages={this.state.chat ? this.state.chat.messages || [] : []}
            create={create}
            userId={id}
            formData={formData}
            change={change}
            ableToSendMessage={this.state.ableToSendMessage}
          />
        ) : (
          <CantSendMessage />
        )}
      </Scene>
    );
  }
}

export default container(Chat);
