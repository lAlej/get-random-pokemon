import "../style/PokemonSpecs.css"
// import "../responsive/specResponsive.css"

export default function PokemonSpecs({pokemon, moves, type}) {


    return (
        <div className="pokemonContainer">
            <div className="imageContainer">
                <img src={pokemon.sprites.other["official-artwork"].front_default} alt="" />
            </div>

            <div className="dataContainer">
                <h1>{pokemon.name.toUpperCase()}</h1>

                <div className="specContainer">
                
                    <div className="moveContainer">

                        <h2>Movimientos</h2>

                        {moves.map((item) => (
                            <div key={item.id}>
                                <h3>{item.names[5].name}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="typeContainer">

                    <h2>Tipo</h2>

                        {type.map((item) => (
                            <div key={item.id}>
                                <h3>{item.names[5].name}</h3>
                            </div>
                        ))}

                    </div>
                </div>


            </div>
        </div>
    );
}
