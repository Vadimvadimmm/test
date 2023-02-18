//"use strict";

let rURL = 'data.json';
let req = new XMLHttpRequest();
req.open('GET', rURL);
req.responseType = 'json';
req.send();
let header = document.querySelector('header');
req.onload = function () {
    let sH = req.response;
    pH(sH);
}
function pH(jsonObj) {
    let myH1 = document.createElement('h1');
    myH1.textContent = jsonObj[0].number;
    header.appendChild(myH1);
}

const basket = {
 
    goods: [],
    prcGd: null,
    gdNm: null,
    qtt:null,

  

    add(goodName, goodPrice) {
        this.goods.push({ name: goodName, price: goodPrice });
       
    },

    getGoodPrice() {
        let cost = 0;
        for (const good of this.goods) {
            cost += good.price;
        }
        return cost;
    },



};


document.getElementById('basket').onclick = function () {

    if (!document.getElementById('menu')) {
        let menu = document.createElement("div");
        menu.name = "menu";
        menu.className = "menu";
        menu.id = "menu";
        menu.style.height = 0;
        document.getElementById("basket").appendChild(menu);
        
        //for (let h = 10; h < 200; h = h + 0.0001)
        let h = 0;
        while (h < 200) {
            if (h < 200) {
                setTimeout(() => document.getElementById("menu").style = "height:" + h + "px", 1);
                h = h + 0.1;
                console.log(h);
            } else {
                return;
            }
        }
           
               
        let good = document.createElement('pre');
        good.className = "good";
        good.id = "good";
        good.textContent = basket.gdNm;

        let qttGd = document.createElement('pre');
        qttGd.className = "qttGd";
        qttGd.id = "qttGd";
        qttGd.textContent = basket.qtt+' ';
        
        let containerGood = document.createElement('div');
        containerGood.className = "containerGood";
        containerGood.id = "containerGood";

        let priceGood = document.createElement('pre');
        priceGood.className = "priceGood";
        priceGood.id = "priceGood";
        priceGood.textContent = basket.prcGd;

        let br = document.createElement('br');

        let sumPrice = document.createElement('span');
        sumPrice.className = "sumPrice";
        sumPrice.id = "sumPrice";
        sumPrice.textContent = basket.getGoodPrice();

        document.getElementById("basket").appendChild(menu).appendChild(containerGood).appendChild(good);
        document.getElementById('basket').appendChild(menu).appendChild(containerGood).appendChild(qttGd);
        document.getElementById("basket").appendChild(menu).appendChild(containerGood).appendChild(priceGood);
        document.getElementById("basket").appendChild(menu).appendChild(br);
        document.getElementById("basket").appendChild(menu).appendChild(sumPrice);

    }

    document.getElementById('sumPrice').textContent = basket.getGoodPrice();
    document.getElementById('good').textContent = basket.gdNm;
    document.getElementById('priceGood').textContent = basket.prcGd;
};




//получаем все кнопки купить и через форич их перебрали и получили кнопку, которой добавляем обработчик события, который при клике в корзину добавляет товар
document.querySelectorAll('.buyButton').forEach(el => {
    el.addEventListener('click', e => {
        e.target.dataset.quantity = +e.target.dataset.quantity + 1;
        basket.add(e.target.dataset.name, +e.target.dataset.price); // достаем из кнопки на которую нажали название и цену товара (цену сразу превращаем в число) и сохраняем в массив goods

        basket.prcGd = e.target.dataset.price;
        basket.gdNm = e.target.dataset.name;
        basket.qtt = e.target.dataset.quantity;

        if (navigator.cookieEnabled === false) {
            alert("Cookies отключены!");
        }

       
        
        

        if (basket.goods.length > 0) {
            if (!document.getElementById('numberOfGoods')) {
                let numberOfGoods = document.createElement('span');
                numberOfGoods.className = "numberOfGoods";
                numberOfGoods.id = "numberOfGoods";
                numberOfGoods.textContent = basket.goods.length;
                document.getElementById("basket").appendChild(numberOfGoods);
            }
            document.getElementById('numberOfGoods').textContent = basket.goods.length;

        }

        if (document.getElementById('menu')) {
            document.getElementById('sumPrice').textContent = basket.getGoodPrice();
            document.getElementById('good').textContent = basket.gdNm;
            document.getElementById('priceGood').textContent = basket.prcGd;
            document.getElementById('qttGd').textContent = e.target.dataset.quantity+" ";
        }

    })
});


