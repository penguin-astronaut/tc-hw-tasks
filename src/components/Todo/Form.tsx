import React, { FormEvent, useState } from 'react';
import { v4 as fakeId } from 'uuid';
import tagsItemsBase from '@base/seeders/tags.json';
import { ITodoItem } from '@base/types';
import { Tags } from '@components/';

type FormProps = {
  onSubmit: (item: ITodoItem) => void;
};

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const [tagsItems, setTagsItems] = useState(tagsItemsBase);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const item: ITodoItem = {
      id: fakeId(),
      title,
      isChecked: false,
      tags: tagsItems.filter((tag) => tag.isActive),
    };

    onSubmit(item);

    setTitle('');
    setTagsItems(tagsItemsBase);
  };

  const onTagClick = (tagId: number) => {
    setTagsItems((prevState) =>
      prevState.map((item) =>
        item.id === tagId ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  return (
    <form className="mb-4" onSubmit={submitHandler}>
      <div className="view-sm flex items-end">
        <div className="ui-input" style={{ width: '100%' }}>
          <label htmlFor="input-DqS1">Enter todo</label>
          <input
            id="input-DqS1"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="ui-button isPrimary" type="submit">
          Add task
        </button>
      </div>
      <Tags items={tagsItems} onItemClick={onTagClick} />
    </form>
  );
};
