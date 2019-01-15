import {h, Component} from 'preact';
import PropTypes from 'prop-types';
import validate from 'validate.js';

// Lodash Imports
import mapValues from 'lodash/mapValues';
import isObject from 'lodash/isObject';
import set from 'lodash/set';

const createFormDataObject = (data) => {
  return mapValues(data, function(value, key) {
    if (isObject(value)) return createFormDataObject(value);
    const input = {
      pristine: true,
      dirty:    false,
      invalid:  false,
      valid:    true,
      get value() {
        return this._value;
      },
      set value(data) {
        if (this.value !== data) {
          this.pristine = false;
          this.dirty = true;
          this._value = data;
        }
      }
    };

    Object.defineProperty(input, '_value', {
      value,
      enumerable: false,
      writable: true
    })

    return input;
  });
}

class Form extends Component {

  state = {
    invalid:  false,
    valid:    true,
  }


  getChildContext() {
    return {
      data: this.props.data,
      defaultData: this.props.defaultData,
      validation: this.props.validation,
      onChange: this.handleOnChange
    };
  }


  componentWillMount() {
    this.setState({
      data: createFormDataObject(this.props.data)
    });

    
  }

  componentDidMount() {
    if (this.props.defaultData) {
      this.props.onChange(this.props.defaultData);
    }
  }


  updateValidation = () => {
    const error = validate(this.props.data , this.props.validation);
    this.setState({invalid: !!error, valid: !error})
  }


  updateFormData = (changeData) => {
    const formData = this.state.data;
    set(formData, `${changeData.attr}.value`, changeData.value);

    if (changeData.valid) {
      set(this.state.data, `${changeData.attr}.valid`, true);
      set(this.state.data, `${changeData.attr}.invalid`, false);
      set(this.state.data, `${changeData.attr}.errors`, []);
    } else {
      set(this.state.data, `${changeData.attr}.valid`, false);
      set(this.state.data, `${changeData.attr}.invalid`, true);
      set(this.state.data, `${changeData.attr}.errors`, changeData.errors);
    };

    this.setState({data: formData});
    return formData;
  }


  handleOnChange = (changeData) => {
    this.props.onChange(
      set(this.props.data, changeData.attr, changeData.value)
    )

    const formData = this.updateFormData(changeData);
    this.updateValidation();

    if (this.props.onFormDataChange) {
      setTimeout(() =>
        this.props.onFormDataChange(this.state)
      );
    }
  }


  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

Form.childContextTypes = {
  data: PropTypes.object,
  validation: PropTypes.object,
  onChange: PropTypes.func,
  onError: PropTypes.func
};

export default Form;

