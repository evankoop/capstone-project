let collectionBtn = document.querySelector('button')
let cardList = document.querySelector('#card-list')



const getCollection = () => {
    axios.get('http://localhost:4005/collection')
    .then((res) => {
        res.data.forEach(element => {
            let baseballCard = 
            `
            <div class="spacing">
             <div class="card">
            <div class="image_url"><img class="photo" src=${element.image_url}/></div>       
            <div class="name"><p>${element.name}</p></div>
            <div class="position">${element.position}</div>
            <div class="team">${element.team}</div>
            <div><button class="delete" onclick="delete(${element.id})">Delete Card</button></div>
            </div>
            </div>
            `
            cardList.innerHTML += baseballCard
        })
    })
}




collectionBtn.addEventListener('click', getCollection)
