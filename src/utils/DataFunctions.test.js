import {
  filterByClass,
  filterByAppearance,
  searchByName,
  getUniqueClasses,
  getUniqueGames,
  sortByName,
  sortByPower,
} from './DataFunctions.js';

// ─── DATASET MOCK ─────────────────────────────────────────────────────────────
const mockData = [
  {
    id: 'nero-claudius',
    name: 'Nero Claudius',
    shortDescription: 'Emperadora eterna y Servant Saber.',
    facts: {
      class: 'Saber',
      origin: 'Imperio Romano',
      noblePhantasm: 'Aestus Domus Aurea',
      appearances: ['Fate/Extra', 'Fate/Extra CCC', 'Fate/EXTELLA'],
    },
    extraInfo: { role: 'Gobernante' },
    stats: { STR: 85, END: 80, AGI: 78, MGI: 70, LCK: 75, NP: 80, total: 468 },
  },
  {
    id: 'tamamo-no-mae',
    name: 'Tamamo no Mae',
    shortDescription: 'Caster divina con deseo humano.',
    facts: {
      class: 'Caster',
      origin: 'Mitología Japonesa',
      noblePhantasm: 'Eightfold Blessings of Amaterasu',
      appearances: ['Fate/Extra', 'Fate/Extra CCC'],
    },
    extraInfo: { theme: 'Amor, divinidad' },
    stats: { STR: 55, END: 60, AGI: 65, MGI: 98, LCK: 80, NP: 95, total: 453 },
  },
  {
    id: 'gilgamesh',
    name: 'Gilgamesh',
    shortDescription: 'Rey de los Héroes y observador del fin.',
    facts: {
      class: 'Archer',
      origin: 'Mesopotamia',
      noblePhantasm: 'Gate of Babylon',
      appearances: ['Fate/EXTELLA', 'Fate/EXTELLA LINK'],
    },
    extraInfo: { role: 'Observador' },
    stats: { STR: 90, END: 85, AGI: 88, MGI: 95, LCK: 99, NP: 99, total: 556 },
  },
  {
    id: 'hakuno-kishinami',
    name: 'Hakuno Kishinami',
    shortDescription: 'Protagonista autoconsciente.',
    facts: {
      role: 'Master',
      origin: 'SE.RA.PH',
      appearances: ['Fate/Extra', 'Fate/Extra CCC'],
    },
    extraInfo: { theme: 'Identidad, existencia' },
    stats: { STR: 8, END: 10, AGI: 9, MGI: 12, LCK: 20, NP: 0, total: 59 },
  },
  {
    id: 'karna',
    name: 'Karna',
    shortDescription: 'Héroe solar y Lancer del sacrificio absoluto.',
    facts: {
      class: 'Lancer',
      origin: 'Mitología Hindú',
      noblePhantasm: 'Vasavi Shakti',
      appearances: ['Fate/Extra CCC'],
    },
    extraInfo: { theme: 'Honor, sacrificio' },
    stats: { STR: 95, END: 90, AGI: 88, MGI: 85, LCK: 75, NP: 99, total: 532 },
  },
];

// ─── filterByClass ────────────────────────────────────────────────────────────
describe('filterByClass', () => {
  it('retorna los personajes que coinciden con la clase exacta', () => {
    const result = filterByClass(mockData, 'Saber');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('nero-claudius');
  });

  it('la búsqueda es case-insensitive', () => {
    const lower = filterByClass(mockData, 'saber');
    const upper = filterByClass(mockData, 'SABER');
    expect(lower).toHaveLength(1);
    expect(upper).toHaveLength(1);
    expect(lower[0].id).toBe(upper[0].id);
  });

  it('retorna array vacío si no hay coincidencias', () => {
    const result = filterByClass(mockData, 'Berserker');
    expect(result).toHaveLength(0);
    expect(Array.isArray(result)).toBe(true);
  });

  it('no incluye personajes sin clase (Masters)', () => {
    // Hakuno no tiene facts.class, solo facts.role
    const result = filterByClass(mockData, 'Master');
    expect(result).toHaveLength(0);
  });

  it('retorna múltiples personajes si varios comparten clase', () => {
    const dataConDosSabers = [
      ...mockData,
      {
        id: 'altera',
        name: 'Altera',
        facts: { class: 'Saber', appearances: ['Fate/EXTELLA'] },
        stats: { total: 531 },
      },
    ];
    const result = filterByClass(dataConDosSabers, 'Saber');
    expect(result).toHaveLength(2);
  });
});

