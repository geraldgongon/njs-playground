import TodoList from "./internals/TodoList";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  deleted?: boolean;
}

const TodoPage = async () => {
  // Fetch data directly in the component
  // getInitialProps is no longer supported in newer versions of Next.js
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  let todos: Todo[] = await response.json();

  // add a deleted attribute
  todos.map((todo) => {
    todo.deleted = false;
  });

  return (
    <div>
      <TodoList initialTodos={todos} />
    </div>
  );
};

export default TodoPage;
