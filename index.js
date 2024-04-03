document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters()
    fetchEpisodes()
})

function fetchCharacters(){
    fetch("https://rickandmortyapi.com/api/character")
    .then(res=>res.json())
    .then(characterData=>{
        console.log(characterData.info.pages + " pages of characters")
        console.log(characterData.results)
        characterData.results.forEach(character=> {
            let card = document.createElement("div")
            card.className = "card"
            card.id = character.id
            card.innerHTML = `
                <img src=${character.image} class="character-avatar"/>
                <h4>${character.name}</h4>
            `
            console.log(card)
            document.getElementById("character-container").appendChild(card)
        })
    })
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
