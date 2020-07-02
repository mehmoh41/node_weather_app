// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('/weather?address=lahore').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         }
//         else {
//             console.log(data.location)
//             console.log(data.weather)
//         }
//     })
// })

// fetch('http://api.openweathermap.org/data/2.5/weather?q=quetta&appid=d14070f98f6d39fc4f31bc9942b35333').then((response) => {
//   response.json().then((data) => {
//       console.log({
//           temperature : Math.ceil(data.main.temp-273)+" c",
//           forecast : data.weather[0].description,
//           location : data.name +"," +data.sys.country

//       })
//   }).then((error) => {
//       console.log(error)
//   })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const area = document.querySelector('#location');
const forecast = document.querySelector('#forecast')
const temp = document.querySelector('#temp')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    if(!location) {
            return ;
    }
    area.textContent = 'loading';
    forecast.textContent = ''
    temp.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            area.textContent = data.error;
        }
        else {
            area.textContent = `searched : `+data.location
            forecast.textContent = "Weather : "+data.weather
            temp.textContent = "Temperature : "+data.temp
            
            console.log(data.location)
            console.log(data.weather)
        }
    })
})

    console.log('testing')
})









