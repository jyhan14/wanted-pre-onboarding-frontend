import axios from "axios";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  const accessToken = localStorage.getItem("access_token");

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/todos`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);


  const toggleComplete = async (id) => {
    const updatedTodos = todos.map((todoItem) => {
      if (todoItem.id === id) {
        return { ...todoItem, completed: !todoItem.completed };
      }
      return todoItem;
    });
    setTodos(updatedTodos);
  
    try {
      const todoToUpdate = todos.find((todoItem) => todoItem.id === id);
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`,
        {
          todo: todoToUpdate.todo,
          isCompleted: !todoToUpdate.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }
  


  const modifyTodo = async (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todo: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`,
        {
          todo: newText,
          isCompleted: todos.find((todo) => todo.id === id).isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const addTodo = async (text) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/todos`,
        {
          todo: text,
          isCompleted: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newTodo = response.data;
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={() => toggleComplete(todo.id)}
            onModify={(newText) => modifyTodo(todo.id, newText)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
      <input data-testid='new-todo-input' />
      <button
        onClick={() => {
          const input = document.querySelector(
            '[data-testid="new-todo-input"]'
          );
          addTodo(input.value);
          input.value = "";
        }}
        data-testid='new-todo-add-button'
      >
        추가
      </button>
    </div>
  );
}

export default TodoList;
