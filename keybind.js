class KeyBind
{
    constructor(key, modifiers, downcallback, upcallback, presscallback)
    {
        this.key = key;
        this.modifiers = modifiers;

        this.downcallback = (downcallback != undefined? downcallback : ()=>{ return;});
        this.upcallback = (upcallback != undefined? upcallback : ()=>{ return;});
        this.presscallback = (presscallback != undefined? presscallback : ()=>{ return;});
        this.active = false;
    }

    // react(eventName)
    // {
    //     if(eventName === 'keyup' && this.eventName === 'keydown')
    //     {
    //         this.active = false;
    //     } else if(eventName ===  'keyup' && this.eventName === 'keyup')
    //     {
    //         this.callback();
    //     } if(eventName === 'keydown' && this.eventName === 'keydown')
    //     {
    //         this.active = true;
    //     }
    // }
    // down()
    // {
    //     this.active = true;
    // }
    //
    update()
    {
        if(this.active === true)
        {
            this.downcallback();
        }
    }


    react(eventName)
    {

        if(eventName === 'keydown')
        {

            if(this.active === false)
            {
                this.downcallback();
            }
            this.active = true;
        } else if(eventName === 'keyup')
        {
            this.active = false;
            this.upcallback();
        } else if (eventName === 'keypress') {
            this.presscallback();
        }
    }
    //
    // up()
    // {
    //     this.active = false;
    // }
}
