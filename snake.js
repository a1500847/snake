function Snake() {
  this.x = scl*12;
  this.y = 0;
  this.xspeed = 0;
  this.yspeed = 1;
  this.total = 1;
  this.tail = [];
  this.last = 0;  //estää peruuttamisen

  // suunta
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  // syö ruuan -> total kasvaa yhdellä
  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < scl) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        game = false;
      }
    }
  }

  // käärmeen liike
  this.update = function() {
    // Jos ruokaa ei ole syöty, lisää uusi pikseli, siirrä
    // vanhat pikselit yhdellä alaspäin ja poista vanhin.
    // Jos ruokaa on syöty, älä poista vanhinta.
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;
  }

  // screen wrap around
  this.wrap = function() {
      if (this.x > width-scl) {
          this.x = 0;
      } else if (this.x < 0) {
          this.x = width-scl;
      }
      if (this.y > height-scl) {
          this.y = 0;
      } else if (this.y < 0) {
          this.y = height-scl;
      }
  }

  // näytä käärme
  this.show = function() {
    fill(255);
    if (game == false) {
      fill(255, 255, 255, 50);
    }
    noStroke();
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    //rect(this.x, this.y, scl, scl);
  }
}
