class Brush {
  constructor(name, active, func) {
    this.name = name;
    this.active = false;
    this.func = func;
    this.colorbtn = [0, 0, 0];
    this.btn = createButton(this.name);
    // this.riso = currentRiso;
  }
  changeActive() {
    this.active = !this.active;
    this.colorbtn = c;
    // console.log("this changed");
  }
  updatebrush() {
    this.colorbtn = c;
  }
  createBtn() {
    this.btn.addClass("btn");
    this.btn.mousePressed(() => {
      this.changeActive();
      // console.log(x.name);
      this.btn.toggleClass("active");
    });
  }
  runfunction() {
    this.func(this.colorbtn);
  }
}
// const risoColors = [];
// for (const { name } of RISOCOLORS) {
//   risoColors.push(name.toLowerCase());
// }
var risoColors = [
  "green",
  "red",
  "blue",
  "mint",
  "orange",
  "flatgod",
  "yellow",
  "purple",
  "black",
  "peach",
  "aqua",
  "fluorescentpink",
  "fluorescentorange",
  "smokyteal",
];
// var currentRiso = 0;
// console.log(risoColors);
var brushNum;
// var brushColor = [180, 0, 200];
var brushColor = ["#ff2205", "#3f05ff", "#91ff01", "#ffffff"];
var brushStroke = false;
var opacity = 200;
var opacityMax = 255;
var opacityMin = 0;
var opacityStep = 10;
let c;
let x2 = 0,
  y2 = 0;
let brushSize = 5;
let f = false;
let spring = 0.4;
let friction = 0.45;
let v = 0.5;
let r = 0;
let vx = 0;
let vy = 0;
let splitNum = 100;
let diff = 8;
let blueCa;
var widthof = 5;
var widthofMax = 500;
var widthofMin = 1;
var widthofStep = 1;
let previousState;

let stateIndex = 0;
function preload() {
  // img = loadImage("img.jpeg");
}
function setup() {
  createCanvas(windowWidth * 0.8, windowHeight);
  background("#ffffff");
  gui = createGui();
  gui.setPosition(windowWidth * 0.82, 0);
  gui.addGlobals("brushColor", "opacity", "risoColors", "widthof");
  brushes = [];
  addbrushes();
  createinterface();
  saveState();
  // blueCa = new Riso("blue");
  // let justCyan = extractCMYKChannel(img, "blue");
  // blueCa.image(justCyan, 0, 0);
}

function draw() {
  clearRiso();
  // risoNoStroke();
  // tint(255, 127);
  c = color(brushColor);
  c.setAlpha(opacity);
  if (mouseIsPressed === true) {
    saveState();
    for (x1 of brushes) {
      if (x1.active) {
        x1.runfunction();
        // console.log(x);
      }
    }
  }
  // drawRiso();
}
function keyPressed(e) {
  if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
    undoToPreviousState();
  }
}

