const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

function resize(){
  ctx.canvas.width = window.innerWidth - 52;
  ctx.canvas.height = window.innerHeight - 52;
}

let coord = { x: 0 , y: 0 }; 
let paint = false;

const getPosition = event => {
    const offset = 25;
    coord.x = event.clientX - offset;
    coord.y = event.clientY - offset;
}

function startPainting (event) {
    paint = true;
    getPosition(event);
}

function stopPainting (){
    paint = false;
}

function sketch(event){
  if (!paint) return;
  ctx.beginPath();

  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'green';

  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
}

window.addEventListener('load', ()=>{
    resize();
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
});

const links = [".bio", ".skills", ".resume", ".work"];
const [
    bio,
    skills,
    resume,
    work
] = links.map(link => document.querySelector(link));

bio.classList.add("active");
setTimeout(() => skills.classList.add("active"), 175);
setTimeout(() => resume.classList.add("active"), 475);
setTimeout(() => work.classList.add("active"), 800);

const change_text = document.getElementById("text_switch");
const initial_text = document.getElementById("text_switch").innerText;

bio.addEventListener("mouseover", () => change_text.innerText = "About Me");
skills.addEventListener("mouseover", () => change_text.innerText = "Skills");
resume.addEventListener("mouseover", () => change_text.innerText = "Resume");
work.addEventListener("mouseover", () => change_text.innerText = "Portfolio");

const cursor = document.querySelector('.cursor');
const cursorinner = document.querySelector('.cursor2');

document.addEventListener('mousemove', function(e){
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  const x = e.clientX;
  const y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
  cursor.classList.add('click');
  cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
  cursor.classList.remove('click')
  cursorinner.classList.remove('cursorinnerhover')
});