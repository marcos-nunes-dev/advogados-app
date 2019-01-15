import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  snapshotSyncronized: null,
  setUser: ['payload'],
  resetApp: null
});

export { Types };
export default Creators;