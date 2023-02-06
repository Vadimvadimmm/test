"user strict"

const ticTakToe = {
    gameTableElement: null,
    status: 'playing',
    mapValue: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    phase: 'X',

    init() {
        this.gameTableElement = document.getElementById('game');

        this.renderMap();

        this.initEventHandlers();
    },

    renderMap() {
        //пробегаемся по всем линиям
        for (let row = 0; row < 3; row++) {
            //создаём линию
            const tr = document.createElement('tr');
            //добавляем линию в верхний тэг игры
            this.gameTableElement.appendChild(tr);
            //пробегаемся по всем колонкам 
            for (let col = 0; col < 3; col++) {
            //создаём колонку, добавляем в data-фттрибут данные с номера этой колонки и добавляем колонку в линию
                const td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td); 
            }
        }
    },

    initEventHandlers() {
        this.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
    },

    cellClickHandler(event) {
        const row = event.target.dataset.row; // в row присваиваем номер строки , куда был клик мыши
        const col = event.target.dataset.col; // в col присваиваем номер столбца , куда был клик мыши

        if (!this.isStatusPlaying() || !this.isClickByCell(event) || !this.isCellEmpty(row,col)) { //если клик был не по ячейке или ячейка не пустая, или статус игры изменился, то просто выходим из функции 
            return;
        }

        event.target.textContent = this.phase; // событию назначаем цель, куда кликаем, туда заносим текст и тексту присваиваем phase  11линия
        this.mapValue[row][col] = this.phase; // из 45,44 мы получаем элемент массива и присваиваем ему phase
       

        if (this.hasWon()) {
            this.setStatusStopped();
            this.sayWonPhrase();
        }
        else if (this.hasDraw()) {
            this.sayDrawPhrase();
        }

        this.togglePhase();
    },

    isClickByCell(event) {
        return event.target.tagName === 'TD'; // true , если нажали на ячейку таблицы
    },

    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X'; // ЕСЛИ this.phase === Х , ТО станет this.phase = 0 ИНАЧЕ this.phase = Х   if(this.phase === 'X') {this.phase = '0';} else {this.phase = 'X';}
    },

    isCellEmpty(row,col) {
        return this.mapValue[row][col] === ''; //возвращает только пустые ячейки
    },

    hasWon() { // возвращаем true, если выигрышные комбинации
        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
               this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
               this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

               this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
               this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
               this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

               this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
               this.isLineWon({ x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }) ;
    },

    isLineWon(a,b,c) {
        const value = this.mapValue[a.y][a.x] + this.mapValue[b.y][b.x] + this.mapValue[c.y][c.x]; //складываем строки
        return value === 'XXX' || value === '000'; // true , если сложение дало ХХХ или 000
    },

    isStatusPlaying() {
        return this.status === 'playing'; // возвращаем true , если playing
    },

    setStatusStopped() {
        this.status = 'stopped'; //меняем статус на стоп
    },

    sayWonPhrase() {
        const figure = this.phase === 'X' ? 'крестики' : 'Нолики';
        setTimeout(()=> alert(`${figure} победили`),1); 
    },

    sayDrawPhrase() {
        alert('Ничья');
    },

    hasDraw() {
        let i = 0;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.mapValue[row][col] === '') {
                    i++;
                }
            }
        }
        console.log(i);
        if (i === 0) {
            return true;
        }
    },
};

window.onload = () => ticTakToe.init();