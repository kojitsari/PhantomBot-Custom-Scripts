$.on('command', function(event) {
    var sender = event.getSender();
    var command = event.getCommand()

    if (command.equalsIgnoreCase("rekt")) {
        var rekts = new Array(0);
        
        
        rekts.push("☐ Not REKT ﻿☑ REKT ");
        rekts.push("☐ Not REKT ☑ REKTangle ");
        rekts.push("☐ Not REKT ☑ SHREKT ");
        rekts.push("☐ Not REKT ☑ REKT-it Ralph ");
        rekts.push("☐ Not REKT ☑ Total REKTall ");
        rekts.push("☐ Not REKT ☑ The Lord of the REKT ");
        rekts.push("☐ Not REKT ☑ The Usual SusREKTs ");
        rekts.push("☐ Not REKT ☑ North by NorthREKT ");
        rekts.push("☐ Not REKT ☑ REKT to the Future ");
        rekts.push("☐ Not REKT ☑ Once Upon a Time in the REKT ");
        rekts.push("☐ Not REKT ☑ The Good, the Bad, and the REKT ");
        rekts.push("☐ Not REKT ☑ LawREKT of Arabia ");
        rekts.push("☐ Not REKT ☑ Tyrannosaurus REKT ");
        rekts.push("☐ Not REKT ☑ eREKTile dysfunction");
        
        s = $.randElement(rekts);
        $.say(s);
        return;
    }

});
$.registerChatCommand("./commands/uptimeCommand.js", "rekt");
