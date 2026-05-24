// ========== PRELOADER ==========
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 1200);
});

// ========== PARTICLES ==========
(function() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.r = Math.random() * 1.5 + 0.5;
            this.o = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167,139,250,${this.o})`;
            ctx.fill();
        }
    }
    function init() {
        resize();
        const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 15000));
        particles = Array.from({length: count}, () => new Particle());
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx*dx + dy*dy);
                if (d < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(124,58,237,${0.05 * (1 - d/110)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    window.addEventListener('resize', init);
    init(); animate();
})();

// ========== CUSTOM CURSOR ==========
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const cursorGlow = document.getElementById('cursorGlow');
let mx = 0, my = 0, cx = 0, cy = 0;
const isMobile = 'ontouchstart' in window;

if (!isMobile) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursorDot.style.left = mx + 'px'; cursorDot.style.top = my + 'px';
        cursorGlow.style.left = mx + 'px'; cursorGlow.style.top = my + 'px';
    });
    function animateCursor() {
        cx += (mx - cx) * 0.15; cy += (my - cy) * 0.15;
        cursorRing.style.left = cx + 'px'; cursorRing.style.top = cy + 'px';
        cursorRing.style.transform = 'translate(-50%, -50%)';
        cursorDot.style.transform = 'translate(-50%, -50%)';
        cursorGlow.style.transform = 'translate(-50%, -50%)';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.querySelectorAll('a, button, .skill-card, .metric-card, .contact-card, .btn-primary, .btn-secondary, .timeline-card, .project-card, .breakdown-card, .cert-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
    });
} else {
    [cursorDot, cursorRing, cursorGlow].forEach(el => el.style.display = 'none');
}

// ========== TYPED EFFECT ==========
const typedPhrases = [
    "Software Engineer",
    "Node.js & Express Developer",
    "Competitive Programmer",
    "Distributed Systems Enthusiast",
    "IIT Delhi Undergrad",
    "Codeforces Specialist"
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
    const current = typedPhrases[phraseIndex];
    if (isDeleting) { typedEl.textContent = current.substring(0, charIndex - 1); charIndex--; }
    else { typedEl.textContent = current.substring(0, charIndex + 1); charIndex++; }
    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === current.length) { delay = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % typedPhrases.length; delay = 400; }
    setTimeout(typeEffect, delay);
}
setTimeout(typeEffect, 1500);

// ========== SCROLL PROGRESS ==========
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const p = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
    scrollProgress.style.width = p + '%';
});

// ========== NAVBAR ==========
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    backToTop.classList.toggle('visible', window.scrollY > 500);
});

// ========== MOBILE NAV ==========
function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('navOverlay').classList.toggle('active');
}
function closeNav() {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('navOverlay').classList.remove('active');
}
document.getElementById('navOverlay').addEventListener('click', closeNav);

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({top: target.offsetTop - navbar.offsetHeight, behavior: 'smooth'});
    });
});

// ========== ACTIVE NAV ==========
const allSections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id'); });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active-link');
        if (a.getAttribute('href') === `#${current}` && !a.classList.contains('nav-cta')) a.classList.add('active-link');
    });
});

// ========== SCROLL REVEAL ==========
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObserver.observe(el));

// ========== COUNTERS ==========
let countersAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            document.querySelectorAll('.stat-number').forEach(counter => {
                const target = parseFloat(counter.dataset.target);
                const suffix = counter.dataset.suffix || '';
                const isDecimal = target % 1 !== 0;
                const dur = 2000; const start = performance.now();
                function update(now) {
                    const p = Math.min((now - start) / dur, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    counter.textContent = (isDecimal ? (eased * target).toFixed(1) : Math.floor(eased * target)) + suffix;
                    if (p < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            });
        }
    });
}, { threshold: 0.3 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ========== SKILL BARS ==========
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
                setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 150);
            });
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.breakdown-card').forEach(card => skillBarObserver.observe(card));

// ========== 3D CARD TILT ==========
const card3d = document.getElementById('hero3dCard');
const cardGlow = document.getElementById('heroCardGlow');
if (card3d && !isMobile) {
    card3d.addEventListener('mousemove', (e) => {
        const rect = card3d.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const rx = ((y - rect.height/2) / (rect.height/2)) * -8;
        const ry = ((x - rect.width/2) / (rect.width/2)) * 8;
        card3d.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        if (cardGlow) {
            cardGlow.style.left = x + 'px'; cardGlow.style.top = y + 'px';
            cardGlow.style.background = 'radial-gradient(circle at center, rgba(124,58,237,0.25), transparent 60%)';
            cardGlow.style.width = '200px'; cardGlow.style.height = '200px';
            cardGlow.style.transform = 'translate(-50%, -50%)';
        }
    });
    card3d.addEventListener('mouseleave', () => { card3d.style.transform = ''; if (cardGlow) cardGlow.style.opacity = '0'; });
    card3d.addEventListener('mouseenter', () => { if (cardGlow) cardGlow.style.opacity = '0.6'; });
}

// ========== SKILL CARD STAGGER ==========
const skillCardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-card').forEach((card, i) => {
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, i * 60);
            });
        }
    });
}, { threshold: 0.1 });
const skillsShowcase = document.querySelector('.skills-showcase');
if (skillsShowcase) {
    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '0'; card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    skillCardObserver.observe(skillsShowcase);
}

// ========== CARD MICRO TILT ==========
if (!isMobile) {
    document.querySelectorAll('.skill-card, .contact-card, .metric-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const rx = ((e.clientY - rect.top - rect.height/2) / (rect.height/2)) * -5;
            const ry = ((e.clientX - rect.left - rect.width/2) / (rect.width/2)) * 5;
            card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.03)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

// ========== TEXT SCRAMBLE ==========
class TextScramble {
    constructor(el) { this.el = el; this.chars = '!<>-_\\/[]{}—=+*^?#________'; this.update = this.update.bind(this); }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '', to = newText[i] || '';
            const start = Math.floor(Math.random() * 30), end = start + Math.floor(Math.random() * 30);
            this.queue.push({from, to, start, end});
        }
        cancelAnimationFrame(this.frameRequest); this.frame = 0; this.update();
        return promise;
    }
    update() {
        let output = '', complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {from, to, start, end, char} = this.queue[i];
            if (this.frame >= end) { complete++; output += to; }
            else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) { char = this.chars[Math.floor(Math.random() * this.chars.length)]; this.queue[i].char = char; }
                output += `<span style="color:var(--accent-light);opacity:0.6">${char}</span>`;
            } else { output += from; }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) this.resolve();
        else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
    }
}

setTimeout(() => {
    const n1 = document.querySelector('.hero-name .line-1');
    if (n1) new TextScramble(n1).setText('Gayna');
    const n2 = document.querySelector('.hero-name .line-2');
    if (n2) {
        const fx2 = new TextScramble(n2);
        fx2.setText('Chawla').then(() => {
            n2.style.background = 'var(--gradient-text)';
            n2.style.webkitBackgroundClip = 'text';
            n2.style.webkitTextFillColor = 'transparent';
            n2.style.backgroundClip = 'text';
            n2.style.backgroundSize = '200% 200%';
            n2.style.animation = 'gradientShift 4s ease infinite';
            n2.innerHTML = 'Chawla';
        });
    }
}, 1300);