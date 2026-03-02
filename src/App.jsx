import { useState, useEffect } from "react";

import data from "./data/fate-extra-dataset.js";

import { searchByName, filterByAppearance, getUniqueGames, sortByName } from "./utils/dataFunctions.js";
import { GlitchText, Scanlines } from "./components/UI.jsx";

import CharacterCard from "./components/CharacterCard.jsx";
import Modal from "./components/Modal.jsx";
import FilterBar from "./components/FilterBar.jsx";

import "./styles/global.css";
import "./styles/App.css";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [count, setCount] = useState(0);

  const games = getUniqueGames(data);

  let filtered = data;
  if (search) filtered = searchByName(filtered, search);
  if (selectedGame) filtered = filterByAppearance(filtered, selectedGame);
  filtered = sortByName(filtered);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setCount(i);
      if (i >= data.length) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="app">
      <Scanlines />
      <div className="app__grid-bg" />
      <div className="app__glow" />

      <div className="app__container">
        <header className="header">
          <div className="header__eyebrow">
            <span className="header__line header__line--left" />
            MOON CELL // HOLY GRAIL WAR // SE.RA.PH ARCHIVE
            <span className="header__line header__line--right" />
          </div>
          <h1 className="header__title">
            <GlitchText text="FATE / EXTRA CCC" />
          </h1>
          <p className="header__subtitle">
            SERVANT DATABASE //{" "}
            {count < data.length ? `LOADING_${count}` : `${data.length} RECORDS FOUND`}
          </p>
        </header>

        <FilterBar
          search={search}
          onSearch={setSearch}
          selectedGame={selectedGame}
          onGame={setSelectedGame}
          games={games}
        />

        <div className="results-count">
          {`// MOSTRANDO ${filtered.length} DE ${data.length} REGISTROS`}
        </div>

        <div className="cards-grid">
          {filtered.length > 0 ? (
            filtered.map((char) => (
              <CharacterCard key={char.id} char={char} onClick={setSelected} />
            ))
          ) : (
            <div className="cards-grid__empty">
              // ERROR_404: NO_RECORDS_MATCH_QUERY
            </div>
          )}
        </div>

        <footer className="footer">
          <span className="footer__copy">© TYPE-MOON // MARVELOUS // ANIPLEX // FATE/EXTRA CCC</span>
          <span className="footer__warning">WARNING: MOON CELL KNOWLEDGE IS ABSOLUTE</span>
        </footer>
      </div>

      {selected && <Modal char={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}