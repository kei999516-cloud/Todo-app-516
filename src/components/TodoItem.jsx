import { useEffect, useRef, useState } from "react";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const save = () => {
    const value = draft.trim();
    if (value) onEdit(todo.id, value);
    else setDraft(todo.text);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.done ? "not done" : "done"}`}
      />

      {editing ? (
        <>
          <input
            ref={inputRef}
            className="edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancel();
            }}
            aria-label="Edit task"
          />
          <button className="icon-btn" onClick={save}>Save</button>
          <button className="icon-btn" onClick={cancel}>Cancel</button>
        </>
      ) : (
        <>
          <span className={todo.done ? "text done" : "text"}>{todo.text}</span>
          <button className="icon-btn" onClick={() => setEditing(true)}>Edit</button>
          <button className="icon-btn danger" onClick={() => onDelete(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
}
