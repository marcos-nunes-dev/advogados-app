import { connect } from 'preact-redux';
import { services } from '../../feathers';
import get from 'lodash/get';
import metalize from '../../helpers/metalize';
import before from '../../helpers/before';

/**
|--------------------------------------------------
| Metas
|--------------------------------------------------
*/

const metas = {
	authenticate: {
		showPreloader: true,
		redirectOnAuth: true,
		errorAlert: true
	}
};

/**
|--------------------------------------------------
| Props
|--------------------------------------------------
*/

const mapStateToProps = ({forms}) => ({
	formData: get(forms, 'signin.values')
});

const mapDispatchToProps = {
	authenticate: metalize(metas.authenticate, services.authentication.authenticate)
};

export default (component) =>
	connect(mapStateToProps, mapDispatchToProps)(component);
