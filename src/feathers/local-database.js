import sift from 'sift';
import get from 'lodash/get';
import startCase from 'lodash/startCase';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import clone from 'lodash/clone';

import values from 'lodash/values';
import { services } from './index';
import config from './services';
import { store } from '../index';

const servicesNames = values(config);

/**
|--------------------------------------------------
| sift $populate
|--------------------------------------------------
*/

sift.use({
  $populate(data, current, list) {
    if (current.__populated) return true;

    const cases = data.split(' ').map(_case => {
      const test = /([\w]*)\(([^\)]+)\)/.exec(_case);
      return test ? { attribute: test[1], model: test[2] } : { attribute: _case, model: _case };
    });

    cases.forEach(({ attribute, model }) => {
      const service = localServices[formatName(model)];
      const key = '_id'; // TODO: set as configurated
      const list = service.find({ $order: 'createdAt(asc)' });

      const replacement = Array.isArray(current[attribute])
        ? list.filter(i => current[attribute].includes(i[key]))
        : list.find(i => i[key] == current[attribute]);

      current[attribute] = replacement;
    });

    current.__populated = true;

    return { foo: 1 };
  },
});

/**
|--------------------------------------------------
| Methods
|--------------------------------------------------
*/

const _find = name => config => {
  if (!store) return [];

  const snapshot = get(store.getState(), `${name}.store.records`) || [];
  const copy = snapshot.map(clone);
  const result = config ? sift(omit(config, '$order'), copy) : snapshot;

  // ordering
  if (config && config.$order) {
    const [interatees, sorts] = config.$order.split(' ').reduce(
      (data, curr) => {
        const [, interatee, sort] = /([\w]*)\(([^\)]+)\)/.exec(curr);
        data[0].push(interatee);
        data[1].push(sort);
        return data;
      },
      [[], []],
    );

    return orderBy(result, interatees, sorts);
  }
  return result;
};

const _get = name => config => id => {
  const snapshot = config
    ? _find(name)(config)
    : get(store.getState(), `${name}.store.records`) || [];

  return snapshot.find(item => item._id === id);
};

const _first = name => config => {
  const snapshot = config
    ? _find(name)(config)
    : get(store.getState(), `${name}.store.records`) || [];

  const [first] = snapshot;
  return first;
};

/**
|--------------------------------------------------
| LocalDB
|--------------------------------------------------
*/

const formatName = name => startCase(name)
  .split(' ')
  .join('');

const localServices = servicesNames.reduce(
  (curr, serviceName) => ({
    ...curr,
    [formatName(serviceName)]: {
      find: _find(serviceName),
      get: _get(serviceName),
      first: _first(serviceName),
    },
  }),
  {},
);

export default localServices;
