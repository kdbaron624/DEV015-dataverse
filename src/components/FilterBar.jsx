import "../styles/FilterBar.css";

const FilterBar = ({ search, onSearch, selectedGame, onGame, games }) => (
  <div className="filterbar">

    {/* Search input */}
    <div className="filterbar__search-wrapper">
      <span className="filterbar__search-prefix">{">"}</span>
      <input
        className="filterbar__input"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="BUSCAR_SERVANT..."
      />
    </div>

    {/* Game filter buttons */}
    <div className="filterbar__games">
      {["ALL", ...games].map((g) => {
        const value = g === "ALL" ? null : g;
        const isActive = selectedGame === value;
        return (
          <button
            key={g}
            onClick={() => onGame(value)}
            className={`filterbar__btn${isActive ? " filterbar__btn--active" : ""}`}
          >
            {g}
          </button>
        );
      })}
    </div>
  </div>
);

export default FilterBar;