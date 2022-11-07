const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const moredata = document.getElementById("moredata");
const moredata2 = document.getElementById("moredata2");
const moredata3 = document.getElementById("moredata3");
const moredata4 = document.getElementById("moredata4");
const moredata5 = document.getElementById("moredata5");
const moredata6 = document.getElementById("moredata6");

// const pokemonInfo = document.querySelector('.info'); ainda estamos trabalhando nisso

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.anterior');
const buttonNext = document.getElementById('proximo');

let start =0;




const fetchPokemon = async (pokemon) => {
    const APIResponse = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if ((await APIResponse).status == 200) {

        const data = (await APIResponse).json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = '...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if (data) {

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    console.log("type : "+ data.types[0].type.name+ ` <br> `  + "Attack 2 : "+ data.moves[1].move.name);
    moredata3.value = " "+data.moves[2].move.name.toUpperCase();
    moredata2.value = " "+data.moves[1].move.name.toUpperCase();
    moredata.value = " "+data.moves[0].move.name.toUpperCase();
    moredata4.value = " "+data.types[0].type.name.toUpperCase();
    moredata5.value = " "+data.abilities[0].ability.name.toUpperCase();
    moredata6.value = " "+data.abilities[1].ability.name.toUpperCase();
    
    input.value ='';
    start = data.id;
   
    } else if (start == 0)
    {
        pokemonImage.src= './img/pokebola.png';
    }

    else {

        pokemonName.innerHTML = 'Pokemon no encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = './img/sadPokemon.gif';
    }

}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
});

buttonPrev.addEventListener('click', () => {
    
    if (start > 1){
    start -=1;
    renderPokemon(start);
    }
    
});

buttonNext.addEventListener('click', () => {
    console.log("prox")

    start += 1;
     renderPokemon(start);
    
});

renderPokemon (start);