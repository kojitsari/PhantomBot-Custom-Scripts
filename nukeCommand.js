$.nukeLow = parseInt($.inidb.get('nuke', 'nukeLow'));
$.nukeHigh = parseInt($.inidb.get('nuke', 'nukeHigh'));
$.nukeMin = parseInt($.inidb.get('nuke', 'nukeMin'));
$.nukeMax = parseInt($.inidb.get('nuke', 'nukeMax'));
$.nukeCost = parseInt($.inidb.get('nuke', 'nukeCost'));
$.nukeDamage = parseInt($.inidb.get('nuke', 'nukeDamage'));
$.nukeTimer = parseInt($.inidb.get('nuke', 'nukeTimer'));

if ($.nukeLow === undefined || $.nukeLow === null || isNaN($.nukeLow) || $.nukeLow < 0) {
    $.nukeLow = 1; 
}

if ($.nukeHigh === undefined || $.nukeHigh === null || isNaN($.nukeHigh) || $.nukeHigh < 0) {
    $.nukeHigh = 100; 
}

if ($.nukeMin === undefined || $.nukeMin === null || isNaN($.nukeMin) || $.nukeMin < 0) {
    $.nukeCost = 1); 
}

if ($.nukeMax === undefined || $.nukeMax === null || isNaN($.nukeMax) || $.nukeMax < 0) {
    $.nukeMax = 100; 
}


if ($.nukeCost === undefined || $.nukeCost === null || isNaN($.nukeCost) || $.nukeCost < 0) {
    $.nukeCost = $.randRange($.nukeLow, $.nukeHigh); 
}


if ($.nukeDamage === undefined || $.nukeDamage === null || isNaN($.nukeDamage) || $.nukeDamage < 0) {
    $.nukeDamage = $.randRange($.nukeMin, $.nukeMax); 
}


if ($.nukeTimer === undefined || $.nukeTimer === null || isNaN($.nukeTimer) || $.nukeTimer < 0) {
    $.nukeTimer = 30;
}


$.on('command', function(event) {
    var sender = event.getSender();
    var command = event.getCommand();
    var argsString = event.getArguments().trim();
    var argsString2 = argsString.substring(argsString.indexOf(" ") + 1, argsString.length());
    var args = event.getArgs();
    var randomNum = $.randRange(1, 1000);
    var s;
	var n = randomNum;
	var t = $.nukeDamage;
	var d = $.nukeCost
	
	if (command.equalsIgnoreCase("nuke") && argsString.isEmpty()) {
		
		var found = false;
        var i;

        if (command.equalsIgnoreCase("nuke") && argsString.isEmpty()) {


            for (i = 0; i < arrNukeLimiter.length; i++) {
                if (arrNukeLimiter[i][0].equalsIgnoreCase(username)) {
                    if (arrNukeLimiter[i][1] < System.currentTimeMillis()) {
                        arrNukeLimiter[i][1] = System.currentTimeMillis() + ($.nukeTimer * 1000);
                        break;
                    } else if (nukeCMessages == 1){
                        $.say(username + ", you can only use !nuke once every " + $.nukeTimer + " seconds!");
                        return;
                    } else {
                        return;
                    }

                    found = true;
                }
            }

            if (found === false) {
                arrNukeLimiter.push(new Array(username, System.currentTimeMillis() + ($.nukeTimer * 1000)));
            }
        }
        if (args.length === 0 && $.moduleEnabled("./systems/pointSystem.js")) {
            
			var failure = new Array(0);
			failure.push("You're clearly not a scientist!");
			failure.push("Could you fail more?");
			failure.push("Never buy parts for your nuke off Ebay Kappa.");
			failure.push("Your home is now irradiated....");
			
			var success = new Array(0);
			success.push("That went splendidly!");
			success.push("I can see the fallout from here!");
			success.push("There won't be anyone left! Or anyone remotely human...");
			
			
			if (points === null) {
				points = 0
			}
			
			if (args[0].toLowerCase == sender.toLowerCase()){
			$.say("You wouldn't Nuke yourself.....right? DansGame");
			return;
			}else if (n >= 800);
				do {
					s = $.randElement(success);
				} while (s.equalsIgnoreCase($.varlastRandomSuccess) && success.length >1);
				$.inidb.dec('points', $.username.resolve(args[0]), t);
				$.say(s);
			} else {
				do {
					s = $.randElement(failure);
				} while (s.equalsIgnoreCase($.varlastRandomFailure) && failure.length >1);
				$.inidb.dec('points', $.username.resolve(sender), t);
				$.say(s);
			}
		}
	}
});
	

	if (command.equalsIgnoreCase("nukemin") && !argsString.isEmpty()) {
        if (args.length >= 2) {
            if (action.equalsIgnoreCase("min") && !argsString.isEmpty()) {
                if (!$.isMod(sender)) {
                    $.say($.modmsg);
                    return;
                }

                $.inidb.set('nuke', 'nukemin', args[1]);
                $.nukeMin = parseInt(args[1]);
                $.say("The min for nukeDamage is now set to" + $.nukeMin + "!");
            }
		}	
	}	
	
	
	if (command.equalsIgnoreCase("nukemax") && !argsString.isEmpty()) {
        if (args.length >= 2) {
            if (action.equalsIgnoreCase("max") && !argsString.isEmpty()) {
                if (!$.isMod(sender)) {
                    $.say($.modmsg);
                    return;
                }

                $.inidb.set('nuke', 'nukemax', args[1]);
                $.nukeMax = parseInt(args[1]);
                $.say("The max for nukeDamage is now set to" + $.nukeMax + "!");
            }
		}	
	}	
	
	
	if (command.equalsIgnoreCase("nukelow") && !argsString.isEmpty()) {
        if (args.length >= 2) {
            if (action.equalsIgnoreCase("low") && !argsString.isEmpty()) {
                if (!$.isMod(sender)) {
                    $.say($.modmsg);
                    return;
                }

                $.inidb.set('nuke', 'nukelow', args[1]);
                $.nukeLow = parseInt(args[1]);
                $.say("The min for nukeCost is now set to" + $.nukeLow + "!");
            }
		}	
	}	
	
	
	if (command.equalsIgnoreCase("nukehigh") && !argsString.isEmpty()) {
        if (args.length >= 2) {
            if (action.equalsIgnoreCase("high") && !argsString.isEmpty()) {
                if (!$.isMod(sender)) {
                    $.say($.modmsg);
                    return;
                }

                $.inidb.set('nuke', 'nukehigh', args[1]);
                $.nukeHigh = parseInt(args[1]);
                $.say("The max for nukeCost is now set to" + $.nukeHigh + "!");
            }
		}	
	}			
});

$.registerChatCommand("./commands/nukeCommand.js", "nuke");		
$.registerChatCommand("./commands/nukeCommand.js", "nukemin");	
$.registerChatCommand("./commands/nukeCommand.js", "nukemax");	
$.registerChatCommand("./commands/nukeCommand.js", "nukelow");	
$.registerChatCommand("./commands/nukeCommand.js", "nukehigh");	
