import Realtime from 'feathers-offline-realtime';
import get from 'lodash/get';
import syncService from '../helpers/sync-service';

export default (store, socketClient, services, authData) => {
  const syncronizer = syncService(store, socketClient, services);

  const guestConfig = [
    { service: 'cities' },
    {
      service: 'app/plans',
      alias: 'plans',
      config: {
        publication: ({ active }) => active != 'false',
      },
    },
    { service: 'app/lawyers', alias: 'lawyers' },
    { service: 'app/law-areas', alias: 'lawAreas' },
    {
      service: 'app/services',
      alias: 'lawyerServices',
    },
  ];

  const userConfig = [
    {
      service: 'app/user-profile',
      alias: 'userProfile',
      config: {
        publication: ({ _id }) => _id === userData._id,
      },
    },
    {
      service: 'app/chat',
      alias: 'chat',
      // config: {
      //   publication: ({ members }) => members.includes(userData._id),
      // },
    },
    {
      service: 'app/requests',
      alias: 'requests',
    },
  ];

  const lawyerConfig = [
    {
      service: 'app/chat',
      alias: 'chat',
    },
    {
      service: 'app/tutorial',
      alias: 'tutorial',
    },
    {
      service: 'app/user-profile',
      alias: 'userProfile',
      config: {
        publication: ({ _id }) => _id === userData._id,
      },
    },
    {
      service: 'app/lawyer-profile',
      alias: 'lawyerProfile',
      config: {
        publication: ({ _id }) => _id === userData.lawyer || _id === userData.lawyer._id,
      },
    },
    {
      service: 'app/videos',
      alias: 'videos',
      config: {
        publication: ({ lawyer }) => lawyer === userData.lawyer || lawyer === userData.lawyer._id,
      },
    },
    {
      service: 'app/articles',
      alias: 'articles',
      config: {
        publication: ({ lawyer }) => lawyer === userData.lawyer || lawyer === userData.lawyer._id,
      },
    },
  ];

  const userData = get(store.getState(), 'application.userData', {});
  const isLawyer = get(store.getState(), 'application.userData.lawyer');

  if (userData._id && !isLawyer) {
    console.log('USER TYPE: USER');
    setTimeout(() => syncronizer([...guestConfig, ...userConfig]), 1000);
  }

  if (isLawyer) {
    console.log('USER TYPE: LAWYER');
    setTimeout(() => {
      syncronizer([...guestConfig, ...lawyerConfig]);
    }, 1000);
  } else {
    console.log('USER TYPE: GUEST');
    setTimeout(() => {
      syncronizer(guestConfig);
    }, 1000);
  }
};
