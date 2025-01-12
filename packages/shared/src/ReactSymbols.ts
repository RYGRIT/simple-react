export const REACT_ELEMENT_TYPE: symbol | number =
  typeof Symbol === 'function' && Symbol.for
    ? Symbol.for('react.element')
    : 0xeac7;
