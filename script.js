let balance = 1000;
const spinButton = document.getElementById('spinButton');
const resultText = document.getElementById('resultText');
const reels = document.querySelectorAll('.reel');
const balanceDisplay = document.getElementById('balance');

spinButton.addEventListener('click', function() {
    if (balance < 100) {
        resultText.textContent = 'Недостаточно средств для ставки!';
        return;
    }

    balance -= 100;  // Ставка 100 монет за каждый спин
    balanceDisplay.textContent = balance;

    resultText.textContent = 'Идет вращение...';

    // Прокрутить барабаны с анимацией
    reels.forEach(reel => {
        reel.classList.add('spin-animation');
        setTimeout(() => {
            reel.classList.remove('spin-animation');
        }, 1000);
    });

    // Симуляция результата
    setTimeout(() => {
        const result = generateResult();
        displayResult(result);
    }, 1000);
});

function generateResult() {
    const fruits = ['🍒', '🍋', '🍇', '🍉', '🍊'];
    const result = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * fruits.length);
        result.push(fruits[randomIndex]);
    }
    return result;
}

function displayResult(result) {
    const [reel1, reel2, reel3] = result;

    // Для каждого барабана плавно заменяем символ
    document.querySelector('#reel1 .symbol').textContent = reel1;
    document.querySelector('#reel2 .symbol').textContent = reel2;
    document.querySelector('#reel3 .symbol').textContent = reel3;

    if (reel1 === reel2 && reel2 === reel3) {
        balance += 500;  // Выигрыш
        balanceDisplay.textContent = balance;
        resultText.textContent = `Поздравляем! Вы выиграли 500 монет!`;
    } else {
        resultText.textContent = `Увы, вы проиграли.`;
    }
}
