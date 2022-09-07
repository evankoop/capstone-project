let createBtn = document.querySelector('#submit-button')
let cardList = document.querySelector('#card-list')
let form = document.querySelector('form')
let messageId = document.querySelector('#message')

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

    createCard(body)

    name.value = ''
    position.value = ''
    team.value = ''
    image_url.value = ''

    let message = 
    `<p>You can now view your card in the collection page!</p>`

    messageId.innerHTML = message

}

const createCard = () => {
    axios.post('http://localhost:4005/collection')
    .then((res) => {
        res.data.forEach(element=> {
            let userCard =  
            ` <div class="card">
              <div class="image_url"><img class="photo" src=${element.image_url}/></div>       
              <div class="name"><p>${element.name}<p></div>
              <div class="position">${element.position}</div>
              <div class="team">${element.team}</div>
              <br>
              <br>
              `
            
              cardList.innerHTML += userCard
        })
    })
}


form.addEventListener('submit', handleSubmit)