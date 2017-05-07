var s;
var scl = 20;
var food; // vektori säilöö ruuan koordinaatit
var score = 0; // pistelaskuri
var game = false;
var ft = 255; // ruuan läpinäkyvyys pelin aikana/tulosnäytössä

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent("snake");
    frameRate(12);
    pickLocation();
}

function pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function draw() {
    background(51);

    if (game == true) {
        startGame();
    } else {
        showTitleScreen();
    }

    // näytä ruoka
    noStroke();
    fill(255, 0, 100, ft);
    rect(food.x, food.y, scl, scl);

}

function keyPressed() {
    var k = keyCode;
    switch (true) {
        case k == UP_ARROW && s.last != DOWN_ARROW:
            s.dir(0, -1);
            s.last = k;
            break;
        case k == DOWN_ARROW && s.last != UP_ARROW:
            s.dir(0, 1);
            s.last = k;
            break;
        case k == RIGHT_ARROW && s.last != LEFT_ARROW:
            s.dir(1, 0);
            s.last = k;
            break;
        case k == LEFT_ARROW && s.last != RIGHT_ARROW:
            s.dir(-1, 0);
            s.last = k;
            break;
        case k == ENTER && game == false:
            s = new Snake();
            game = true;
            break;
    }
}

function startGame() {
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
        score = s.total - 1;
    }
    // näytä pistelaskuri
    fill(255, 255, 255, 55);
    textSize(20);
    textAlign(LEFT);
    text("watermelons eaten: " + score, 25, height - 30);
}

function showTitleScreen() {
    ft = 0;
    background(46);
    if (s != null) {
        ft = 70;
        s.show();
        s.stop();
    }
    noStroke();
    fill(255, 0, 100);
    textSize(28);
    textAlign(CENTER);
    if (score != 0) {
        text("score: " + score, width / 2, height / 2 - 60);
    }
    fill(255);
    textSize(32);
    text("press enter to start", width / 2, height / 2);
    fill(230);
    textSize(20);
    text("use the arrow keys to", width / 2, height / 2 + 50);
    text("steer your snake", width / 2, height / 2 + 75);
}
