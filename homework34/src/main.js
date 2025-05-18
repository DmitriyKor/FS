import './css/style.css'
import TimeDisplay from './time_disp.js';
import pic from './assets/background.png';

console.log(pic);

const disp = new TimeDisplay('time', pic);

setInterval(disp.update.bind(disp), 1000);
