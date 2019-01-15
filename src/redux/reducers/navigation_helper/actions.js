import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  changeAuthRoute: ['route'],
  hidePreloader: null
});

export { Types };
export default Creators;