import { hasOwn, REACT_ELEMENT_TYPE } from 'shared';

type ReactJSX = (type: string, config: Record<string, unknown>) => unknown;

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __source: true,
  __self: true,
};

function hasValidRef(config: Record<string, unknown>) {
  return config.ref !== undefined;
}

function hasValidKey(config: Record<string, unknown>) {
  return config.key !== undefined;
}

const ReactElement = (
  type: string,
  key: string | null,
  ref: any,
  props: unknown,
) => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,

    type: type,
    ref: ref,
    key: key,
    props: props,
  };

  return element;
};

/**
 * babel 转义会来调用这个方法生成 虚拟DOM
 * @param type
 * @param config
 * @returns
 */
const jsxDEV: ReactJSX = (type: string, config: Record<string, unknown>) => {
  let propName;

  const props: any = {};

  let key = null;
  let ref = null;

  if (hasValidKey(config)) {
    // 确保 key 值为字符串
    key = '' + config.key;
  }

  if (hasValidRef(config)) {
    ref = config.ref;
  }

  for (propName in config) {
    if (hasOwn(config, propName) && !hasOwn(RESERVED_PROPS, propName)) {
      props[propName] = config[propName];
    }
  }

  return ReactElement(type, key, ref, props);
};

export { jsxDEV };
