import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  showPreloader: null,
  hidePreloader: null
});

export { Types };
export default Creators;