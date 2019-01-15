// This is a ghost action just to Logic catch it and process something before otiginal action created
const before = (action) => (...args) => {
  return { type: 'BEFORE_PROCCESS_FEATHERS_PAYLOAD', payload: { action, args } };
}

export default before;