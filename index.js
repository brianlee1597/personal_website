const ctx = select('#canvas').getContext('2d');
const change_text = select("#text_switch");
change_text.style.color = "#FFB612";

new class CircleAnimation {
  constructor () {
    this.links = [
      this.#makeObj(select(".bio"), "Bio", "#FFB612", 0),
      this.#makeObj(select(".skills"), "Skills", "#C60C30", 200),
      this.#makeObj(select(".resume"), "Resume", "rgb(0, 114, 206)", 500),
      this.#makeObj(select(".work"), "Work", "#228B22", 800),
    ];

    this.links.forEach(link => {
      setTimeout(() => link.dom.classList.add("active"), link.delay);
      link.dom.addEventListener("mouseover", () => {
        change_text.innerText = link.innerText;
        change_text.style.color = link.color;
      });
    })
  }
  
  #makeObj (dom, innerText, color, delay) {
    return { dom, innerText, color, delay };
  }; 
}();

new class PaintBox {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.coord = { x: this.x, y: this.y };
    this.paint = false;
    this.offset = 25;

    win_listen('load', ()=>{
      this.resize();
      doc_listen('mousedown', (event) => this.startPainting(event));
      doc_listen('mouseup', () => this.stopPainting());
      doc_listen('mousemove', (event) => this.sketch(event));
      win_listen('resize', this.resize);
    });
  }

  #getPosition (event) {
    this.coord.x = event.clientX - this.offset;
    this.coord.y = event.clientY - this.offset;
  }

  resize(){
    ctx.canvas.width = window.innerWidth - 56;
    ctx.canvas.height = window.innerHeight - 56;
  }  

  startPainting (event) {
    this.paint = true;
    this.#getPosition(event);
  }

  stopPainting () {
    this.paint = false;
  }

  sketch (event) {
    if (!this.paint) return;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = change_text.style.color;
    ctx.moveTo(this.coord.x, this.coord.y);
    this.#getPosition(event);
    ctx.lineTo(this.coord.x , this.coord.y);
    ctx.stroke();
  }
}();