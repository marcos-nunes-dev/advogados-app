import { h } from 'preact';
import { Dropdown as MDDropdown } from '../toolbox/components';

const Dropdown = ({ input, label, type, meta: { touched, error }, children, ...props }) => (
  <MDDropdown label={label} {...input} {...props} value={input.value || props.val} />
);

export default Dropdown;
