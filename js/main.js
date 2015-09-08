paper.install(window);
var pic = document.createElement('img');
pic.src = 'pic/earth.jpg';
var canvas = document.createElement('canvas');
w = 70;
h = 51;
pic.onload = function(){
    canvas.width = w;
    canvas.height = h;
    var picCtx = canvas.getContext('2d');
    picCtx.drawImage(pic,0,0,pic.width,pic.height,0,0,w,h);
    var plane = new Plane(canvas.width,canvas.height, picCtx);
    var planeView = new PlaneView(plane,document.body, {glidersCount: 400, pointWidth:10});

    planeView.iterate();
}