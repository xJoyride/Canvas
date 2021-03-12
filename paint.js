class Paint
{
    constructor()
    {

        // this.mouse.down = false;
        // this.mouse.x = 0;
        // this.mouse.y = 0;

        this.canvas = document.createElement('canvas');

        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        this.displayCanvas = document.createElement('canvas');
        this.displayCtx = this.displayCanvas.getContext('2d');
        this.displayCanvas.setAttribute('tabindex', '1');


        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;

        this.displayCanvas.height = window.innerHeight;
        this.displayCanvas.width = window.innerWidth;

        this.mouse = new Mouse(this.displayCanvas);

        this.mouse.addEventListener(this, 'mousedown', this.mousedown);
        this.mouse.addEventListener(this, 'mousemove', this.mousemove);
        this.mouse.addEventListener(this, 'mouseup', this.mouseup);
        this.mouse.addEventListener(this, 'click', this.click);

        // this.canvas.addEventListener("mousedown", (e)=> {this.mouseHandler('mousedown', e)});
        // this.canvas.addEventListener("mouseup", (e)=> {this.mouseHandler('mouseup', e)});
        // this.canvas.addEventListener("mousemove", (e)=> {this.mouseHandler('mousemove', e)});
        // this.canvas.addEventListener("click", (e)=> {this.mouseHandler('clicked', e)});

        this.displayCanvas.addEventListener("keydown", (e)=> {this.keyHandler(e, 'keydown')});
        this.displayCanvas.addEventListener("keyup", (e)=> {this.keyHandler(e, 'keyup')});
        this.displayCanvas.addEventListener("keypress", (e)=> {this.keyHandler(e, 'keypress')});

        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = "10px Arial";


        this.selectedNodes = [];

        // this.modes = [   {name: "1", modifiers: [false, false, false]},
        //                     {name: "2", modifiers: [true, false, false]}, //in the future you can move this to JSON
        //                     {name: "3", modifiers: [false, true, false]},
        //                     {name: "4", modifiers: [false, false, true]},
        //                     {name: "5", modifiers: [true, true, false]}];

        //this.keyCommands = [{name: ""}];

        this.kbm = new KeyBindManager();

        this.debug = true;

        this.openDialog = false;

        this.paintQueue = [];

        //createKeybind(key, modifiers, eventName, callback, autoadd)

        this.kbm.createKeybind(true, "ArrowLeft", [],     ()=>{this.scroll.horizontal += 9;});
        this.kbm.createKeybind(true, "ArrowRight", [],    ()=>{this.scroll.horizontal -= 9;});
        this.kbm.createKeybind(true, "ArrowUp", [],       ()=>{this.scroll.vertical += 9;});
        this.kbm.createKeybind(true, "ArrowDown", [],     ()=>{this.scroll.vertical -= 9;});
        this.kbm.createKeybind(true, "q", [],             ()=>{this.scale.x += 0.01; this.scale.y += 0.01;});
        this.kbm.createKeybind(true, "w", [],             ()=>{this.scale.x -= 0.01; this.scale.y -= 0.01;});
        this.kbm.createKeybind(true, "e", [],             ()=>{this.rotation-= Math.PI / 72;});
        this.kbm.createKeybind(true, "r", [],             ()=>{this.rotation+= Math.PI / 72;});


        this.scroll = {horizontal: 0, vertical: 0};
        this.scale = {x: 1, y: 1};
        this.rotation = 0;
    }

    mousedown(e)
    {
        var tmp = 0;
        switch(tmp)
        {
            case 0:
            break;
            case 1:
            break;
            case 2:
            break;
            case 3:
            case 4:
            break;
            default:
            break;
        }
    }

    mouseup(e)
    {
        var tmp = 0;
        switch(tmp)
        {
            case 0:
            break;
            case 1:
            break;
            case 2:
            break;
            case 3:
            break;
            case 4:
            break;
            default:
            break;

        }

    }

    mousemove(e)
    {
        var tmp = 0;
        switch(tmp)
        {
            case 0:
            break;
            case 1:
            break;
            case 2:
            break;
            case 3:
            break;
            case 4:
            break;
            default:
            break;
        }
    }

    click(e)
    {

    }

    keyHandler(e, eventName)
    {

        this.kbm.onKeyEvent(eventName, e);
        var key = e.key;


        // if(key === "ArrowLeft"){
        //
        //     // this.scroll.horizontal+=15;
        //
        // } else if (key === "ArrowRight") {
        //
        //     this.scroll.horizontal-=15;
        //
        // } else if (key === "ArrowUp"){
        //
        //     this.scroll.vertical+=15;
        //
        // } else if(key === "ArrowDown"){
        //
        //     this.scroll.vertical-=15;
        // }


        // if(eventName === "keypress")
        // if(key === "q"){
        //
        //     this.scale.x+=0.01;
        //     this.scale.y+=0.01;
        // } else if(key === "w"){
        //
        //     this.scale.x-=0.01;
        //     this.scale.y-=0.01;
        // } else if(key === "e"){
        //
        //     this.rotation+= Math.PI / 36;
        // } else if(key === "r"){
        //
        //     this.rotation-= Math.PI / 36;
        //
        // }



    }

    mountTo(e)
    {
        e.append(this.displayCanvas);
    }

    run()
    {
        this.update();
        this.paint();
    }

    update()
    {
        this.kbm.update();
    }

    paint()
    {

        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.displayCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        /*
        TODO next: create array of random shapes in random locations (-100%, -100) - (200%, 200%);
                    then write an algorithm that determines where/if they should be drawn
        */


        this.ctx.save();

            this.ctx.beginPath();

                this.ctx.translate(this.canvas.width/2, this.canvas.height/2);

                this.ctx.rotate(this.rotation);
                this.ctx.scale(this.scale.x, this.scale.y);

                this.ctx.translate(this.scroll.horizontal, this.scroll.vertical);

                this.paintQueue.forEach((item, i) => {
                    item.paint(this.ctx);
                });

        this.ctx.restore();

        this.displayCtx.drawImage(this.canvas, 0, 0);
    }


    addToPaintQueue(paintElement)
    {
        this.paintQueue.push(paintElement);
    }

    test()
    {
        var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        var shapesMax = 50;
        var arr = [];
        var xmin = -1000;
        var xmax = 1000;
        //var xrange = (Math.abs(xmin) + Math.abs(xmax));
        var ymin = -1000;
        var ymax = 1000;
        //var yrange = (Math.abs(ymin) + Math.abs(ymax));
        var dimmin = 50;
        var dimmax = 200;

        for(let i = 0; i < shapesMax; i++)
        {
            var x = getRndInteger(xmin, xmax);
            var y = getRndInteger(ymin, ymax);
            var dim = getRndInteger(dimmin, dimmax);
            var stroke = colors[getRndInteger(0, colors.length)];
            var fill = colors[getRndInteger(0, colors.length)];
            var ob = new Square(x, y, fill, stroke, dim);

            this.addToPaintQueue(ob);
        }

    }

}
