import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import IconButton from 'react-toolbox/lib/button/IconButton';

const stories = storiesOf('Lawyers List', module);
stories.addDecorator(withKnobs);

import PersonList from '../../src/scenes/Home/components/PersonList';
import PersonListItem from '../../src/scenes/Home/components/PersonListItem';
import '../../src/style/index.css';

/**
|--------------------------------------------------
| With Title
|--------------------------------------------------
*/

stories.add('default', () =>
  (
    <PersonListItem
      key="1"
      image={text('Image URL',`http://i.pravatar.cc/200?img=1`)}
      oab={text('OAB', '405994/SP')}
      title={text("Title", 'Ana Beatriz da Silva')}
      description={text('Description', 'Trabalhista, Penal, Familiar, Consumidor')}
      stars={number("Stars", 3)}
      reviews={number("Reviews", 45)}
      distance={number("Distance", 3)}
      articles={number("Articles", 3)}
      videos={number("Videos", 1)}
    />
  )
);
