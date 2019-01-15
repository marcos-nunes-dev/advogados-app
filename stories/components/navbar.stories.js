import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import IconButton from 'react-toolbox/lib/button/IconButton';

const stories = storiesOf('Navbar', module);
stories.addDecorator(withKnobs);

import { Navbar } from '../../src/components'
import '../../src/style/index.css';

/**
|--------------------------------------------------
| With Title
|--------------------------------------------------
*/

stories.add('with title', () =>
  (
    <Navbar
      title={text('Title', 'Title')}
    />  
  )
);

/**
|--------------------------------------------------
| With Title and Subtitle
|--------------------------------------------------
*/

stories.add('with title and subtitle', () =>
  (
    <Navbar
      title={text('Title', 'Title')}
      subtitle={text('Subtitle', 'Subtitle')}
    />
  )
);

/**
|--------------------------------------------------
| With left and right components
|--------------------------------------------------
*/

stories.add('with left and right components', () =>
  (
    <Navbar
      title={text('Title', 'Title')}
      subtitle={text('Subtitle', 'Subtitle')}
      right={<IconButton icon='add' />}
    />
  )
);
