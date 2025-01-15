import type { UpdateQueue, WorkTag } from 'react-reconciler';
import { Fiber, HostRoot } from 'react-reconciler';
import { Flags, NoFlags } from './ReactFiberFlags';

class FiberNode {
  // Instance
  tag: WorkTag;
  key: string | null;
  stateNode: any;

  // Fiber
  return: Fiber | null;
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;

  pendingProps: unknown;
  memoizedProps: unknown;
  updateQueue: UpdateQueue | null;

  // Effects
  flags: Flags;
  subtreeFlags: Flags;
  deletions: Flags | null;

  alternate: Fiber | null;
  constructor(tag: WorkTag, pendingProps: unknown, key: string | null) {
    this.tag = tag;
    this.key = key;
    this.stateNode = null;

    // Fiber
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;

    // Effects
    this.flags = NoFlags;
    this.subtreeFlags = NoFlags;
    this.deletions = null;

    this.alternate = null;
  }
}

const createFiber = function (
  tag: WorkTag,
  pendingProps: unknown,
  key: string | null,
) {
  return new FiberNode(tag, pendingProps, key);
};

export function createHostRootFiber(): Fiber {
  return createFiber(HostRoot, null, null);
}
