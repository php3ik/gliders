var Glider = function(plane, x, y) {
    this.plane = plane;
    this.x = x;
    this.y = y;
    this.value = this.plane.points[this.x][this.y];
    this.unicVector = Math.random();
};
Glider.prototype.step = function() {
    var oldx = this.x;
    var oldy = this.y;
    var stepToCoords = this.plane.getNeibCoordsByValue(this.x,this.y,(this.plane.points[this.x][this.y] * 80 + this.unicVector*20)/100);
    var x = stepToCoords.x;
    var y = stepToCoords.y;
    x = (x<0) ? this.plane.width + x : x%this.plane.width;
    y = (y<0) ? this.plane.height + y : y%this.plane.height;

    this.x = x;
    this.y = y;
    this.value = this.plane.points[this.x][this.y];
    this.plane.points[x][y] = (95*this.plane.points[x][y] + 5*this.unicVector)/100;
};