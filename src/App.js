import React, { useEffect, useState } from 'react';
import Pokedex from './components/Pokedex';
import Axios from 'axios';


function App() {
  const
    [loading, updateLoading] = useState(true),
    [pokemons, updatePokemons] = useState(''),
    [nextPokemons, updateNextPokemons] = useState(''),
    [prevPokemons, updatePrevPokemons] = useState('');



  const getPokemons = async () => {
    let data = await Axios.get('https://pokeapi.co/api/v2/pokemon/?limit=3');
    return await data;
  }

  useEffect(() => {
    updateLoading(false)
    getPokemons().then(res => {
      updateNextPokemons(res.data.next);
      updatePokemons(res.data.results.map(pokemons => pokemons.name));
    })
    // onClick={() => props.title('Pokedex - new pokemon')}
    document.title = 'Pokedex';
  }, []);


  return (
    <main>
      <Pokedex updateNextPokemons={updateNextPokemons} loading={loading} nextPokemons={nextPokemons} updatePokemons={updatePokemons} prevPokemons={prevPokemons} updatePrevPokemons={updatePrevPokemons} pokemons={pokemons} />
    </main>
  )
}

export default App;