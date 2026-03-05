document.addEventListener('DOMContentLoaded', () => {
    const inputSection = document.getElementById('input-section');
    const greetSection = document.getElementById('greet-section');
    const nameInput = document.getElementById('name-input');
    const startBtn = document.getElementById('start-btn');
    const displayName = document.getElementById('display-name');
    const resetBtn = document.getElementById('reset-btn');
    const body = document.body;

    const languages = [
        { hello: 'Hello', font: 'font-en' },
        { hello: 'नमस्ते', font: 'font-hi' },
        { hello: 'नमस्कार', font: 'font-mr' },
        { hello: 'నమస్కారం', font: 'font-te' },
        { hello: 'வணக்கம்', font: 'font-ta' },
        { hello: 'ನಮಸ್ಕಾರ', font: 'font-kn' },
        { hello: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', font: 'font-pa' },
        { hello: 'Bonjour', font: 'font-en' },
        { hello: '¡Hola!', font: 'font-en' },
        { hello: 'Ciao', font: 'font-en' }
    ];

    let langIndex = 0;
    let greetInterval;

    const updateGreeting = (name) => {
        const lang = languages[langIndex];
        const greetText = document.querySelector('.greeting-text');

        // Reset classes
        greetText.className = 'greeting-text ' + lang.font;

        // Vertical layout handled by CSS (display: block on .name-highlight)
        greetText.innerHTML = `${lang.hello}, <span id="display-name" class="name-highlight">${name}!</span>`;

        langIndex = (langIndex + 1) % languages.length;
    };

    // Function to trigger the celebration blast (Enhanced for cracker/firework effect)
    const fireCelebration = () => {
        const duration = 7 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 60 * (timeLeft / duration);

            // Randomly choose a "cracker" type
            const crackerType = Math.random();

            if (crackerType > 0.7) {
                // Star crackers
                confetti(Object.assign({}, defaults, {
                    particleCount: 40,
                    shapes: ['star'],
                    colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
                    origin: { x: Math.random(), y: Math.random() - 0.2 }
                }));
            } else if (crackerType > 0.4) {
                // Heart/Circle burst
                confetti(Object.assign({}, defaults, {
                    particleCount: 30,
                    shapes: ['circle'],
                    colors: ['#FF0000', '#FF69B4', '#FF1493'],
                    origin: { x: Math.random(), y: Math.random() - 0.2 }
                }));
            } else {
                // Standard multicolored explosion
                confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
                }));
            }
        }, 400);

        // One massive initial blast
        confetti({
            particleCount: 150,
            spread: 160,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#a855f7', '#ec4899', '#f59e0b'],
            shapes: ['circle', 'square']
        });
    };

    const handleStart = () => {
        const name = nameInput.value.trim();

        if (name) {
            // Initial update
            updateGreeting(name);

            // Transition UI
            inputSection.classList.add('hidden');
            greetSection.classList.add('active');

            // Start cycling
            greetInterval = setInterval(() => updateGreeting(name), 2000);

            // Trigger blast
            fireCelebration();

            // Add a little extra "blast" on clicks
            document.body.addEventListener('click', (e) => {
                if (greetSection.classList.contains('active')) {
                    confetti({
                        particleCount: 15,
                        spread: 70,
                        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
                    });
                }
            });
        } else {
            // Simple shake animation if empty
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 500);
            nameInput.placeholder = "Please enter your name!";
        }
    };

    startBtn.addEventListener('click', handleStart);

    // Support "Enter" key
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleStart();
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(greetInterval);
        body.className = '';
        greetSection.classList.remove('active');
        setTimeout(() => {
            inputSection.classList.remove('hidden');
            nameInput.value = '';
            nameInput.focus();
        }, 300);
    });
});

// Add CSS shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .shake { animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both; }
`;
document.head.append(style);
