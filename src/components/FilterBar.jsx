import "../styles/FilterBar.css";

const SORT_OPTIONS = [
  { value: "name-asc",   label: "A → Z",        icon: "↑" },
  { value: "name-desc",  label: "Z → A",        icon: "↓" },
  { value: "power-desc", label: "Mayor poder",  icon: "⚔" },
  { value: "power-asc",  label: "Menor poder",  icon: "⚔" },
];

// Colores por saga
const GAME_COLORS = {
  "Fate/Extra":        "#00d4ff",
  "Fate/Extra CCC":    "#ff2d78",
  "Fate/EXTELLA":      "#f5c542",
  "Fate/EXTELLA LINK": "#00ffaa",
};

const FilterBar = ({ search, onSearch, selectedGame, onGame, games, sortOrder, onSort }) => (
  <div className="filterbar">

    {/* ── Fila 1: búsqueda ──────────────────────────────────── */}
    <div className="filterbar__search-wrapper">
      <span className="filterbar__search-prefix">{">"}</span>
      <input
        className="filterbar__input"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="BUSCAR_SERVANT..."
      />
      {search && (
        <button className="filterbar__clear" onClick={() => onSearch("")}>✕</button>
      )}
    </div>

    {/* ── Fila 2: filtro por saga (tabs) ────────────────────── */}
    <div className="filterbar__section">
      <span className="filterbar__section-label">// SAGA</span>
      <div className="filterbar__saga-tabs">
        <button
          onClick={() => onGame(null)}
          className={`filterbar__saga-tab${selectedGame === null ? " filterbar__saga-tab--active" : ""}`}
          style={{ "--tab-color": "#ffffff" }}
        >
          <span className="filterbar__saga-dot" />
          TODAS
        </button>
        {games.map((g) => {
          const color = GAME_COLORS[g] || "#00d4ff";
          const isActive = selectedGame === g;
          return (
            <button
              key={g}
              onClick={() => onGame(g)}
              className={`filterbar__saga-tab${isActive ? " filterbar__saga-tab--active" : ""}`}
              style={{ "--tab-color": color }}
            >
              <span className="filterbar__saga-dot" />
              {g.replace("Fate/", "")}
            </button>
          );
        })}
      </div>
    </div>

    {/* ── Fila 3: ordenar ────────────────────────────────────── */}
    <div className="filterbar__section">
      <span className="filterbar__section-label">// ORDENAR</span>
      <div className="filterbar__sort">
        {SORT_OPTIONS.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => onSort(value)}
            className={`filterbar__sort-btn${sortOrder === value ? " filterbar__sort-btn--active" : ""}`}
          >
            <span className="filterbar__sort-icon">{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </div>

  </div>
);

export default FilterBar;