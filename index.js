document.addEventListener("DOMContentLoaded", () => {
    console.log("index.js is connected")
    fetchData()
})

function fetchData() {
    fetch("https://rickandmortyapi.com/api/character")
    .then(res=>res.json())
    .then(characterData=>{
        console.log(characterData.results)
    })
}