export interface ITagItem {
  id: number;
  title: string;
  isActive: boolean;
}

export interface ITodoItem {
  id: string;
  title: string;
  isChecked: boolean;
  tags?: ITagItem[];
}
