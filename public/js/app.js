console.log('Client side javascript file is loaded!')

fetch('http://localhost:3000/weather?address=cairo').then((Response) => {
    Response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageTwo.textContent = "Loading..."
    fetch('/weather?address='+location).then((Response) => {
    Response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            messageTwo.textContent = data.error
        }else{
            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent = data.location 
            messageTwo.textContent = data.forecast
        }
    })
})
})