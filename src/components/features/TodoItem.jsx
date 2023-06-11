import React, { useState } from "react";

function TodoItem({ todo, onToggleComplete, onModify, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedText, setModifiedText] = useState(todo.todo);
  const [completed, setCompleted] = useState(todo.isCompleted);

  const handleToggleComplete = () => {
    setCompleted(!completed);
    onToggleComplete();
  };

  const handleModify = () => {
    if (isEditing) {
      onModify(modifiedText);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleChange = (e) => {
    setModifiedText(e.target.value);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type='text'
            value={modifiedText}
            onChange={handleChange}
            data-testid='modify-input'
          />
          <button onClick={handleModify} data-testid='submit-button'>
            제출
          </button>
          <button
            onClick={() => setIsEditing(false)}
            data-testid='cancel-button'
          >
            취소
          </button>
        </>
      ) : (
        <>
          <label>
            <input
              type='checkbox'
              checked={completed}
              onChange={handleToggleComplete}
            />
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{todo.todo}</span>
          </label>
          <button onClick={handleModify} data-testid='modify-button'>
            수정
          </button>
          <button onClick={handleDelete} data-testid='delete-button'>
            삭제
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
