var n = {};

function init()
{
    n.paint = new Paint();
    n.paint.mountTo(document.body);
    n.paint.test();
    run();
}


function run()
{
    n.paint.run();
    window.requestAnimationFrame(run);
}



function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
