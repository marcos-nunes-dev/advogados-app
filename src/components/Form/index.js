import Form from './Form';
import Input from './Input';
import Message from './Message';

const connect = (InputComponent) => (props) => (
  <Input component={InputComponent} {...props} />
);

export { Form, Input, Message, connect };