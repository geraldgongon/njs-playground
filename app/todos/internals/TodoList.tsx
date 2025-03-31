"use client";

import { Fragment, useState } from "react";
import { Todo } from "../page";
import { Checkbox, FormControlLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (id: number): void => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    todo.completed = !todo.completed;
    setTodos([...todos]);
  };

  const deleteTodo = (id: number): void => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    todo.deleted = true;
    setTodos([...todos]);
  };

  return (
    <ul>
      {todos.map(({ completed, title, id, deleted }: Todo) =>
        deleted ? (
          <Fragment key={id}></Fragment>
        ) : (
          <li key={id}>
            <FormControlLabel
              control={<Checkbox sx={{ color: "white" }} />}
              label={completed ? <s>{title}</s> : title}
              checked={completed}
              onChange={() => toggleTodo(id)}
            />
            <DeleteIcon
              data-testid={`delete-${id}`}
              onClick={() => {
                deleteTodo(id);
              }}
              sx={{ cursor: "pointer" }}
            />
          </li>
        ),
      )}
    </ul>
  );
};

export default TodoList;
