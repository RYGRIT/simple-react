import { Fiber } from './ReactInternalTypes';

export type Update<State> = {
  next: Update<State> | null;
};

export type SharedQueue<State> = {
  pending: Update<State> | null;
};

export type UpdateQueue<State = any> = {
  shared: SharedQueue<State>;
};

export function initializeUpdateQueue<State>(fiber: Fiber): void {
  const queue: UpdateQueue<State> = {
    shared: {
      // 单向循环链表
      pending: null,
    },
  };

  fiber.updateQueue = queue;
}
