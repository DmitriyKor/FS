import '@babel/polyfill';
import './styles/index.css'
import './styles/style.scss'

import TimeDisplay from './time_disp.js';

const disp = new TimeDisplay('time');

setInterval(disp.update.bind(disp), 1000);

async function start() {
    return await new Promise((r) => setTimeout(() => r('Async done.'), 2000))
}
start().then((res) => console.log(res));

class Util {
    static id = Date.now();
}

console.log('Util Id:', Util.id);
    

