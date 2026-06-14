document.addEventListener('DOMContentLoaded', () => {
    const fallingContainer = document.getElementById('falling-container');
    const heartsContainer = document.getElementById('hearts-container');
    const nameText = document.getElementById('name');
    const messageBox = document.getElementById('message-box');

    const flowerEmojis = ['🌸', '🌺', '🌹', '🌻', '🌼', '🌷'];
    const leafEmojis = ['🍃', '🌿'];

    // 1. Function to create falling flowers with leaves
    function createFallingFlower() {
        const flower = document.createElement('div');
        flower.className = 'falling-flower';
        
        const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        const leaf = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        
        const startLeft = Math.random() * 100;
        const duration = Math.random() * 3 + 4; 
        const size = Math.random() * 25 + 15; 
        
        flower.style.left = `${startLeft}%`;
        flower.style.animationDuration = `${duration}s`;
        flower.style.fontSize = `${size}px`;
        flower.style.opacity = Math.random() * 0.7 + 0.3;
        flower.innerHTML = `<span>${emoji}</span><span style="font-size:0.6em; margin-top:-5px;">${leaf}</span>`;
        
        fallingContainer.appendChild(flower);
        
        setTimeout(() => { flower.remove(); }, duration * 1000);
    }

    // 2. Function to scatter hearts
    function scatterHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'scatter-heart';
            heart.innerHTML = '❤️';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 300 + 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            heart.style.setProperty('--tx', `${tx}px`);
            heart.style.setProperty('--ty', `${ty}px`);
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }
    }

    const startScreen = document.getElementById('start-screen');
    const bgMusic = document.getElementById('bg-music');

    startScreen.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        if (bgMusic) {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
        }

        // --- Sequence ---
        
        // Falling flowers loop
        setInterval(createFallingFlower, 400);

        // Show I Love You and hearts first
        setTimeout(() => {
            messageBox.classList.add('visible');
            setInterval(scatterHearts, 3000);
            scatterHearts();
        }, 1500);

        // Show name later
        setTimeout(() => {
            nameText.classList.add('visible');
        }, 4000);
    });
});
