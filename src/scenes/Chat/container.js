import { connect } from 'preact-redux';
import { change } from 'redux-form';
import get from 'lodash/get';
import { services } from '../../feathers';
import LocalDB from '../../feathers/local-database';

window.change = change;

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
  blockSendMessage: {
    cantSend: {
      text: "Você precisa ser Premium para enviar Mensagem",
      closeTimeout: 5000
    },
    errorAlert: true,
    showPreloader: true
  }
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const { Chat } = LocalDB;

const mapStateToProps = ({ forms, userProfile }, props) => ({
  formData: get(forms, 'chatForm.values', {}),
  userProfile: get(userProfile.store, 'records[0]'),
  chat: Chat.find({
    $and: [
      {
        members: {
          $in: [props.id],
        },
      },
      {
        members: {
          $in: [get(userProfile.store, 'records[0]._id')],
        },
      },
    ],
  }),
});

const mapDispatchToProps = {
  create: services.chat.create,
  patch: services.chat.patch,
  getUser: services.userProfile.get,
  getChat: services.chat.find,
  getLawyer: services.lawyers.find,
  erroMessage: metas.blockSendMessage,
  change
};

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
