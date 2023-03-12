import { useEffect, useState } from "react";
import PokemonSpecs from "./PokemonSpecs";
import "../style/CallApi.css"

export default function CallApi({number}) {

    const [pokemon, setPokemon] = useState([]);
    const [moves, setMoves] = useState([]);
    const [types, setTypes] = useState([]);
    const [numberRandom, setNumberRandom] = useState(0);
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        searchPokemon();
    }, [])

    //Buscar Pokemon por numero
    async function searchPokemon () {

        if( numberRandom !== 0) {
            

            await fetch(`https://pokeapi.co/api/v2/pokemon/${numberRandom}`)
            .then(res => res.json())
            .then(
                (res) => {
                    setPokemon(res);
                    searchMoves(res);
                    searchType(res);

    
                },
                (err) => {
                    console.log(err)
                }
            )

            return;

        } 

        await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then(res => res.json())
        .then(
            (res) => {

                // debugger
                setPokemon(res);
                searchMoves(res);
                searchType(res);

                setNumberRandom(Math.floor(Math.random() * 1009))
            },
            (err) => {
                console.log(err)
            }
        )
    }


    //Buscar Movimientos del pokemon
    async function searchMoves(res) {

        const length = res.moves.length

        if(length < 4 ) {
            await fetch(res.moves[0].move.url)
            .then(res => res.json())
            .then(
                (response) => {
                    setMoves(moves => [...moves, response]);
                    
                },
                (err) => {
                    console.log(err)
                }
            )

            setLoaded(true)
            return;
            
        }

        for(let i = 0; i < 4; i++) {

            await fetch(res.moves[i].move.url)
            .then(res => res.json())
            .then(
                (response) => {
                    setMoves(moves => [...moves, response]);
                    
                },
                (err) => {
                    console.log(err)
                }
            )
        }

        setLoaded(true)

    }


    //Buscar tipos del pokemon
    async function searchType(res) {

        const length = res.types.length

        for(let i = 0; i < length; i++) {

            await fetch(res.types[i].type.url)
            .then(res => res.json())
            .then(
                (response) => {
                    setTypes(types => [...types, response]);
                },
                (err) => {
                    console.log(err)
                }
            )
        }

    }


    function handleClick() {

        setNumberRandom(Math.floor(Math.random() * 1009))

        if(numberRandom !== 0) {
            
            setLoaded(false);
            setMoves([]);
            setTypes([]);
            searchPokemon()

            return;
            
        }
            
        setNumberRandom(Math.floor(Math.random() * 1009))
        setLoaded(false);
        setMoves([]);
        setTypes([]);
        searchPokemon();

        
    }

    return(
        <div>
            {
                loaded ? 
                    <div className="apiContainer">

                        <PokemonSpecs pokemon={pokemon} moves={moves} type={types}/>
                        <button onClick={handleClick}>Obten otro Pokemon</button>

                    </div>
                    

                :

                <div className="loadContainer">
                    <h1>Cargando...</h1>
                </div>
            }

        </div>
    );
}