import { createRoot as createRootImpl } from './index';

export function createRoot(
  container: Element | Document | DocumentFragment,
): any {
  return createRootImpl(container);
}
