import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getAccent } from "../utils/constants.js";
import "../styles/Modal.css";

const STAT_KEYS = ["STR", "END", "AGI", "MGI", "LCK", "NP"];

const StatBar = ({ label, value, accent }) => (
  <div className="modal__statbar">
    <div className="modal__statbar-header">
      <span className="modal__statbar-label">{label}</span>
      <span className="modal__statbar-value">{value}</span>
    </div>
    <div className="modal__statbar-track">
      <div
        className="modal__statbar-fill"
        style={{
          width: `${value}%`,
          background: `linear-gradient(to right, ${accent}88, ${accent})`,
          boxShadow: `0 0 8px ${accent}66`,
        }}
      />
    </div>
  </div>
);

const Modal = ({ char, onClose }) => {
  const accent = getAccent(char);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const handleEsc = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const overlayClass = `modal-overlay${visible ? " modal-overlay--visible" : ""}`;
  const panelClass   = `modal${visible ? " modal--visible" : ""}`;

  return createPortal(
    <div className={overlayClass} onClick={handleClose} style={{ "--modal-accent": accent }}>
      <div className={panelClass} onClick={(e) => e.stopPropagation()}>

        {/* Top bar */}
        <div className="modal__topbar">
          <span className="modal__record-id">
            MOON CELL // SERVANT RECORD // {char.id.toUpperCase().replace(/-/g, "_")}
          </span>
          <button className="modal__close-btn" onClick={handleClose}>[CLOSE]</button>
        </div>

        <div className="modal__body">
          {/* Image panel */}
          <div className="modal__image-panel">
            <img className="modal__image" src={char.imageUrl} alt={char.name} />
            <div className="modal__image-gradient" />
            <div className="modal__class-badge">
              {char.facts.class || char.facts.type || char.facts.role}
            </div>
            {/* Power score over image */}
            {char.stats && (
              <div className="modal__power-badge" style={{ color: accent, borderColor: accent }}>
                <span className="modal__power-label">POWER</span>
                <span className="modal__power-value" style={{ textShadow: `0 0 12px ${accent}` }}>
                  {char.stats.total}
                </span>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="modal__info">
            <div className="modal__label">DESIGNATION:</div>
            <h2 className="modal__name">{char.name}</h2>
            <p className="modal__short-desc">{char.shortDescription}</p>

            <div className="modal__divider">
              <div className="modal__divider-line" />
              <span className="modal__divider-label">PROFILE_DATA</span>
              <div className="modal__divider-line" />
            </div>

            <p className="modal__description">{char.description}</p>

            {/* Stats bars */}
            {char.stats && (
              <>
                <div className="modal__divider">
                  <div className="modal__divider-line" />
                  <span className="modal__divider-label">COMBAT_STATS</span>
                  <div className="modal__divider-line" />
                </div>
                <div className="modal__statbars">
                  {STAT_KEYS.map((key) => (
                    <StatBar key={key} label={key} value={char.stats[key] ?? 0} accent={accent} />
                  ))}
                </div>
              </>
            )}

            {/* Facts grid */}
            <div className="modal__divider" style={{ marginTop: "16px" }}>
              <div className="modal__divider-line" />
              <span className="modal__divider-label">INTEL</span>
              <div className="modal__divider-line" />
            </div>
            <div className="modal__stats">
              {Object.entries(char.facts)
                .filter(([k]) => k !== "appearances")
                .map(([key, val]) => (
                  <div key={key} className="modal__stat">
                    <div className="modal__stat-key">{key}</div>
                    <div className="modal__stat-val">{val}</div>
                  </div>
                ))}
              {Object.entries(char.extraInfo || {}).map(([key, val]) => (
                <div key={key} className="modal__stat">
                  <div className="modal__stat-key">{key}</div>
                  <div className="modal__stat-val">{val}</div>
                </div>
              ))}
            </div>

            {/* Appearances */}
            {char.facts.appearances && (
              <>
                <div className="modal__appearances-label">APPEARANCES:</div>
                <div className="modal__appearances">
                  {char.facts.appearances.map((a) => (
                    <span key={a} className="modal__appearance-tag">{a}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="modal__statusbar">
          {["RECORD_STATUS: ACTIVE", "MOON_CELL: SE.RA.PH", "THREAT_LEVEL: HIGH"].map((t) => (
            <span key={t} className="modal__status-item">{t}</span>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;