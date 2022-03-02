let clock = document.getElementById('clock');

let days = ['So', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function currentTime() {
    let dateClock = new Date();
    let dd = days[dateClock.getDay()];
    let hh = dateClock.getHours();
    let mm = dateClock.getMinutes();
    let ss = dateClock.getSeconds();
    let aPM = 'AM';

    if (hh == 0) {
        hh = 12;
    } else if (hh > 12) {
        hh = hh - 12;
        aPM = 'PM';
    }

    hh = (hh < 10) ? '0' + hh : hh;
    mm = (mm < 10) ? '0' + mm : mm;
    ss = (ss < 10) ? '0' + ss : ss;

    let time = dd + ' ' + hh + ':' + mm + ':' + ss + ' ' + aPM;
    let t = setTimeout(function () { currentTime() }, 1000);
    clock.innerHTML = time;
}
currentTime()


fetch('http://127.0.0.1:5500/weather_team/assets/js/weather.json')
    .then(response => response.json())
    .then(json => console.log(json))

// http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}

// let jetzt = document.querySelectorAll('.jetzt');
// console.log(jetzt);

// /https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// https://api.openweathermap.org/data/2.5/onecall?lat=48&lon=11&exclude=minutely&appid=8a7ea988db62a9c55f1acc2df392c401&units=metric&lang=de