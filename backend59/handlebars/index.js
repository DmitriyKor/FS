import Handlebars from 'handlebars';
import fs from 'fs';

export const renderHTML = (templatePath, data)=>{
    const source = fs.readFileSync(templatePath, 'utf8').toString();
    const template = Handlebars.compile(source);
    return template(data);
}