// ─── filterByAppearance ───────────────────────────────────────────────────────
describe('filterByAppearance', () => {
  it('retorna personajes que aparecen en la saga indicada', () => {
    const result = filterByAppearance(mockData, 'Fate/Extra CCC');
    expect(result).toHaveLength(4);
  });

  it('retorna array vacío si ninguno aparece en esa saga', () => {
    const result = filterByAppearance(mockData, 'Fate/Grand Order');
    expect(result).toHaveLength(0);
  });

  it('no retorna personajes que solo aparecen en otras sagas', () => {
    const result = filterByAppearance(mockData, 'Fate/Extra');
    const ids = result.map((c) => c.id);
    expect(ids).not.toContain('gilgamesh');
  });

  it('maneja personajes sin campo appearances sin romper', () => {
    const dataConSinAppearances = [
      ...mockData,
      { id: 'sin-apariciones', name: 'Test', facts: {}, stats: { total: 0 } },
    ];
    expect(() => filterByAppearance(dataConSinAppearances, 'Fate/Extra')).not.toThrow();
  });
});

// ─── searchByName ─────────────────────────────────────────────────────────────
describe('searchByName', () => {
  it('encuentra un personaje por nombre exacto', () => {
    const result = searchByName(mockData, 'Gilgamesh');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('gilgamesh');
  });

  it('encuentra un personaje por nombre parcial', () => {
    const result = searchByName(mockData, 'Tama');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('tamamo-no-mae');
  });

  it('la búsqueda es case-insensitive', () => {
    const result = searchByName(mockData, 'KARNA');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('karna');
  });

  it('retorna múltiples resultados cuando varios coinciden', () => {
    const result = searchByName(mockData, 'no');
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it('retorna array vacío si no hay coincidencias', () => {
    const result = searchByName(mockData, 'Shirou Emiya');
    expect(result).toHaveLength(0);
    expect(Array.isArray(result)).toBe(true);
  });

  it('retorna todos si la query es string vacío', () => {
    const result = searchByName(mockData, '');
    expect(result).toHaveLength(mockData.length);
  });
});

// ─── getUniqueClasses ─────────────────────────────────────────────────────────
describe('getUniqueClasses', () => {
  it('retorna las clases únicas del dataset', () => {
    const result = getUniqueClasses(mockData);
    expect(result).toContain('Saber');
    expect(result).toContain('Caster');
    expect(result).toContain('Archer');
    expect(result).toContain('Lancer');
  });

  it('no incluye duplicados', () => {
    const dataConDuplicados = [...mockData, mockData[0]]; // Nero duplicada
    const result = getUniqueClasses(dataConDuplicados);
    const sabers = result.filter((c) => c === 'Saber');
    expect(sabers).toHaveLength(1);
  });

  it('no incluye undefined (personajes sin clase)', () => {
    const result = getUniqueClasses(mockData);
    expect(result).not.toContain(undefined);
  });

  it('retorna array vacío si ningún personaje tiene clase', () => {
    const dataSinClases = [
      { id: 'a', name: 'A', facts: { role: 'Master' }, stats: { total: 0 } },
    ];
    const result = getUniqueClasses(dataSinClases);
    expect(result).toHaveLength(0);
  });
});

// ─── getUniqueGames ───────────────────────────────────────────────────────────
describe('getUniqueGames', () => {
  it('retorna todos los juegos únicos del dataset', () => {
    const result = getUniqueGames(mockData);
    expect(result).toContain('Fate/Extra');
    expect(result).toContain('Fate/Extra CCC');
    expect(result).toContain('Fate/EXTELLA');
    expect(result).toContain('Fate/EXTELLA LINK');
  });

  it('no incluye duplicados', () => {
    const result = getUniqueGames(mockData);
    const extras = result.filter((g) => g === 'Fate/Extra');
    expect(extras).toHaveLength(1);
  });

  it('retorna un array', () => {
    expect(Array.isArray(getUniqueGames(mockData))).toBe(true);
  });

  it('retorna array vacío si no hay appearances en el dataset', () => {
    const dataSinGames = [
      { id: 'a', name: 'A', facts: {}, stats: { total: 0 } },
    ];
    const result = getUniqueGames(dataSinGames);
    expect(result).toHaveLength(0);
  });
});

// ─── sortByName ───────────────────────────────────────────────────────────────
describe('sortByName', () => {
  it('ordena de A → Z por defecto (asc = true)', () => {
    const result = sortByName(mockData);
    const names = result.map((c) => c.name);
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  it('ordena de Z → A cuando asc = false', () => {
    const result = sortByName(mockData, false);
    const names = result.map((c) => c.name);
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  it('no muta el array original', () => {
    const original = [...mockData];
    sortByName(mockData);
    expect(mockData.map((c) => c.id)).toEqual(original.map((c) => c.id));
  });

  it('retorna un array nuevo, no el mismo objeto', () => {
    const result = sortByName(mockData);
    expect(result).not.toBe(mockData);
  });

  it('funciona con un array de un solo elemento', () => {
    const single = [mockData[0]];
    expect(sortByName(single)).toHaveLength(1);
  });

  it('funciona con un array vacío', () => {
    expect(sortByName([])).toEqual([]);
  });
});

// ─── sortByPower ──────────────────────────────────────────────────────────────
describe('sortByPower', () => {
  it('ordena de mayor a menor poder por defecto (asc = false)', () => {
    const result = sortByPower(mockData);
    const totals = result.map((c) => c.stats.total);
    for (let i = 0; i < totals.length - 1; i++) {
      expect(totals[i]).toBeGreaterThanOrEqual(totals[i + 1]);
    }
  });

  it('ordena de menor a mayor poder cuando asc = true', () => {
    const result = sortByPower(mockData, true);
    const totals = result.map((c) => c.stats.total);
    for (let i = 0; i < totals.length - 1; i++) {
      expect(totals[i]).toBeLessThanOrEqual(totals[i + 1]);
    }
  });

  it('el primero en poder mayor→menor es Gilgamesh (total: 556)', () => {
    const result = sortByPower(mockData, false);
    expect(result[0].id).toBe('gilgamesh');
  });

  it('el primero en poder menor→mayor es Hakuno (total: 59)', () => {
    const result = sortByPower(mockData, true);
    expect(result[0].id).toBe('hakuno-kishinami');
  });

  it('no muta el array original', () => {
    const original = [...mockData];
    sortByPower(mockData);
    expect(mockData.map((c) => c.id)).toEqual(original.map((c) => c.id));
  });

  it('maneja personajes sin stats.total usando 0 como fallback', () => {
    const dataSinStats = [
      { id: 'sin-stats', name: 'Sin Stats', facts: {}, stats: undefined },
      ...mockData,
    ];
    expect(() => sortByPower(dataSinStats)).not.toThrow();
    const result = sortByPower(dataSinStats, true);
    expect(result[0].id).toBe('sin-stats');
  });

  it('retorna un array nuevo, no el mismo objeto', () => {
    const result = sortByPower(mockData);
    expect(result).not.toBe(mockData);
  });

  it('funciona con array vacío', () => {
    expect(sortByPower([])).toEqual([]);
  });
});