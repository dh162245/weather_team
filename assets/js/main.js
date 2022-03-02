let lat;
let lon;
let lang = document.getElementById('deineSparache');
let coordinates
let city = document.getElementById('deineStadt');
let submit = document.getElementById('push');
let buttoncL = document.getElementById('currentLoc');
let weatheroutput = document.getElementById('output');
let langSelec
let url;
const key = '8a7ea988db62a9c55f1acc2df392c401';
let units = 'metric';

lang = lang.value.toLowerCase();

window.onload = () => {
    //currentlocation fetch -> Ausgabe cLocation Wetter und Co
    //if fetch wrong -> Error Ausgabe
    //get elements etc -> input language, input city, input Latitude, input longitude, get submit, get button currentLocation
    //-> onclick submit -> functionwust
    //onclick button currentLocation -> reload page
    // let lang2 = lang.value.toLowerCase();
    // console.log(lang2);
    // console.log(langSelec);
    currentLocation();
    // letsrock();

    //onclick Ausgabe, Ausgabe nochmal extra reinschreiben wegen lat/long???

}

buttoncL.addEventListener('click', ele = () => {
    currentLocation();
})

function currentLocation() {
    // let lang2 = lang
    // // let lang2 = lang.value.toLowerCase();
    // console.log(lang2);
    //if langSelec undefined -> use lang2, else use langSelec
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
        let urlcL = `http://api.openweathermap.org/data/2.5/onecall?${coordinates}&appid=${key}&units=${units}&lang=${lang}`;
        console.log(urlcL);
        //hier ausgabe onload
        //Asugabe


    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}

submit.addEventListener('click', function letsrock() {
    console.log(lang);
    langSelec = lang
    // .value.toLowerCase();
    console.log(langSelec);
    console.log(city.value);
    coordinates = `q=${city.value.toLowerCase()}`;
    console.log(coordinates);
    url = `http://api.openweathermap.org/data/2.5/onecall?${coordinates}&appid=${key}&units=${units}&lang=${lang}`;
    console.log(url);
})

fetch('/assets/js/weather.json')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        let sr = new Date(json.current.sunrise * 1000);
        sr = sr.getHours() + ":" + sr.getMinutes()
        let ss = new Date(json.current.sunset * 1000);
        ss = ss.getHours() + ":" + ss.getMinutes();
        weatheroutput.innerHTML = `<article id="anfang">
            <h1 id="stadt">München-Current</h1>
            <p id="temperatur">${json.current.temp}°C</p>
            <p id="beschreibung">${json.current.weather[0].description}</p>
            <p id="hochtief">Sunrise: ${sr} Sunset: ${ss}</p>

        </article>`;

        //<h2 id="vorhersage">Sonne den ganzen Tag</h2>
        console.log(json.daily);
        json.hourly.forEach(ele => {

            console.log('hourly');
            let hour = new Date(ele.dt * 1000);
            hour = hour.getHours();

            weatheroutput.innerHTML += `
        <div class="outer-wrapper">
        <div class="wrapper">
        <div class="jetzt">
            <p class="time">${hour}:00</p>
            <p class="icon">${ele.weather[0].description}</p>
            <p class="temperatur">${ele.temp}°C</p>
        </div>`
        })

        json.daily.forEach(ele => {

            console.log('daily');
            let srD = new Date(ele.sunrise * 1000);
            srD = srD.getHours() + ":" + srD.getMinutes()
            let ssD = new Date(ele.sunset * 1000);
            ssD = ssD.getHours() + ":" + ssD.getMinutes();
            weatheroutput.innerHTML += `<article id="anfang">
            <h1 id="stadt">München-Daily</h1>
            <p id="temperatur">${ele.temp.day}°C</p>
            <p id="beschreibung">${ele.weather[0].description}</p>
            <p id="hochtief">Sunrise: ${srD} Sunset: ${ssD}</p>

        </article>`;
        })
    })

    //Tag{ -> Klasse= 'Tag'
    //     container headline -> <div>stuff</div>
    //     container div <button class="accordion">Section 3</button>
    // {/* <div class="panel">
    // < p > Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p >
// </div> */}

// }
//Inhalt Tag: Wochentag, symbol wetter, höchste temp, niedr temp, Tagestemp -> div class= content id-> fortlaufend: restliche Infos.
//-> pro Tag -> id + pro content id
//pro Tag Headline -> classen, div-container -> Klassen







// http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}


// /https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// https://api.openweathermap.org/data/2.5/onecall?lat=48&lon=11&exclude=minutely&appid=8a7ea988db62a9c55f1acc2df392c401&units=metric&lang=de