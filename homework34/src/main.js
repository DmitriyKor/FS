import TimeDisplay from './time_disp.js';

const disp = new TimeDisplay('time');

setInterval(disp.update.bind(disp), 1000);