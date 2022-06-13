const canvas = document.getElementById("matrix_effect");
const ctx = canvas.getContext("2d");

function resize () {
  ctx.canvas.width = window.innerWidth - 52;
  ctx.canvas.height = window.innerHeight - 52;
}

resize();

window.addEventListener("resize", () => {
  resize();
  effect.resize(canvas.width, canvas.height);
});

class Symbol {
  constructor (x, y, fontSize, canvasHeight) {
    this.characters = '코드는_아름답다. 상(상)력을 자극하고!많은^멋있는~것을:만들수있지않[나]';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
  }

  draw () {
    const randIndex = Math.floor(Math.random() * this.characters.length);
    this.text = this.characters.charAt(randIndex);

    const xFit = this.x * this.fontSize;
    const yFit = this.y * this.fontSize;
    ctx.fillText(this.text, xFit, yFit);

    if (yFit > this.canvasHeight && Math.random() > 0.999)
      this.y = 0;
    else 
      this.y += 1;
  }
}

class Effect {
  constructor (canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];

    this.#initialize();
  }

  #initialize () {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }

  resize (newWidth, newHeight) {
    this.canvasWidth = newWidth;
    this.canvasHeight = newHeight;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];

    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);

let lastTime = 0, timer = 0;
const fps = 30, nextFrame = 1000 / fps;

function animate (timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (timer > nextFrame) {
    ctx.fillStyle = 'rgba(255,255,255, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = `${effect.fontSize}px monospace`;
    effect.symbols.forEach(symbol => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
};

animate(0);

const cards = new Array(5).fill(0).map((_, i) => document.getElementById(`card_${i + 1}`)); 
const big = "calc(100% / 1.8)", small = "calc(100% / 10)";

cards.forEach((card, j) => card.addEventListener("click", () => {
    cards.forEach((card, i) => {
      const [image] = card.getElementsByTagName("div");
      const [link] = card.getElementsByTagName("a");
      const text = card.getElementsByTagName("h2");
      const elems = [image, link, ...text];

      if (i !== j) {
        card.style.width = small;
        
        for (let i = 0; i < elems.length; i++) {
          elems[i].style.visibility = "hidden";
        }
      
        return;
      }

      card.style.width = big;
      
      setTimeout(() => {        
        for (let i = 0; i < elems.length; i++) {
          elems[i].style.visibility = "visible";
        }
      }, 250);

      document.getElementById("card_title").innerText = card.dataset.title;
    });
}));