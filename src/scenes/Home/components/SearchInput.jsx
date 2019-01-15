import styled from 'styled-components';

/**
|--------------------------------------------------
| InputWrapper
|--------------------------------------------------
*/

const InputWrapper = styled.div`
  padding: 20px 45px;
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
  border-radius: 5px;
  border: none;
  font-size: 13px;
  padding: 13px 25px;
  width: 100%;
  font-weight: 100;
  outline: none;
  box-shadow: 0px 0px 4px 0px #00000024;
`;


const Input = ({ label, ...props }) => (
  <InputWrapper>
    <If condition={label}>
      <InputLabel>{label}</InputLabel>
    </If>
    <InputField {...props} />
  </InputWrapper>
);

export default Input;