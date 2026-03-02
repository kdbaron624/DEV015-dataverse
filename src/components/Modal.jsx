import { useState, useEffect, use } from "react";
import { getAccent } from "../utils/constants";

import "../styles/Modal.css";

const Modal = ({ char, onClose }) => {
    const accent = getAccent(char);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        const handleEsc = (e) => e.key === "Escape" && handleClose();
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 300);
    };

    const overlayClass = `modal__overlay${visible ? "modal__overlay--visible" : ""}`;
    const panelClose = `modal${visible ? "modal--visible" : ""}`;

    return(
        <div className={overlayClass} onClick={handleClose} style={{ "--modal-accent": accent }}>
            <div className={panelClose} onClick={(e) => e.stopPropagation()}>

                {/* Top bar */}
                <div className="modal__topbar">
                    <span className="modal__record-id">
                        MOON CELL // SERVANT RECORD // {char.id.toUpperCase().replace(/-/g, "_")}
                    </span>
                    <button className="modal__close-btn" onClick={handleClose}>
                        [CLOSE]
                    </button>
                </div>

                <div className="modal__body">
                    {/* Image panel */}
                    <div className="modal__image-panel">
                        <img className="modal__image" src={char.imageUrl} alt={char.name} />
                        <div className="modal__image-gradient" />
                        <div className="modal__class-badge">
                            {char.facts.class || char.facts.type || char.facts.role}
                        </div>
                    </div>

                    {/* Info panel */}
                    <div className="modal__info">
                        <div className="modal__label">DESIGNATION:</div>
                        <h2 className="modal__name">{char.name}</h2>
                        <p className="modal__short-desc">{char.shortDescription}</p>

                        {/* Divider */}
                        <div className="modal__divider">
                            <div className="modal__divider-line"></div>
                            <span className="modal__divider-label">PROFILE_DATA</span>
                            <div className="modal__divider-line"></div>
                        </div>

                        <p className="modal__description">{char.description}</p>

                        {/* Stats grid */}
                        <div className="modal__stats">
                            {Object.entries(char.facts).filter(([k]) => k !== "appearances").map(([key, value]) => (
                                <div key={key} className="modal__stat">
                                    <span className="modal__stat-key">{key}</span>
                                    <span className="modal__stat-value">{value}</span>
                                </div>
                            ))}
                            {Object.entries(char.extraInfo || {}).map(([key, value]) => (
                                <div key={key} className="modal__stat">
                                <div className="modal__stat-key">{key}</div>
                                <div className="modal__stat-val">{value}</div>
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
        </div>
    )
}

return Modal;