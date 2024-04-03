document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters()
    fetchEpisodes()
    document.getElementById("episode-dropdown").addEventListener("change", fetchCast)
})

function fetchCharacters(){
    fetch("https://rickandmortyapi.com/api/character")
    .then(res=>res.json())
    .then(characterData=>{
        console.log(characterData.info.pages + " pages of characters")
        console.log(characterData.results)
        characterData.results.forEach(character=> {
            renderCharacter(character)
        })
    })
}

function renderCharacter(character){
    let card = document.createElement("div")
            card.className = "card"
            card.id = character.id
            card.innerHTML = `
                <img src=${character.image} class="character-avatar"/>
                <h4>${character.name}</h4>
                <p>${character.species} from ${character.origin.name}</p>
            `
            console.log(card)
            document.getElementById("character-container").appendChild(card)
}

function fetchEpisodes(){
    fetch("https://rickandmortyapi.com/api/episode")
    .then(res=>res.json())
    .then(episodeData=>{
        console.log(episodeData.info.count + " number of episodes")
        let numEpisodes = episodeData.info.count
        const episodeDropdown = document.getElementById("episode-dropdown")
        for (let i=1; i<=numEpisodes; i++){
            let episode = document.createElement("option")
            episode.innerHTML = `
            episode <span>${i}</span>
            `
            episodeDropdown.appendChild(episode)
        }
    })
}

function fetchCast(e){
    document.getElementById("character-container").innerHTML = ""
    let episode = e.target.value.split(" ")[1]
    console.log(episode)
    fetch (`https://rickandmortyapi.com/api/episode/${episode}`)
    .then(res=>res.json())
    .then(episodeData=>{
        episodeData.characters.forEach(characterURL => {
            fetchCharacterDetails(characterURL)
        })
    })
}

function fetchCharacterDetails(characterURL){
    fetch(`${characterURL}`)
    .then(res=>res.json())
    .then(characterDetails => {
        renderCharacter(characterDetails)
    })
}