function touchMoved() {
  return false;
}
function updatebrush() {
  for (x1 of brushes) {
    x1.updatebrush();
  }
}
function keyPressed() {
  if (key === "s") {
    save("mySketch.png");
  }
}
function addbrushes() {
  brushes.push(new Brush("eraser", false, eraser));
  brushes.push(new Brush("eraser2", false, eraser2));
  brushes.push(new Brush("circleBrush", false, circleBrush));
  brushes.push(new Brush("sprayPaint", false, sprayPaint));
  brushes.push(new Brush("hatching", false, hatching));
  brushes.push(new Brush("brushtest1", false, brushtest1));
  brushes.push(new Brush("brushtest2-1", false, brushtest2));
  brushes.push(new Brush("brushtest2-2", false, brushtest3));
  brushes.push(new Brush("brushtest2-3", false, brushtest33));
  brushes.push(new Brush("brushtest4", false, brushtest4));
  brushes.push(new Brush("brushtest5", false, brushtest5));
  brushes.push(new Brush("brushtest6", false, brushtest6));
  brushes.push(new Brush("brushtest7", false, brushtest7));
}
function createinterface() {
  mygui = createDiv("");
  mygui.addClass("brushes");
  let saveBtn = createButton("save");
  saveBtn.addClass("btnBig");
  saveBtn.mousePressed(() => {
    save("mySketch.png");
    // exportRiso();
  });
  let clearBtn = createButton("clear");
  clearBtn.addClass("btnBig");
  clearBtn.mousePressed(() => {
    background("#ffffff");
  });
  let updateBtn = createButton("update");
  updateBtn.addClass("btnBig");
  updateBtn.mousePressed(() => {
    updatebrush();
  });
  mygui.child(saveBtn);
  mygui.child(clearBtn);
  mygui.child(updateBtn);
  for (x1 of brushes) {
    x1.createBtn();
    mygui.child(x1.btn);
  }
}
function keyPressed() {
  if (keyCode === 69) {
    background("#ffffff");
  }
}
function sprayPaint(colorbtn) {
  stroke(colorbtn);

  strokeWeight(1);

  const speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);

  const minRadius = widthof;
  const sprayDensity = 80;

  const r = minRadius;
  const rSquared = r * r;

  const lerps = 20;

  for (let i = 0; i < lerps; i++) {
    const lerpX = lerp(mouseX, pmouseX, i / lerps / 2);
    const lerpY = lerp(mouseY, pmouseY, i / lerps / 2);

    for (let j = 0; j < sprayDensity; j++) {
      const randX = random(-r, r);
      const randY = random(-1, 1) * sqrt(rSquared - randX * randX);

      point(lerpX + randX, lerpY + randY);
    }
  }
}
function hatching(colorbtn) {
  stroke(colorbtn);
  strokeWeight(1);

  let speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);

  const vector = createVector(mouseY - pmouseY, mouseX - pmouseX);

  vector.setMag(speed / 2);

  const lerps = 10;

  for (let i = 0; i < lerps; i++) {
    const x = lerp(mouseX, pmouseX, i / lerps);
    const y = lerp(mouseY, pmouseY, i / lerps);

    line(x - vector.x, y - vector.y, x + vector.x, y + vector.y);
  }
}

