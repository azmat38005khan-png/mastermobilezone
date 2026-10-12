// Mobile menu toggle
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

// Search + filter
const search = document.getElementById('search');
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
const cardsWrap = document.getElementById('cards');

let activeCat = 'all';
let q = '';

function applyFilter() {
  let visible = 0;
  cards.forEach(c => {
    const cat = c.dataset.cat;
    const key = (c.dataset.key || '').toLowerCase();
    const text = c.innerText.toLowerCase();
    const matchCat = activeCat === 'all' || cat === activeCat;
    const matchQ = !q || key.includes(q) || text.includes(q);
    if (matchCat && matchQ) { c.classList.remove('hidden'); visible++; }
    else c.classList.add('hidden');
  });
  if (cardsWrap) {
    if (visible === 0) cardsWrap.classList.add('no-results-shown');
    else cardsWrap.classList.remove('no-results-shown');
  }
}

if (search) {
  search.addEventListener('input', e => {
    q = e.target.value.trim().toLowerCase();
    applyFilter();
  });
}
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeCat = chip.dataset.cat;
    applyFilter();
  });
});
