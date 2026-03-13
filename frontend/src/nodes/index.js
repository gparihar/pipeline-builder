export { default as BaseNode } from './BaseNode';
export { default as TextNode } from './TextNode';
export { default as InputNode } from './InputNode';
export { default as OutputNode } from './OutputNode';
export { default as LLMNode } from './LLMNode';
export { default as MathNode } from './MathNode';
export { default as FilterNode } from './FilterNode';
export { default as StringNode } from './StringNode';

export const nodeTypes = {
  text: 'TextNode',
  input: 'InputNode',
  output: 'OutputNode',
  llm: 'LLMNode',
  math: 'MathNode',
  filter: 'FilterNode',
  string: 'StringNode'
};
