import { useState } from "react";
import CallApi from "./CallApi";
import "../style/SearchPokemonInput.css"

export default function SearPokemonInput() {

    const[randomNumber, setRandomNumber] = useState(0)
    const[callApi, setCallApi] = useState(false)

    //Buscar un numero random, verificar si no es 0 y enviarlo
    function handleClick() {
        setRandomNumber(Math.floor(Math.random() * 1009))

        if(randomNumber === 0) {
            setRandomNumber(Math.floor(Math.random() * 1009))
            setCallApi(true)
        } else {
            setCallApi(true)
        }
    }
    
    return(
        <div className="searchPokemonContainer">

            {
                callApi ? 

                    <CallApi number={randomNumber}/>

                :
                    <div className="buttonContainer">
                        <button onClick={handleClick}>Obtener un pokemon aleatorio</button>
                    </div>
            }
        </div>
    );
}