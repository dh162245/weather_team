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