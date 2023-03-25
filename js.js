//"use strict";

let cartUrl = 'cart.json';
let goodUrl = 'data.json';
let sumQtt = 0;
let c = null;


function buildGood (cart) {
    let $ul = $('<ul/>');

    cart.goods.forEach(function (item) {
        
        let $li = $('<li/>', {
            text: item.name + ' ' + item.price + ' руб.',

        });

        let $button = $('<button/>', {
            text: 'купить',
            class: 'buy',
            'data-id': item.id,
            'data-name': item.name,
            'data-price': item.price,
        });

        let $img = $('<img/>', {
            width: 100 + 'px',
            height: 100 + 'px',
            src:item.path,
        });

        $li.append($img);
        $li.append($button);
        $ul.append($li);
    });
    $('#container').append($ul);
}


function paintSumQtt() {
    console.log(sumQtt);
    if (sumQtt > 0) {
        if (!document.getElementById('numberOfGoods')) {
            let numberOfGoods = document.createElement('span');
            numberOfGoods.className = "numberOfGoods";
            numberOfGoods.id = "numberOfGoods";
            numberOfGoods.textContent = sumQtt;
            document.getElementById("basket").appendChild(numberOfGoods);

        }
        document.getElementById('numberOfGoods').textContent = sumQtt;
    }
}

  



function getSumQtt(cart) {

    let sQ = 0;
    cart.cart.forEach(function (item) {
        sQ += +item.quantity;
        sumQtt = sQ;
    });
    paintSumQtt();
    }



    


function buildBascket (cart) {
    let $ul = $('<ul/>', { id: 'cartUl' });
    let amount = 0;
    let sQ = 0;
    cart.cart.forEach(function (item) {
        let $li = $('<li/>', {
            text: item.name + '(' + item.quantity + ')',

        });
        let $button = $('<button/>', {
            text: 'x',
            class: 'delete',
            'data-id': item.id,
            'data-quantity': item.quantity,
            
        });
        sQ += +item.quantity;
        sumQtt = sQ;
        amount += +item.quantity * +item.price;
        $li.append($button);
        $ul.append($li);
    });
    let p = $('<p/>', {
        text: 'Общая Сумма: ' + amount + ' руб '+' количество товара: ' +sumQtt,
        id:'cartP',
    });
    $('#asd').append($ul);
    $('#asd').append(p);
}









function sendRequest( url, callback ) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(xhr.responseText);
            
            callback(response);
            
            
        }
        
    }
   
}



window.onload=function  () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', cartUrl);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let response = JSON.parse(xhr.responseText);
                        
            c = response;

        }

    }

}




sendRequest(goodUrl,buildGood);
sendRequest(cartUrl, getSumQtt);








let a = 0;
(function ($) {
    $('#bas').on('click', function () {
      
       if (a < 100) {
            a = a + 101;
            $('#asd').animate({ minHeight: 200, }, 1000);
           sendRequest(cartUrl, buildBascket);
           
           
        } else {
            a = a - 101;
            $('#asd').animate({ minHeight: 0, }, 2000);
            let ul = document.querySelector('#cartUl');
            let parent = ul.parentNode;
            parent.removeChild(ul);
            let p = document.querySelector('#cartP');
            let parent1 = p.parentNode;
            parent1.removeChild(p);
        }
        
    });
})(jQuery);










$('body').on('click', '.buy', function () {
   
    let id = $(this).attr('data-id');

   // let entity = $('body [data-id="' + id + '"]'); //ищем в корзине элемент с идентификатором +id+


    let r = 0;
    for (let i = 0; i < c.cart.length; i++) {
        r=r+1;
        if (c.cart[i].id == id) {
            c.cart[i].quantity = +c.cart[i].quantity + 1;
            r = r - 1;
            if (a > 0) {
                let ul = document.querySelector('#cartUl');
                let parent = ul.parentNode;
                parent.removeChild(ul);
                let p = document.querySelector('#cartP');
                let parent1 = p.parentNode;
                parent1.removeChild(p);
                sendRequest(cartUrl, buildBascket);
            }
            break;
        }

    }

    if (r == c.cart.length ) {

        c.cart.push({
            id: +id,
            quantity: 1,
            name: $(this).attr('data-name'),
            price: +$(this).attr('data-price')
        });
        

        if (a > 0) {
            let ul = document.querySelector('#cartUl');
            let parent = ul.parentNode;
            parent.removeChild(ul);
            let p = document.querySelector('#cartP');
            let parent1 = p.parentNode;
            parent1.removeChild(p);
            sendRequest(cartUrl, buildBascket);
        }
    }
       

   

    console.log(c);
    
        
        fetch('writer.php', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( c
                //данные рандомные, я бы отправлял всю корзину
                )
        })

    

    
    sendRequest(cartUrl, getSumQtt);
});




