import React, { useEffect, useMemo, useState } from 'react';

import { Container } from '@layouts/';
import { ITagItem, ITodoItem } from '@base/types';
import { Form, List, Tags } from '@components/';

import seedersItems from '@base/seeders/todos.json';
import seedersTags from '@base/seeders/tags.json';

export const Home = () => {
  const localItems: ITodoItem[] =
    JSON.parse(localStorage.getItem('items') ?? '') ?? [];
  const initialState: ITodoItem[] = localItems.length
    ? localItems
    : seedersItems;

  const [items, setItems] = useState<ITodoItem[]>(initialState);
  const [tagsItems, setTagsItems] = useState<ITagItem[]>(seedersTags);

  const onSubmit = (item: ITodoItem) => {
    setItems((prevState) => [...prevState, item]);
  };

  const onChecked = (todoId: string) => {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === todoId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const onDelete = (todoId: string) => {
    setItems((prevState) => prevState.filter((item) => item.id !== todoId));
  };

  const onTagClick = (tagId: number) => {
    setTagsItems((prevState) =>
      prevState.map((item) => {
        const isActive = item.id === tagId && !item.isActive;
        return { ...item, isActive };
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const todosFiltered = useMemo(() => {
    const activeTag = tagsItems.find((item) => item.isActive);
    if (!activeTag) {
      return items;
    }
    return items.filter(({ tags }) =>
      tags?.find(({ id }) => activeTag.id === id)
    );
  }, [tagsItems, items]);

  return (
    <Container>
      <div className="view-wrapper">
        <div className="view-sidebar">
          <Tags items={tagsItems} onItemClick={onTagClick} isVertical />
        </div>
        <div className="view-content">
          <h1 className="ui-title-1">Tasks list</h1>
          <Form onSubmit={onSubmit} />
          <List
            items={todosFiltered}
            onChecked={onChecked}
            onDelete={onDelete}
          />
        </div>
      </div>
    </Container>
  );
};
