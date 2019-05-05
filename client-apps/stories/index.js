import React from 'react';
import { storiesOf } from '@storybook/react';
// import { Button } from '@storybook/react/demo';
import Button from '../src/main-client/src/components/label';
import Context from '../src/main-client/src/context';

storiesOf('Button', module)
  .addDecorator(story => <Context.Provider>{story()}</Context.Provider>)
  .add('with text', () => <Button channel="testChannel">Hello Button</Button>)
  .add('with emoji', () => (
    <Button channel="ch">
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('using render prop', () => <Button channel="testChannel" render={() => 'Bye Bye'} />)
  .add('with message data', () => <Button channel="testChannel" render={({ data }) => data.text} />);
