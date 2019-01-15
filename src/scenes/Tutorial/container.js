import { connect } from 'preact-redux';
import LocalDB from '../../feathers/local-database';

const { Tutorial } = LocalDB;

const mapStateToProps = () => ({
  tutorial: Tutorial.first({}),
});

const mapDispatchToProps = () => ({});

export default component => connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
