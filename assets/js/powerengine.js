let lat;
let lon;
let lang = document.getElementById('deineSparache');
let coordinates
let city = document.getElementById('deineStadt');
let submit = document.getElementById('push');
let buttoncL = document.getElementById('currentLoc');
let outputCurrent = document.getElementById('outputCurrent');
let outputHour = document.getElementById('wrapper');
let outputDaily = document.getElementById('outputDaily');
let langSelec
let url;
const key = '8a7ea988db62a9c55f1acc2df392c401';
let units = 'metric';

let weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
let langLoad = lang.value.toLowerCase();


window.onload = () => {
    console.log('%cDie Fantastic Four grüßen die Supernerds!', 'color:darkblue; font-weight:900;font-size:2rem;text-shadow: 5px 5px 5px yellow');
    currentLocation();

    console.log('%cZeus sagt: Iss deinen Teller leer, sonst gibt es schlechtes Wetter!', 'color:darkred; font-weight:900;font-size:2rem;text-shadow: 5px 5px 5px lightblue');
}

buttoncL.addEventListener('click', ele = () => {
    currentLocation();
})

function currentLocation() {
    url = '';
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
        let url = `http://api.openweathermap.org/data/2.5/onecall?${coordinates}&appid=${key}&units=${units}&lang=${langLoad}`;
        console.log(url);
        //hier ausgabe onload
        //Asugabe

        fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                console.log('current Day');
                let sr = new Date(json.current.sunrise * 1000);
                if (sr.getHours() < 10 && sr.getMinutes() < 10) {
                    sr = '0' + sr.getHours() + ':' + '0' + sr.getMinutes();
                } else if (sr.getHours() < 10) {
                    sr = '0' + sr.getHours() + ':' + sr.getMinutes();
                } else if (sr.getMinutes() < 10) {
                    sr = sr.getHours() + ':' + '0' + sr.getMinutes();
                } else {
                    sr = sr.getHours() + ":" + sr.getMinutes();
                }

                let ss = new Date(json.current.sunset * 1000);
                if (ss.getHours() < 10 && ss.getMinutes() < 10) {
                    ss = '0' + ss.getHours() + ':' + '0' + ss.getMinutes();
                } else if (ss.getHours() < 10) {
                    ss = '0' + ss.getHours() + ':' + ss.getMinutes();
                } else if (ss.getMinutes() < 10) {
                    ss = ss.getHours() + ':' + '0' + ss.getMinutes();
                } else {
                    ss = ss.getHours() + ":" + ss.getMinutes();
                }

                let mr = new Date(json.daily[0].moonrise * 1000);
                if (mr.getHours() < 10 && mr.getMinutes() < 10) {
                    mr = '0' + mr.getHours() + ':' + '0' + mr.getMinutes();
                } else if (mr.getHours() < 10) {
                    mr = '0' + mr.getHours() + ':' + mr.getMinutes();
                } else if (mr.getMinutes() < 10) {
                    mr = mr.getHours() + ':' + '0' + mr.getMinutes();
                } else {
                    mr = mr.getHours() + ':' + mr.getMinutes();
                }

                let ms = new Date(json.daily[0].moonset * 1000);
                if (ms.getHours() < 10 && ms.getMinutes() < 10) {
                    ms = '0' + ms.getHours() + ':' + '0' + ms.getMinutes();
                } else if (ms.getHours() < 10) {
                    ms = '0' + ms.getHours() + ':' + ms.getMinutes();
                } else if (ms.getMinutes() < 10) {
                    ms = ms.getHours() + ':' + '0' + ms.getMinutes();
                } else {
                    ms = ms.getHours() + ':' + ms.getMinutes();
                }

                //wochentag
                let weekDay = new Date(json.daily[0].dt * 1000);
                console.log(weekDay);
                console.log(weekDay.getDay());
                //Mondphase aktuell
                let mp = json.daily[0].moon_phase;
                let moonphase;
                if (mp == 0 || mp == 1) {
                    moonphase = 'New Moon';
                } else if (mp == 0.5) {
                    moonphase = 'Full Moon';
                } else if (mp == 0.25) {
                    moonphase = 'First Quarter Moon';
                } else if (mp == 0.75) {
                    moonphase = 'Last Quarter Moon';
                } else if (mp > 0 && mp < 0.25) {
                    moonphase = 'Waxing Crescent';
                } else if (mp > 0 && mp < 0.5) {
                    moonphase = 'Waxing Gibous -> ' + mp;
                } else if (mp > 0.5 && mp < 0.75) {
                    moonphase = 'Waning Gibous';
                } else if (mp > 0.75 && mp < 1) {
                    moonphase = 'Waning Crescent';
                }
                //output
                outputCurrent.innerHTML = `<h3>Current Weather</h3>
        <article class="day">
                <div class="headline">
                    <h3 class="weekDay">${weekDays[weekDay.getDay()]}</h3>
                    <p class="dayTemp"> ${Math.round(json.current.temp)}°C</p>
                    <div class="weatherSymbol">
                        <img src="http://openweathermap.org/img/wn/${json.current.weather[0].icon}@4x.png" alt="${json.current.weather[0].description}">
                    </div>
                    <p class='symboltext'>${json.current.weather[0].description}</p>
                    <p class="minTemp">Min. Temp. ${Math.round(json.daily[0].temp.min)}°C</p>
                    <p class="maxTemp">Max. Temp. ${Math.round(json.daily[0].temp.max)}°C</p>
                </div>
                <button class="accordion">More Info</button>
                <div class="panel">
                    <h3>Temp:</h3>
                    <p>Morning:${json.daily[0].temp.morn}°C</p>
                    <p>Day: ${json.daily[0].temp.day}°C</p>
                    <p>Evening: ${json.daily[0].temp.eve}°C</p>
                    <p>Night: ${json.daily[0].temp.night}°C</p>
                    <h3>Misc:</h3>
                    <p>Wind Speed: ${json.current.wind_speed} km/h</p>
                    <p>Humidity: ${json.current.humidity}%</p>
                    <p>Moon Phase: ${moonphase}
                    <p>Moonrise: ${mr}</p>
                    <p>Moonset: ${ms}</p>
                    <p>Sunrise: ${sr}</p>
                    <p>Sunset: ${ss}</p>
                </div>`;
                console.log(json.hourly);
                json.hourly.forEach(ele => {
                    // console.log('hourly');
                    let hour = new Date(ele.dt * 1000);
                    hour = hour.getHours();

                    outputHour.innerHTML +=
                        `<div class="weatherSymbol">
                                <img src="http://openweathermap.org/img/wn/${ele.weather[0].icon}@4x.png" alt="${ele.weather[0].description}">
                            </div>
                            <div class="jetzt">
                                <p class="icon">${ele.weather[0].description}</p>
                                <p class="temperatur">${ele.temp}°C</p>
                                <p class="time">${hour}:00</p>
                            </div>`;
                })

                json.daily.forEach(ele => {
                    console.log('daily');
                    //Aufgänge Uhrzeiten
                    let srD = new Date(ele.sunrise * 1000);
                    if (srD.getHours() < 10 && srD.getMinutes() < 10) {
                        srD = '0' + srD.getHours() + ':' + '0' + srD.getMinutes();
                    } else if (srD.getHours() < 10) {
                        srD = '0' + srD.getHours() + ':' + srD.getMinutes();
                    } else if (srD.getMinutes() < 10) {
                        srD = srD.getHours() + ':' + '0' + srD.getMinutes();
                    } else {
                        srD = srD.getHours() + ":" + srD.getMinutes();
                    };

                    let ssD = new Date(ele.sunset * 1000);
                    if (ssD.getHours() < 10 && ssD.getMinutes() < 10) {
                        ssD = '0' + ssD.getHours() + ':' + '0' + ssD.getMinutes();
                    } else if (ssD.getHours() < 10) {
                        ssD = '0' + ssD.getHours() + ':' + ssD.getMinutes();
                    } else if (ssD.getMinutes() < 10) {
                        ssD = ssD.getHours() + ':' + '0' + ssD.getMinutes();
                    } else {
                        ssD = ssD.getHours() + ":" + ssD.getMinutes();
                    }

                    let mrD = new Date(ele.moonrise * 1000);
                    if (mrD.getHours() < 10 && mrD.getMinutes() < 10) {
                        mrD = '0' + mrD.getHours() + ':' + '0' + mrD.getMinutes();
                    } else if (mrD.getHours() < 10) {
                        mrD = '0' + mrD.getHours() + ':' + mrD.getMinutes();
                    } else if (mrD.getMinutes() < 10) {
                        mrD = mrD.getHours() + ':' + '0' + mrD.getMinutes();
                    } else {
                        mrD = mrD.getHours() + ':' + mrD.getMinutes();
                    }

                    let msD = new Date(ele.moonset * 1000);
                    if (msD.getHours() < 10 && msD.getMinutes() < 10) {
                        msD = '0' + msD.getHours() + ':' + '0' + msD.getMinutes();
                    } else if (msD.getHours() < 10) {
                        msD = '0' + msD.getHours() + ':' + msD.getMinutes();
                    } else if (msD.getMinutes() < 10) {
                        msD = msD.getHours() + ':' + '0' + msD.getMinutes();
                    } else {
                        msD = msD.getHours() + ':' + msD.getMinutes();
                    }
                    //Wochentag
                    let wDay = new Date(ele.dt * 1000);
                    console.log(wDay);
                    let dateD
                    if (wDay.getDate() < 10) {
                        dateD = `0${wDay.getDate()}.${months[wDay.getMonth()]} ${wDay.getFullYear()}`;
                    } else {
                        dateD = `${wDay.getDate()}.${months[wDay.getMonth()]}  ${wDay.getFullYear()}`;
                    }

                    //Mondphasen
                    let mp = ele.moon_phase;
                    let moonphase;
                    if (mp == 0 || mp == 1) {
                        moonphase = 'New Moon';
                    } else if (mp == 0.5) {
                        moonphase = 'Full Moon';
                    } else if (mp == 0.25) {
                        moonphase = 'First Quarter Moon';
                    } else if (mp == 0.75) {
                        moonphase = 'Last Quarter Moon';
                    } else if (mp > 0 && mp < 0.25) {
                        moonphase = 'Waxing Crescent';
                    } else if (mp > 0 && mp < 0.5) {
                        moonphase = 'Waxing Gibous -> ' + mp;
                    } else if (mp > 0.5 && mp < 0.75) {
                        moonphase = 'Waning Gibous';
                    } else if (mp > 0.75 && mp < 1) {
                        moonphase = 'Waning Crescent';
                    }
                    //Output
                    outputDaily.innerHTML += `<article class="day">
                        <div class="headline">
                            <h3 class="weekDay">${weekDays[wDay.getDay()]}</h3>
                            <p>${dateD}</p>
                            <div class="weatherSymbol">
                                <img src="http://openweathermap.org/img/wn/${ele.weather[0].icon}@4x.png" alt="${ele.weather[0].description}">
                            </div>
                            <p class='symboltextDay'>${ele.weather[0].description}</p>
                            <p class="dayTemp"> ${ele.temp.day}°C</p>
                            <p class="minTemp">Min. Temp. ${ele.temp.min}°C</p>
                            <p class="maxTemp">Max. Temp. ${ele.temp.max}°C</p>
                            
                            
                        </div>
                        <button class="accordion">More Info</button>
                        <div class="panel">
                            <h3>Temp:</h3>
                            <p>Morning:${ele.temp.morn}°C</p>
                            <p>Day: ${ele.temp.day}°C</p>
                            <p>Evening: ${ele.temp.eve}°C</p>
                            <p>Night: ${ele.temp.night}°C</p>
                            <h3>Misc:</h3>
                            <p>Wind Speed: ${ele.wind_speed} km/h</p>
                            <p>Humidity: ${ele.humidity}%</p>
                            <p>Moonphase: ${moonphase}</p>
                            <p>Moonrise: ${mrD}</p>
                            <p>Moonset: ${msD}</p>
                            <p>Sunrise: ${srD}</p>
                            <p>Sunset: ${ssD}</p>
                        </div>
                    </article>`;
                })
            })
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        weatheroutput.innerHTML = `<article class="day">
        <h3 class="weekDay">Sorry, we couldn't find your Geo-Location :(</h3><h3> Please enter a cityname, maybe this will work :)</h3></article>`
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}

