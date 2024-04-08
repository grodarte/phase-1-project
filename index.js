const characterContainer = document.getElementById("character-container")

document.addEventListener("DOMContentLoaded", () => {
    fetchAllCharacters()
    fetchAllEpisodes()
    document.getElementById("search-character").addEventListener("submit", searchCharacterName)
    document.getElementById("episode-dropdown").addEventListener("change", filterCast)
})

function fetchAllCharacters(){
    fetch(`https://rickandmortyapi.com/api/character`)
    .then(res=>res.json())
    .then(data => {
        const totalPages = data.info.pages
        for (let i=1; i<=totalPages; i++){
            fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
            .then(res=>res.json())
            .then(characterData=>{
                characterData.results.forEach(character=>{
                    renderCharacter(character)
                })
            })
        }
    })
}

function renderCharacter(character){
    const card = document.createElement("div")
    card.className = "card"
    card.innerHTML = `
            <img src=${character.image} class="character-avatar"/>
            <h4>${character.name}</h4>
            <p>${character.species} from ${character.origin.name}</p>
            `
    characterContainer.appendChild(card)
}

function fetchAllEpisodes(){
    fetch("https://rickandmortyapi.com/api/episode")
    .then(res=>res.json())
    .then(episodeData=>{
        const numEpisodes = episodeData.info.count
        const episodeDropdown = document.getElementById("episode-dropdown")
        for (let i=1; i<=numEpisodes; i++){
            const episode = document.createElement("option")
            episode.innerHTML = `
            episode <span>${i}</span>
            `
            episodeDropdown.appendChild(episode)
        }
    })
}

function searchCharacterName(e){
    e.preventDefault()
    characterContainer.innerHTML = ""
    const characterName = e.target["name"].value.toLowerCase()
    document.getElementById("episode-dropdown").selectedIndex = 0
    document.getElementById("search-character").reset()

    fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
    .then(res=>res.json())
    .then(data => {
        if(data.error){
            characterContainer.innerText = "No characters found."
        } else {
            const numOfPages = data.info.pages
            for(let i=1; i<=numOfPages; i++){
                fetch(`https://rickandmortyapi.com/api/character/?page=${i}&name=${characterName}`)
                .then(res=>res.json())
                .then(characterData=>{
                    characterData.results.forEach(character=>{
                        renderCharacter(character)
                    })
                })
            }
        }
    })
}

function filterCast(e){
    characterContainer.innerHTML = ""
    let episode = e.target.value.split(" ")[1]
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

