import './css/style.css'
import TimeDisplay from './time_disp.js';
import pic from './assets/background.png';
import {jsPDF} from "jspdf";

console.log(pic);

const disp = new TimeDisplay('time', pic);

setInterval(disp.update.bind(disp), 1000);

const doc = new jsPDF();

doc.text("Hello world!", 10, 10);
doc.save("a4.pdf");
