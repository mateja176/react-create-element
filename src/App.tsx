import { Button, TextField } from '@material-ui/core';
import React, {
  createElement,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import sanitizeHtml from 'sanitize-html';

const sanitize = (html: string) =>
  sanitizeHtml(html, { allowedTags: false, allowedAttributes: false });

const App: React.FC = () => {
  const [html, setHtml] = useState('');

  const handleSubmit = <E extends SyntheticEvent>(e: E) => {
    e.preventDefault();

    localStorage.setItem('html', sanitize(html));
  };

  const contentRef = useRef<HTMLDivElement>();

  console.log(contentRef.current);

  useEffect(() => {
    (contentRef.current || document.createElement('textarea')).focus();

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
      {createElement(
        'div',
        {
          style: { color: 'royalblue' },
          onClick: () => {
            console.log('hello');
          },
        },
        'Hi',
      )}
    </main>
  );
};

export default App;
