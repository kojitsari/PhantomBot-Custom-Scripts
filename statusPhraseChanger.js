$.version = "0.8";
$.say('Status Phrase Changer by Nekres V.' + $.version + ' loaded.');
$.statusphrase_old = "";
$.statusphrase_int = 120000;
if (parseInt($.inidb.get("statusphrases", "interval"))) {
	$.statusphrase_int = parseInt($.inidb.get("statusphrases", "interval"));
}
function StatusPhrase() {
    var num_phrases = parseInt($.inidb.get("statusphrases", "num_phrases"));
    var pos = parseInt($.inidb.get("statusphrases", "pos_phrase"));
	var msg_toggle = parseInt($.inidb.get("statusphrases", "msg_toggle"));
    var separator = $.inidb.get("statusphrases", "separator");
    var randomNum = $.randRange(1, num_phrases);
    var num;
	var new_status = "";
	var i;
    var res;
	num = $.rand(num_phrases);

	if ($.inidb.get("statusphrases", "old_phrase")) {
		$.statusphrase_old = $.inidb.get("statusphrases", "old_phrase");
	}

	if (isNaN(num_phrases) || num_phrases == 0) {
		println("The status phrase list is empty!");
		return;
	}

	if ($.inidb.get("statusphrases", "phrase_" + num) == null) {
		println("There are only " + num_phrases + " status phrases right now! Remember that all your phrases are numbered 0 to " + (num_phrases - 1) + "!");
		return;
	}

	var phrase = $.inidb.get('statusphrases', 'phrase_' + num);

    var channelData = $.twitch.GetChannel($.botowner);
	var curr_status = channelData.getString('status');


	if (curr_status == "" || curr_status == null) {
		$.say("Failed to retrieve the status. TwitchAPI must be having issues.");
		return;
	}

	if (curr_status.match($.statusphrase_old)) {
		curr_status = curr_status.replace($.statusphrase_old, "").trim();
	}

	if (pos >= 1) {
		new_status = curr_status + " " + separator + " " + phrase; //added in back
	} else { 
		new_status = phrase + " " + separator + " " + curr_status; //added in front
	}

	res = $.twitch.UpdateChannel($.channelName, new_status, "");

	if (res.getBoolean("_success")) {
		if (res.getInt("_http") == 200) {
			if (pos >= 1) {
				$.statusphrase_old = separator + " " + phrase;
			} else { 
				$.statusphrase_old = phrase + " " + separator;
			}
			$.inidb.set('statusphrases', 'old_phrase', $.statusphrase_old);
			if (msg_toggle >= 1) {
				$.say(phrase);
			} else {
				println("Changed the current status to '" + res.getString("status") + "'!");	
			}
			$.logEvent("statusphraseChanger.js", 54, "Changed the current status to '" + res.getString("status") + "'!");
		} else {
			$.say("Failed to change the status. TwitchAPI must be having issues.");
			println(res.getString("message"));
			$.logError("statusphraseChanger.js", 58, res.getString("message"));
		}
	} else {
		$.say("Failed to change the status. TwitchAPI must be having issues.");
		println(res.getString("_exception") + " " + res.getString("_exceptionMessage"));
		$.logError("statusphraseChanger.js", 63, res.getString("_exception") + " " + res.getString("_exceptionMessage"));
	}
}

$.timer.addTimer("./addonscripts/statusphraseChanger.js", "rdm_statusphrase", true, function() {
  if (parseInt($.inidb.get("statusphrases", "toggle_phrases")) == 1) {
	StatusPhrase()
  }
}, parseInt($.statusphrase_int));

