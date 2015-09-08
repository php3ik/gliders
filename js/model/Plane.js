var Plane = function(width, height) {
    this.width = width;
    this.height = height;
    this.points = [];
    for (var x = 0; x < this.width; x++) {
        this.points[x] = [];
        for (var y = 0; y< this.height; y++) {
            this.points[x][y] = Math.random();
        }
    };
    this.neibByValueFunctions = [
        function(x,y){return {x: x, y:y-1}},
        function(x,y){return {x: x+1, y:y-1}},
        function(x,y){return {x: x+1, y:y}},
        function(x,y){return {x: x+1, y:y+1}},
        function(x,y){return {x: x, y:y+1}},
        function(x,y){return {x: x-1, y:y+1}},
        function(x,y){return {x: x-1, y:y}},
        function(x,y){return {x: x-1, y:y-1}}
    ]
};

Plane.prototype.getPointXY = function(x,y) {
    x = (x<0) ? this.width + x : x%this.width;
    y = (y<0) ? this.height + y : y%this.height;
    return this.points[x][y];
};

Plane.prototype.getNeibs = function(x,y) {
    var neibs = [];
    neibs.push(this.getPointXY(x,y-1));
    neibs.push(this.getPointXY(x+1,y-1));
    neibs.push(this.getPointXY(x+1,y));
    neibs.push(this.getPointXY(x+1,y+1));
    neibs.push(this.getPointXY(x,y+1));
    neibs.push(this.getPointXY(x-1,y+1));
    neibs.push(this.getPointXY(x-1,y));
    neibs.push(this.getPointXY(x-1,y-1));
    return neibs;
};

Plane.prototype.getNeibCoordsByValue = function(x,y,value) {
    var coordFunc = this.neibByValueFunctions[Math.min(Math.floor(Math.abs(value)*8),7)];
    if (coordFunc) {
        return coordFunc(x,y);
    }
        console.log(x, y, value, coordFunc)
};

Plane.prototype.print = function() {
    var res = '';
    for (var x = 0; x < this.width; x++) {
        for (var y = 0; y < this.height; y++) {
            res += ' ' + this.points[x][y];
        }
        res +='\n';
    };
    console.log(res);
}