import React, { useEffect, useState } from 'react';

import { Container } from '@layouts/';
import { TodoItem } from '@base/types';
import { Form, List } from '@components/';

import seedersItems from '@base/seeders/todos.json';

export const Home = () => {
  const localItems: TodoItem[] =
    JSON.parse(localStorage.getItem('items') ?? '') ?? [];

  const initialState: TodoItem[] = localItems.length
    ? localItems
    : seedersItems;

  const [items, setItems] = useState<TodoItem[]>(initialState);

  const onSubmit = (item: TodoItem) => {
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

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <Container>
      <h1 className="ui-title-1">Home Page</h1>
      <Form onSubmit={onSubmit} />
      <List items={items} onChecked={onChecked} onDelete={onDelete} />
    </Container>
  );
};
