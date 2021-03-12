class Mouse
{
    constructor(hostElement)
    {
        this.host = hostElement;

        this.host.addEventListener("mousedown", (e)=> {this.mouseHandler('mousedown', e)});
        this.host.addEventListener("mouseup", (e)=> {this.mouseHandler('mouseup', e)});
        this.host.addEventListener("mousemove", (e)=> {this.mouseHandler('mousemove', e)});
        this.host.addEventListener("click", (e)=> {this.mouseHandler('click', e)});
        this.host.addEventListener("contextmenu", ( e )=> { e.preventDefault(); return false; } );

        this.x = 0;
        this.y = 0;

        this.mousedownx = -1;
        this.mousedowny = -1;

        this.eventStack = [];

        this.callbacks = [];

        this.down = false;
    }

    mouseHandler(eventName, data)
    {
        if(eventName == "mousedown")
        {
            this.down = true;
            this.mousedownx = data.clientX;
            this.mousedowny = data.clientY;

        } else if (eventName == 'mouseup') {
            this.down = false;

            this.mousedownx = -1;
            this.mousedowny = -1;

        }

        this.eventStack.push(data);
        if(this.eventStack.length > 100) //limit the eventstack to 100 events
        {
            this.eventStack.shift();
            //shift once to remove earliest event,
            //this is obviously going to spam mousemoves,
            //but it might be fine for now
            // TODO - add a whole mousemove/drag event? like a from-to sort of situation?
        }


        this.x = data.clientX;
        this.y = data.clientY;
        if(this[eventName] != undefined)
        {
            this[eventName](data); //right here I could parse the raw event data into commands, like have a function for shift_click or something?
        }

        var callbackObject = this.callbacks.find((e, i)=>{
            if(e.eventName == eventName)
            {
                return true;
            }
        });

        callbackObject.callback.apply(callbackObject.host, [data]);

    }


    addEventListener(host, eventName, callback)
    {
        this.callbacks.push({host: host, eventName: eventName, callback: callback});
    }
}
