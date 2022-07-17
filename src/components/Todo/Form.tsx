import React, { FormEvent, useState } from 'react';
import { v4 as fakeId } from 'uuid';

import { TodoItem } from '@base/types';

type FormProps = {
  onSubmit: (item: TodoItem) => void;
};

export const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const item: TodoItem = {
      id: fakeId(),
      title,
      isChecked: false,
    };

    onSubmit(item);

    setTitle('');
  };

  return (
    <form className="view-sm flex items-end mb-4" onSubmit={submitHandler}>
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
    </form>
  );
};
