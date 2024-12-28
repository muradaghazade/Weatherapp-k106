let rainImage = 'https://presentationpoint.com/wp-content/uploads/2019/02/dphdwep.gif'
let sunnyImage = 'https://i.pinimg.com/originals/f6/32/b0/f632b07f8ab9b2a0ccf77998c766064b.gif'
let foggyImage = 'https://i.pinimg.com/originals/02/8f/c0/028fc0f58b6d275812336e90c6ba4251.gif'

var info = document.getElementById('info');

function getWeather() {
    let city = document.getElementById('city').value;
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '187a772d9fmshb6a300f6f2b5a84p15fbebjsndde98835da32',
            'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        }
    };
    
    fetch(url, options)
        .then(response => response.json())
        .then(response => {
            console.log(response.location.city);
            let temperature = Math.floor((response.current_observation.condition.temperature-32)/1.8); 
            info.innerHTML = `
            
                <h1>${response.location.city}</h1>
                <h1>${temperature}°C</h1>
                <h3> ${response.current_observation.condition.text} </h3>
                
                `
            for (let item of response.forecasts) {
                document.getElementById('week').innerHTML += `
                <div class="col-2">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${item.day}</h5>
                        <p class="card-text">High: ${Math.floor((item.high-32)/1.8)}°C</p>
                        <p class="card-text">Low: ${Math.floor((item.low-32)/1.8)}°C</p>
                        <a href="#" class="btn btn-primary">${item.text}</a>
                    </div>
                    </div>
                </div>
                
                `
            }
                
            if (response.current_observation.condition.text == 'Cloudy') {
                document.querySelector('body').style.backgroundImage = `url(${rainImage})`;
            }
            else if (response.current_observation.condition.text == 'Sunny') {
                document.querySelector('body').style.backgroundImage = `url(${sunnyImage})`;
            }
            else if (response.current_observation.condition.text == 'Clear') {
                document.querySelector('body').style.backgroundImage = `url(${sunnyImage})`;
            }
            else {
                document.querySelector('body').style.backgroundImage = `url(${foggyImage})`;
            }
        })
}







