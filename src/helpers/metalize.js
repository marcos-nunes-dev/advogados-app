const metalize = (data, action) => (...args) => ({ meta: data, ...action(...args) });

export default metalize;