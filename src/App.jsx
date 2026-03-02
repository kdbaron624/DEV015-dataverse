import { useState, useEffect, use } from 'react'

import data from './data/fate-extra-dataset.js'

import { searchByName, filterByAppearance, getUniqueGames, sortByName } from './utils/dataFunctions.js'
import CharacterCard from './components/CharacterCard.jsx'


function App() {
  const [search, setSearch] = useState("")
  const [count, setCount] = useState(0)
  const [selectedGame, setSelectedGame] = useState(null);

  const games = getUniqueGames(data)

  let filtered = data;

  if(search) filtered = searchByName(filtered, search);
  if (selectedGame) filtered = filterByAppearance(filtered, selectedGame);
  filtered = sortByName(filtered);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setCount(i++);
      if (i >= data.length) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, []);

  return (
    <>

    </>
  )
}

export default App
