var plane = new Plane(250,10);
var planeView = new PlaneView(plane,document.body, {glidersCount: 255, pointWidth:10});

planeView.iterate();