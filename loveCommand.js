$.on('command', function(event) {
    var sender = event.getSender();
    var command = event.getCommand();
    var argsString = event.getArguments().trim();
    var argsString2 = argsString.substring(argsString.indexOf(" ") + 1, argsString.length());
    var args = event.getArgs();
    var randomNum = $.randRange(1, 100);
    var num;
    
    if(command.equalsIgnoreCase("love") && args.length > 0) {

		if ($.inidb.get("love/loved", args[0]) == sender) {
		$.say("There is " + $.inidb.get("love/" + args[0], sender) + "% love chance between " + $.username.resolve(sender) + " and " + $.username.resolve(args[0]) + ".");
		return;
		} else {
		$.say("There is " + randomNum + "% love chance between " + $.username.resolve(sender) + " and " + $.username.resolve(args[0]) + ".");
		$.inidb.set("love/" + args[0], sender, randomNum);
		$.inidb.set("love/loved", args[0], sender);
		}

		
        if (argsString.isEmpty()) {
            $.say("Usage: !love <name>");
            return;
        }                

                
	}
});


setTimeout(function(){ 
    if ($.moduleEnabled('./commands/loveCommand.js')) {
        $.registerChatCommand("./commands/loveCommand.js", "love");
    }
},10*1000);
