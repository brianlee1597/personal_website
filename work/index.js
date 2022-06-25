const canvas = select("#matrix_effect");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth - 56;
ctx.canvas.height = window.innerHeight - 56;

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

    const canBegin = yFit > this.canvasHeight && Math.random() > 0.999;
    this.y = canBegin ? 0 : this.y + 1;
  }
}

new class Effect {
  constructor (canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.lastTime = 0;
    this.timer = 0;
    this.fps = 30;
    this.nextFrame = 1000 / this.fps;    

    this.#initialize();
    win_listen("resize", () => this.resize(canvas.width, canvas.height));
  }

  #initialize () {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }

    this.animate(0);
  }

  animate (timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
  
    if (this.timer > this.nextFrame) {
      ctx.fillStyle = 'rgba(255,255,255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.font = `${this.fontSize}px monospace`;
      this.symbols.forEach(symbol => symbol.draw());
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
  
    requestAnimationFrame((ts) => this.animate(ts));
  };

  resize (newWidth, newHeight) {
    ctx.canvas.width = window.innerWidth - 56;
    ctx.canvas.height = window.innerHeight - 56;
    this.canvasWidth = newWidth;
    this.canvasHeight = newHeight;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];

    this.#initialize();
  }
}(canvas.width, canvas.height);

new class Cards {
  constructor () {
    this.cards = new Array(5).fill(0).map((_, i) => select(`#card_${i + 1}`)); 
    this.big = "calc(100% / 1.8)";
    this.small = "calc(100% / 10)";
    this.delay = 250;
    this.buffer = 50;
    this.click_disabled = false;

    this.cards.forEach((card, j) => card.addEventListener("click", () => {
      if (this.click_disabled) return;
    
        this.cards.forEach((card, i) => {
          const elems = [
            ...card.getElementsByTagName("div"), 
            ...card.getElementsByTagName("a"), 
            ...card.getElementsByTagName("h2"),
          ];
    
          if (i !== j) {        
            for (let i = 0; i < elems.length; i++)
              elems[i].style.visibility = "hidden";
          
            card.style.width = this.small;
            card.closed = true;
            return;
          }
          
          setTimeout(() => {        
            for (let i = 0; i < elems.length; i++)
              elems[i].style.visibility = "visible";
          }, this.delay - this.buffer);
    
          card.style.width = this.big;
          select("#card_title").innerText = card.dataset.title;
        });
    
        this.click_disabled = true;
        setTimeout(() => this.click_disabled = false, this.delay);
    }));
  }
}();