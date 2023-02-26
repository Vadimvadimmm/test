document.addEventListener('DOMContentLoaded', () => {
    fetch('writer.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            //данные рандомные, я бы отправлял всю корзину
            {
            bg: 3
        })
    })
        .then((response) => console.log(response))
})

