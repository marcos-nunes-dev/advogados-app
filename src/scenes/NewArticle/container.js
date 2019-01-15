import { connect } from 'preact-redux';
import { get } from 'lodash';
import metalize from '../../helpers/metalize';
import intercept from '../../helpers/interceptor';
import { services } from '../../feathers';
import LocalDB from '../../feathers/local-database';
import drawerActions from "../LawyerDrawer/redux/actions";
import searchActions from "../Search/redux/actions";

const { Articles } = LocalDB;
const { LawAreas } = LocalDB;

/**
|--------------------------------------------------
| Configure Metas
|--------------------------------------------------
*/

const metas = {
  create: {
    showPreloader: true,
    toastOnFinish: {
      text: 'Artigo inserido com sucesso!',
    },
    errorAlert: true,
    redirectOnFinish: '/profile',
  },
};

/**
|--------------------------------------------------
| Configure Props
|--------------------------------------------------
*/

const mapStateToProps = ({ forms, lawyerProfile }, ownProps) => ({
  lawyerProfile: get(lawyerProfile.store, 'records[0]', {}),
  lawAreas: LawAreas.find({ $order: 'name(asc)' }),
});

/**
|--------------------------------------------------
| Configure Dispatch
|--------------------------------------------------
*/

const mapDispatchToProps = {
  create: metalize(metas.create, services.articles.create),
  setArea: searchActions.setArea
};
export default (component) => connect(mapStateToProps, mapDispatchToProps)(component);
