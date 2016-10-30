var s;
var scl = 20;
var food; // Vektori säilöö ruuan koordinaatit
var score = 0; // Pistelaskuri
var peli = false;
var ft = 255; // Ruuan läpinäkyvyysarvo

function setup() {
  var canvas = createCanvas(500,500);
  canvas.parent("snake");
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(51);

  // Näytä alku- /lopputekstit
  if (peli == false) {
    ft = 0;
    background(46);
    if (s != null) {
      ft = 70;
      s.show();
      s.xspeed = 0;
      s.yspeed = 0;
    } //else {} Tähän jotain taidetta?
    
    noStroke();
    fill(255, 0, 100);
    textSize(28);
    textAlign(CENTER);
    if (score != 0) {
      text("score: " + score, width/2, height/2-60);
    }
    fill(255);
    textSize(32);
    text("press backspace to start", width/2, height/2);
    fill(230);
    textSize(20);
    text("use the arrow keys to", width/2, height/2+50);
    text("steer your snake", width/2, height/2+75);
  }

  // Peli käynnissä
  if (peli == true){
    ft = 255;
    if (s.eat(food)) {
      pickLocation();
    }
    s.death()
    s.wrap();
    s.update();
    s.show();

    // Laske pisteet
    if (s.total == 0 || s.total == 1) {
      score = 0;
    } else {
      score = s.total-1;
    }
    // Näytä pistelaskuri
    fill(255, 255, 255, 55);
    textSize(20);
    textAlign(LEFT);
    text("watermelons eaten: " + score, 25, height-30);
  }

  // Näytä ruoka
  noStroke();
  fill(255, 0, 100, ft);
  rect(food.x, food.y, scl, scl);
}

function keyPressed() {
  if ((keyCode == UP_ARROW && s.comp != 2)) {
    s.dir(0, -1);
    s.comp = 1;
  } else if ((keyCode == DOWN_ARROW && s.comp != 1)) {
    s.dir(0, 1);
    s.comp = 2;
  } else if ((keyCode == RIGHT_ARROW && s.comp != 4)) {
    s.dir(1, 0);
    s.comp = 3;
  } else if ((keyCode == LEFT_ARROW && s.comp != 3)) {
    s.dir(-1, 0);
    s.comp = 4;
  } else if (keyCode == BACKSPACE && peli == false) {
    // Aloittaa pelin
    s = new Snake();
    peli = true;
  }
  return false;
}

/*
// Testausta varten
function mousePressed() {
  if (peli == true) {
    s.total++;
  }
}
*/
