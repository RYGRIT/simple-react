import { createFiberRoot } from './ReactFiberRoot';
import { FiberRoot } from './ReactInternalTypes';

type OpaqueRoot = FiberRoot;

export function createContainer(containerInfo: any): OpaqueRoot {
  return createFiberRoot(containerInfo);
}
