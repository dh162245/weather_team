let lat;
let lon;
let lang = document.getElementById('deineSparache');
let coordinates
let city = document.getElementById('deineStadt');
let submit = document.getElementById('push');
let buttoncL = document.getElementById('currentLoc');
let weatheroutput = document.getElementById('wrapper');
console.log(weatheroutput)
let langSelec
let url;
const key = '8a7ea988db62a9c55f1acc2df392c401';
let units = 'metric';

let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

lang = 'de';

window.onload = () => {
    currentLocation();
}

function currentLocation() {
    let url = '';
    var options = {
        enableHighAccuracy: true,
        timeout: 10000,  //-> time until this command is expired/not tried anymore (also, it hates the number 5000)
        maximumAge: 1000 * 60 * 5
    };
    function success(pos) {
        var crd = pos.coords;
        console.log(crd);
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        lat = crd.latitude;
        lon = crd.longitude;
        coordinates = `lat=${lat}&lon=${lon}`;
        console.log(lat);
        console.log(lon);
        console.log(coordinates);
        //define URL for fetch
        url = `https://api.openweathermap.org/data/2.5/onecall?${coordinates}&appid=${key}&units=${units}&lang=${lang}`;
        console.log(url);
        //hier ausgabe onload
        //Asugabe
        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                let sr = new Date(json.current.sunrise * 1000);
                sr = sr.getHours() + ":" + sr.getMinutes()
                let ss = new Date(json.current.sunset * 1000);
                ss = ss.getHours() + ":" + ss.getMinutes();
                json.hourly.forEach(ele => {

                    console.log('hourly');
                    let hour = new Date(ele.dt * 1000);
                    hour = hour.getHours();
                    weatheroutput.innerHTML += ` 
        <img src="https://openweathermap.org/img/wn/${ele.weather[0].icon}@4x.png" alt="${ele.weather[0].description}">
        </div>
        <div class="jetzt">
            <p class="time">${hour}:00</p>
            <p class="icon">${ele.weather[0].description}</p>
            <p class="temperatur">${ele.temp}°C</p>
        </div>`
                });

            });
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}