submit.addEventListener('click', function letsrock() {
    let url = '';
    console.log(lang);
    langSelec = lang.value.toLowerCase();
    // .value.toLowerCase();
    console.log(langSelec);
    console.log(city.value);
    let coordinatesSel = `q=${city.value}`;
    console.log(coordinates);
    url = `https://api.openweathermap.org/data/2.5/onecall?${coordinates}&appid=${key}&units=${units}&lang=${langSelec}`;
    console.log(url);
    fetch(`https://api.openweathermap.org/geo/1.0/direct?${coordinatesSel}&limit=5&appid=${key}`)
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            let latSelec = json[0].lat;
            let lonSelec = json[0].lon;
            if (isNaN(latSelec) || isNaN(lonSelec)) {
                console.log('lat and long undefined');
                weatheroutput.innerHTML = `<h3>Sorry, it seems we don't have that city in our database</h3>`;
                return;
            } else {
                let coordinatesS = `lat=${latSelec}&lon=${lonSelec}`;
                let url2 = `https://api.openweathermap.org/data/2.5/onecall?${coordinatesS}&appid=${key}&units=${units}&lang=${langSelec}`;
                console.log(url2);
                fetch(url2)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        console.log('current Weather in ' + city.value.toUpperCase());
                        let sr = new Date(json.current.sunrise * 1000);
                        if (sr.getHours() < 10 && sr.getMinutes() < 10) {
                            sr = '0' + sr.getHours() + ':' + '0' + sr.getMinutes();
                        } else if (sr.getHours() < 10) {
                            sr = '0' + sr.getHours() + ':' + sr.getMinutes();
                        } else if (sr.getMinutes() < 10) {
                            sr = sr.getHours() + ':' + '0' + sr.getMinutes();
                        } else {
                            sr = sr.getHours() + ":" + sr.getMinutes();
                        }

                        let ss = new Date(json.current.sunset * 1000);
                        if (ss.getHours() < 10 && ss.getMinutes() < 10) {
                            ss = '0' + ss.getHours() + ':' + '0' + ss.getMinutes();
                        } else if (ss.getHours() < 10) {
                            ss = '0' + ss.getHours() + ':' + ss.getMinutes();
                        } else if (ss.getMinutes() < 10) {
                            ss = ss.getHours() + ':' + '0' + ss.getMinutes();
                        } else {
                            ss = ss.getHours() + ":" + ss.getMinutes();
                        }

                        let mr = new Date(json.daily[0].moonrise * 1000);
                        if (mr.getHours() < 10 && mr.getMinutes() < 10) {
                            mr = '0' + mr.getHours() + ':' + '0' + mr.getMinutes();
                        } else if (mr.getHours() < 10) {
                            mr = '0' + mr.getHours() + ':' + mr.getMinutes();
                        } else if (mr.getMinutes() < 10) {
                            mr = mr.getHours() + ':' + '0' + mr.getMinutes();
                        } else {
                            mr = mr.getHours() + ':' + mr.getMinutes();
                        }

                        let ms = new Date(json.daily[0].moonset * 1000);
                        if (ms.getHours() < 10 && ms.getMinutes() < 10) {
                            ms = '0' + ms.getHours() + ':' + '0' + ms.getMinutes();
                        } else if (ms.getHours() < 10) {
                            ms = '0' + ms.getHours() + ':' + ms.getMinutes();
                        } else if (ms.getMinutes() < 10) {
                            ms = ms.getHours() + ':' + '0' + ms.getMinutes();
                        } else {
                            ms = ms.getHours() + ':' + ms.getMinutes();
                        }
                        //Wochentag
                        let weekDay = new Date(json.daily[0].dt * 1000);
                        console.log(weekDay);
                        console.log(weekDay.getDay());
                        //Mondphase
                        let mp = json.daily[0].moon_phase;
                        console.log(mp);
                        let moonphase;
                        if (mp == 0 || mp == 1) {
                            moonphase = 'New Moon';
                        } else if (mp == 0.5) {
                            moonphase = 'Full Moon';
                        } else if (mp == 0.25) {
                            moonphase = 'First Quarter Moon';
                        } else if (mp == 0.75) {
                            moonphase = 'Last Quarter Moon';
                        } else if (mp > 0 && mp < 0.25) {
                            moonphase = 'Waxing Crescent';
                        } else if (mp > 0 && mp < 0.5) {
                            moonphase = 'Waxing Gibous -> ' + mp;
                        } else if (mp > 0.5 && mp < 0.75) {
                            moonphase = 'Waning Gibous';
                        } else if (mp > 0.75 && mp < 1) {
                            moonphase = 'Waning Crescent';
                        }
                        //output
                        outputCurrent.innerHTML = `<h3>Current Weather in ${city.value.toUpperCase()}</h3>
        <article class="day">
                <div class="headline">
                    <h3 class="weekDay">${weekDays[weekDay.getDay()]}</h3>
                    <p class="dayTemp">${Math.round(json.current.temp)}°C</p>
                    <div class="weatherSymbol">
                        <img src="https://openweathermap.org/img/wn/${json.current.weather[0].icon}@4x.png" alt="${json.current.weather[0].description}">
                    </div>
                    <p class='symboltext'>${json.current.weather[0].description}</p>
                    <p class="minTemp">Min. Temp. ${Math.round(json.daily[0].temp.min)}°C</p>
                    <p class="maxTemp">Max. Temp. ${Math.round(json.daily[0].temp.max)}°C</p>
                </div>
                <button class="accordion">More Info</button>
                <div class="panel">
                    <h3>Temp:</h3>
                    <p>Morning:${json.daily[0].temp.morn}°C</p>
                    <p>Day: ${json.daily[0].temp.day}°C</p>
                    <p>Evening: ${json.daily[0].temp.eve}°C</p>
                    <p>Night: ${json.daily[0].temp.night}°C</p>
                    <h3>Misc:</h3>
                    <p>Wind Speed: ${json.current.wind_speed} km/h</p>
                    <p>Humidity: ${json.current.humidity}</p>
                    <p>Moonrise: ${mr}</p>
                    <p>Moonset: ${ms}</p>
                    <p>Sunrise: ${sr}</p>
                    <p>Sunset: ${ss}</p>
                </div>`;
                        console.log(json.hourly);
                        json.hourly.forEach(ele => {
                            // console.log('hourly');
                            let hour = new Date(ele.dt * 1000);
                            hour = hour.getHours();

                            outputHour.innerHTML +=
                                `<div class="weatherSymbol">
                                <img src="https://openweathermap.org/img/wn/${ele.weather[0].icon}@4x.png" alt="${ele.weather[0].description}">
                            </div>
                            <div class="jetzt">
                                <p class="icon">${ele.weather[0].description}</p>
                                <p class="temperatur">${ele.temp}°C</p>
                                <p class="time">${hour}:00</p>
                            </div>`;
                        })

                        json.daily.forEach(ele => {

                            console.log('daily');
                            //Aufgänge Uhrzeiten
                            let srD = new Date(ele.sunrise * 1000);
                            if (srD.getHours() < 10 && srD.getMinutes() < 10) {
                                srD = '0' + srD.getHours() + ':' + '0' + srD.getMinutes();
                            } else if (srD.getHours() < 10) {
                                srD = '0' + srD.getHours() + ':' + srD.getMinutes();
                            } else if (srD.getMinutes() < 10) {
                                srD = srD.getHours() + ':' + '0' + srD.getMinutes();
                            } else {
                                srD = srD.getHours() + ":" + srD.getMinutes();
                            }

                            let ssD = new Date(ele.sunset * 1000);
                            if (ssD.getHours() < 10 && ssD.getMinutes() < 10) {
                                ssD = '0' + ssD.getHours() + ':' + '0' + ssD.getMinutes();
                            } else if (ssD.getHours() < 10) {
                                ssD = '0' + ssD.getHours() + ':' + ssD.getMinutes();
                            } else if (ssD.getMinutes() < 10) {
                                ssD = ssD.getHours() + ':' + '0' + ssD.getMinutes();
                            } else {
                                ssD = ssD.getHours() + ":" + ssD.getMinutes();
                            }

                            let mrD = new Date(ele.moonrise * 1000);
                            if (mrD.getHours() < 10 && mrD.getMinutes() < 10) {
                                mrD = '0' + mrD.getHours() + ':' + '0' + mrD.getMinutes();
                            } else if (mrD.getHours() < 10) {
                                mrD = '0' + mrD.getHours() + ':' + mrD.getMinutes();
                            } else if (mrD.getMinutes() < 10) {
                                mrD = mrD.getHours() + ':' + '0' + mrD.getMinutes();
                            } else {
                                mrD = mrD.getHours() + ':' + mrD.getMinutes();
                            }

                            let msD = new Date(ele.moonset * 1000);
                            if (msD.getHours() < 10 && msD.getMinutes() < 10) {
                                msD = '0' + msD.getHours() + ':' + '0' + msD.getMinutes();
                            } else if (msD.getHours() < 10) {
                                msD = '0' + msD.getHours() + ':' + msD.getMinutes();
                            } else if (msD.getMinutes() < 10) {
                                msD = msD.getHours() + ':' + '0' + msD.getMinutes();
                            } else {
                                msD = msD.getHours() + ':' + msD.getMinutes();
                            }

                            //Wochentag
                            let wDay = new Date(ele.dt * 1000);
                            console.log(wDay);
                            let dateD
                            if (wDay.getDate() < 10) {
                                dateD = `0${wDay.getDate()}.${months[wDay.getMonth()]} ${wDay.getFullYear()}`;
                            } else {
                                dateD = `${wDay.getDate()}.${months[wDay.getMonth()]}  ${wDay.getFullYear()}`;
                            }
                            //Mondphasen
                            let mp = ele.moon_phase;
                            console.log(mp);
                            let moonphase;
                            if (mp == 0 || mp == 1) {
                                moonphase = 'New Moon';
                            } else if (mp == 0.5) {
                                moonphase = 'Full Moon';
                            } else if (mp == 0.25) {
                                moonphase = 'First Quarter Moon';
                            } else if (mp == 0.75) {
                                moonphase = 'Last Quarter Moon';
                            } else if (mp > 0 && mp < 0.25) {
                                moonphase = 'Waxing Crescent';
                            } else if (mp > 0 && mp < 0.5) {
                                moonphase = 'Waxing Gibous -> ' + mp;
                            } else if (mp > 0.5 && mp < 0.75) {
                                moonphase = 'Waning Gibous';
                            } else if (mp > 0.75 && mp < 1) {
                                moonphase = 'Waning Crescent';
                            }
                            //Output
                            outputDaily.innerHTML += `<article class="day">
                        <div class="headline">
                            <h3 class="weekDay">${weekDays[wDay.getDay()]}</h3>
                            <p>${dateD}</p>
                            <div class="weatherSymbol">
                                <img src="https://openweathermap.org/img/wn/${ele.weather[0].icon}@4x.png" alt="${ele.weather[0].description}">
                            </div>
                            <p class='symboltext'>${ele.weather[0].description}</p>
                            <p class="dayTemp">${ele.temp.day}°C</p>
                            <p class="minTemp">Min. Temp. ${ele.temp.min}°C</p>
                            <p class="maxTemp">Max. Temp. ${ele.temp.max}°C</p>
                        </div>
                        <button class="accordion">More Info</button>
                        <div class="panel">
                            <h3>Temp:</h3>
                            <p>Morning:${ele.temp.morn}°C</p>
                            <p>Day: ${ele.temp.day}°C</p>
                            <p>Evening: ${ele.temp.eve}°C</p>
                            <p>Night: ${ele.temp.night}°C</p>
                            <h3>Misc:</h3>
                            <p>Wind Speed: ${ele.wind_speed} km/h</p>
                            <p>Humidity: ${ele.humidity}</p>
                            <p>Moon Phase: ${moonphase}</p>
                            <p>Moonrise: ${mrD}</p>
                            <p>Moonset: ${msD}</p>
                            <p>Sunrise: ${srD}</p>
                            <p>Sunset: ${ssD}</p>
                        </div>
                    </article>`;
                        })
                    })
            }
        })
})