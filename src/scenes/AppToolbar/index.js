import { h } from 'preact';
import { route } from 'preact-router';
import get from 'lodash/get';
import container from './container';

// Components
import { Toolbar, ToolbarItem } from '../../components/Toolbar';
import {
  Home,
  Articles,
  Briefcase,
  Question,
  Lawyer,
  Chat,
} from '../../components/icons/icons';



// An object mapping route paths to the according route functions.
// This is used instead of declaring an arrow function inline inside of every ToolbarItem in order to avoid
// creating a new anonymous function on every render.
const routes = {
  home: () => route('/home'),
  search: () => route('/search'),
  services: () => route('/services'),
  requests: () => route('/requests'),
  'public-services': () => route('/public-services'),
  articles: () => route('/articles'),
  chats: () => route('/chats'),
};


// Size of every icon in the Toolbar.
const toolbarIconDimensions = {
  height: 18,
};



const AppToolbar = ({
  chatsUnread,
  withPublicServices,
  hideHomeWhenLawyer
}) => {
  // Get a snapshot of the store on render.
  const storeState = store.getState();

  // Acquire some data from the store.
  const isUserSignedIn = storeState.authentication.isSignedIn;
  const isLawyer = get(storeState.application, 'userData.lawyer');

  return (
    <Toolbar>
      <If condition={hideHomeWhenLawyer ? !isLawyer : true}>
        <ToolbarItem
          onClick={routes.home}
          icon={<Home {...toolbarIconDimensions} />} />
        <ToolbarItem
          onClick={routes.search}
          icon={<Lawyer {...toolbarIconDimensions} />} />
      </If>

      <If condition={isUserSignedIn}>
        <If condition={isLawyer}>
          <ToolbarItem
            onClick={routes.services}
            icon={<Briefcase {...toolbarIconDimensions} />} />
        </If>
        <If condition={!isLawyer}>
          <ToolbarItem
            onClick={routes.requests}
            icon={<Question {...toolbarIconDimensions} />} />
        </If>
      </If>

      <If condition={withPublicServices && !(isUserSignedIn || isLawyer)}>
        <ToolbarItem
          onClick={routes['public-services']}
          icon={<Briefcase {...toolbarIconDimensions} />} />
      </If>

      <ToolbarItem
        onClick={routes.articles}
        icon={<Articles {...toolbarIconDimensions} />} />

      <If condition={isUserSignedIn}>
        <ToolbarItem
          onClick={routes.chats}
          icon={<Chat {...toolbarIconDimensions} unread={chatsUnread.length} />} />
      </If>
    </Toolbar>
  );
}



export default container(AppToolbar);
