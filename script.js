const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const answerArea = document.getElementById("answerArea");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const hint = document.getElementById("hint");

let opened = false;
let noCount = 0;

// Trái tim bay
const hearts = document.getElementById("hearts");
const heartSymbols = ["❤️", "💕", "💗", "💖", "💘"];

for (let i = 0; i < 18; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = heartSymbols[i % heartSymbols.length];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (15 + Math.random() * 22) + "px";
    heart.style.animationDuration = (7 + Math.random() * 8) + "s";
    heart.style.animationDelay = (-Math.random() * 10) + "s";
    hearts.appendChild(heart);
}

// Click mở phong bì
envelope.addEventListener("click", function () {
    if (opened) return;
    opened = true;
    
    // Mở nắp phong bì
    envelope.classList.add("opened");
    hint.textContent = "Thiệp đã mở 💗";

    // Kích hoạt hiển thị lá thư và đẩy lên
    setTimeout(function() {
        letter.classList.add("show-letter");
    }, 300);

    // Hiện nút chọn
    setTimeout(function () {
        answerArea.classList.add("show");
    }, 900);
});

// Canvas Pháo hoa
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let fireworksRunning = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createFirework(x, y) {
    const count = 75;
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = math.randomInt(35, 80) / 10;
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            size: math.randomInt(2, 5),
            hue: math.randomInt(0, 360)
        });
    }
}

function animateFireworks() {
    if (!fireworksRunning && particles.length === 0) return;
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.life -= 0.012;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.life})`;
        ctx.fill();
    });

    particles = particles.filter(p => p.life > 0);
    requestAnimationFrame(animateFireworks);
}

function createBalloons() {
    const balloonColors = ["#fb7185", "#f472b6", "#c084fc", "#60a5fa", "#34d399", "#facc15"];
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.left = Math.random() * 100 + "vw";
        balloon.style.background = balloonColors[i % balloonColors.length];
        balloon.style.animationDelay = Math.random() * 2 + "s";
        balloon.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
        document.body.appendChild(balloon);

        setTimeout(() => balloon.remove(), 7500);
    }
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.width = (5 + Math.random() * 8) + "px";
        piece.style.height = (8 + Math.random() * 12) + "px";
        piece.style.background = `hsl(${math.randomInt(0, 360)}, 90%, 60%)`;
        piece.style.animationDelay = Math.random() * 1.5 + "s";
        document.body.appendChild(piece);

        setTimeout(() => piece.remove(), 5500);
    }
}

yesBtn.addEventListener("click", function () {
    result.innerHTML = `
        <div class="success">
            <div style="font-size: 50px;">🎉💖🎈</div>
            <h2 style="color: #db2777; font-size: 30px; margin: 10px 0;">Chúc mừng! 💕</h2>
            <p style="color: #666;">Một câu trả lời thật đáng yêu!</p>
        </div>
    `;

    fireworksRunning = true;
    animateFireworks();

    for (let i = 0; i < 12; i++) {
        setTimeout(function () {
            createFirework(
                80 + Math.random() * (canvas.width - 160),
                80 + Math.random() * (canvas.height * 0.45)
            );
        }, i * 280);
    }

    createBalloons();
    createConfetti();

    yesBtn.disabled = true;
    noBtn.disabled = true;
});

noBtn.addEventListener("click", function () {
    noCount++;
    if (noCount === 1) {
        noBtn.textContent = "😳 Không thể từ chối";
        hint.textContent = "Ơ... hình như có gì đó sai sai!";
    } else {
        noBtn.textContent = "😂 Không thể từ chối";
    }

    const maxX = Math.min(100, window.innerWidth / 3);
    const maxY = 35;

    noBtn.style.transform = `translate(
        ${(Math.random() * 2 - 1) * maxX}px,
        ${(Math.random() * 2 - 1) * maxY}px
    )`;
});