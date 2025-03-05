export interface CheckboxItem {
  id: number;
  name: string;
  checked: boolean;
  children?: CheckboxItem[];
}

export type RecursiveCBoxProps = {
  node: CheckboxItem;
};
