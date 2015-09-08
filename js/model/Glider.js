var Glider = function(plane, x, y) {
    this.plane = plane;
    this.x = x;
    this.y = y;
    this.currentPointVec = this.plane.points[Math.round(this.x)][Math.round(this.y)];
    this.unicVector = new Point((Math.random()*2 -1)*1.7, (Math.random()*2 -1)*1.7);
};
Glider.prototype.step = function() {
    var oldx = this.x;
    var oldy = this.y;
    var neibs = this.plane.getNeibs(Math.floor(oldx),Math.floor(oldy));

    var stepToCoords = this.currentPointVec.add(this.unicVector);
    var x = stepToCoords.x + this.x;
    var y = stepToCoords.y + this.y;
    x = (x<0) ? this.plane.width + x : x%this.plane.width;
    y = (y<0) ? this.plane.height + y : y%this.plane.height;
    if (isNaN(x) || isNaN(y)) {
        console.log(x,y);
    }
    this.x = x;
    this.y = y;
    this.unicVector.x = (this.unicVector.x + this.currentPointVec.x * 0.01)/1.01;
    this.unicVector.y = (this.unicVector.y + this.currentPointVec.y * 0.01)/1.01;

    this.currentPointVec = this.plane.points[Math.floor(this.x)][Math.floor(this.y)];

    var minHeight = 1;
    var minHeightId = 0;
    var n = neibs;
    for (var i=0; i < n.length; i++) {
        if (minHeight > n[i].height) {
            minHeight = n[i].height;
            minHeightId = i;
        }
    }
    var p = this.plane.getPointXY(Math.floor(oldx),Math.floor(oldy));
    p.x = this.plane.vecArray[minHeightId][0] + this.unicVector.x;
    p.y = this.plane.vecArray[minHeightId][1] + this.unicVector.y;

    var heightDiff = p.height - this.currentPointVec.height;
    //if (Math.floor(x) == 50 && Math.floor(y) ==50) {
     //   this.currentPointVec.height = 0;
    //}
    p.height -= heightDiff*0.2;
    this.currentPointVec.height += heightDiff*0.2;
};