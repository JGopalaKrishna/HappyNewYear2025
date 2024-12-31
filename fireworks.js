"use strict";

let canvas, width, height, ctx;
let fireworks = [];
let particles = [];
function setup() {
    canvas = document.getElementById("canvas");
    setCanvasSize(canvas);
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    fireworks.push(new Firework(randomRange(100, width - 100)));
    window.addEventListener("resize", windowResized);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("touchstart", onTouchStart);
}
function loop() {
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
    for (let i = fireworks.length - 1; i >= 0; i--) {
        let done = fireworks[i].update();
        fireworks[i].draw();
        if (done) fireworks.splice(i, 1); 
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].lifetime > 80) particles.splice(i, 1); 
    }
    if (Math.random() < 1 / 60) fireworks.push(new Firework(randomRange(100, width - 100)));
}
class Particle {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.vel = randomVec(2);
        this.lifetime = 0;
    }
    update() {
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.vel.y += 0.02;
        this.vel.x *= 0.99;
        this.vel.y *= 0.99;
        this.lifetime++;
    }
    draw() {
        ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0);
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}
class Firework {
    constructor(x) {
        this.x = x;
        this.y = height;
        this.isBlown = false;
        this.col = randomCol();
    }
    update() {
        this.y -= 3;
        if (this.y < height * 0.2 - Math.random() * height * 0.5) {
            this.isBlown = true;
            for (let i = 0; i < 30; i++) {
                particles.push(new Particle(this.x, this.y, this.col));
            }
        }
        return this.isBlown;
        }    
        draw() {
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}
function randomCol() {
    let letters = "0123456789ABCDEF";
    return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join("")}`;
}
function randomVec(max) {
    let dir = Math.random() * Math.PI * 2;
    let spd = Math.random() * max;
    return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
}
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}
function setCanvasSize(canv) {
    width = window.innerWidth;
    height = window.innerHeight;
    canv.width = width * window.devicePixelRatio;
    canv.height = height * window.devicePixelRatio;
    canv.style.width = `${width}px`;
    canv.style.height = `${height}px`;
    ctx = canv.getContext("2d");
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
function onClick(e) {
    fireworks.push(new Firework(e.clientX));
}
function onTouchStart(e) {
    let touch = e.touches[0];
    fireworks.push(new Firework(touch.clientX));
    e.preventDefault();
}
function windowResized() {
    setCanvasSize(canvas);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);
}
setup();
setInterval(loop, 1000 / 60); // 60 FPS

// My code
var wishes=["May this year be filled with love, laughter, and endless opportunities for growth.",
    "Wishing you a year of health, happiness, and success in all your endeavors.",
    "May every day of this year bring new reasons to smile and celebrate life.",
    "Here’s to a year of dreams coming true and goals being achieved.",
    "May the new year shower you with blessings, prosperity, and boundless joy.",
    "Wishing you strength to overcome challenges and wisdom to embrace opportunities.",
    "May 2025 be a year of wonderful surprises and exciting adventures for you.",
    "Here’s to a fresh start, new beginnings, and endless possibilities this year.",
    "May your days be bright, your nights restful, and your heart content all year long.",
    "Wishing you peace, prosperity, and happiness in every step you take this year."
]
var nameList=[]
function handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log(event.target.value);
      var name=event.target.value;
      nameList.push(name);console.log(nameList);
      document.getElementsByClassName("name")[0].innerHTML="'"+name.toUpperCase().trim()+"'";
      let randomInt = Math.floor(Math.random() * 10);
      document.getElementsByClassName("Cotation")[0].innerHTML=wishes[randomInt];
      Fireworks_Animation_Activate()
    }
  }
function Fireworks_Animation_Activate(){
  document.getElementsByTagName("canvas")[0].style.display="block";
  document.getElementsByClassName("wish")[0].style.display="block";
  document.getElementsByClassName("IntialBody")[0].style.display="none";

}
function ShowBack(){ document.getElementsByClassName("flip-card-inner")[0].style.transform="rotateY(180deg)" }
function ShowFront(){ document.getElementsByClassName("flip-card-inner")[0].style.transform="rotateY(360deg)" }