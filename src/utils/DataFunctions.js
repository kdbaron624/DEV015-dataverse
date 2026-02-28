export const filterByClass = (data, className) =>
  data.filter((c) => c.facts.class?.toLowerCase() === className.toLowerCase());

export const filterByAppearance = (data, game) =>
  data.filter((c) => c.facts.appearances?.includes(game));

export const searchByName = (data, query) =>
  data.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

export const getUniqueClasses = (data) =>
  [...new Set(data.map((c) => c.facts.class).filter(Boolean))];

export const getUniqueGames = (data) =>
  [...new Set(data.flatMap((c) => c.facts.appearances || []))];

export const sortByName = (data, asc = true) =>
  [...data].sort((a, b) =>
    asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );