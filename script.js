const cursor = document.getElementById('cursor');
const trail = document.getElementById('trail');

let mx = 0, my = 0, tx = 0, ty = 0;

// Mouse move
document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});

// Animate trail
function animTrail() {
    tx += (mx - tx) * 0.1;
    ty += (my - ty) * 0.1;

    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';

    requestAnimationFrame(animTrail);
}
animTrail();

// Hover effects
document.querySelectorAll('a, button, .skill-card, .project-hero, .edu-card, .clink')
    .forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '18px';
            cursor.style.height = '18px';
            trail.style.width = '50px';
            trail.style.height = '50px';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            trail.style.width = '32px';
            trail.style.height = '32px';
        });
    });

// Navbar scroll effect
window.addEventListener('scroll', () => {
    document.getElementById('navbar')
        .classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu toggle
function toggleMenu() {
    document.getElementById('navLinks')
        .classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a')
    .forEach((a) => {
        a.addEventListener('click', () => {
            document.getElementById('navLinks')
                .classList.remove('open');
        });
    });

// Skills animation observer
const skillObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.sk-fill')
                .forEach((b) => b.classList.add('animate'));

            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });

const sg = document.getElementById('skillsGrid');
if (sg) skillObs.observe(sg);

// Reveal animation observer
const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.classList.add('visible');
            }, i * 80);

            revObs.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach((el) => revObs.observe(el));

// Form submission
function submitForm() {
    const n = document.getElementById('fname').value.trim();
    const e = document.getElementById('femail').value.trim();
    const m = document.getElementById('fmsg').value.trim();

    if (!n || !e || !m) {
        alert('Please fill out all fields.');
        return;
    }

    document.getElementById('formSuccess').style.display = 'block';

    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fmsg').value = '';

    setTimeout(() => {
        document.getElementById('formSuccess').style.display = 'none';
    }, 5000);
}