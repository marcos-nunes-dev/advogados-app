import styled from 'styled-components';
import { configure } from '@storybook/react';
import { storiesOf, addDecorator } from '@storybook/react';

import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import theme from '../src/toolbox/theme';
import '../src/toolbox/theme.css';
import '../src/style/icons.css';

/**
|--------------------------------------------------
| Create a component to wrap all stories
|--------------------------------------------------
*/

const Wrapper = styled.div`
  width: 360px;
  height: 640px;
  background: #FAFAFA;
`;

addDecorator(story =>
  <Wrapper>
    <ThemeProvider theme={theme}>
      {story()}
    </ThemeProvider>
  </Wrapper>
);

/**
|--------------------------------------------------
| Load all stories in ./components
|--------------------------------------------------
*/

const req = require.context('./components', true, /\.stories\.js$/)

const loadStories = () =>
  req.keys().forEach((filename) => req(filename));

configure(loadStories, module);