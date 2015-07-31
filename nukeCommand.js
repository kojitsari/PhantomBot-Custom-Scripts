var arrnukeLimiter = new Array();

$.nukelow = parseInt($.inidb.get('nuke', 'nukelow'));
$.nukehigh = parseInt($.inidb.get('nuke', 'nukehigh'));
$.nukemin = parseInt($.inidb.get('nuke', 'nukemin'));
$.nukemax = parseInt($.inidb.get('nuke', 'nukemax'));
$.nukecost = parseInt($.inidb.get('nuke', 'nukecost'));
$.nukedamage = parseInt($.inidb.get('nuke', 'nukedamage'));
$.nuketimer = parseInt($.inidb.get('nuke', 'nukeTimer'));

if ($.nukelow === undefined || $.nukelow === null || isNaN($.nukelow) || $.nukelow < 0) {
    $.nukelow = 1;
}

if ($.nukehigh === undefined || $.nukehigh === null || isNaN($.nukehigh) || $.nukehigh < 0) {
    $.nukehigh = 100;
}

if ($.nukemin === undefined || $.nukemin === null || isNaN($.nukemin) || $.nukemin < 0) {
    $.nukemin = 1;
}

if ($.nukemax === undefined || $.nukemax === null || isNaN($.nukemax) || $.nukemax < 0) {
    $.nukemax = 100;
}


if ($.nukecost === undefined || $.nukecost === null || isNaN($.nukecost) || $.nukecost < 0) {
    $.nukecost = $.randRange($.nukeLow, $.nukeHigh);
}


if ($.nukedamage === undefined || $.nukedamage === null || isNaN($.nukedamage) || $.nukedamage < 0) {
    $.nukedamage = $.randRange($.nukeMin, $.nukeMax);
}


if ($.nuketimer === undefined || $.nuketimer === null || isNaN($.nuketimer) || $.nuketimer < 0) {
    $.nuketimer = 30;
}
// everything needs to be lower case.

$.on('command', function(event) {
    var sender = event.getSender();
    var command = event.getCommand();
    var username = $.username.resolve(sender);
    var argsString = event.getArguments().trim();
    var argsString2 = argsString.substring(argsString.indexOf(" ") + 1, argsString.length());
    var args = event.getArgs();
    var randomNum = $.randRange(1, 1000);
    var user_point = args[0];
    var s;
    var n = randomNum;
    var t = $.nukedamage;
    var d = $.nukecost;
   
    if (command.equalsIgnoreCase("nuke")) {
       
        var found = false;
        var i;

        if (command.equalsIgnoreCase("nuke")) {
            if (args.length === 0 && $.moduleEnabled("./systems/pointSystem.js")) {
                return;
            }

            for (i = 0; i < arrnukeLimiter.length; i++) {
                if (arrnukeLimiter[i][0].equalsIgnoreCase(username)) {
                    if (arrnukeLimiter[i][1] < System.currentTimeMillis()) {
                        arrnukeLimiter[i][1] = System.currentTimeMillis() + ($.nuketimer * 1000);
                        break;
                    } else {
                        $.say(username +", you can only use !nuke once every "+ $.nuketimer +" seconds!");
                        return;
                   
                    }

                    found = true;
                }
            }

            if (found === false) {
                arrnukeLimiter.push(new Array(username, System.currentTimeMillis() + ($.nuketimer * 1000)));
            }

            var failure = new Array();
           
            failure.push("You're clearly not a scientist!");
            failure.push("Could you fail more?");
            failure.push("Never buy parts for your nuke off Ebay Kappa.");
            failure.push("Your home is now irradiated....");
           
            var success = new Array();
           
            success.push("That went splendidly!");
            success.push("I can see the fallout from here!");
            success.push("There won't be anyone left! Or anyone remotely human...");
           
           
            
            if (args[0].toLowerCase() == sender.toLowerCase()) {
                $.say("You wouldn't Nuke yourself... right? DansGame");
                return;
            }
            
            if (n >= 800) {
                do {
                    s = $.randElement(success);
                } while (s.equalsIgnoreCase($var.lastRandomsuccess) && success.length >1);
                $.inidb.decr('points', args[0], t); //pretty sure it's fixed
                $.say(s);
            } else {
                do {
                    s = $.randElement(failure);
                } while (s.equalsIgnoreCase($var.lastRandomfailure) && failure.length >1);
                $.inidb.decr('points', username, d); //pretty sure it's fixed
                $.say(s);
            }
        }
    }

	

    if (command.equalsIgnoreCase("nukemin")) {
            if (!$.isModv3(sender, event.getTags())) {
            $.say($.modmsg);
            return;
		}
		if (args[1] != null) {
			$.inidb.set('settings', 'nukemin', args[1]);
            $.nukemin = parseInt(args[1]);
            $.say("The min for nuke-damage is now set to " + $.nukemin + "!");
		} else {
			$.say("The min for nuke-damage is " + $.nukemin + "!");
		}
    }

    if (command.equalsIgnoreCase("nukemax")) {
            if (!$.isModv3(sender, event.getTags())) {
            $.say($.modmsg);
            return;
		}
		if (args[1] != null) { 
			$.inidb.set('settings', 'nukemax', args[1]);
            $.nukemax = parseInt(args[1]);
            $.say("The max for nuke-damage is now set to " + $.nukemax + "!");
		} else {
			$.say("The max for nuke-damage is " + $.nukemax + "!");	
		}
    }

    if (command.equalsIgnoreCase("nukelow")) {
            if (!$.isModv3(sender, event.getTags())) {
            $.say($.modmsg);
            return;
		}
		if (args[1] != null) {
			$.inidb.set('settings', 'nukelow', args[1]);
            $.nukelow = parseInt(args[1]);
            $.say("The min for nuke-cost is now set to " + $.nukelow + "!");
		} else {
			$.say("The min for nuke-cost is " + $.nukelow + "!");
		}
    }

    if (command.equalsIgnoreCase("nukehigh")) {
            if (!$.isModv3(sender, event.getTags())) {
            $.say($.modmsg);
            return;
		}
		if (args[1] != null) {
			$.inidb.set('settings', 'nukehigh', args[1]);
            $.nukehigh = parseInt(args[1]);
            $.say("The max for nukeCost is now set to " + $.nukehigh + "!");
		} else {
			$.say("The max for nukeCost is " + $.nukehigh + "!");
		}
    }
    
	if (command.equalsIgnoreCase("nuketimer")) {
			if (!$.isModv3(sender, event.getTags())) {
			$.say($.modmsg);
			return;
		}
		if (args[1] != null) {
			$.inidb.set('settings', 'nuketimer', args[1]);
			$.nuketimer = parseInt(args[1]);
			$.say("The cooldown for Nuke has been set to " + $.nuketimer + "!");
		} else {
			$.say("The cooldown for Nuke is " + $.nuketimer + "!");
		}
	}

	
});

$.registerChatCommand("./commands/nukeCommand.js", "nuke"); 
$.registerChatCommand("./commands/nukeCommand.js", "nukemin");
$.registerChatCommand("./commands/nukeCommand.js", "nukemax");      
$.registerChatCommand("./commands/nukeCommand.js", "nukelow");
$.registerChatCommand("./commands/nukeCommand.js", "nukehigh");
$.registerChatCommand("./commands/nukeCommand.js", "nuketimer");
