import styled from 'styled-components';
import MaskedInput from 'react-maskedinput';
import InputMask from 'react-input-mask/es';
import InputEditMask from 'react-editmask';

/**
|--------------------------------------------------
| InputWrapper
|--------------------------------------------------
*/

const InputWrapper = styled.div`
  
`;

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

const MaskedInputField = styled(MaskedInput) `
  background-color: white;
  border-radius: 2px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  outline: none;
  box-shadow: 0px 0px 4px 0px #00000024;
`;

const StyledInputMask = styled(InputMask) `
  background-color: white;
  border-radius: 2px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  outline: none;
  box-shadow: 0px 0px 4px 0px #00000024;
`;

const inputMaskStyle = {
  backgroundColor: 'white',
  borderRadius: 2,
  border: 'none',
  padding: 10,
  marginBottom: 10,
  width: '100%',
  outline: 'none',
  boxShadow: '0px 0px 4px 0px #00000024'
};


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


const Input = ({ input, label, mask, maskText, editMask, maskChar, val, ...props}) => (
  <InputWrapper>
    <InputLabel>{label}</InputLabel>
    <Choose>
      <When condition={editMask}>
        <InputEditMask style={inputMaskStyle} {...input} value={input.value || val || props.meta.initial} {...props} mask={editMask} {...props}/>
      </When>
      <When condition={maskText}>
        <InputMask style={inputMaskStyle} {...input} value={input.value || val || props.meta.initial} {...props} mask={maskText} maskChar={maskChar} {...props}/>
      </When>
      <When condition={mask}>
        <MaskedInputField mask={mask} {...input} value={input.value || val || props.meta.initial} {...props} />
      </When>
      <Otherwise>
        <InputField {...input} value={input.value || val || props.meta.initial} {...props}/>
      </Otherwise>
    </Choose>
  </InputWrapper>
);

export default Input;