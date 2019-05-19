import { createElement, ReactHTML, ReactNode } from 'react';

type Component = { tag: keyof ReactHTML; children: ReactNode[] };

const h = <C extends Component>(
  component: C,
): ReturnType<typeof createElement> => {
  const { tag, children, ...props } = component;

  return createElement(tag, props, children.map(h));
};

export default h;
