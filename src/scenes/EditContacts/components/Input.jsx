import styled from 'styled-components';
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

const MaskInputField = styled(InputEditMask)`
  background-color: white;
  border-radius: 2px;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  outline: none;
  box-shadow: 0px 0px 4px 0px #00000024;
`;


const Input = ({label, ...props}) => (
  <InputWrapper>
    <InputLabel>{label}</InputLabel>
    <Choose>
      <When condition={props.mask}>
        <MaskInputField {...props} />
      </When>
      <Otherwise>
        <InputField {...props}/>
      </Otherwise>
    </Choose>
  </InputWrapper>
);

export default Input;