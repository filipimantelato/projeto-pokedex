const pokeContainer = document.querySelector("#pokeContainer");
const pokeCount = 1302;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async() => {
    for(let i = 1; i <= pokeCount; i++){
        await getPokemons(i);
    }
};

const getPokemons = async (id) => { //sincroniza os pokemons com o parametro id
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`; //guarda a URL com o id do pokemon que esta sendo trabalhado no for
    const response = await fetch(url); //response recebe as informações da URL acima
    const data = await response.json(); //passa as informaçoes
    //console.log(data.types[0].type.name); //caso colocar date.name, vai citar todos os nomes, entao o data cita todas as informaçoes que foram pegas pelo await response do json
    createPokemonCard(data);
};

const createPokemonCard = (poke) =>{
    const card = document.createElement("div");
    card.classList.add("pokemon");

    //cria a constante, e recebe o .name do poke que é o parametro da funcao, nesse caso a "data"
    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, "0");
    const types = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => types.indexOf(type) > -1);
    const color = colors[type];

    card.style.backgroundColor = color;
    
    const pokeInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="infoContainer">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>`

    card.innerHTML = pokeInnerHTML;
    pokeContainer.appendChild(card);
}

fetchPokemons();

