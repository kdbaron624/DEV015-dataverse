import "../styles/App.css";

export const GlitchText = ({ text }) => (
  <span className="glitch" data-text={text}>{text}</span>
);

export const Scanlines = () => (
  <div className="scanlines" />
);