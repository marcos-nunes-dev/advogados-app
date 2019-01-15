import styled from 'styled-components';
import MaskedInput from 'react-maskedinput';

/**
|--------------------------------------------------
| InputWrapper
|--------------------------------------------------
*/

const InputWrapper = styled.div``;

/**
|--------------------------------------------------
| InputLabel
|--------------------------------------------------
*/

const InputLabel = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
`;

/**
|--------------------------------------------------
| Field
|--------------------------------------------------
*/

const MaskedInputField = styled(MaskedInput)`
  background-color: white;
  border-radius: 2px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  outline: none;
  box-shadow: 0px 0px 4px 0px #00000024;
`;

const InputField = styled.input`
  background-color: white;
  border-radius: 2px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  outline: none;
  box-shadow: 0px 0px 4px 0px #00000024;
`;

const Input = ({
  input, label, mask, ...props
}) => (
  <InputWrapper>
    <InputLabel>{label}</InputLabel>
    <Choose>
      <When condition={mask}>
        <MaskedInputField
          mask={mask}
          {...input}
          value={input.value || props.meta.initial}
          {...props}
        />
      </When>
      <Otherwise>
        <InputField {...input} value={input.value || props.meta.initial} {...props} />
      </Otherwise>
    </Choose>
  </InputWrapper>
);

export default Input;