function circleBrush(colorbtn) {
  const hsbaColor = color(`hsba(${brushColor}, 100%, 100%, 0.6)`);
  fill(colorbtn);
  noStroke();
  const distance = dist(mouseX, mouseY, pmouseX, pmouseY);
  const midX = (mouseX + pmouseX) / 2;
  const midY = (mouseY + pmouseY) / 2;
  circle(midX, midY, distance);
}
function eraser() {
  noStroke();
  fill(255);
  circle(mouseX, mouseY, widthof);
}
function eraser2() {
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(mouseX, mouseY, widthof / 2);
}
function brushtest1(colorbtn) {
  fill(colorbtn);
  noStroke();
  push();
  translate(mouseX, mouseY);
  const angle = Math.atan2(mouseY - pmouseY, mouseX - pmouseX);
  rotate(angle);
  const minSize = widthof;
  const distance = dist(mouseX, mouseY, pmouseX, pmouseY);
  ellipse(0, 0, distance * 18 + minSize, minSize);
  pop();
}
function brushtest2(colorbtn) {
  stroke(colorbtn);
  strokeWeight(1);
  const width = widthof;
  const lerps = 10;
  for (let i = 0; i <= lerps - 1; i++) {
    const x = lerp(mouseX, pmouseX, i / lerps);
    const y = lerp(mouseY, pmouseY, i / lerps);
    line(x - width, y - width, x + width, y + width);
  }
}
function brushtest33(colorbtn) {
  stroke(colorbtn);
  strokeWeight(1);
  const width = widthof;
  const lerps = 10;
  for (let i = 0; i <= lerps - 1; i++) {
    const x = lerp(mouseX, pmouseX, i / lerps);
    const y = lerp(mouseY, pmouseY, i / lerps);
    line(x - width, y + width, x + width, y + width);
  }
}
function brushtest3(colorbtn) {
  stroke(colorbtn);
  strokeWeight(1);
  const width = widthof * -1;
  const lerps = 16;
  for (let i = 0; i <= lerps - 1; i++) {
    const x = lerp(mouseX, pmouseX, i / lerps);
    const y = lerp(mouseY, pmouseY, i / lerps);
    line(x - width, y - width, x + width, y + width);
    line(width - (x - width), y - width, x + width, y + width);
  }
}
function brushtest4(colorbtn) {
  stroke(colorbtn);
  let changin = map(widthof, 0, 500, 0, 30);
  strokeWeight(changin);
  const lerps = 4;
  for (let i = 0; i < lerps; i++) {
    const x = lerp(mouseX, pmouseX, i / lerps + lerps);
    const y = lerp(mouseY, pmouseY, i / lerps + lerps);
    point(x, y);
  }
}
function brushtest5(colorbtn) {
  stroke(colorbtn);
  let x = mouseX;
  let y = mouseY;
  if (!f) {
    f = true;
    x = mouseX;
    y = mouseY;
  }
  vx += (mouseX - x) * spring;
  vy += (mouseY - y) * spring;
  vx *= friction;
  vy *= friction;

  v += sqrt(vx * vx + vy * vy) - v;
  v *= 0.6;

  oldR = r;
  r = brushSize - v;
  // console.log("going");
  for (let i = 0; i < splitNum; ++i) {
    oldX = x;
    oldY = y;
    x += vx / splitNum;
    y += vy / splitNum;
    oldR += (r - oldR) / splitNum;
    if (oldR < 1) {
      oldR = 1;
    }
    stroke(colorbtn);

    strokeWeight(oldR + diff);
    line(x, y, oldX, oldY);
    strokeWeight(oldR);
    line(x + diff * 1.5, y + diff * 2, oldX + diff * 2, oldY + diff * 2);
    line(x - diff, y - diff, oldX - diff, oldY - diff);
  }
}
function brushtest6(colorbtn) {
  brushSize = widthof;
  stroke(colorbtn);
  // let y = mouseY;
  // let x2 = mouseX;
  // let y2 = mouseY;
  if (!f) {
    f = true;
    x2 = mouseX;
    y2 = mouseY;
  }
  vx += (mouseX - x2) * spring;
  vy += (mouseY - y2) * spring;
  vx *= friction;
  vy *= friction;

  v += sqrt(vx * vx + vy * vy) - v;
  v *= 0.6;

  oldR = r;
  r = brushSize - v;
  // console.log("going");
  for (let i = 0; i < splitNum; ++i) {
    oldX = x2;
    oldY = y2;
    x2 += vx / splitNum;
    y2 += vy / splitNum;
    oldR += (r - oldR) / splitNum;
    if (oldR < 1) {
      oldR = 1;
    }
    stroke(colorbtn);

    strokeWeight(oldR + diff);
    line(x2, y2, oldX, oldY);
    strokeWeight(oldR);
    line(x2 + diff * 1.5, y2 + diff * 2, oldX + diff * 2, oldY + diff * 2);
    line(x2 - diff, y2 - diff, oldX - diff, oldY - diff);
    // console.log(x);
  }
}
function brushtest7(colorbtn) {
  fill(colorbtn);
  noStroke();
  let size = 20;
  let tive = random();
  if (tive < 0.5) {
    tive = -1;
  } else {
    tive = 1;
  }
  let bigdis = sqrt(
    pow(abs(mouseX - pmouseX), 2) + pow(abs(mouseY - pmouseY), 2)
  );
  let smaldis = sqrt(2) * size;
  tiveX = 1;
  tiveY = 1;
  let dis = bigdis / smaldis;
  if (mouseX < pmouseX) {
    tiveX = -1;
  } else {
    tiveX = 1;
  }
  if (mouseY < pmouseY) {
    tiveY = -1;
  } else {
    tiveY = 1;
  }
  for (let i = 0; i < dis; i++) {
    // let x = lerp(mouseX, pmouseX, i / dis);
    // let y = lerp(mouseY, pmouseY, i / dis);
    // circle(x + random() * 100 * tive, y + random() * tive * 100, size);
    //
    rect(mouseX + i * tiveX * size, mouseY + i * tiveY * size, size, size);
  }
  // rect(mouseX + random() * 100 * tive, mouseY + random() * tive * 100, 20, 20);
}
// influenced by : https://library.superhi.com/posts/how-to-paint-with-code-creating-paintbrushes
// used p5.gui, p5.riso for this project
