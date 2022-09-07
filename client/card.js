let createBtn = document.querySelector('#submit-button')
let cardList = document.querySelector('#card-list')
let form = document.querySelector('form')
let messageId = document.querySelector('#message')


const deleteCard = (id) => {
    axios.delete(`https://localhost:4005/collection/${id}`)
    .then(() => getCollection())
    .catch(err => console.log(err))
}


function handleSubmit(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let team = document.querySelector('#team')
    let position = document.querySelector('#position')
    let image_url = document.querySelector('#img')

    let body = {
        name: name.value,
        team: team.value,
        position: position.value,
        image_url: image_url.value
    }

    name.value = ''
    position.value = ''
    team.value = ''
    image_url.value = ''

    axios.post('http://localhost:4005/collection', body)
    .then((res) => {
        res.data.forEach(element=> {
            let userCard =  
            `   <div class="spacing">
                <div class="card">
                <div class="image_url"><img class="photo" src=${element.image_url}/></div>       
                <div class="name"><p>${element.name}</p></div>
                <div class="position">${element.position}</div>
                <div class="team">${element.team}</div>
                <div><button class="delete" onclick="deleteCard(${element.id})">Delete Card</button></div>
                </div>
                </div>
              `
            
              cardList.innerHTML += userCard
        })
    })

    let message = 
    `<p>You can now view your card in the collection page!</p>`

    messageId.innerHTML = message

}

form.addEventListener('submit', handleSubmit)