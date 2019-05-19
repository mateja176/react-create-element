import { Button, TextField } from '@material-ui/core';
import React, { SyntheticEvent, useState } from 'react';

const App: React.FC = () => {
  const [html, setHtml] = useState('');

  const handleSubmit = <E extends SyntheticEvent>(e: E) => {
    e.preventDefault();

    console.log(html);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        gridGap: 10,
      }}
    >
      <TextField
        value={html}
        placeholder="Hello World"
        multiline={true}
        rows={20}
        fullWidth
        onChange={({ target: { value } }) => {
          setHtml(value);
        }}
        onKeyPress={e => {
          const { key, ctrlKey } = e;

          if (key === 'Enter' && ctrlKey) {
            handleSubmit(e);
          }
        }}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default App;
