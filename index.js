document.addEventListener("DOMContentLoaded", () => {
    console.log("index.js is connected")
    fetchCharacters()
    fetchEpisodes()
})

function fetchCharacters(){
    fetch("https://rickandmortyapi.com/api/character")
    .then(res=>res.json())
    .then(characterData=>{
        console.log(characterData.info.pages + " pages of characters")
        console.log(characterData.results)
    })
}

function fetchEpisodes(){
    fetch("https://rickandmortyapi.com/api/episode")
    .then(res=>res.json())
    .then(episodeData=>{
        console.log(episodeData.info.count + " number of episodes")
    })
}
