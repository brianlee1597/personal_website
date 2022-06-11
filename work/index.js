const cursor = document.querySelector('.cursor');
const cursorinner = document.querySelector('.cursor2');

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});

const cards = new Array(5).fill(0).map((_, i) => document.getElementById(`card_${i + 1}`)); 
const big = "calc(100% / 2)", small = "calc(100% / 10)";

cards.forEach((card, j) => card.addEventListener("mouseover", () => {
    cards.forEach((card, i) => {
        if (i !== j) {
            card.style.width = small;
            return;
        }

        card.style.width = big;
        document.getElementById("card_title").innerText = card.dataset.title;
    });
}));