$('#asd').on('click', '.delete', function () {
    
   let id = $(this).attr('data-id');
    
    for (let i = 0; i < c.cart.length; i++) {

        if (c.cart[i].id == id) {
            if (c.cart[i].quantity > 1) {
                c.cart[i].quantity = +c.cart[i].quantity - 1;

                if (a > 0) {
                    let ul = document.querySelector('#cartUl');
                    let parent = ul.parentNode;
                    parent.removeChild(ul);
                    let p = document.querySelector('#cartP');
                    let parent1 = p.parentNode;
                    parent1.removeChild(p);
                    fetch('writer.php', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(c
                            //данные рандомные, я бы отправлял всю корзину
                        )
                    })
                    sendRequest(cartUrl, buildBascket);

                }
                break;
            } else {

                c.cart.splice(i, 1);

                if (a > 0) {
                    let ul = document.querySelector('#cartUl');
                    let parent = ul.parentNode;
                    parent.removeChild(ul);
                    let p = document.querySelector('#cartP');
                    let parent1 = p.parentNode;
                    parent1.removeChild(p);
                    fetch('writer.php', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(c
                            //данные рандомные, я бы отправлял всю корзину
                        )
                    })
                    sendRequest(cartUrl, buildBascket);
                }
            }

        }

    }
   
    if (sumQtt == 1) {
        sumQtt = sumQtt - 1;
        let nOG = document.querySelector('#numberOfGoods');
        let parent = nOG.parentNode;
        parent.removeChild(nOG);
    }
    sendRequest(cartUrl, getSumQtt);


   
});





























































////получаем все кнопки купить и через форич их перебрали и получили кнопку, которой добавляем обработчик события, который при клике в корзину добавляет товар
//document.querySelectorAll('.buyButton').forEach(el => {
//    el.addEventListener('click', e => {
//        e.target.dataset.quantity = +e.target.dataset.quantity + 1;
//        basket.add(e.target.dataset.name, +e.target.dataset.price); // достаем из кнопки на которую нажали название и цену товара (цену сразу превращаем в число) и сохраняем в массив goods

//        basket.prcGd = e.target.dataset.price + 'руб. ';
//        basket.gdNm = e.target.dataset.name;
//        basket.qtt = e.target.dataset.quantity;
              

//        if (basket.goods.length > 0) {
//            if (!document.getElementById('numberOfGoods')) {
//                let numberOfGoods = document.createElement('span');
//                numberOfGoods.className = "numberOfGoods";
//                numberOfGoods.id = "numberOfGoods";
//                numberOfGoods.textContent = basket.goods.length+' ';
//                document.getElementById("basket").appendChild(numberOfGoods);
//            }
//            document.getElementById('numberOfGoods').textContent = basket.goods.length;

//        }

//        if (document.getElementById('menu')) {
//            document.getElementById('sumPrice').textContent = basket.getGoodPrice() + ' руб. ' ;
//            document.getElementById('good').textContent = basket.gdNm;
//            document.getElementById('priceGood').textContent = basket.prcGd ;
//            document.getElementById('qttGd').textContent = e.target.dataset.quantity+' ' ;
//        }

//    })
//});


//(function ($) {
//    $(function () {
//        let $body = $('body');
//        sendRequest('http://localhost:22222', function (users) {
//            console.log(users.goods);
//            users.goods.forEach(function (user) {
//                $body.append($('<li />').text(user.name));
//            })
//        });
//    });
//})(jQuery);

//let rURL = 'data.json';
//let req = new XMLHttpRequest();
//req.open('GET', rURL);
//req.responseType = 'json';
//req.send();
//let header = document.querySelector('.header');

/*req.onload = function () {
    let sH = req.response;
    console.log(sH.goods[0]);
    pH(sH);
   
}

console.log('123');

function pH(jsonObj) {
    let myH1 = document.createElement('h1');
    myH1.textContent = jsonObj.goods[0].name;
    header.appendChild(myH1);
}*/

//document.getElementById('basket').onclick = function () {

//    if (!document.getElementById('menu')) {
//        let menu = document.createElement("div");
//        menu.name = "menu";
//        menu.className = "menu";
//        menu.id = "menu";
//        menu.style.height = 0;
//        document.getElementById("basket").appendChild(menu);


//        let good = document.createElement('pre');
//        good.className = "good";
//        good.id = "good";
//        good.textContent = basket.gdNm;

//        let qttGd = document.createElement('pre');
//        qttGd.className = "qttGd";
//        qttGd.id = "qttGd";
//        qttGd.textContent = basket.qtt + ' ';

//        let containerGood = document.createElement('div');
//        containerGood.className = "containerGood";
//        containerGood.id = "containerGood";

//        let priceGood = document.createElement('pre');
//        priceGood.className = "priceGood";
//        priceGood.id = "priceGood";
//        priceGood.textContent = basket.prcGd + 'руб. ';

//        let br = document.createElement('br');

//        let sumPrice = document.createElement('span');
//        sumPrice.className = "sumPrice";
//        sumPrice.id = "sumPrice";
//        sumPrice.textContent = basket.getGoodPrice()  ;

//        document.getElementById("basket").appendChild(menu).appendChild(containerGood).appendChild(good);
//        document.getElementById('basket').appendChild(menu).appendChild(containerGood).appendChild(qttGd);
//        document.getElementById("basket").appendChild(menu).appendChild(containerGood).appendChild(priceGood);
//        document.getElementById("basket").appendChild(menu).appendChild(br);
//        document.getElementById("basket").appendChild(menu).appendChild(sumPrice);

//    }

//    document.getElementById('sumPrice').textContent = basket.getGoodPrice() + ' руб. ';
//    document.getElementById('good').textContent = basket.gdNm;
//    document.getElementById('priceGood').textContent = basket.prcGd;
//};

//const basket = {

//    goods: [],
//    prcGd: null,
//    gdNm: null,
//    qtt:null,

//    add(goodName, goodPrice) {
//        this.goods.push({ name: goodName, price: goodPrice });

//    },

//    getGoodPrice() {
//        let cost = 0;
//        for (const good of this.goods) {
//            cost += good.price;
//        }
//        return cost;
//    },

//};