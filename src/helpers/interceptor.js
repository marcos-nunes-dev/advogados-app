// This is a ghost action just to Logic catch it and process something before otiginal action created
const intercept = (action) => (...args) => {
  return { type: 'BEFORE_PROCCESS_FEATHERS_ACTION', payload: { action, args } };
}

export default intercept;