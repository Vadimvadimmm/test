"use strict";

const basket = {
 
    goods: [],
    prcGd: null,
    gdNm: null,

  

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
        var menu = document.createElement("div");
        menu.name = "menu";
        menu.className = "menu";
        menu.id = "menu";

        var good = document.createElement('pre');
        good.className = "good";
        good.id = "good";
        good.textContent = basket.gdNm;

        var qttGd = document.createElement('pre');
        qttGd.className = "qttGd";
        qttGd.id = "qttGd";
        

        var containerGood = document.createElement('div');
        containerGood.className = "containerGood";
        containerGood.id = "containerGood";

        var priceGood = document.createElement('pre');
        priceGood.className = "priceGood";
        priceGood.id = "priceGood";
        priceGood.textContent = basket.prcGd;


        var br = document.createElement('br');

        var sumPrice = document.createElement('span');
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

        if (basket.goods.length > 0) {
            if (!document.getElementById('numberOfGoods')) {
                var numberOfGoods = document.createElement('span');
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

