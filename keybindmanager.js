class KeyBindManager
{
    constructor()
    {
        this.keybinds = [];
    }

    addKeybind(keybind)
    {
        this.keybinds.push(keybind);
    }

    onKeyEvent(eventName, e)
    {
        var modifiers = [e.shiftKey, e.ctrlKey, e.altKey];
        var kbs = this.findKeyBind(e.key, modifiers, eventName);
        if(kbs.length > 0)
        kbs.forEach((keybind, i) => {
            keybind.react(eventName);
        });
    }

    findKeyBind(key, modifiers)//TODO should worry about upper/lower case comparisons.
    {
        return this.keybinds.filter((keybind, i)=>{
            if(key === keybind.key && modifiers.toString() === keybind.modifiers.toString())
            {
                return true;
            } else {
                return false;
            }
        });
    }

    update()
    {
        this.keybinds.forEach((keybind, i) => {
            keybind.update();
        });
    }

    createKeybind(autoadd, key, modifiers, downcallback, upcallback, presscallback)
    {
        if(modifiers.length === 0)modifiers = [false, false, false];
        var newKB = new KeyBind(key, modifiers, downcallback, upcallback, presscallback);
        if(autoadd === true)this.addKeybind(newKB);
        return newKB;
    }
}
