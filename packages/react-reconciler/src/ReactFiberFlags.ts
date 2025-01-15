export type Flags = number;

export const NoFlags = /*                      */ 0b00000000000000000000000000;
export const PerformedWork = /*                */ 0b00000000000000000000000001;

// 插入
export const Placement = /*                    */ 0b00000000000000000000000010;
// 更新
export const Update = /*                       */ 0b00000000000000000000000100;
// 删除
export const Deletion = /*                     */ 0b00000000000000000000001000;
