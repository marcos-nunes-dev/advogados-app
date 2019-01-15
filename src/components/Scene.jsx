import { h } from 'preact';
import { connect } from 'react-redux';
import { route } from 'preact-router';

/**
|--------------------------------------------------
| Scene
|--------------------------------------------------
*/

const Scene = ({
  children, snapshotSyncronized, isSignedIn, userData, ...ownProps
}) => (
  <Choose>
    <When condition={ownProps.private && !userData}>
      <div>{route('/signin')}</div>
    </When>
    <When condition={ownProps.sync && !snapshotSyncronized}>
      <div>carregando...</div>
    </When>
    <Otherwise>
      <div className="scene-section">{children}</div>
    </Otherwise>
  </Choose>
);

/**
|--------------------------------------------------
| Redux
|--------------------------------------------------
*/

const mapStateToProps = ({ application, authentication }) => ({
  snapshotSyncronized: application.snapshotSyncronized,
  userData: application.userData,
  isSignedIn: authentication.isSignedIn,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Scene);
