const toggle = document.getElementById('mobile-menu');
const nav = document.querySelector('.nav-links');
const overlay = document.getElementById('overlay');

toggle.onclick = () => {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
}

overlay.onclick = () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
}