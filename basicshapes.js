class Square
{
    constructor(x, y, fillcolor, strokecolor, dim)
    {
        this.x = x;
        this.y = y;
        this.fill = fillcolor;
        this.stroke = strokecolor;
        this.dim = dim;
        this.randx = getRndInteger(-1, 1);
        this.randy = getRndInteger(-1, 1);
    }

    paint(context)
    {
        this.update();
        context.save()
            context.beginPath();
                context.translate(this.x, this.y);
                context.rect(0, 0, this.dim, this.dim);
                context.strokeStyle = this.stroke;
                context.fillStyle = this.fill;
            context.fill();
            context.stroke();
        context.restore();

    }

    update()
    {
        this.x += this.randx;
        this.y += this.randy;
    }


    get cx()
    {
        return this.x - this.dim/2;
    }

    get cy()
    {
        return this.y - this.dim/2;
    }
}
