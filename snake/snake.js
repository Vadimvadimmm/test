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
        return this.setting.colCount;
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

    init(rowsCount, colCount) {
        const table = document.getElementById('game');
        table.innerHTML = "";
        this.cells = {}; 
        this.useCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr'); //создаём ячейки
            tr.classList.add('row'); //добавляем tr класс стилей
            table.appendChild(tr); //ячейки добавляем в таблицу

            for (let col = 0; col < colCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td; //каждой td  присваиваем определенный ключ по Х и У и заносим в массив cells

                tr.appendChild(td);

            }
        }

    },

    render(snakePointsArray,foodPoints) {
        for (const cell of this.useCells) {
            cell.className = 'cell';
        }

        this.useCells = [];

        snakePointsArray.forEach((point, idx) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`]; //td назначаем координаты
            snakeCell.classList.add(idx === 0 ? 'snakeHead' : 'snakeBody'); //устанавливаем класс для td
            this.useCells.push(snakeCell);

        });

        const foodCell = this.cells[`x${foodPoints.x}_y${foodPoints.y}`]; //получили точку еды
        foodCell.classList.add('food');
        this.useCells.push(foodCell);
    }
};

const snake = {
    body: null,
    direction: null,
    lastStepDirection: null,

    init(startBody,direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getNextStepHeadPoint() {
        const firstPoint = this.body[0];

        switch (this.direction) {
            case 'up':
                return { x: firstPoint.x, y: firstPoint.y - 1 };
            case 'right':
                return { x: firstPoint.x + 1, y: firstPoint.y };
            case 'down':
                return { x: firstPoint.x, y: firstPoint.y + 1 };
            case 'left':
                return { x: firstPoint.x - 1, y: firstPoint.y };

        }
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    isOnPoint(point) {
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint());
        this.body.pop();
    },

    setDirection(direction) {
        this.direction = direction;
    },

    growUp() {
        const lastBodyIndx = this.body.length - 1;
        const lastBodyPoint = this.body[lastBodyIndx];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone);
    },
};

const food = {
    x: null,
    y: null,

    getCoordinates() {  //отдаёт
        return {
            x: this.x,
            y: this.y,
        }
    },

    setCoordinates(point) {  //устанавливает 
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    tickInterval:null,

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

        this.setEventHandlers();

        this.reset();

    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.render();
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Играз акончена', true);
    },

    tickHandler() {
        if (!this.canMakeStep()) {
            return this.finish();
        }

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            console.log(...this.snake.body);
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            if (this.isGameWon()) {
                this.finish();
            }
        }

        this.snake.makeStep();
        this.render();
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();
        return !this.snake.isOnPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.config.getColsCount() &&
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;

    },

    setPlayButton(textContent, isDisabled = false) {
        const playButton = document.getElementById('playButton');
        playButton.textContent = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates());
    },

    getStartSnakeBody() {
        return [{
            x: Math.floor(this.config.getColsCount()/2), //расположение первоначальной позиции змейки по Х
            y: Math.floor(this.config.getRowsCount() / 2),//расположение первоначальной позиции змейки по У
        }];
    },

    getRandomFreeCoordinates() {  //возвращает точку не занятую ни едой, ни змейкой
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),

            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                return rndPoint;
            }
        }
           

    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => this.playClickHandler());
        document.getElementById('newGameButton').addEventListener('click', () => this.newGameClickHandler());
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) {
            return;
        }

        const direction = this.getDirectionByCode(event.code);
       
        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
        
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'left' && lastStepDirection !== 'right' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up';
            
    },

};

game.init({ speed: 1 });