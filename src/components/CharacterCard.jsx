import { useState } from "react";
import { getAccent } from "../utils/constants.js";
import "../styles/CharacterCard.css";

const CharacterCard = ({ char, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const accent = getAccent(char);
  const label = char.facts.class || char.facts.type || char.facts.role || "???";

  return (
    <div
      className="card"
      onClick={() => onClick(char)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        "--card-accent": accent,
        boxShadow: hovered
          ? `0 0 0 1.5px ${accent}, 0 20px 50px ${accent}55, 0 0 80px ${accent}22`
          : "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.6)",
        textShadow: `0 0 12px ${accent}88`,
      }}
    >

      <div className="card__border" />
      <div className="card__corner card__corner--tl" />
      <div className="card__corner card__corner--tr" />
      <div className="card__corner card__corner--bl" />
      <div className="card__corner card__corner--br" />

      <div className="card__image-wrapper">
        <img
          className="card__image"
          src={char.imageUrl}
          alt={char.name}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="card__image-gradient" />
      </div>

      <div className="card__badge">{label}</div>

      <div className="card__scan" />

      <div className="card__info">
        <div className="card__id">
          {`// ID_${char.id.slice(0, 8).toUpperCase()}`}
        </div>
        <div className="card__name">{char.name}</div>
        <div className="card__desc">{char.shortDescription}</div>
      </div>
    </div>
  );
};

export default CharacterCard;