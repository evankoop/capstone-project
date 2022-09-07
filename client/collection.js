let collectionBtn = document.querySelector('button')
let cardList = document.querySelector('#card-list')

const deleteCard = (id) => {
    axios.delete(`http://localhost:4005/collection/${id}`)
    .then(() => getCollection())
    .catch(err => console.log(err))
    location.reload()
}


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
            <div><button class="delete" onclick="deleteCard(${element.card_id})">Delete Card</button></div>
            </div>
            </div>
            `
            console.log(element.card_id)
            cardList.innerHTML += baseballCard
        })
    })
}




collectionBtn.addEventListener('click', getCollection)
