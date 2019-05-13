import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  textInput: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2
  },
  chip: {
    margin: theme.spacing.unit
  },
  chipContainer: {
    marginBottom: theme.spacing.unit * 2
  }
});

function MultiTextField({ value, onChange, classes, label }) {
  const [textInput, setTextInput] = useState('');
  function addNewText() {
    if (!textInput) {
      return;
    }

    onChange((value || []).concat(textInput));
    setTextInput('');
  }

  function handleDelete(index) {
    value.splice(index, 1);
    onChange(value);
  }
  return (
    <Fragment>
      <TextField
        placeholder="Add action"
        value={textInput}
        label={label}
        className={classes.textInput}
        onChange={event => setTextInput(event.target.value)}
        onKeyPress={event => {
          return event.key === 'Enter' && addNewText();
        }}
      />
      <div className={classes.chipContainer}>
        {value && value.map((text, index) => (
          <Chip className={classes.chip} label={text} key={text} onDelete={() => handleDelete(index)} />
        ))}
      </div>
    </Fragment>
  );
}
export default withStyles(styles)(MultiTextField);
