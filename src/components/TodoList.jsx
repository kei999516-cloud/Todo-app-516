import TodoItem from "./TodoItem.jsx";

const EMPTY_MESSAGES = {
  all: "No tasks yet. Add your first one above.",
  active: "All caught up. Add a task to keep going.",
  done: "Nothing finished yet. Check off a task to see it here.",
};

export default function TodoList({ todos, filter, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty">{EMPTY_MESSAGES[filter]}</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
