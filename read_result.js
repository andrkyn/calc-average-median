var fs = require('fs');
var param = [];
param[0] = process.argv[2];

var input = fs.createReadStream(param[0]);
 readLines(input, func);

var lineCount = 0;

var arrNumer = [];
var sum = 0;
var avg = 0;
var min, max;

process.stdout.write('\033c');
function readLines(input, func) {
    var remaining = '';

    input.on('data', function(data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
            if (lineCount < 1) {
                console.log('Чтение файла ... ' + '<' + param[0]+ '>' + '\n' + '--------------------------------------');
            }
            lineCount++;
        }
    });

    input.on('end', function() {
        if (remaining.length > 0) {
            func(remaining);
        }
        //min = arrNumer.reduce((a, b) => Math.min(a, b));
        //min = getMin(arr);
        console.log('Сортировка массива из ...' + lineCount + '... элементов ' + '\n' + '--------------------------------------');
        //arrNumer.sort(function(a, b){return a - b});
        //var sorted = quicksort(items);
        quickSort(arrNumer, 0, arrNumer.length -1);
        min = arrNumer[0];
        max = arrNumer[lineCount-1];
        avg = sum/lineCount;
        var mediana = median(arrNumer);

        console.log('>>>> Результат <<<<< ' + '\n');
        console.log('Количесво обработанных элементов: ' + lineCount + '\n' + 'Сумма всех значение: '+ sum + '\n' +
            "Минимальное значение: " + min + '\n' + "Максимальное значение: " + max + '\n' + 'Среднее значение: ' + avg + '\n' +
            "Медиана: "+ mediana);
        console.log('--------------------------------------' + '\n');
        //console.log('-----------------' + '\n' + 'arrNum:  ' + arrNumer[0]);
    });

}

function func(data) {
    arrNumer.push(parseInt(data));
    sum += arrNumer[lineCount];
}

// Quick sort
function  quickSort(arr, left, right)
{
    var i = left;
    var j = right;
    var tmp;
    pivotidx = (left + right) / 2;
    var pivot = parseInt(arr[pivotidx.toFixed()]);
    /* partition */
    while (i <= j)
    {
        while (parseInt(arr[i]) < pivot)
            i++;
        while (parseInt(arr[j]) > pivot)
            j--;
        if (i <= j)
        {
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
            j--;
        }
    }

    /* recursion */
    if (left < j)
        quickSort(arr, left, j);
    if (i < right)
        quickSort(arr, i, right);
    return arr;
}

// function median
function median(arr){
    //arr = arr.sort(function(a, b){ return a - b; });
    var i = arr.length / 2;
    return i % 1 == 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];
}