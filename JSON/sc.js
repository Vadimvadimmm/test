window.onload = function () {
    document.getElementById('send').addEventListener('click', function (event) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', ' data.json');
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var items = JSON.parse(xhr.responseText);
                var myH1 = document.createElement('h1');
                console.log(items);
                var d = items.users[0].name;
                myH1.textContent = d;
                document.getElementById('body').appendChild(myH1);
                
            }
        }
        event.preventDefault();
    });

    function buildGoodsList() {
        $.ajax({
            url: 'data.json',
            dataType: 'json',
            success: function (cart) {
                var $ul = $('<ul/>');

                cart.users.forEach(function (item) {
                    var $li = $('<li/>', {
                        text: item.name + ' ',

                    });
                    var $button = $('<button/>', {
                        text: 'buy',
                        class: 'buy',
                        'data-id': item.id,
                        'data-name': item.name,
                        
                    });

                    $li.append($button);
                    $ul.append($li);
                });
                $('body').append($ul);
            }
        })
    }

    $('body').on('click', '.buy', function () {

        var id = $(this).attr('data-id');

        var entity = $('body [data-id="' + id + '"]'); //ищем в корзине элемент с идентификатором +id+
        console.log(entity);

        if (!entity.length) {
            console.log(entity.length);
            $.ajax({
                url: 'data.json',
                type: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                data: JSON.stringify({
                    quantity: +$(entity).attr('data-quantity') + 1,
                }),
                
            })

        } else {

            console.log(entity);
            $.ajax({
                url: 'data.json',
                type: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                data: JSON.stringify({
                    id: id,
                    quantity: 1,
                    name: $(this).attr('data-name'),
                    price: $(this).attr('data-price'),
                }),
                
            })

        }

    });

    buildGoodsList();
}