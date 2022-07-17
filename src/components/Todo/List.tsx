import React from 'react';

import { Tags } from '@components/';
import { ITodoItem } from '@base/types';

type ListProps = {
  items: ITodoItem[];
  onChecked: (todoId: string) => void;
  onDelete: (todoId: string) => void;
};

export const List: React.FC<ListProps> = ({ items, onChecked, onDelete }) => (
  <div className="view-sm flex-col">
    {!items.length
      ? 'Tasks not found'
      : items?.map(({ id, title, isChecked, tags }) => (
          <div key={id} className="flex justify-between items-center mb-2">
            <div className="ui-checkbox mb-1">
              <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={() => onChecked(id)}
              />
              <label htmlFor={id}>{title}</label>
            </div>
            {tags && <Tags items={tags} />}
            <button
              className="ui-button isLink pl-2 text-sm"
              onClick={() => onDelete(id)}
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
  </div>
);
