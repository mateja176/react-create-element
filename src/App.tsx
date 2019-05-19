import { Button, TextField } from '@material-ui/core';
import React, {
  createElement,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

const App: React.FC = () => {
  const [html, setHtml] = useState('');

  const handleSubmit = <E extends SyntheticEvent>(e: E) => {
    e.preventDefault();

    localStorage.setItem('html', html);
  };

  const contentRef = useRef<HTMLDivElement>();

  console.log('first called with undefined', contentRef.current);

  useEffect(() => {
    console.log('called after component mounted', contentRef.current);

    setHtml(localStorage.getItem('html') || '');
  }, []);

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
          placeholder="<h1>Hello World</h1>"
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
          Save
        </Button>
      </form>
      <div ref={contentRef as any} dangerouslySetInnerHTML={{ __html: html }} />
      {createElement('div', { style: { color: 'royalblue' } }, 'Hi')}
    </main>
  );
};

export default App;
