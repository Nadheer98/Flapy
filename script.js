const bird = document.getElementById("bird");
const gameContainer = document.querySelector(".game-container");
const scoreDisplay = document.getElementById("score");

let birdY = 200;
let birdVelocity = 0;
const gravity = 0.25; // الجاذبية للطائر
let score = 0;
let gameSpeed = 2; // سرعة حركة الأنابيب

document.addEventListener("keydown", jump);

function jump() {
    birdVelocity = -6; // قوة القفز
}

// تحديث الحركة والتحقق من الاصطدام
function updateGame() {
    birdVelocity += gravity;
    birdY += birdVelocity;
    bird.style.top = birdY + "px";

    // إضافة الأنابيب وتحديث مواقعها
    if (Math.random() < 0.02) {
        createPipes();
    }

    // تحديث الأنابيب والتحقق من الاصطدامات
    const pipes = document.querySelectorAll(".pipe");
    pipes.forEach(pipe => {
        let pipeX = parseFloat(pipe.style.left);
        pipe.style.left = (pipeX - gameSpeed) + "px";

        // تحقق من الاصطدام
        if (pipeX < 50 && pipeX > 20 && birdY < parseFloat(pipe.dataset.height)) {
            endGame();
        }

        // إزالة الأنابيب وتحديث النتيجة
        if (pipeX < -60) {
            pipe.remove();
            score++;
            scoreDisplay.innerText = score;
        }
    });

    // إنهاء اللعبة في حالة خروج الطائر عن الشاشة
    if (birdY > gameContainer.offsetHeight - bird.offsetHeight || birdY < 0) {
        endGame();
    }

    requestAnimationFrame(updateGame);
}

// إنشاء الأنابيب
function createPipes() {
    const pipeHeight = Math.random() * (gameContainer.offsetHeight - 200) + 100;

    const topPipe = document.createElement("div");
    topPipe.classList.add("pipe");
    topPipe.style.height = pipeHeight + "px";
    topPipe.style.top = "0";
    topPipe.style.left = "400px";
    topPipe.dataset.height = pipeHeight;

    const bottomPipe = document.createElement("div");
    bottomPipe.classList.add("pipe");
    bottomPipe.style.height = (gameContainer.offsetHeight - pipeHeight - 150) + "px";
    bottomPipe.style.bottom = "0";
    bottomPipe.style.left = "400px";
    bottomPipe.dataset.height = gameContainer.offsetHeight - pipeHeight - 150;

    gameContainer.appendChild(topPipe);
    gameContainer.appendChild(bottomPipe);
}

// إنهاء اللعبة
function endGame() {
    alert("انتهت اللعبة! النتيجة: " + score);
    location.reload();
}

updateGame();
