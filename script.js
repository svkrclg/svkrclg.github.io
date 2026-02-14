import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// --- CONFIGURATION ---
const girlName = "Namrata";
const boyName = "Saurav";

// Inject names into DOM
document.querySelectorAll('.girl-name').forEach(el => el.textContent = girlName);
document.querySelectorAll('.boy-name').forEach(el => el.textContent = boyName);

// --- FACTS DATA ---
const factsData = [
    {
        question: "Who texts more?",
        answer: "Namrata! 🏆",
        conclusion: "She sent 93,721 messages vs Saurav's 84,408. (11% more!) 🗣️"
    },
    {
        question: "Who is the Night Owl? 🦉",
        answer: "Both of you!",
        conclusion: "You exchanged 27,376 messages between 12 AM and 5 AM. Sleep is for the weak! 😴"
    },
    {
        question: "Who is more fond of nicknames? 🌹",
        answer: "Saurav! 🥇",
        conclusion: "He said 'Baby' 1,117 times (vs 221) and 'Jaan' 858 times (vs 96). Obsessed much? 😏"
    },
    {
        question: "Who says 'Sorry' more? 🙇",
        answer: "Saurav (524 times)",
        conclusion: "Namrata said it 398 times. A true gentleman always apologizes first! 😆"
    },
    {
        question: "When did it all start? 📅",
        answer: "Nov 16, 2024",
        conclusion: "The day the stars aligned. Since then, you've averaged 403 messages/day! 🩷"
    }
];

let currentFactIndex = 0;

// --- THREE.JS BACKGROUND ---
function init3D() {
    const canvas = document.querySelector('#bg-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffeef2, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff6b81, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create floating hearts
    const hearts = [];
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0.25, 0.25);
    heartShape.bezierCurveTo(0.25, 0.25, 0.20, 0, 0, 0);
    heartShape.bezierCurveTo(-0.30, 0, -0.30, 0.35, -0.30, 0.35);
    heartShape.bezierCurveTo(-0.30, 0.55, -0.10, 0.77, 0.25, 0.95);
    heartShape.bezierCurveTo(0.60, 0.77, 0.80, 0.55, 0.80, 0.35);
    heartShape.bezierCurveTo(0.80, 0.35, 0.80, 0, 0.50, 0);
    heartShape.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25);

    const extrudeSettings = { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 };
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    const colors = [0xff6b81, 0xff9eb5, 0xffc4d6];

    for (let i = 0; i < 50; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            shininess: 100
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        mesh.rotation.x = Math.PI; // Flip heart so it's upright
        mesh.rotation.z = Math.random() * Math.PI;
        mesh.scale.setScalar(Math.random() * 0.5 + 0.2);

        mesh.userData = {
            velocity: (Math.random() * 0.02) + 0.005,
            rotateSpeed: (Math.random() * 0.02) - 0.01
        };

        scene.add(mesh);
        hearts.push(mesh);
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        hearts.forEach(heart => {
            heart.position.y += heart.userData.velocity;
            heart.rotation.y += heart.userData.rotateSpeed;

            // Reset if goes too high
            if (heart.position.y > 10) {
                heart.position.y = -10;
            }
        });

        // Gentle camera sway
        camera.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
        camera.position.y = Math.cos(Date.now() * 0.0005) * 0.5;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }
    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- COUPLE ANIMATION LOGIC ---
let coupleProgress = 0; // 0.0 to 1.0

function updateCouplePositions() {
    const her = document.getElementById('img-her');
    const his = document.getElementById('img-his');

    if (!her || !his) return;

    // Use CSS calc to interpolate between start (20px) and end (center - 100px)
    her.style.left = `calc(20px * ${1 - coupleProgress} + (50% - 100px) * ${coupleProgress})`;
    his.style.right = `calc(20px * ${1 - coupleProgress} + (50% - 100px) * ${coupleProgress})`;

    requestAnimationFrame(renderLine);
}

function renderLine() {
    const her = document.getElementById('img-her');
    const his = document.getElementById('img-his');
    const line = document.getElementById('couple-line');

    if (!her || !his || !line) return;

    const rectHer = her.getBoundingClientRect();
    const rectHis = his.getBoundingClientRect();

    const x1 = rectHer.left + rectHer.width / 2;
    const y1 = rectHer.top + rectHer.height / 2;

    const x2 = rectHis.left + rectHis.width / 2;
    const y2 = rectHis.top + rectHis.height / 2;

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
}

// Keep updating line periodically for smoothness
setInterval(renderLine, 30);

function moveCloser() {
    if (coupleProgress < 1) {
        coupleProgress += 0.15; // Move closer in steps
        if (coupleProgress > 1) coupleProgress = 1;
        updateCouplePositions();
    }
}

// --- GAME/FACTS LOGIC ---

