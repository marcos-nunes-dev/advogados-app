import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import validate from 'validate.js';

// Lodash Imports
import get from 'lodash/get';


const validateData = (attr, data, validator) => {
  return validate({[attr]: data}, {[attr]: validator});
}

class Input extends Component {

  handleOnChange = (event) => {
    const validator = get(this.context.validation, this.props.name);

    const error = validateData(this.props.name, event.target.value, validator);

    const changeData = {
      attr: this.props.name,
      value: event.target.value
    };

    if (error) {
      changeData.valid = false;
      changeData.errors = error[this.props.name];
    } else {
      changeData.valid = true;
    }

    this.context.onChange(changeData);
    
  }

  getValue = () => {
    return get(this.context.data, this.props.name);
  }

  render() {
    if (this.props.component) {
      const InputComponent = this.props.component;
      return (
        <InputComponent
          onChange={this.handleOnChange}
          {...this.props}
          value={this.getValue()}
        />
      )
    }
    return (
      <input
        type='text'
        value={this.getValue()}
        onChange={this.handleOnChange}
        {...this.props}
      />
    )
  }
}

Input.contextTypes = {
  data: PropTypes.object,
  validation: PropTypes.object,
  onChange: PropTypes.func,
  onError: PropTypes.func
};

export default Input;

