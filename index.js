document.addEventListener("DOMContentLoaded", () => {
    fetchAllCharacters()
    fetchAllEpisodes()
    document.getElementById("search-character").addEventListener("submit", searchCharacterName)
    document.getElementById("episode-dropdown").addEventListener("change", filterCast)
})

function fetchAllCharacters(){
    let totalPages
    fetch(`https://rickandmortyapi.com/api/character`)
    .then(res=>res.json())
    .then(data => {
        totalPages = data.info.pages
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

function fetchAllEpisodes(){
    fetch("https://rickandmortyapi.com/api/episode")
    .then(res=>res.json())
    .then(episodeData=>{
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

function searchCharacterName(e){
    e.preventDefault()
    document.getElementById("character-container").innerHTML = ""
    let characterName = e.target["name"].value.toLowerCase()
    document.getElementById("episode-dropdown").selectedIndex = 0
    let numOfPages
    document.getElementById("search-character").reset()
    fetch(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
    .then(res=>res.json())
    .then(data => {
        numOfPages = data.info.pages
        for(let i=1; i<=numOfPages; i++){
            fetch(`https://rickandmortyapi.com/api/character/?page=${i}&name=${characterName}`)
            .then(res=>res.json())
            .then(characterData=>{
                characterData.results.forEach(character=>{
                    renderCharacter(character)
                })
            })
        }
    })
}

function filterCast(e){
    document.getElementById("character-container").innerHTML = ""
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

function renderCharacter(character){
    let card = document.createElement("div")
            card.className = "card"
            card.id = character.id
            card.innerHTML = `
                <img src=${character.image} class="character-avatar"/>
                <h4>${character.name}</h4>
                <p>${character.species} from ${character.origin.name}</p>
            `
            document.getElementById("character-container").appendChild(card)
}