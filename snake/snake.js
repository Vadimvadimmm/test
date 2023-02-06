"user strict"

const setting = {
    rowsCount: 21,
    colCount: 21,
    speed: 2,
    winFoodCount: 50,
};

const config = {
    setting,

    init(userSettings) {
        Object.assign(this.setting, userSettings);
    },

    getRowsCount() {
        return this.setting.rowsCount;
    },

    getColsCount() {
        return this.setting.colsCount;
    },

    getSpeed() {
        return this.setting.speed;
    },

    getWinFoodCount() {
        return this.setting.winFoodCount;
    },

    validate() {
        /*isValid true, если настройки корректны, иначе false
        errors массив со всеми ошибками настроек*/

        const result = {
            isValid: true,
            errors: [],
        };

        if (this.setting.rowsCount < 10 || this.setting.rowsCount > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки,значение rowsCount должно быть в диапазоне [10,30]');
        }

        if (this.setting.colsCount < 10 || this.setting.colsCount > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки,значение colsCount должно быть в диапазоне [10,30]');
        }

        if (this.setting.speed < 1 || this.setting.speed > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки,значение speed должно быть в диапазоне [1,10]');
        }

        if (this.setting.winFoodCount < 5 || this.setting.winFoodCount > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки,значение winFoodCount должно быть в диапазоне [5,50]');
        }

        return result;
    }
};

const map = {
    cells: null,
    useCells:null,

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = "";
        this.cells = {}; 
        this.useCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr'); //создаём ячейки
            tr.classList.add('row'); //добавляем tr класс стилей
            table.appendChild(tr); //ячейки добавляем в таблицу
        }

    }
};

const snake = {

};

const food = {

};

const status = {

};

const game = {
    config,
    map,
    snake,
    food,
    status,

    init(userSettings) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount()); // инициализирует карту по количеству строк и колонок
        

    },

    

    
};

game.init({ speed: 5 });