import type { FiberRoot } from 'react-reconciler';
import { createContainer } from 'react-reconciler';
import type { ReactNodeList } from 'shared';

export type RootType = {
  render(children: ReactNodeList): void;
  unmount(): void;
  _internalRoot: FiberRoot | null;
};

// 定义 ReactDOMRoot 类
class ReactDOMRoot {
  _internalRoot: FiberRoot;

  constructor(internalRoot: FiberRoot) {
    this._internalRoot = internalRoot;
  }

  render() {}

  unmount() {}
}

export function createRoot(
  container: Element | Document | DocumentFragment,
): RootType {
  // 创建 FiberRoot
  const root = createContainer(container);

  return new ReactDOMRoot(root);
}
