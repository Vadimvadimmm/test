"use strict"

function Price(price=`известно`) {
    console.log(`цена:${price}`);
}


const N = 3;
let arr = [];

function getNumber(num){
    if (!Number.isInteger(+num)){
         alert ('введите целое число');
        return false;
    } else {
        arr.push(+num);
    }
}


while (true) {
    const d = prompt();
    getNumber(d);
    if ( arr.length == 3) {
        break;
    } else {
        continue;
    }
}


let b = arr.join(" - ");
Price(b);

