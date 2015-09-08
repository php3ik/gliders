var Plane = function(width, height, imageCtx) {
    if (imageCtx) {
        this.image = imageCtx;
    }
    this.width = width;
    this.height = height;
    this.points = [];
    for (var x = 0; x < this.width; x++) {
        this.points[x] = [];
        for (var y = 0; y< this.height; y++) {
            if (!this.image) {
                this.points[x].push(new Point(Math.random()*2 -1, Math.random()*2 -1))
                this.points[x][y].height = Math.random();
            } else {
                this.points[x][y] = new Point(Math.random()*2 -1, Math.random()*2 -1);
                this.points[x][y].height = (this.image.getImageData(x,y,1,1).data[1])/255;
            }
        }
    };
    this.vecArray  = [
        [0,-1],
        [1,-1],
        [1,0],
        [1,1],
        [0,1],
        [-1,1],
        [-1,0],
        [-1,-1]
    ]
    for (var x = 0; x < this.width; x++) {
        for (var y = 0; y< this.height; y++) {
            var n = this.getNeibs(x,y);
            var p = this.getPointXY(x,y);
            var minHeight = 1;
            var minHeightId = 0;
            for (var i=0; i < n.length; i++) {
               if (minHeight > n[i].height) {
                   minHeight = n[i].height;
                   minHeightId = i;
               }
            }
            p.x = this.vecArray[minHeightId][0];
            p.y = this.vecArray[minHeightId][1];
        }
    };
    this.maxLength = Math.sqrt(50);
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