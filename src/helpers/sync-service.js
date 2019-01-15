import Realtime from 'feathers-offline-realtime';

let pendingSyncronization = null;

export default (store, socketClient, services) => (realtimes = []) => {
  const start = () => {
    pendingSyncronization = Promise.all(
      realtimes.map(realtime => {
        const service = socketClient.service(realtime.service);
        const serviceRealtime = new Realtime(service, realtime.config);

        serviceRealtime.on('events', (records, last) => {
          store.dispatch(
            services[realtime.alias || realtime.service].store({
              connected: serviceRealtime.connected,
              last,
              records,
            }),
          );
          if (realtime.listener) realtime.listener(records, last);
        });

        return serviceRealtime.connect().then((...args) => {
          console.log(
            `%c${`[${realtime.service}] snapshot syncronized.`.toUpperCase()}`,
            'color: #2196F3',
          );
          if (realtime.onConnect) realtime.onConnect(...args);
        });
      }),
    ).then(() => {
      console.log(`%c${'Snapshots syncronized.'.toUpperCase()}`, 'color: #2196F3');
      store.dispatch({ type: 'SNAPSHOT_SYNCRONIZED' });
      console.log('');
      pendingSyncronization = null;
    });

    return pendingSyncronization;
  };

  if (pendingSyncronization) {
    return pendingSyncronization.then(start);
  }
  return start();
};
