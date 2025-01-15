import { Fiber, FiberRoot, initializeUpdateQueue } from 'react-reconciler';
import { createHostRootFiber } from './ReactFiber';

class FiberRootNode {
  containerInfo: any;
  current: Fiber | null;
  constructor(containerInfo: any) {
    this.containerInfo = containerInfo;
    this.current = null;
  }
}

export function createFiberRoot(containerInfo: any): FiberRoot {
  const root = new FiberRootNode(containerInfo);

  // 未初始化的 fiber
  const uninitializedFiber = createHostRootFiber();
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  // 初始化更新队列
  initializeUpdateQueue(uninitializedFiber);

  return root;
}
