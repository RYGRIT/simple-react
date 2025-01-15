interface ReactElement<Props = any> {
  type: any;
  props: Props;
  key: string | number | null;
}

type ReactNodeArray = Iterable<ReactNode>;

type ReactFragment = ReactEmpty | ReactNodeArray;

export type ReactEmpty = null | void | boolean;

export type ReactNode =
  | string
  | number
  | boolean
  | null
  | undefined
  | ReactElement<any>
  | ReactNodeArray
  | ReactFragment;

export type ReactNodeList = ReactEmpty | ReactNode;
