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