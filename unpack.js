var param = [];
param[0] = process.argv[2];

const inly = require('inly');
const path = require('path');
const cwd = process.cwd();
//const name = '10m.bz2';
const name = param[0];
const to = cwd + '/';
const from = path.join(cwd, name);
var namef;

const extract = inly(from, to);

extract.on('file', (name) => {
    namef = name;
    console.log(name);

});

extract.on('progress', (percent) => {
    console.log('Распаковка архива: ' + ' ...<' + param[0]+ '>.... ' + percent + '%');

});

extract.on('error', (error) => {
    //console.error(error);
});

extract.on('end', () => {
    console.log('Файл распакован' + '\n' + ' Имя файла: ' + namef + '\n' +
                'Для расчета введите: < node read_result ' + namef + ' >');
});