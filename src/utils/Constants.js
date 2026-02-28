export const classColors = {
  Saber: "#00d4ff",
  Archer: "#ff4d6d",
  Lancer: "#7b2fff",
  Caster: "#00ffaa",
  Rider: "#ff9f1c",
  "Alter Ego": "#ff2d78",
  Master: "#f5c542",
  AI: "#ff00ff",
};

export const getAccent = (char) => {
  const key = char.facts.class || char.facts.type || char.facts.role;
  return classColors[key] || "#00d4ff";
};