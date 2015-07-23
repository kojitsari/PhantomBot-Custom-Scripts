$.on('command', function(event) {
    var sender = event.getSender();
    var command = event.getCommand();
    var num2 = $.users.length;    
    var rnd = $.rand(num2);
    var lewdPerson = $.users[rnd][0];
    var argsString = event.getArguments().trim();
    var argsString2 = argsString.substring(argsString.indexOf(" ") + 1, argsString.length());
    var args = event.getArgs();
    var num_lewds = parseInt($.inidb.get("lewds", "num_lewds"));
    var lewdNum = $.randRange(1, 100);
    var num;
    
    if(command.equalsIgnoreCase("getlewd")) {
         if (!$.isMod(sender)) {
            num = $.rand(num_lewds);
        } else {
            if (argsString.length() > 0) {
                num = parseInt(argsString);
        } else {
                num = $.rand(num_lewds);
            }
        }


        if (isNaN(num_lewds) || num_lewds == 0) {
            $.say("There are no lewd messages at this time");
            return;
        }

        if ($.inidb.get("lewds", "lewd_" + num) == null) {
            $.say("There are only " + num_lewds + " lewds right now! Remember that lewd messages are numbered from 0 to " + (num_lewds - 1) + "!");

        } 
        
    }
    
    if (command.equalsIgnoreCase("addlewd")) {
        if (!$.isMod(sender)) {
            $.say($.modmsg);
            return;
        }
        
        if (num_lewds == null || isNaN(num_lewds)) {
            num_lewds = 0;
        } 

        if (argsString.isEmpty()) {
            $.say("Usage: !addlewd <message>");
            return;
        }
        
      
        $.inidb.incr("lewds", "num_lewds", 1);
        $.inidb.set("lewds", "lewd_" + num_lewds, argsString);

        
        $.say("lewd message added! There are now " + (num_lewds + 1) + " lewd messages!");
    }

     if (command.equalsIgnoreCase("editlewd")) {
        if (!$.isMod(sender)) {
            $.say($.modmsg);
            return;
        }
        
        num = parseInt(args[0]);

        if (num > num_lewds) {
            $.say("There is no lewd message under that ID, " + sender + "!");
            return;
        }

        if (argsString2.isEmpty() || argsString.isEmpty() || args[1] == null) {
            $.say("Usage: !editlewd <ID> <message>");
            return;
        }


        
        $.inidb.set("lewds", "lewd_" + num, argsString2);
        
        $.say("lewd message #" + num + " changed to: " + $.inidb.get("lewds", "lewd_" + num));
        return;
    }

    if (command.equalsIgnoreCase("dellewd")) {
        if (!$.isMod(sender)) {
            $.say($.modmsg);
            return;
        }
        
        if (num_lewds == null || isNaN(num_lewds) || num_lewds == 0) {
            $.say("There are no lewds at this time");
            return;
        }
        
        if (argsString.isEmpty()) {
            $.say("Usage: !dellewd <id>");
            return;
        }
        
        if (num_lewds > 1) {
            for (i = 0; i < num_lewds; i++) {
                if (i > parseInt(argsString)) {
                    $.inidb.set('lewds', 'lewd_' + (i - 1), $.inidb.get('lewds', 'lewd_' + i))
                }
            }
        }

        $.inidb.del('lewds', 'lewd_' + (num_lewds - 1));
        
        $.inidb.decr("lewds", "num_lewds", 1);
        
        $.say("lewd removed! There are now " + (num_lewds - 1) + " lewds!");
    }
    var commandCount = $.inidb.get('counter', 'lewd');
    var messageCommand = $.inidb.get('lewds', 'lewd_' + num);
    var a = 0;



    if (messageCommand) {
        for (var i = 0; i < args.length; i++) {
            while (messageCommand.contains('(' + (i + 1) + ')')) {
                messageCommand = messageCommand.replace('(' + (i + 1) + ')', args[i]);
            }
        }

        while (messageCommand.contains('(sender)')) {
            messageCommand = messageCommand.replace('(sender)', $.username.resolve(sender));
        }

        while (messageCommand.contains('(user)')) {
            messageCommand = messageCommand.replace('(user)', $.username.resolve(sender));
        }

        while (messageCommand.indexOf('(count)') != -1) {
            messageCommand = messageCommand.replace('(count)', $.inidb.get('counter', command));
        }

        while (messageCommand.indexOf('(random)') != -1) {
            messageCommand = messageCommand.replace('(random)', $.username.resolve(randomPerson));
        }
        while (messageCommand.indexOf('(#)') != -1) {
            messageCommand = messageCommand.replace('(#)', lewdNum);
        }

        $.say(messageCommand);
    }
});
    var ar = new Array(0);
        ar.push("http://puu.sh/j5IRF/d4a8e2a63b.jpg");

    if ($.inidb.get("lewds", "num_lewds") == null || $.inidb.get("lewds", "num_lewds") == 0 ) {
        
		$.inidb.set("lewds", "num_lewds", ar.length);
                for (var i=0; i< ar.length; ++i) {
                    $.inidb.set('lewds', 'lewd_' + i, ar[i]);
                }
    }

setTimeout(function(){ 
if ($.moduleEnabled('./commands/lewdCommand.js')) {
    $.registerChatCommand("./commands/lewdCommand.js", "lewd");
}
}, 10* 1000);