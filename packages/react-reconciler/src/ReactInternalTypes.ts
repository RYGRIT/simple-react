import { WorkTag } from 'react-reconciler';

export type Fiber = {
  tag: WorkTag;
  key: string | null;

  stateNode: any;

  return: Fiber | null;

  child: Fiber | null;
  sibling: Fiber | null;
  index: number;

  pendingProps: any;
  memoizedProps: any;

  updateQueue: unknown;

  alternate: Fiber | null;
};

type BaseFiberRootProperties = {
  containerInfo: any;
  current: Fiber | null;
};

export type FiberRoot = BaseFiberRootProperties;
