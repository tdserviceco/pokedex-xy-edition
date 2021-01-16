import React, { useState, useEffect } from 'react';
import PokeDexLogo from '../img/PokeDex.png';
import Axios from 'axios';
import X from '../img/x.png';
import Y from '../img/y.png';
import InfoForPokemon from '../components/Information';
function PokeDex(props) {

  const
    [disableButtonDown, updateDisableButtonDown] = useState(true),
    [disableButtonUp, updateDisableButtonUp] = useState(false);


  const renderPokemon = () => {
    if (props.pokemons === 'mew') {
      return <InfoForPokemon pokemon={props.pokemons} />
    }
    else {
      let rows = [];

      for (let i = 0; i < props.pokemons.length; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(<InfoForPokemon pokemon={props.pokemons[i]} key={i} />);
      }

      return <>{rows}</>;
    }
  }

  const getNextPokemons = async () => {
    await Axios.get(props.nextPokemons).then(res => {
      if (res.config.url === "https://pokeapi.co/api/v2/pokemon/?offset=150&limit=3") {
        updateDisableButtonUp(true)

        props.updatePokemons(res.data.results[0].name)
        props.updatePrevPokemons(res.data.previous);
        console.log('LAST POKEMON OF GEN 1')
      }
      else {
        props.updatePokemons(res.data.results.map(pokemons => pokemons.name))
        props.updateNextPokemons(res.data.next);
        props.updatePrevPokemons(res.data.previous);
        updateDisableButtonDown(false);
        updateDisableButtonUp(false)
      }
    })
  }

  const backToStart = async () => {
    await Axios.get('https://pokeapi.co/api/v2/pokemon/?limit=3').then(res => {
      props.updatePokemons(res.data.results.map(pokemons => pokemons.name))
      props.updateNextPokemons(res.data.next);
      updateDisableButtonDown(true);
      updateDisableButtonUp(false);
    })
  }

  const getPrevPokemons = async () => {
   
    if (props.prevPokemons === '' || props.prevPokemons === undefined || props.prevPokemons === 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=3') {
      await Axios.get(props.prevPokemons).then(res => {
        props.updatePokemons(res.data.results.map(pokemons => pokemons.name))
        props.updateNextPokemons(res.data.next);
        updateDisableButtonDown(true);
        updateDisableButtonUp(false);
      })
    }
    else {
      await Axios.get(props.prevPokemons).then(res => {
        props.updatePokemons(res.data.results.map(pokemons => pokemons.name))
        props.updateNextPokemons(res.data.next);
        props.updatePrevPokemons(res.data.previous);
        updateDisableButtonDown(false);
        updateDisableButtonUp(false);
      })
    }
  }

  return (

    <div className="frame">
      <div className="frame-top">
        <div className="frame-halv-circle-top">
          {/* black half top cirle with white border */}
          <div className="frame-inside-halv-circle-top">
            {/* blue top cirle */}
          </div>
        </div>
      </div>
      <div className="frame-inside">
        <div className="frame-inside-borders">
          <div className="frame-inside-screen">
            {/* <PokeDexScreenBackground /> */}
            {props.loading &&

              <div className={`frame-screen`}>
                {/* <PokeDexScreen /> */}

                <img src={PokeDexLogo} className="logoText" alt="pokedex font" />
                <img src={X} className="logoText-X" alt="Letter X" />
                <img src={Y} className="logoText-Y" alt="Letter Y" />

                {/* When loading is done remove the pokemon XY text and show bulbasaur (he is nr1) */}
                <div className="pokemon-info">
                  {renderPokemon()}
                </div>
              </div>
            }
            {!props.loading &&
              <div className={`frame-screen`}>
                {/* <PokeDexScreen /> */}
                <div className={`pokemon-info ${props.pokemons === 'mew' ? 'special' : ''}`}>
                  {renderPokemon()}
                </div>
              </div>
            }
            <div className="frame-inside-controlls">
              {/* Controlls for pokedex */}
              <div className="row row-1">
                <button type="button" value="up" onClick={getNextPokemons} disabled={disableButtonUp ? true : false}>
                  <i className="fas fa-arrow-alt-circle-up"></i></button>
              </div>
              <div className="row row-2">
                <button type="button" value="back" onClick={backToStart}><i className="fas fa-undo-alt"></i></button>
              </div>
              <div className="row row-3">
                <button type="button" value="down" onClick={getPrevPokemons} disabled={disableButtonDown ? true : false}><i className="fas fa-arrow-alt-circle-down"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="frame-bottom">
        <div className="frame-halv-circle-bottom">
          {/* black half bottom cirle with white border */}
          <div className="frame-inside-halv-circle-bottom">
            {/* blue bottom cirle */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokeDex;