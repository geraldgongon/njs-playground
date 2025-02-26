'use client'

import { useState } from "react";
import { Todo } from "../page"

const TodoList = ({initialTodos} : { initialTodos: Todo[]}) => {
    const [todos, setTodos] = useState(initialTodos);
    const toggleTodo = (id: number): void => {
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return;
        todo.completed = !todo.completed
        setTodos([...todos])
    }

    return (
        <ul>
            { todos.map((todo: Todo) => (
                <li key={todo.id}>
                    <input type="checkbox" 
                        checked={todo.completed} 
                        onChange={() => toggleTodo(todo.id)} />
                    <span>{ todo.completed ? <s>{todo.title}</s> : todo.title}</span>
                </li>
            )

            )}
            
        </ul>
    )
}


export default TodoList