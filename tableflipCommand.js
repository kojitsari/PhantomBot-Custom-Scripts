//This is PhantomIndex's idea, but the download wasn't working so I re-created it.
//Save in UTF-8, or the pictures don't work.
$.on('command', function(event) {
    var sender = event.getSender();
    var command = event.getCommand()

    if (command.equalsIgnoreCase("tableflip")) {
            var tableflips = new Array(0);
        
        tableflips.push("Angry (ﾉಥ益ಥ）ﾉ﻿ ┻━┻");
        tableflips.push("The look of murder ┬──┬﻿ ¯\\_(ツ)");
        tableflips.push("D-D-Double kill ┻━┻ ︵ヽ(`Д´)ﾉ︵﻿ ┻━┻");
        tableflips.push("Idgaf ┻━┻ ︵﻿ ¯\\(ツ)/¯ ︵ ┻━┻");
        tableflips.push("T-table ┬─┬ノ(º _ ºノ)");
        tableflips.push("Sick of dis (ノಠ益ಠ)ノ彡┻━┻");
        tableflips.push("War (J °O°)J JL_JL v-v /(°_°/)");
        tableflips.push("Flippe (╯°□°）╯︵ ┻━┻");
        tableflips.push("In Russia Table Flip You ┬─┬﻿ ︵ /(.□. \\）");
        tableflips.push("WAR (╯°□°)╯︵ ┻━┻ ︵ ╯(°□° ╯)");
        tableflips.push("Catch (ノ^_^)ノ┻━┻ ┬─┬ ノ( ^_^ノ)");
        tableflips.push("Person Flip (╯°Д°）╯︵ /(.□ . \\)");
        tableflips.push("Sad (╯'□')╯︵ ┻━┻");
        tableflips.push("Magic the Gathering (ﾉಥДಥ)ﾉ︵┻━┻･/");
        tableflips.push("Hurcules (/ .□.)\\ ︵╰(゜Д゜)╯︵ /(.□. \\)");
        tableflips.push("Jedi (._.) ~ ︵ ┻━┻");
        tableflips.push("Baer ʕノ•ᴥ•ʔノ ︵ ┻━┻");
        tableflips.push("Floating (/¯◡ ‿ ◡)/¯ ~ ┻━┻");
        tableflips.push("Robot ┗[© ♒ ©]┛ ︵ ┻━┻");
        tableflips.push("Soviet Russia ノ┬─┬ノ ︵ ( \\o°o)\\");
        tableflips.push("Happy ┻━┻ ︵ ლ(⌒-⌒ლ)");
        
        s = $.randElement(tableflips);
        $.say(s);
        return;
    }

});
$.registerChatCommand("./commands/uptimeCommand.js", "tableflip");
