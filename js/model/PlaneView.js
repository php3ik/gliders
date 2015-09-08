var PlaneView = function(plane, div, options) {
    this.div = div;
    this.r = new Rainbow();
    this.r.setSpectrum('blue','yellow', 'red');
    this.r.setNumberRange(0, 255)
    this.plane = plane;
    this.options = options || {};
    this.pointWidth = this.options.pointWidth || 5;
    this.canvas = document.createElement('canvas');
    this.canvas.width = plane.width * this.pointWidth;
    this.canvas.height = plane.height * this.pointWidth;
    this.div.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.gliders = [];
    if (this.options.glidersCount) {
        for (var i = 0; i < this.options.glidersCount; i++) {
            this.gliders.push(new Glider(this.plane, Math.floor(Math.abs(Math.random() * this.plane.width-2)), Math.abs(Math.round(Math.random() * this.plane.height-2))));
        }
    }
};

PlaneView.prototype.drawPlane = function() {
    this.ctx.clearRect(0,0,this.canvas.width , this.canvas.height );
    for (var x = 0; x < this.plane.width; x++) {
        for (var y = 0; y < this.plane.height; y++) {
            this.ctx.fillStyle = 'rgba(1,1,1,'+this.plane.points[x][y]+')';
            this.ctx.fillRect(x*this.pointWidth, y*this.pointWidth, this.pointWidth, this.pointWidth);
        }
    }
};

PlaneView.prototype.iterate = function() {
    for (var i = 0; i < this.gliders.length; i++) {
        this.gliders[i].step();
    };
    this.drawPlane();
    this.drawGliders();
    var self = this;
    requestAnimationFrame(function(){
        self.iterate();
    })
};

PlaneView.prototype.drawGliders = function() {
    for (var i = 0; i < this.gliders.length; i++) {
        this.ctx.fillStyle = '#' + this.r.colourAt(this.gliders[i].unicVector*255);
        this.ctx.fillRect(this.gliders[i].x*this.pointWidth,this.gliders[i].y*this.pointWidth, this.pointWidth, this.pointWidth);
    };
};