window.startGame = () => {
    document.getElementById('screen-intro').classList.remove('active');
    document.getElementById('screen-intro').classList.add('hidden');

    document.getElementById('screen-facts').classList.remove('hidden');
    document.getElementById('screen-facts').classList.add('active');

    loadFact();
    moveCloser();
};

window.loadFact = () => {
    const fact = factsData[currentFactIndex];
    document.getElementById('fact-count').innerText = currentFactIndex + 1;
    document.getElementById('fact-question').innerText = fact.question;
    document.getElementById('fact-answer').innerText = fact.answer;
    document.getElementById('fact-conclusion').innerText = fact.conclusion;

    // Reset state
    document.getElementById('fact-reveal-area').classList.add('hidden');
    document.getElementById('fact-reveal-area').classList.remove('bounce-anim');
    document.getElementById('btn-reveal').classList.remove('hidden');
    document.getElementById('btn-next-fact').classList.add('hidden');
};

window.revealFact = () => {
    const revealArea = document.getElementById('fact-reveal-area');
    revealArea.classList.remove('hidden');
    revealArea.offsetWidth; // trigger reflow
    revealArea.classList.add('bounce-anim');

    document.getElementById('btn-reveal').classList.add('hidden');
    document.getElementById('btn-next-fact').classList.remove('hidden');

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#fff']
    });

    moveCloser();
};

window.nextFact = () => {
    currentFactIndex++;
    if (currentFactIndex < factsData.length) {
        loadFact();
    } else {
        showProposal();
    }
};

function showProposal() {
    document.getElementById('screen-facts').classList.add('hidden');
    document.getElementById('screen-facts').classList.remove('active');

    document.getElementById('screen-proposal').classList.remove('hidden');
    document.getElementById('screen-proposal').classList.add('active');

    initProposalLogic();
}

// --- PROPOSAL LOGIC ---

function initProposalLogic() {
    const noBtn = document.getElementById('btn-no');
    const yesBtn = document.getElementById('btn-yes');

    const messages = [
        "Are you drunk? 🥴",
        "Really? 🥺",
        "Jaan???? 🧐",
        "Majak mat karo jaan 🥺",
        "Don't do this! 💔",
        "Wrong button! 😆"
    ];

    const moveBtn = () => {
        // Change text first
        noBtn.textContent = messages[Math.floor(Math.random() * messages.length)];

        // Use the proposal screen as the bounding box
        const screen = document.getElementById('screen-proposal');
        const screenRect = screen.getBoundingClientRect();

        // Measure button AFTER text change
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Keep button within the proposal card with some padding
        const pad = 10;
        const maxX = screenRect.width - btnWidth - pad;
        const maxY = screenRect.height - btnHeight - pad;

        const randomX = pad + Math.random() * Math.max(0, maxX);
        const randomY = pad + Math.random() * Math.max(0, maxY);

        // Position relative to the screen container
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = '1000';
        noBtn.style.transition = 'left 0.3s ease, top 0.3s ease';
    };

    noBtn.addEventListener('mouseenter', moveBtn);
    noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveBtn(); });
    noBtn.addEventListener('click', moveBtn);

    yesBtn.addEventListener('click', () => {
        startCelebration();
        startHeartShower();
        coupleProgress = 1; // Meet in the middle
        updateCouplePositions();
    });
}

// --- CELEBRATION LOGIC ---

function startCelebration() {
    document.getElementById('screen-proposal').classList.add('hidden');
    document.getElementById('screen-celebration').classList.remove('hidden');
    document.getElementById('screen-celebration').classList.add('active');

    const audio = new Audio('shinchan-voice.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));

    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff6b81', '#ff9eb5', '#ffffff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff6b81', '#ff9eb5', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function startHeartShower() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.textContent = "💗";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (20 + Math.random() * 30) + "px";
        heart.style.animationDuration = (2 + Math.random() * 3) + "s";
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }, 200);
}

window.restart = () => {
    location.reload();
};

// --- STICKER LOGIC ---
const stickerImages = ['sticker1.png', 'sticker2.png', 'sticker3.png', 'sticker4.png', 'zaemon-1.png', 'zaemon-2.png', 'zaemon-3.png'];

function spawnFloatingStickers() {
    const container = document.body;
    const count = 20;

    for (let i = 0; i < count; i++) {
        const img = document.createElement('img');
        const randomSrc = stickerImages[Math.floor(Math.random() * stickerImages.length)];
        img.src = randomSrc;
        img.classList.add('bg-sticker');

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = 100 + Math.random() * 120;
        const rot = -30 + Math.random() * 60;
        const delay = Math.random() * 5;

        img.style.left = `${left}vw`;
        img.style.top = `${top}vh`;
        img.style.width = `${size}px`;
        img.style.transform = `rotate(${rot}deg)`;
        img.style.animationDelay = `${delay}s`;
        img.style.opacity = 0.6 + Math.random() * 0.4;

        container.appendChild(img);
    }
}

// Start everything
console.log("Script loaded. Starting...");
init3D();
spawnFloatingStickers();
