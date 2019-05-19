import { Button, TextField } from '@material-ui/core';
import React, { SyntheticEvent, useRef, useState } from 'react';

const App: React.FC = () => {
  const [html, setHtml] = useState('');

  const handleSubmit = <E extends SyntheticEvent>(e: E) => {
    e.preventDefault();
  };

  const contentRef = useRef<HTMLDivElement>();

  console.log(contentRef);

  return (
    <main>
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
      <div ref={contentRef as any} dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
};

export default App;
