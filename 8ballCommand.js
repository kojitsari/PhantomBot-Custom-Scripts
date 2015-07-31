var arrballLimiter = new Array();

if ($.ballcooldown === undefined || $.ballcooldown === null || isNaN($.ballcooldown) || $.ballcooldown < 0) {
    $.ballcooldown = 30;
}

$.on('command', function(event) {
var sender = event.getSender();
var username = $.username.resolve(sender);
var command = event.getCommand();
var argsString = event.getArguments().trim();
var args = event.getArgs();
var b;


	if (command.equalsIgnoreCase("8ball")) {
		if (args.length == 0 || args.length == null) { 
		$.say (username + ", 8ball usage: !8ball (question)"); 
		return; 
	}

        var found = false;
        var i;

        if (command.equalsIgnoreCase("8ball")) {
        	if (args.length == 0 || args.length == null) { 
		$.say (username + ", 8ball usage: !8ball (question)"); 
		return; 
	}
            if (!$.isModv3(sender, event.getTags())) {
                for (i = 0; i < arrrouletteLimiter.length; i++) {           
                    if (arrrouletteLimiter[i][1] < System.currentTimeMillis()) {
                        arrrouletteLimiter[i][1] = System.currentTimeMillis() + ($.ballcooldown * 1000);
                        break;
                    } else {
                        return;
                    }

                    found = true;
                    return;
                }
            }
            

            if (found === false) {
                arrrouletteLimiter.push(new Array(username, System.currentTimeMillis() + ($.ballcooldown * 1000)));
            }
	
	var ball = new Array();

	ball.push("It is certain.");
	ball.push("It is decidedly so.");
	ball.push("Without a doubt.");
	ball.push("Yes definitely.");
	ball.push("You may rely on it.");
	ball.push("As I see it, yes.");
	ball.push("Most likely.");
	ball.push("Outlook good.");
	ball.push("Yes.");
	ball.push("Signs point to yes.");
	ball.push("Reply hazy try again.");
	ball.push("Ask again later.");
	ball.push("Better not tell you now.");
	ball.push("Cannot predict now.");
	ball.push("Concentrate and ask again.");
	ball.push("Don't count on it.");
	ball.push("My reply is no.");
	ball.push("My sources say no.");
	ball.push("Outlook not so good.");
	ball.push("Very doubtful.");
	ball.push("Yes, in due time.");
	ball.push("You will have to wait.");
	ball.push("Ask again later.");
	ball.push("Better not tell you now. OpieOP");
	ball.push("Concentrate and ask again.");
	ball.push("Reply hazy, try again.");
	ball.push("What do you think?");
	ball.push("Never going to happen!");
	ball.push("The odds of that happening are pretty slim.");
	ball.push("The end of the world as we know it shall occur before that happens...");
	ball.push("No, just no DansGame");
	ball.push("You cannot ask me that without buying me dinner first!");
	ball.push("404: response not found.");
	ball.push("Oh dear I appear to be broken!");
	ball.push("My magic fluid is in need of a change!");
	ball.push("凸( •̀_•́ )凸");
	ball.push("The odds are over 9000!");
	ball.push("I believe this answers your question? ᕕ╏ ͡ᵔ ‸ ͡ᵔ ╏凸");
	ball.push("You're too young to hear my response Kappa !");
	ball.push("I'm on my union break!");
	ball.push("Where is my incentive to answer?");
	ball.push("I have no response for that question...");
	ball.push("I can't believe you asked that FailFish");
	ball.push("May the odds be forever in your favour!");

	do {
		b = $.randElement(ball);
	} while (b.equalsIgnoreCase($var.lastRandom) && ball.length > 1);

	    $.say("/me @" + username + ", " + b);
	}

	if (command.equalsIgnoreCase("8ballcooldown")) {
        if (!$.isModv3(sender, event.getTags())) {
            $.say($.modmsg);
            return;
    }

    $.inidb.set('settings', 'ballcooldown', parseInt(args[0]));
    $.ballcooldown = parseInt(args[0]);
    $.say(username +", the !8ball cooldown has been set to "+ $.ballcooldown + " seconds!");
    
    }
	}
});

setTimeout(function(){ 
    if ($.moduleEnabled('./systems/8ballCommand.js')) {
$.registerChatCommand("./commands/8ballCommand.js", "8ball");
$.registerChatCommand("./commands/8ballCommand.js", "8ballcooldown", "mod");
    }
},10*1000);
