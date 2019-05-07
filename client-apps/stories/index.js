import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../src/main-client/src/components/button';
import Label from '../src/main-client/src/components/label';
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

storiesOf('Label', module)
  .addDecorator(story => <Context.Provider>{story()}</Context.Provider>)
  .add('with text', () => <Label channel="testChannel">Hello Button</Label>)
  .add('with emoji', () => (
    <Label channel="ch">
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Label>
  ))
  .add('with message data', () => <Label channel="testChannel" render={({ data }) => data.text} />)
  .add('with message data as title', () => <Label channel="testChannel" variant="h5" component="h2" gutterBottom render={({ data }) => data.text} />)
  .add('with message data as secondary', () => <Label channel="testChannel" color="textSecondary">Nothing at all</Label>)
  .add('with using title kind', () => <Label channel="testChannel" kind="title">Title</Label>)
  .add('with using secondary kind', () => <Label channel="testChannel" kind="secondary">secondary</Label>)
