import { h } from 'preact';
// components
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
// setup
import container from './container';
import reducer from './redux/reducer';

/**
|--------------------------------------------------
| COmponent
|--------------------------------------------------
*/

const SignIn = ({ state, ...props }) => (
  <div>
    <Choose>
      <When condition={state.step === 1}>
        <Step1 {...props} state={state} />
      </When>
      <When condition={state.step === 2}>
        <Step2 {...props} state={state} />
      </When>
      <When condition={state.step === 3}>
        <Step3 {...props} state={state} />
      </When>
      <When condition={state.step === 4}>
        <Step4 {...props} state={state} />
      </When>
    </Choose>
  </div>
);

export default container(SignIn);
export { reducer };
