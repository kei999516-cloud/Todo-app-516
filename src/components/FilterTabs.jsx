const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "done", label: "Done" },
];

export default function FilterTabs({ filter, counts, onChange }) {
  return (
    <div role="tablist" className="tabs">
      {TABS.map((t) => (
        <button
          key={t.key}
          role="tab"
          aria-selected={filter === t.key}
          className={filter === t.key ? "tab active" : "tab"}
          onClick={() => onChange(t.key)}
        >
          {t.label} <span className="count">{counts[t.key]}</span>
        </button>
      ))}
    </div>
  );
}