$.on('command', function (event) {
    var sender = event.getSender();
    var username = $.username.resolve(sender);
    var command = event.getCommand();
    var argsString = event.getArguments().trim();
    var argsString2 = argsString.substring(argsString.indexOf(" ") + 1, argsString.length());
    var args;
    var i;
    var num_phrases = parseInt($.inidb.get("statusphrases", "num_phrases"));
    var pos_phrase = parseInt($.inidb.get("statusphrases", "pos_phrase"));
    var toggle_phrases = parseInt($.inidb.get("statusphrases", "toggle_phrases"));
	var msg_toggle = parseInt($.inidb.get("statusphrases", "msg_toggle"));
    var randomNum = $.randRange(1, num_phrases);
    var num;

    if (argsString.isEmpty()) {
        args = [];
    } else {
        args = argsString.split(" ");
    }

    if (command.equalsIgnoreCase("statusphrase")) {
        action = args[0];
        if (action.equalsIgnoreCase("toggle")) {
            if (!$.isCaster(sender)) {
                $.say($.adminmsg);
                return;
            }
			if (toggle_phrases >= 1) {
				$.inidb.set('statusphrases', 'toggle_phrases', parseInt(0));
				$.say("Random status phrase changer disabled!");
			} else {
				$.inidb.set('statusphrases', 'toggle_phrases', parseInt(1));
				$.say("Random status phrase changer enabled!");		
			}

        }
        if (action.equalsIgnoreCase("position") || action.equalsIgnoreCase("pos")) {
            if (!$.isCaster(sender)) {
                $.say($.adminmsg);
                return;
            }
			if (pos_phrase >= 1) {
				$.inidb.set('statusphrases', 'pos_phrase', parseInt(0));
				$.say("Status phrase position adjusted to be in front!");
			} else {
				$.inidb.set('statusphrases', 'pos_phrase', parseInt(1));
				$.say("Status phrase position adjusted to be in back!");		
			}
        }
        if (action.equalsIgnoreCase("separator") || action.equalsIgnoreCase("sep")) {
            if (!$.isCaster(sender)) {
                $.say($.adminmsg);
                return;
            }
			if (argsString2.length() <= 2) {
				$.inidb.set('statusphrases', 'separator', argsString2.trim());
				$.say("Status phrase separator changed to '" + argsString2.trim() + "'!");
			} else {
				$.say("Separator too long!");		
			}
        }
        if (action.equalsIgnoreCase("interval") || action.equalsIgnoreCase("int")) {
            if (!$.isCaster(sender)) {
                $.say($.adminmsg);
                return;
            }
			if (parseInt(args[1]) >= 2) {
				var new_int = parseInt(args[1].trim()) * 60 * 1000
				$.inidb.set('statusphrases', 'interval', new_int);
				$.say("Status phrase change interval changed to " + args[1].trim() + " minutes! (" + new_int + "ms)");
			} else {
				$.say("Interval too short!");		
			}
        }
        if (action.equalsIgnoreCase("add")) {
			if (!$.isMod(sender)) {
				$.say($.modmsg);
				return;
			}

			if (num_phrases == null || isNaN(num_phrases)) {
				num_phrases = 0;
			}

			if (argsString2.isEmpty()) {
				$.say("Usage: !statusphrase add <phrase>");
				return;
			}
			$.inidb.incr("statusphrases", "num_phrases", 1);
			$.inidb.set("statusphrases", "phrase_" + num_phrases, argsString2);
			$.say("You just added a new status phrase! There are now " + (num_phrases + 1) + " phrases!");
		}
        if (action.equalsIgnoreCase("message") || action.equalsIgnoreCase("msg")) {
			if (!$.isMod(sender)) {
				$.say($.modmsg);
				return;
			}
			if (msg_toggle >= 1) {
				$.inidb.set('statusphrases', 'msg_toggle', parseInt(0));
				$.say("Status phrase changes will be print into console!");
			} else {
				$.inidb.set('statusphrases', 'msg_toggle', parseInt(1));
				$.say("Status phrase changes will be send to chat!");
			}
		}
    }
});
var ar = new Array(0);
ar.push("It's dangerous to play one game all days");
ar.push("'Make me mod pl0x.'");
ar.push("Best game EVER!");
ar.push("Come in and find out!");

if ($.inidb.get("statusphrases", "num_phrases") == null || $.inidb.get("statusphrases", "num_phrases") == 0) {
	$.inidb.set('statusphrases', 'msg_toggle', '1');
	$.inidb.set('statusphrases', 'interval', '120000');
	$.inidb.set('statusphrases', 'pos_phrase', '1');
	$.inidb.set('statusphrases', 'separator', '-');
    $.inidb.set("statusphrases", "num_phrases", ar.length);
    for (var i = 0; i < ar.length; ++i) {
        $.inidb.set('statusphrases', 'phrase_' + i, ar[i]);
    }
}
