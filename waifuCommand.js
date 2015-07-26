$.on('command', function(event) {
    var sender = event.getSender();
	var username = event.getSender().toLowerCase();
	var command = event.getCommand();
    var argsString = event.getArguments().trim();
    var argsString2 = argsString.substring(argsString.indexOf(" ") + 1, argsString.length());
	var args = event.getArgs()
	var num_waifus = parseInt($.inidb.get('wowners', 'num_waifus'));
	var num_owners = parseInt($.inidb.get('wowners', 'num_own'));
	var randomNum = $.randRange(1, num_waifus);
    var num;
	var test = false;
	$.url= null;
	
    if (command.equalsIgnoreCase("waifu")) {
            
		if (argsString.isEmpty()) {
			num = $.rand(num_waifus);
		} else {
            num = parseInt(argsString);
		}
		
		if (num_owners >= 0) {
			for (temp = 0; temp < num_owners; temp++) {
				if (temp < num_owners) {
					ownname = $.inidb.get('wowners', 'owner_' + temp)
					if (ownname == (username)) {
						num = $.inidb.get('wowners', 'waifu_' + temp)
						married = num
						test = true;
						break;
					}
				}
			}
		}

		if (!argsString.isEmpty()){
			num = parseInt(argsString);
		}
		
		if (isNaN(num_waifus) || num_waifus == 0) {
            $.say("The waifu list is empty! WE NEED MORE WAIFUS!");
            return;
        }

        var messageCommand = $.inidb.get('waifus', 'waifu_' + num);
		
		if (messageCommand == null) {
            $.say("There are only " + num_waifus + " waifus right now! Remember that all your waifus are numbered 0 to " + (num_waifus - 1) + "!");
			return;
        }
		
		var msgc = messageCommand;
		var filtered1 = msgc.split(' -').join('+');
		var filtered = filtered1.split(' ').join('+');

		if (argsString.isEmpty() && test == false) {
			$.say("@" + $.username.resolve(sender) + ", your waifu is " + messageCommand + "  #" + num + "." + " https://www.google.com/search?tbm=isch&q=" + filtered);
			$.data = "<div id='line1' >" + $.username.resolve(sender) + "'s new waifu is:</div> <div id='line2'>" + messageCommand + "!</div>";
			$.data2 = $.username.resolve(sender) + "'s new waifu is: " + messageCommand + "!";
			$.writeToFile("", "web/" + "waifu.html", false);
			$.writeToFile("", "web/" + "waifu.txt", false);
			$.writeToFile($.data, "web/" + "waifu.html", true);
			$.writeToFile($.data2, "web/" + "waifu.txt", true);
		} else if (!argsString.isEmpty() && test == true){
			$.say("@" + $.username.resolve(sender) + ", married " + $.inidb.get('waifus', 'waifu_' + married) + " and is trying to cheat with " + messageCommand);
			married = null;
		} else if (argsString.isEmpty() && test == true){
			$.say("@" + $.username.resolve(sender) + ", your married waifu is " + messageCommand + ".");
			married = null;
		} else {
			$.say("@" + $.username.resolve(sender) + ", your waifu is " + messageCommand + ".");
		}
		test = false;
    }
    
    if (command.equalsIgnoreCase("addwaifu")) {
        if (!$.isMod(sender)) {
            $.say($.modmsg);
            return;
        }

        if (num_waifus == null || isNaN(num_waifus)) {
            num_waifus = 0;
        }

        if (argsString.isEmpty()) {
            $.say("Usage: !addwaifu <message>");
            return;
        }

        $.inidb.incr("wowners", "num_waifus", 1);
        $.inidb.set("waifus", "waifu_" + num_waifus, argsString);

        $.say("You just added a new waifu, let's hope their top tier! There are now " + (num_waifus + 1) + " waifus at your disposal!");
    }

    if (command.equalsIgnoreCase("editwaifu")) {
        if (!$.isMod(sender)) {
            $.say($.modmsg);
            return;
        }
		
		num = parseInt(args[0]);
		
        if (num > num_waifus) {
            $.say("There is no waifu message under that ID, " + sender + "!");
            return;
        }

        if (argsString2.isEmpty() || argsString.isEmpty() || args[1] == null) {
            $.say("Usage: !editwaifu <ID> <message>");
            return;
        }

        $.inidb.set("waifus", "waifu_" + num, argsString2);

        $.say("waifu message #" + num + " changed to: " + $.inidb.get("waifus", "waifu_" + num));
        return;
    }

    if (command.equalsIgnoreCase("delwaifu")) {
        if (!$.isMod(sender)) {
            $.say($.modmsg);
            return;
        }

        if (num_waifus == null || isNaN(num_waifus) || num_waifus == 0) {
            $.say("What happen to all the waifus?!");
            return;
        }

        if (argsString.isEmpty()) {
            $.say("Usage: !delwaifu <id>");
            return;
        }

        if (num_waifus > 1) {
            for (temp = 0; temp < num_waifus; temp++) {
                if (temp > parseInt(argsString)) {
                    $.inidb.set('waifus', 'waifu_' + (temp - 1), $.inidb.get('waifus', 'waifu_' + temp))
                }
            }
        }

        $.inidb.del('waifus', 'waifu_' + (num_waifus - 1));

        $.inidb.decr("wowners", "num_waifus", 1);

        $.say("Waifu removed! There are now " + (num_waifus - 1) + " waifus left!");
    }
	
	if (command.equalsIgnoreCase("setwaifu")) {
		if (argsString2.isEmpty()) {
			$.say((sender) + " you must put the number of the waifu you want to marry!");
			return;
		} else {
            num = parseInt(argsString2);
		}
		
		if (num < 0){
			$.say((sender) + " you must put a positive number of the waifu you want to marry!");
			return;
		}
		
		var messageCommand = $.inidb.get('waifus', 'waifu_' + num);
				
		if (num_owners >= 0) {
			for (temp = 0; temp < num_owners; temp++) {
				if (temp < num_owners) {
					ownname = $.inidb.get('wowners', 'owner_' + temp);
					if (ownname == (username)) {
						$.say((sender) + "you have already married " + messageCommand);
						return;
					}
				}
			}
		}
		
		if (isNaN(num_owners) || num_owners == null) {
			num_owners = 0;
        }
		
		$.inidb.incr('wowners', 'num_own', 1);
		$.inidb.set('wowners', 'waifu_' + num_owners, num);
		$.inidb.set('wowners', 'owner_' + num_owners, (sender));
						
		$.say((sender) + " you married " + messageCommand);
		num_owners = $.inidb.get('wowners', 'num_own');
		return;		
	}
	
	if (command.equalsIgnoreCase("splitwaifu")) {
				
		if (isNaN(num_owners) || num_owners == null) {
			$.say((sender) + "nobody is married!");
			return;
        }
		
		if (num_owners >= 0) {
			for (temp = 0; temp < num_owners; temp++) {
				if (temp < num_owners) {
					ownname = $.inidb.get('wowners', 'owner_' + temp);
					if (ownname == (username)) {
						$.inidb.decr('wowners', 'num_own', 1);
						num = $.inidb.get('wowners', 'waifu_' + temp);
						$.inidb.del('wowners', 'waifu_' + temp);
						$.inidb.del('wowners', 'owner_' + temp);
						break;
					}
				}
			}
			
		}
		
		if (num == null){
			$.say((sender) + " you are single!")
			return;	
		} else {
			var messageCommand = $.inidb.get('waifus', 'waifu_' + num);
			$.say((sender) + " you divorced " + messageCommand)
			num_owners = $.inidb.get('wowners', 'num_own')
			return;
		}
	}
});
var ar = new Array(0);
ar.push("Kanon Kanase -Strike the Blood-");
ar.push("Sayaka Kirasaka -Strike the Blood-");
ar.push("Reina Akatsuki -Strike the Blood-");
ar.push("Yukina Himeragi -Strike the Blood-");
ar.push("Yuuma Tokoyogi -Strike the Blood-");
ar.push("Asagi Aiba -Strike the Blood-");
ar.push("Holo -Spice & Wolf-");
ar.push("Norah Arendt -Spice & Wolf-");
ar.push("Chloe -Spice & Wolf-");
ar.push("Lan Fan -Fullmetal Alchemist-");
ar.push("Winry Rockbell -Fullmetal Alchemist-");
ar.push("Riza Hawkeye -Fullmetal Alchemist-");
ar.push("Olivier Mira Armstrong -Fullmetal Alchemist-");
ar.push("Lust -Fullmetal Alchemist-");
ar.push("Izumi Curtis -Fullmetal Alchemist-");
ar.push("May Chang -Fullmetal Alchemist-");
ar.push("Trisha Elric -Fullmetal Alchemist-");
ar.push("Sheska -Fullmetal Alchemist-");
ar.push("Elicia Hughes -Fullmetal Alchemist-");
ar.push("Pinako Rockbell -Fullmetal Alchemist-");
ar.push("Nina Tucker -Fullmetal Alchemist-");
ar.push("Maria Ross -Fullmetal Alchemist-");
ar.push("Rose Tomas -Fullmetal Alchemist-");
ar.push("Kathleen Elle Armstrong -Fullmetal Alchemist-");
ar.push("Paninya -Fullmetal Alchemist-");
ar.push("Rin Tohsaka -Fate/Stay Night-");
ar.push("Saber -Fate/Stay Night-");
ar.push("Illyasviel von Einzbern -Fate/Stay Night-");
ar.push("Rider -Fate/Stay Night-");
ar.push("Sakura Matou -Fate/Stay Night-");
ar.push("Caster -Fate/Stay Night-");
ar.push("Taiga Fujimura -Fate/Stay Night-");
ar.push("Ayako Mitsuzuri -Fate/Stay Night-");
ar.push("Sella -Fate/Stay Night-");
ar.push("Leysritt -Fate/Stay Night-");
ar.push("Yukika Saegusa -Fate/Stay Night-");
ar.push("Kaede Makidera -Fate/Stay Night-");
ar.push("Kane Himuro -Fate/Stay Night-");
ar.push("Otoko Hotaruzuka -Fate/Stay Night-");
ar.push("Levi Kazama -Trinity Seven-");
ar.push("Lieselotte Sherlock -Trinity Seven-");
ar.push("Akio Fudo -Trinity Seven-");
ar.push("Lilith Asami -Trinity Seven-");
ar.push("Yui Kurata -Trinity Seven-");
ar.push("Mira Yamana -Trinity Seven-");
ar.push("Hijiri Kasuga -Trinity Seven-");
ar.push("Selina Sherlock -Trinity Seven-");
ar.push("Astil Manuscript -Trinity Seven-");
ar.push("Arin Kannazuki -Trinity Seven-");
ar.push("Shana -Shakugan no Shana-");
ar.push("Kazumi Yoshida -Shakugan no Shana-");
ar.push("Ogata Matake -Shakugan no Shana-");
ar.push("Fumina Konoe -Shakugan no Shana-");
ar.push("Wilhelmina Carmel -Shakugan no Shana-");
ar.push("Margery Daw -Shakugan no Shana-");
ar.push("Mathilde Saint-Omer -Shakugan no Shana-");
ar.push("WestShore -Shakugan no Shana-");
ar.push("Hecate -Shakugan no Shana-");
ar.push("Pheles -Shakugan no Shana-");
ar.push("Rise Kujikawa -Shin Megami Tensei: Persona 4-");
ar.push("Yukiko Amagi -Shin Megami Tensei: Persona 4-");
ar.push("Chie Satonaka -Shin Megami Tensei: Persona 4-");
ar.push("Margeret -Shin Megami Tensei: Persona 4-");
ar.push("Naoto Shirogane -Shin Megami Tensei: Persona 4-");
ar.push("Marie -Shin Megami Tensei: Persona 4-");
ar.push("Hanako Ohtani -Shin Megami Tensei: Persona 4-");
ar.push("Noriko Kashiwagi -Shin Megami Tensei: Persona 4-");
ar.push("Ai Ebihara -Shin Megami Tensei: Persona 4-");
ar.push("Saki Konishi -Shin Megami Tensei: Persona 4-");
ar.push("Yumi Ozawa -Shin Megami Tensei: Persona 4-");
ar.push("Sayoko Uehara -Shin Megami Tensei: Persona 4-");
ar.push("Aigis -Shin Megami Tensei: Persona 3-");
ar.push("Elizabeth Shin -Megami Tensei: Persona 3-");
ar.push("Yukari Takeba -Shin Megami Tensei: Persona 3-");
ar.push("Female Protagonist -Shin Megami Tensei: Persona 3-");
ar.push("Fuuka Yamagishi -Shin Megami Tensei: Persona 3-");
ar.push("Mitsuru Kirijo -Shin Megami Tensei: Persona 3-");
ar.push("Chidori Yoshino -Shin Megami Tensei: Persona 3-");
ar.push("Chizuru Minamoto -Kanokon-");
ar.push("Nozomu Ezomori -Kanokon-");
ar.push("Ren Nanao -Kanokon-");
ar.push("Yukihana -Kanokon-");
ar.push("Ai Nanao -Kanokon-");
ar.push("Akane Asahina -Kanokon-");
ar.push("Tamamo -Kanokon-");
ar.push("Mio Osakabe -Kanokon-");
ar.push("Iku Sahara -Kanokon-");
ar.push("Kiriko Takana -Kanokon-");
ar.push("Minori Mitama -Kanokon-");
ar.push("Nue -Kanokon-");
ar.push("Minato Tomoka -Ro-Kyu-Bu!-");
ar.push("Hinata Hakamada -Ro-Kyu-Bu!-");
ar.push("Maho Misawa -Ro-Kyu-Bu!-");
ar.push("Saki Nagatsuka -Ro-Kyu-Bu!-");
ar.push("Airi Kashii -Ro-Kyu-Bu!-");
ar.push("Mihoshi Takamura -Ro-Kyu-Bu!-");
ar.push("Aoi Ogiyama -Ro-Kyu-Bu!-");
ar.push("Satsuki Kakizono  -Ro-Kyu-Bu!-");
ar.push("Miyu Aida -Ro-Kyu-Bu!-");
ar.push("Nayu Hasegawa -Ro-Kyu-Bu!-");
ar.push("Touko Hatano -Ro-Kyu-Bu!-");
ar.push("Tae Mishouji  -Ro-Kyu-Bu!-");
ar.push("Kagetsu Hakamada -Ro-Kyu-Bu!-");
ar.push("Hijiri Kuina -Ro-Kyu-Bu!-");
ar.push("Manaka Nobidome -Ro-Kyu-Bu!-");
ar.push("Hatsue Nobidome -Ro-Kyu-Bu!-");
ar.push("Yuuki Asuna -Sword Art Online-");
ar.push("Silica -Sword Art Online-");
ar.push("Lisbeth -Sword Art Online-");
ar.push("Yui -Sword Art Online-");
ar.push("Sinon -Sword Art Online-");
ar.push("Kirigaya Suguha -Sword Art Online-");
ar.push("Alice Schuberg -Sword Art Online-");
ar.push("Sachi -Sword Art Online-");
ar.push("Yalicia Rue -Sword Art Online-");
ar.push("Yuuki Kyouko -Sword Art Online-");
ar.push("Sasha -Sword Art Online-");
ar.push("Sakuya -Sword Art Online-");
ar.push("Yulier -Sword Art Online-");
ar.push("Siune -Sword Art Online-");
ar.push("Rosalia -Sword Art Online-");
ar.push("Griselda -Sword Art Online-");
ar.push("Tieze Shtolienen -Sword Art Online-");
ar.push("Skuld -Sword Art Online-");
ar.push("Uror -Sword Art Online-");
ar.push("Verdandi -Sword Art Online-");
ar.push("Yuriko Aoki -Bakuman-");
ar.push("Kaya Miyoshi -Bakuman-");
ar.push("Miho Azuki -Bakuman-");
ar.push("Aiko Iwase -Bakuman-");
ar.push("Miyuki Azuki -Bakuman-");
ar.push("Mina Azuki -Bakuman-");
ar.push("Kirino Kousaka -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Ruri Gokou -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Ayase Aragaki -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Manami Tamura -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Saori Makishima -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Kanako Kurusu -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Bridget Evans -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Sena Akagi -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Hinata Gokou -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Yoshino Kousaka -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Tamaki Gokou -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Ria Hagry -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Kirara Hoshino -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Kanata Kurusu -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Kaori Makishima -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Satsuki Kiryuin -Kill la Kill-");
ar.push("Ryuko Matoi -Kill la Kill-");
ar.push("Mako Mankanshoku -Kill la Kill-");
ar.push("Minori Kushieda -Toradora!-");
ar.push("Taiga Aisaka -Toradora!-");
ar.push("Sumire Kano -Toradora!-");
ar.push("Yasuko Takasu -Toradora!-");
ar.push("Beatrice Ushiromiya  -Umineko no Naku Koro ni-");
ar.push("Shannon -Umineko no Naku Koro ni-");
ar.push("Asia Argento -High School DxD-");
ar.push("Koneko Toujou -High School DxD-");
ar.push("Akeno Himejima -High School DxD-");
ar.push("Irina Shido -High School DxD-");
ar.push("Xenovia Quarta -High School DxD-");
ar.push("Rias Gremory -High School DxD-");
ar.push("Black Rose -.hack-");
ar.push("Hestia -DanMachi-");
ar.push("Aiz Wallenstein -DanMachi-");
ar.push("Liliruca Arde -DanMachi-");
ar.push("Ryu Lion -DanMachi-");
ar.push("Loki -DanMachi-");
ar.push("Syr Flover -DanMachi-");
ar.push("Freya -DanMachi-");
ar.push("Eina Tulle -DanMachi-");
ar.push("Hephaistios -DanMachi-");
ar.push("Asufi Al Andromeda -DanMachi-");
ar.push("Anya Flomer -DanMachi-");
ar.push("Chloe Lolo -DanMachi-");
ar.push("Tiona Hiryute -DanMachi-");
ar.push("Tione Hiryute -DanMachi-");
ar.push("Mikoto Yamato -DanMachi-");
ar.push("Naza Ersuisu -DanMachi-");
ar.push("Demeter -DanMachi-");
ar.push("Lefiya Viridis -DanMachi-");
ar.push("Moeka Kiryu -Steins;Gate-");
ar.push("Mayuri Shiina -Steins;Gate-");
ar.push("Suzuha Amane -Steins;Gate-");
ar.push("Faris Nyannyan -Steins;Gate-");
ar.push("Makise Kurisu -Steins;Gate-");
ar.push("Nagisa Furukawa -CLANNAD-");
ar.push("Tomoyo Sakagami -CLANNAD-");
ar.push("Kyou Fujibayashi -CLANNAD-");
ar.push("Fuuko Ibuki -CLANNAD-");
ar.push("Kotomi Ichinose -CLANNAD-");
ar.push("Ryou Fujibayashi -CLANNAD-");
ar.push("Sanae Furukawa -CLANNAD-");
ar.push("Yukine Miyazawa -CLANNAD-");
ar.push("Mei Sunohara -CLANNAD-");
ar.push("Misae Sagara -CLANNAD-");
ar.push("Kouko Ibuki -CLANNAD-");
ar.push("Rie Nishina -CLANNAD-");
ar.push("Kouko Kaga -Golden Time-");
ar.push("Nana Hayashida -Golden Time-");
ar.push("Nana -Golden Time-");
ar.push("Chinami Oka -Golden Time-");
ar.push("Sao -Golden Time-");
ar.push("Reina -Golden Time-");
ar.push("Kallen Stadtfeld -Code Geass-");
ar.push("C.C. -Code Geass-");
ar.push("Shirley Fenette -Code Geass-");
ar.push("Anya Alstreim -Code Geass-");
ar.push("Nunnally Lamperouge -Code Geass-");
ar.push("Cornelia li Britannia -Code Geass-");
ar.push("Villetta Nu -Code Geass-");
ar.push("Milly Ashford -Code Geass-");
ar.push("Kaguya Sumeragi -Code Geass-");
ar.push("Rakshata Chawla -Code Geass-");
ar.push("Jiang Lihua -Code Geass-");
ar.push("Nina Einstein -Code Geass-");
ar.push("V.V. -Code Geass-");
ar.push("Sayoko Shinozaki -Code Geass-");
ar.push("Cecile Croomy -Code Geass-");
ar.push("Marianne vi Britannia -Code Geass-");
ar.push("Liliana Vergamon -Code Geass-");
ar.push("Miya I. Hillmick -Code Geass-");
ar.push("Ayame Futaba  -Code Geass-");
ar.push("Carine ne Britannia -Code Geass-");
ar.push("Nonette Enneagram -Code Geass-");
ar.push("Euphemia li Britannia -Code Geass-");
ar.push("Yoko Littner -Gurren Lagann-");
ar.push("Nia Teppelin -Gurren Lagann-");
ar.push("Kiyal Bachika -Gurren Lagann-");
ar.push("Adiane -Gurren Lagann-");
ar.push("Darry Adai -Gurren Lagann-");
ar.push("Kinon Bachika -Gurren Lagann-");
ar.push("Kiyoh Littner  -Gurren Lagann-");
ar.push("Saeko Busujima -The High School of the Dead-");
ar.push("Rei Miyamoto -The High School of the Dead-");
ar.push("Saya Takagi -The High School of the Dead-");
ar.push("Shizuka Marikawa -The High School of the Dead-");
ar.push("Alice Maresato -The High School of the Dead-");
ar.push("Rika Minami -The High School of the Dead-");
ar.push("Yuriko Takagi -The High School of the Dead-");
ar.push("Miku Yuuki -The High School of the Dead-");
ar.push("Toshimi Niki -The High School of the Dead-");
ar.push("Misuzu Ichijou -The High School of the Dead-");
ar.push("Erza Scarlet -Fairy Tail-");
ar.push("Lucy Heartfilia -Fairy Tail-");
ar.push("Wendy Marvell -Fairy Tail-");
ar.push("Juvia Lockser -Fairy Tail-");
ar.push("Mirajane Strauss -Fairy Tail-");
ar.push("Cana Alberona -Fairy Tail-");
ar.push("Lisanna Strauss -Fairy Tail-");
ar.push("Levy McGarden -Fairy Tail-");
ar.push("Chico C Hammitt -Fairy Tail-");
ar.push("Mavis Vermilion -Fairy Tail-");
ar.push("Sherry Blendy -Fairy Tail-");
ar.push("Sherria Blendy -Fairy Tail-");
ar.push("Yukino Agria -Fairy Tail-");
ar.push("Flare Corona -Fairy Tail-");
ar.push("Minerva Orland -Fairy Tail-");
ar.push("Chiyo Sakura -Gekkan Shoujo Nozaki-kun-");
ar.push("Yuzuki Seo -Gekkan Shoujo Nozaki-kun-");
ar.push("Mamiko -Gekkan Shoujo Nozaki-kun-");
ar.push("Yuu Kashima -Gekkan Shoujo Nozaki-kun-");
ar.push("Mai Minakami -Nichijou-");
ar.push("Mio Naganohara -Nichijou-");
ar.push("Nano Shinonome -Nichijou-");
ar.push("Yuuko Aioi -Nichijou-");
ar.push("Chiho Sasaki -The Devil is a Part-Timer!-");
ar.push("Emi Yusa -The Devil is a Part-Timer!-");
ar.push("Emeralda Etuva -The Devil is a Part-Timer!-");
ar.push("Suzuno Kamazuki -The Devil is a Part-Timer!-");
ar.push("Mihoshi -Gundam Build Fighters-");
ar.push("Rinko Iori -Gundam Build Fighters-");
ar.push("Aila Jyrkiäinen -Gundam Build Fighters-");
ar.push("China Kousaka -Gundam Build Fighters-");
ar.push("Fumina Hoshino -Gundam Build Fighters Try-");
ar.push("Mirai Kamiki -Gundam Build Fighters Try-");
ar.push("Shia Kijima -Gundam Build Fighters Try-");
ar.push("Kaoruko Sazaki -Gundam Build Fighters Try-");
ar.push("Anri Sonohara -Durarara!!-");
ar.push("Celty Sturluson -Durarara!!-");
ar.push("Ruri Hijiribe -Durarara!!-");
ar.push("Erika Karisawa -Durarara!!-");
ar.push("Namie Yagiri -Durarara!!-");
ar.push("Saki Mikajima -Durarara!!-");
ar.push("Mika Harima -Durarara!!-");
ar.push("Haruna Niekawa -Durarara!!-");
ar.push("Ruri Hijiribe -Durarara!!-");
ar.push("Rio Kamichika -Durarara!!-");
ar.push("Kururi Orihara -Durarara!!-");
ar.push("Mairu Orihara -Durarara!!-");
ar.push("Vorona -Durarara!!-");
ar.push("Akane Awakusu -Durarara!!-");
ar.push("Emilia Kishitani -Durarara!!-");
ar.push("Index Librorum Prohibitorum -Toaru Majutsu no Index-");
ar.push("Aisa Himegami -Toaru Majutsu no Index-");
ar.push("Kaori Kanzaki -Toaru Majutsu no Index-");
ar.push("Mikoto Misaka -Toaru Majutsu no Index-");
ar.push("Kuroko Shirai -Toaru Majutsu no Index-");
ar.push("Bulma -Dragon Ball-");
ar.push("Launch -Dragon Ball-");
ar.push("Chi Chi -Dragon Ball Z-");
ar.push("18 -Dragon Ball Z-");
ar.push("Filia -Skullgirls-");
ar.push("Cerebella -Skullgirls-");
ar.push("Peacock -Skullgirls-");
ar.push("Parasoul -Skullgirls-");
ar.push("Ms.Fortune -Skullgirls-");
ar.push("Painwheel -Skullgirls-");
ar.push("Valentine -Skullgirls-");
ar.push("Double -Skullgirls-");
ar.push("Squigly -Skullgirls-");
ar.push("Eliza -Skullgirls-");
ar.push("Robo-Fortune -Skullgirls-");
ar.push("Celica A. Mercury -Blazblue-");
ar.push("Noel Vermillion -Blazblue-");
ar.push("Lambda -No. 11- -Blazblue-");
ar.push("Kokonoe Mercury -Blazblue-");
ar.push("Taokaka -Blazblue-");
ar.push("Konoe A. Mercury -Blazblue-");
ar.push("Nu -No. 13- -Blazblue-");
ar.push("Rachel Alucard -Blazblue-");
ar.push("Makoto Nanaya -Blazblue-");
ar.push("Mu -No. 12- -Blazblue-");
ar.push("Bullet -Blazblue-");
ar.push("Litchi Faye-Ling -Blazblue-");
ar.push("Platinum the Trinity -Blazblue-");
ar.push("Saya -Blazblue-");
ar.push("Tsubaki Yayaoi -Blazblue-");
ar.push("Hades Izanami -Blazblue-");
ar.push("Mai Natsume -Blazblue-");
ar.push("Izayoi -Blazblue-");
ar.push("Trinity Glassfille -Blazblue-");
ar.push("Ex Machina: Minerva -Blazblue-");
ar.push("Torakaka -Blazblue-");
ar.push("Ada Clover -Blazblue-");
ar.push("Kajun Faycott -Blazblue-");
ar.push("Ms. Tail -Blazblue-");
ar.push("Chachakaka -Blazblue-");
ar.push("Linne -UNDER NIGHT IN-BIRTH-");
ar.push("Vatista -UNDER NIGHT IN-BIRTH-");
ar.push("Yuzuriha -UNDER NIGHT IN-BIRTH-");
ar.push("Hilda -UNDER NIGHT IN-BIRTH-");
ar.push("Eltnum -UNDER NIGHT IN-BIRTH-");
ar.push("Nanase -UNDER NIGHT IN-BIRTH-");
ar.push("Orie -UNDER NIGHT IN-BIRTH-");
ar.push("Phonon -UNDER NIGHT IN-BIRTH-");
ar.push("Dizzy -Guilty Gear-");
ar.push("Elphelt Valentine -Guilty Gear-");
ar.push("Ramlethal Valentine -Guilty Gear-");
ar.push("I-No -Guilty Gear-");
ar.push("Millia Rage -Guilty Gear-");
ar.push("May -Guilty Gear-");
ar.push("Justice -Guilty Gear-");
ar.push("Valentine -Guilty Gear-");
ar.push("Baiken -Guilty Gear-");
ar.push("A.B.A -Guilty Gear-");
ar.push("Jam Kuradoberi -Guilty Gear-");
ar.push("Aria -Guilty Gear-");
ar.push("Mari Kurihara -Prison School-");
ar.push("Meiko Shiraki -Prison School-");
ar.push("Hana Midorikawa -Prison School-");
ar.push("Chiyo Kurihara -Prison School-");
ar.push("Kate Takenomiya -Prison School-");
ar.push("Risa Bettou -Prison School-");
ar.push("Anzu Yokoyama -Prison School-");
ar.push("Mitsuko Yokoyama -Prison School-");
ar.push("Tachibana Kanade -Angel Beats-");
ar.push("Nakamura Yuri -Angel Beats-");
ar.push("Shiina -Angel Beats-");
ar.push("Yui -Angel Beats-");
ar.push("Masami Iwasawa -Angel Beats-");
ar.push("Hatsune Otonashi -Angel Beats-");
ar.push("Shiori Sekine  -Angel Beats-");
ar.push("Miyuki Irie -Angel Beats-");
ar.push("Hisako -Angel Beats-");
ar.push("Kuroyukihime -Accel World-");
ar.push("Chiyuri Kurashima -Accel World-");
ar.push("Yuniko Kouzuki -Accel World-");
ar.push("Fuuko Kurasaki -Accel World-");
ar.push("Blood Leopard -Accel World-");
ar.push("Megumi Wakamiya -Accel World-");
ar.push("Aqua Current -Accel World-");
ar.push("Mana Itosu -Accel World-");
ar.push("Nickel Doll -Accel World-");
ar.push("Ruka Asato  -Accel World-");
ar.push("Yukino Yukinoshita -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Yui Yuigahama -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Komachi Hikigaya  -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Shizuka Hiratsuka -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Haruno Yukinoshita -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Saki Kawasaki -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Rumi Tsurumi -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Yumiko Miura -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Hina Ebina -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Yui Hirasawa -K-On!-");
ar.push("Mio Akiyama -K-On!-");
ar.push("Azusa Nakano -K-On!-");
ar.push("Tsumugi Kotobuki -K-On!-");
ar.push("Ritsu Tainaka -K-On!-");
ar.push("Juri Han -Street Fighter-");
ar.push("Decapre -Street Fighter-");
ar.push("Cammy White -Street Fighter-");
ar.push("Elena -Street Fighter-");
ar.push("Chun-Li -Street Fighter-");
ar.push("Poison -Street Fighter-");
ar.push("Sakura -Street Fighter-");
ar.push("Ibuki -Street Fighter-");
ar.push("Makoto -Street Fighter-");
ar.push("Rose -Street Fighter-");
ar.push("Crimson Viper -Street Fighter-");
ar.push("Karin Kanzuki -Street Fighter-");
ar.push("Juli -Street Fighter-");
ar.push("Juni -Street Fighter-");
ar.push("Rainbow Mika -Street Fighter-");
ar.push("Ingrid -Street Fighter-");
ar.push("Eliza Masters -Street Fighter-");
ar.push("Ayame Kajou -Shimoneta-");
ar.push("Otome Saotome -Shimoneta-");
ar.push("Kosuri Onigashira -Shimoneta-");
ar.push("Anna Nishikinomiya -Shimoneta-");
ar.push("Hyouka Fuwa -Shimoneta-");
ar.push("Oboro Tsukimigusa -Shimoneta-");
ar.push("Youko Shiragami -Jitsu wa Watashi wa-");
ar.push("Akane Koumoto -Jitsu wa Watashi wa-");
ar.push("Nagisa Aizawa -Jitsu wa Watashi wa-");
ar.push("Mikan Akemi -Jitsu wa Watashi wa-");
ar.push("Shiho Shishido -Jitsu wa Watashi wa-");
ar.push("Akari Koumoto -Jitsu wa Watashi wa-");
ar.push("Mizore Shirayuki -Rosario to Vampire-");
ar.push("Moka Akashiya -Rosario to Vampire-");
ar.push("Kurumu Kurono -Rosario to Vampire-");
ar.push("Yukari Sendou -Rosario to Vampire-");
ar.push("Ruby Toujo -Rosario to Vampire-");
ar.push("Shizuka Nekonome -Rosario to Vampire-");
ar.push("Ririko Kagome -Rosario to Vampire-");
ar.push("Kasumi Aono -Rosario to Vampire-");
ar.push("Deshiko Deshi -Rosario to Vampire-");
ar.push("Tamao Ichinose -Rosario to Vampire-");
ar.push("Akatsuki -Log Horizon-");
ar.push("Rayneshia El-Arte Corwen -Log Horizon-");
ar.push("Serara -Log Horizon-");
ar.push("Minori -Log Horizon-");
ar.push("Kanami -Log Horizon-");
ar.push("Marielle -Log Horizon-");
ar.push("Isuzu -Log Horizon-");
ar.push("Henrietta -Log Horizon-");
ar.push("Nureha -Log Horizon-");
ar.push("Misa Takayama -Log Horizon-");
ar.push("Nazuna -Log Horizon-");
ar.push("Liliana -Log Horizon-");
ar.push("Isami -Log Horizon-");
ar.push("Roe 2 -Log Horizon-");
ar.push("Mariandale -Ixion Saga DT-");
ar.push("Ecarlate Juptris St. Piria -Ixion Saga DT-");
ar.push("Miranda -Ixion Saga DT-");
ar.push("Almaflora -Ixion Saga DT-");
ar.push("Emilia -Ixion Saga DT-");
ar.push("Chaika Trabant -Hitsugi no Chaika-");
ar.push("Akari Acura -Hitsugi no Chaika-");
ar.push("Fredrica -Hitsugi no Chaika-");
ar.push("Chaika Bohdan -Hitsugi no Chaika-");
ar.push("Viivi Holopainen -Hitsugi no Chaika-");
ar.push("Layla -Hitsugi no Chaika-");
ar.push("Dominica Skoda -Hitsugi no Chaika-");
ar.push("Zita Brusasco -Hitsugi no Chaika-");
ar.push("Selma Kenworth -Hitsugi no Chaika-");
ar.push("Julia -Hitsugi no Chaika-");
ar.push("Karen Bombardier -Hitsugi no Chaika-");
ar.push("Hasumin Orlo -Hitsugi no Chaika-");
ar.push("Chaika Kamaz -Hitsugi no Chaika-");
ar.push("Niva Lada -Hitsugi no Chaika-");
ar.push("Claudia Dodge -Hitsugi no Chaika-");
ar.push("Alina Hartgen -Hitsugi no Chaika-");
ar.push("Irina Hartgen -Hitsugi no Chaika-");
ar.push("Ursula Tatra 12 -Hitsugi no Chaika-");
ar.push("Eureka -Eureka Seven-");
ar.push("Talho Yuuki -Eureka Seven-");
ar.push("Anemone -Eureka Seven-");
ar.push("Ray Beams -Eureka Seven-");
ar.push("Gidget -Eureka Seven-");
ar.push("Sakuya -Eureka Seven-");
ar.push("Hilda -Eureka Seven-");
ar.push("Mischa -Eureka Seven-");
ar.push("Diane Thurston -Eureka Seven-");
ar.push("Sonia Wakabayashi -Eureka Seven-");
ar.push("Tiptory -Eureka Seven-");
ar.push("Martha -Eureka Seven-");
ar.push("Coda Lovell -Eureka Seven-");
ar.push("Maki Nishikino -Love Live-");
ar.push("Niko Yazawa -Love Live-");
ar.push("Kotori Minami -Love Live-");
ar.push("Nozomi Toujou -Love Live-");
ar.push("Umi Sonoda -Love Live-");
ar.push("Honoka Kousaka -Love Live-");
ar.push("Eri Ayase -Love Live-");
ar.push("Rin Hoshizora -Love Live-");
ar.push("Hanayo Koizumi -Love Live-");
ar.push("Tsubasa Kira -Love Live-");
ar.push("Chihaya Kisaragi -The iDOLM@STER-");
ar.push("Miki Hoshii -The iDOLM@STER-");
ar.push("Makoto Kikuchi -The iDOLM@STER-");
ar.push("Takane Shijou -The iDOLM@STER-");
ar.push("Hibiki Ganaha -The iDOLM@STER-");
ar.push("Iori Minase -The iDOLM@STER-");
ar.push("Haruka Amami -The iDOLM@STER-");
ar.push("Yayoi Takatsuki -The iDOLM@STER-");
ar.push("Yukiho Hagiwara -The iDOLM@STER-");
ar.push("Azusa Miura -The iDOLM@STER-");
ar.push("Mami Futami -The iDOLM@STER-");
ar.push("Ritsuko Akizuki -The iDOLM@STER-");
ar.push("Ami Futami -The iDOLM@STER-");
ar.push("Mami Futami -The iDOLM@STER-");
ar.push("Maki Kamii -Idol*Sister-");
ar.push("Ayaka Takano -Idol*Sister-");
ar.push("Brother Takano -Idol*Sister-");
ar.push("Shiro -No Game No Life-");
ar.push("Stephanie Dora -No Game No Life-");
ar.push("Jibril -No Game No Life-");
ar.push("Izuna Hatsuse -No Game No Life-");
ar.push("Chlammy Zell -No Game No Life-");
ar.push("Feel Nilvalen -No Game No Life-");
ar.push("Miko -No Game No Life-");
ar.push("Queen -No Game No Life-");
ar.push("Miia Monster Musume no Iru Nichijou");
ar.push("Rachnera Arachnera Monster Musume no Iru Nichijou");
ar.push("Papi Monster Musume no Iru Nichijou");
ar.push("Suu Monster Musume no Iru Nichijou");
ar.push("Centorea Shianus Monster Musume no Iru Nichijou");
ar.push("Meroune Lorelei  Monster Musume no Iru Nichijou");
ar.push("Zombina Monster Musume no Iru Nichijou");
ar.push("Tionishia Meroune Lorelei  Monster Musume no Iru Nichijou");
ar.push("Doppel Monster Musume no Iru Nichijou");
ar.push("Manako Monster Musume no Iru Nichijou");
ar.push("Sumisu Monster Musume no Iru Nichijou");
ar.push("Himeko Inaba -Kokoro Connect-");
ar.push("Iori Nagase -Kokoro Connect-");
ar.push("Yui Kiriyama -Kokoro Connect-");
ar.push("Cthuko -Haiyore! Nyaruko-san-");
ar.push("Nyaruko -Haiyore! Nyaruko-san-");
ar.push("Hasuta -Haiyore! Nyaruko-san-");
ar.push("Luhy Jistone -Haiyore! Nyaruko-san-");
ar.push("Ghutatan -Haiyore! Nyaruko-san-");
ar.push("Tamao Kurei -Haiyore! Nyaruko-san-");

if ($.inidb.get("wowners", "num_waifus") == null || $.inidb.get("wowners", "num_waifus") == 0) {

    $.inidb.set("wowners", "num_waifus", ar.length);
    for (var temp = 0; temp < ar.length; ++temp) {
        $.inidb.set('waifus', 'waifu_' + temp, ar[temp]);
    }
}

$.registerChatCommand("./commands/waifuCommand.js", "waifu");
$.registerChatCommand("./commands/waifuCommand.js", "splitwaifu");
$.registerChatCommand("./commands/waifuCommand.js", "setwaifu");
$.registerChatCommand("./commands/waifuCommand.js", "delwaifu", "mod");
$.registerChatCommand("./commands/waifuCommand.js", "addwaifu", "mod");
$.registerChatCommand("./commands/waifuCommand.js", "editwaifu", "mod");
