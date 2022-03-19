const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FFB6C1', '#AFEEEE', '#98FB98', '#FFFFE0', '#9370DB', '#00FF00	', '#FF4500	', '#000080', '#8B008B', '#4B0082']

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    circle.addEventListener('click', setColor(circle))

    const size = getRendomNumber(10, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRendomNumber(0, width - size)
    const y = getRendomNumber(0, width - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    setColor(circle)
    board.append(circle)
}

function getRendomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(circle) {
    const color = getRandomColor()
    circle.style.background = color
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}