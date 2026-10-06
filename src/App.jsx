import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";
import TodoForm from "./components/TodoForm.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import TodoList from "./components/TodoList.jsx";

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filter, setFilter] = useState("all");

  const addTodo = (text) =>
    setTodos((prev) => [...prev, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text, done: false }]);

  const toggleTodo = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const editTodo = (id, text) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));

  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () => setTodos((prev) => prev.filter((t) => !t.done));

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.done).length,
    done: todos.filter((t) => t.done).length,
  };

  const visible = todos.filter((t) =>
    filter === "active" ? !t.done : filter === "done" ? t.done : true
  );

  return (
    <main className="app">
      <header>
        <h1>Tasks</h1>
        <p className="subtitle">
          {counts.active === 0 ? "Nothing left to do." : `${counts.active} left to do.`}
        </p>
      </header>

      <TodoForm onAdd={addTodo} />

      <div className="toolbar">
        <FilterTabs filter={filter} counts={counts} onChange={setFilter} />
        {counts.done > 0 && (
          <button className="link-btn" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </div>

      <TodoList
        todos={visible}
        filter={filter}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={deleteTodo}
      />
    </main>
  );
}
