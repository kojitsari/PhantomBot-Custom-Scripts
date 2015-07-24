$.on('command', function(event) {
    var sender = event.getSender();
	var username = event.getSender().toLowerCase();
	var command = event.getCommand();
    var argsString = event.getArguments().trim();
    var argsString2 = argsString.substring(argsString.indexOf(" ") + 1, argsString.length());
	var args = event.getArgs()
	var num_husbandos = parseInt($.inidb.get('howners', 'num_husbandos'));
	var num_owners = parseInt($.inidb.get('howners', 'num_own'));
	var randomNum = $.randRange(1, num_husbandos);
    var num;
	var test = false;
	
    if (command.equalsIgnoreCase("husbando")) {
            
		if (argsString.isEmpty()) {
			num = $.rand(num_husbandos);
		} else {
            num = parseInt(argsString);
		}
		
		if (num_owners >= 0) {
			for (temp = 0; temp < num_owners; temp++) {
				if (temp < num_owners) {
					ownname = $.inidb.get('howners', 'owner_' + temp)
					if (ownname == (username)) {
						num = $.inidb.get('howners', 'husbando_' + temp)
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
		
		if (isNaN(num_husbandos) || num_husbandos == 0) {
            $.say("The husbando list is empty! WE NEED MORE husbandoS!");
            return;
        }

        var messageCommand = $.inidb.get('husbandos', 'husbando_' + num);
		
		if (messageCommand <= 0) {
            $.say("There are only " + num_husbandos + " husbandos right now! Remember that all your husbandos are numbered 0 to " + (num_husbandos - 1) + "!");
			return;
        }
		
		var msgc = messageCommand;
		var filtered1 = msgc.split('-').join('+');
		var filtered = filtered1.split(' ').join('+');
		
		if (argsString.isEmpty() && test == false) {
			$.say("@" + $.username.resolve(sender) + ", your husbando is " + messageCommand + "  #" + num + "." + " https://www.google.com/search?tbm=isch&q=" + filtered);
		} else if (!argsString.isEmpty() && test == true){
			$.say("@" + $.username.resolve(sender) + ", married " + $.inidb.get('husbandos', 'husbando_' + married) + " and is trying to cheat with " + messageCommand);
			married = null;
		} else if (argsString.isEmpty() && test == true){
			$.say("@" + $.username.resolve(sender) + ", your married husbando is " + messageCommand + ".");
			married = null;
		} else {
			$.say("@" + $.username.resolve(sender) + ", your husbando is " + messageCommand + ".");
		}
		test = false;
    }
    
    if (command.equalsIgnoreCase("addhusbando")) {
        if (!$.isMod(sender)) {
            $.say($.modmsg);
            return;
        }

        if (num_husbandos == null || isNaN(num_husbandos)) {
            num_husbandos = 0;
        }

        if (argsString.isEmpty()) {
            $.say("Usage: !addhusbando <message>");
            return;
        }

        $.inidb.incr("howners", "num_husbandos", 1);
        $.inidb.set("husbandos", "husbando_" + num_husbandos, argsString);

        $.say("You just added a new husbando, let's hope their top tier! There are now " + (num_husbandos + 1) + " husbandos at your disposal!");
    }

    if (command.equalsIgnoreCase("edithusbando")) {
        if (!$.isMod(sender)) {
            $.say($.modmsg);
            return;
        }
		
		num = parseInt(args[0]);
		
        if (num > num_husbandos) {
            $.say("There is no husbando message under that ID, " + sender + "!");
            return;
        }

        if (argsString2.isEmpty() || argsString.isEmpty() || args[1] == null) {
            $.say("Usage: !edithusbando <ID> <message>");
            return;
        }

        $.inidb.set("husbandos", "husbando_" + num, argsString2);

        $.say("husbando message #" + num + " changed to: " + $.inidb.get("husbandos", "husbando_" + num));
        return;
    }

    if (command.equalsIgnoreCase("delhusbando")) {
        if (!$.isMod(sender)) {
            $.say($.modmsg);
            return;
        }

        if (num_husbandos == null || isNaN(num_husbandos) || num_husbandos == 0) {
            $.say("What happen to all the husbandos?!");
            return;
        }

        if (argsString.isEmpty()) {
            $.say("Usage: !delhusbando <id>");
            return;
        }

        if (num_husbandos > 1) {
            for (temp = 0; temp < num_husbandos; temp++) {
                if (temp > parseInt(argsString)) {
                    $.inidb.set('husbandos', 'husbando_' + (temp - 1), $.inidb.get('husbandos', 'husbando_' + temp))
                }
            }
        }

        $.inidb.del('husbandos', 'husbando_' + (num_husbandos - 1));

        $.inidb.decr("howners", "num_husbandos", 1);

        $.say("husbando removed! There are now " + (num_husbandos - 1) + " husbandos left!");
    }
	
	if (command.equalsIgnoreCase("sethusbando")) {
		if (argsString2.isEmpty()) {
			$.say((sender) + " you must put the number of the husbando you want to marry!");
			return;
		} else {
            num = parseInt(argsString2);
		}
		
		if (num < 0){
			$.say((sender) + " you must put a positive number of the husbando you want to marry!");
			return;
		}
		
		var messageCommand = $.inidb.get('husbandos', 'husbando_' + num);
				
		if (num_owners >= 0) {
			for (temp = 0; temp < num_owners; temp++) {
				if (temp < num_owners) {
					ownname = $.inidb.get('howners', 'owner_' + temp);
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
		
		$.inidb.incr('howners', 'num_own', 1);
		$.inidb.set('howners', 'husbando_' + num_owners, num);
		$.inidb.set('howners', 'owner_' + num_owners, (sender));
						
		$.say((sender) + " you married " + messageCommand);
		num_owners = $.inidb.get('howners', 'num_own');
		return;		
	}
	
	if (command.equalsIgnoreCase("splithusbando")) {
				
		if (isNaN(num_owners) || num_owners == null) {
			$.say((sender) + "nobody is married!");
			return;
        }
		
		if (num_owners >= 0) {
			for (temp = 0; temp < num_owners; temp++) {
				if (temp < num_owners) {
					ownname = $.inidb.get('howners', 'owner_' + temp);
					if (ownname == (username)) {
						$.inidb.decr('howners', 'num_own', 1);
						num = $.inidb.get('howners', 'husbando_' + temp);
						$.inidb.del('howners', 'husbando_' + temp);
						$.inidb.del('howners', 'owner_' + temp);
						break;
					}
				}
			}
			
		}
		
		if (num == null){
			$.say((sender) + " you are single!")
			return;	
		} else {
			var messageCommand = $.inidb.get('husbandos', 'husbando_' + num);
			$.say((sender) + " you divorced " + messageCommand)
			num_owners = $.inidb.get('howners', 'num_own')
			return;
		}
	}
});
var ar = new Array(0);
ar.push("Kojou Akatsuki -Strike the Blood-");
ar.push("Motoki Yaze -Strike the Blood-");
ar.push("Dimitrie Vatler -Strike the Blood-");
ar.push("Kou Amatsuka -Strike the Blood-");
ar.push("Yuji Sakai -Shakugan no Shana-");
ar.push("Kraft Lawrence  -Spice & Wolf-");
ar.push("Archer -Fate/Stay Night-");
ar.push("Shirou Emiya -Fate/Stay Night-");
ar.push("Kiritsugu Emiya -Fate/Stay Night-");
ar.push("Gilgamesh -Fate/Stay Night-");
ar.push("Kirei Kotomine -Fate/Stay Night-");
ar.push("Lancer -Fate/Stay Night-");
ar.push("Assassin -Fate/Stay Night-");
ar.push("Berserker  -Fate/Stay Night-");
ar.push("Shinji Matou -Fate/Stay Night-");
ar.push("Souichirou Kuzuki -Fate/Stay Night-");
ar.push("Issei Ryuudou -Fate/Stay Night-");
ar.push("Alastor -Shakugan no Shana-");
ar.push("Sabrac -Shakugan no Shana-");
ar.push("Friagne -Shakugan no Shana-");
ar.push("Dantalion -Shakugan no Shana-");
ar.push("Sydonay -Shakugan no Shana-");
ar.push("Khamsin Nbh'w -Shakugan no Shana-");
ar.push("Lamies -Shakugan no Shana-");
ar.push("Johann -Shakugan no Shana-");
ar.push("Tenmoku Ikko -Shakugan no Shana-");
ar.push("Hayato Ike -Shakugan no Shana-");
ar.push("Satō Keisaku -Shakugan no Shana-");
ar.push("Tanaka Eita -Shakugan no Shana-");
ar.push("Seere Habichtsburg -Shakugan no Shana-");
ar.push("Mammon -Shakugan no Shana-");
ar.push("Ryuuji Takasu -Toradora!-");
ar.push("Yusaku Kitamura -Toradora!-");
ar.push("Koji Haruta -Toradora!-");
ar.push("Kirito -Sword Art Online-");
ar.push("Shinkawa Shouchi -Sword Art Online-");
ar.push("Shinkawa Kyouji -Sword Art Online-");
ar.push("Kayaba Akihiko -Sword Art Online-");
ar.push("Klein -Sword Art Online-");
ar.push("Sugou Nobuyuki -Sword Art Online-");
ar.push("Agil -Sword Art Online-");
ar.push("Kikouka Seijirou -Sword Art Online-");
ar.push("Kuradeel -Sword Art Online-");
ar.push("Grimlock -Sword Art Online-");
ar.push("Izaya Orihara -Durarara!!-");
ar.push("Shizuo Heiwajima -Durarara!!-");
ar.push("Masaomi Kida -Durarara!!-");
ar.push("Mikado Ryuugamine -Durarara!!-");
ar.push("Isaac Dian -Durarara!!-");
ar.push("Shinra Kishitani -Durarara!!-");
ar.push("Semyon Brezhnev -Durarara!!-");
ar.push("Walker Yumasaki -Durarara!!-");
ar.push("Kasuka Heiwajima -Durarara!!-");
ar.push("Shingen Kishitani -Durarara!!-");
ar.push("Aoba Kuronuma -Durarara!!-");
ar.push("Chikage Rokujou -Durarara!!-");
ar.push("Mizuki Akabayashi -Durarara!!-");
ar.push("Egor -Durarara!!-");
ar.push("Sloan -Durarara!!-");
ar.push("Tom Tanaka -Durarara!!-");
ar.push("Seiji Yagiri -Durarara!!-");
ar.push("Saburou Togusa -Durarara!!-");
ar.push("Kinnosuke Kuzuhara -Durarara!!-");
ar.push("Haruya Shiki -Durarara!!-");
ar.push("Kyouhei Kadota -Durarara!!-");
ar.push("Roy Mustang -Fullmetal Alchemist-");
ar.push("Edward Elric -Fullmetal Alchemist-");
ar.push("Alphonse Elric -Fullmetal Alchemist-");
ar.push("Maes Hughes -Fullmetal Alchemist-");
ar.push("Greed -Fullmetal Alchemist-");
ar.push("Alex Louis Armstrong -Fullmetal Alchemist-");
ar.push("Ling Yao -Fullmetal Alchemist-");
ar.push("Envy -Fullmetal Alchemist-");
ar.push("King Bradley -Fullmetal Alchemist-");
ar.push("Scar -Fullmetal Alchemist-");
ar.push("Van Hohenheim -Fullmetal Alchemist-");
ar.push("Solf J. Kimblee -Fullmetal Alchemist-");
ar.push("Selim Bradley -Fullmetal Alchemist-");
ar.push("Jean Havoc -Fullmetal Alchemist-");
ar.push("Gluttony -Fullmetal Alchemist-");
ar.push("Barry the Chopper -Fullmetal Alchemist-");
ar.push("Homunculus -Fullmetal Alchemist-");
ar.push("Miles -Fullmetal Alchemist-");
ar.push("Truth -Fullmetal Alchemist-");
ar.push("Sloth -Fullmetal Alchemist-");
ar.push("Shou Tucker -Fullmetal Alchemist-");
ar.push("Fu -Fullmetal Alchemist-");
ar.push("Kain Fuery -Fullmetal Alchemist-");
ar.push("Sig Curtis -Fullmetal Alchemist-");
ar.push("Den Rockbell -Fullmetal Alchemist-");
ar.push("Kouta Oyamada -Kanokon-");
ar.push("Tayura Minamoto -Kanokon-");
ar.push("Saku Ezomori -Kanokon-");
ar.push("Omi Kiriyama -Kanokon-");
ar.push("Takao Yatsuka -Kanokon-");
ar.push("Ryuusei Kumada -Kanokon-");
ar.push("Subaru Hasegawa -Ro-Kyu-Bu!-");
ar.push("Natsuhi Takenaka -Ro-Kyu-Bu!-");
ar.push("Moritaka Mashiro -Bakuman-");
ar.push("Akito Takagi -Bakuman-");
ar.push("Eiji Niizuma -Bakuman-");
ar.push("Kazuya Hiramaru  -Bakuman-");
ar.push("Shinta Fukuda -Bakuman-");
ar.push("Akira Hattori -Bakuman-");
ar.push("MKouji Yoshida -Bakuman-");
ar.push("Nobuhiro Mashiro -Bakuman-");
ar.push("HYDE -Bakuman-");
ar.push("Takuro Nakai -Bakuman-");
ar.push("Yujiro Hattori -Bakuman-");
ar.push("Souichi Aida -Bakuman-");
ar.push("Gorou Miura -Bakuman-");
ar.push("Koji Makaino -Bakuman-");
ar.push("Hisashi Sasaki -Bakuman-");
ar.push("Yoshihisa Heishi -Bakuman-");
ar.push("Kyousuke Kousaka -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Daisuke Kousaka -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Gennosuke Miura -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Kouhei Akagi -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Shinya Sanada -Ore no Imouto ga Konnani Kawaii Wake ga Nai-");
ar.push("Banri Tada -Golden Time-");
ar.push("Mitsuo Yanagisawa -Golden Time-");
ar.push("Takaya Satou -Golden Time-");
ar.push("Lelouch Lamperouge -Code Geass-");
ar.push("Suzaku Kururugi -Code Geass-");
ar.push("Jeremiah Gottwald -Code Geass-");
ar.push("Lloyd Asplund -Code Geass-");
ar.push("Rolo Lamperouge -Code Geass-");
ar.push("Schneizel el Britannia -Code Geass-");
ar.push("Charles zi Britannia -Code Geass-");
ar.push("Kyoshiro Toudou -Code Geass-");
ar.push("Diethard Ried -Code Geass-");
ar.push("Rivalz Cardemonde -Code Geass-");
ar.push("Kaname Ohgi -Code Geass-");
ar.push("Shinichiro Tamaki -Code Geass-");
ar.push("Kanon Maldini -Code Geass-");
ar.push("Kamina -Gurren Lagann-");
ar.push("Simon -Gurren Lagann-");
ar.push("Viral -Gurren Lagann-");
ar.push("Kittan Bachika(Gurren Lagann-");
ar.push("Lordgenome -Gurren Lagann-");
ar.push("Leeron Littner -Gurren Lagann-");
ar.push("Rossiu Adai -Gurren Lagann-");
ar.push("Anti-Spiral -Gurren Lagann-");
ar.push("Attenborough Cortich -Gurren Lagann-");
ar.push("Old Coco -Gurren Lagann-");
ar.push("Gimmy Adai -Gurren Lagann-");
ar.push("Dayakka Littner -Gurren Lagann-");
ar.push("Cytomander -Gurren Lagann-");
ar.push("Balinbow Bakusa -Gurren Lagann-");
ar.push("Jorgun Bakusa -Gurren Lagann-");
ar.push("Takashi Komuro -The High School of the Dead-");
ar.push("Kouta Hirano -The High School of the Dead-");
ar.push("Koichi Shidou -The High School of the Dead-");
ar.push("Hisashi Igou -The High School of the Dead-");
ar.push("Souichiro Takagi -The High School of the Dead-");
ar.push("Toma -Shining Force EXE-");
ar.push("Ittoki Otoya -Uta no Prince-sama-");
ar.push("Kurusu Syo -Uta no Prince-sama-");
ar.push("Chris Redfield -Resident Evil-");
ar.push("Leon S. Kennedy -Resident Evil-");
ar.push("Solid Snake -Metal Gear Solid-");
ar.push("Vegeta -Dragon Ball Z-");
ar.push("Trunks -Dragon Ball Z-");
ar.push("Goku -Dragon Ball Z-");
ar.push("Majin Buu -Dragon Ball Z-");
ar.push("Beerus -Dragon Ball Z-");
ar.push("Whis -Dragon Ball Z-");
ar.push("Krillen -Dragon Ball Z-");
ar.push("Gohan -Dragon Ball Z-");
ar.push("Piccolo -Dragon Ball Z-");
ar.push("Choutsu -Dragon Ball Z-");
ar.push("Kisshu Ikisatashi -Tokyo Mew Mew-");
ar.push("Gray Fullbuster -Fairy Tail-");
ar.push("Natsu Dragneel -Fairy Tail-");
ar.push("Gajeel Redfox -Fairy Tail-");
ar.push("Laxus Dreyar -Fairy Tail-");
ar.push("Elfman Strauss -Fairy Tail-");
ar.push("Bickslow -Fairy Tail-");
ar.push("Mest Gryder -Fairy Tail-");
ar.push("Zero -Vampire Knight-");
ar.push("L -Death Note-");
ar.push("Light Yagami -Death Note-");
ar.push("Luffy -One Piece-");
ar.push("Takumi Usui -Kaichou wa Maid-sama-");
ar.push("Sebastian Michaelis -Black Butler-");
ar.push("Death the Kid -Soul Eater-");
ar.push("Tuxedo Mask -Sailor Moon-");
ar.push("Nightwing -Arkham Knight-");
ar.push("Raiden -Metal Gear-");
ar.push("Sesshomaru -Inuyasha-");
ar.push("Lelouch Lamperouge -Code Geass-");
ar.push("Uchiha Sasuke -Naruto-");
ar.push("Lavi Bookman Jr. -D Gray Man-");
ar.push("Ichigo Kurosaki -Bleach-");
ar.push("Tomoe -Kamisama Hajimemashita-");
ar.push("Ikuto Tsukiyomi -Shugo Chara-");
ar.push("Big Band -Skullgirls-");
ar.push("Beowulf -Skullgirls-");
ar.push("Ragna the Bloodedge -Blazblue-");
ar.push("Yūki Terumi -Blazblue-");
ar.push("Hakumen -Blazblue-");
ar.push("Hazama -Blazblue-");
ar.push("Kagura Mutsuki -Blazblue-");
ar.push("Amane Nishiki -Blazblue-");
ar.push("Jubei -Blazblue-");
ar.push("Jin Kisaragi -Blazblue-");
ar.push("Arakune -Blazblue-");
ar.push("Azrael -Blazblue-");
ar.push("Relius Clover -Blazblue-");
ar.push("Valkenhayn R. Hellsing -Blazblue-");
ar.push("Iron Tager -Blazblue-");
ar.push("Carl Clover -Blazblue-");
ar.push("Bang Shishigami -Blazblue-");
ar.push("Kazuma Kval -Blazblue-");
ar.push("Clavis Alucard -Blazblue-");
ar.push("Homura Amanohokosaka -Blazblue-");
ar.push("Hyde -UNDER NIGHT IN-BIRTH-");
ar.push("Waldstein -UNDER NIGHT IN-BIRTH-");
ar.push("Carmine -UNDER NIGHT IN-BIRTH-");
ar.push("Gordeau -UNDER NIGHT IN-BIRTH-");
ar.push("Merkava -UNDER NIGHT IN-BIRTH-");
ar.push("Seth -UNDER NIGHT IN-BIRTH-");
ar.push("Chaos -UNDER NIGHT IN-BIRTH-");
ar.push("Akatsuki -UNDER NIGHT IN-BIRTH-");
ar.push("Byakuya -UNDER NIGHT IN-BIRTH-");
ar.push("Sol Badguy -Guilty Gear-");
ar.push("Ky Kiske -Guilty Gear-");
ar.push("Sin Kiske -Guilty Gear-");
ar.push("Faust -Guilty Gear-");
ar.push("Johnny Sfondi -Guilty Gear-");
ar.push("Bridget -Guilty Gear-");
ar.push("That Man -Guilty Gear-");
ar.push("Zato-1 -Guilty Gear-");
ar.push("Bedman -Guilty Gear-");
ar.push("Slayer -Guilty Gear-");
ar.push("Potemkin -Guilty Gear-");
ar.push("Leo Whitefang -Guilty Gear-");
ar.push("Venom -Guilty Gear-");
ar.push("Chipp Zanuff -Guilty Gear-");
ar.push("Axl Low -Guilty Gear-");
ar.push("Testament -Guilty Gear-");
ar.push("Oder-Sol -Guilty Gear-");
ar.push("Zappa -Guilty Gear-");
ar.push("Eddie -Guilty Gear-");
ar.push("Kliff Undersn -Guilty Gear-");
ar.push("Anji Mito -Guilty Gear-");
ar.push("Dr. Paradigm -Guilty Gear-");
ar.push("Robo-Ky -Guilty Gear-");
ar.push("Kiyoshi Fujino -Prison School-");
ar.push("Takehito Morokuzu -Prison School-");
ar.push("Reiji Andou -Prison School-");
ar.push("Jouji Nezu -Prison School-");
ar.push("Shingo Wakamoto -Prison School-");
ar.push("Principal Kurihara -Prison School-");
ar.push("T.K. -Angel Beats-");
ar.push("Hideki Hinata  -Angel Beats-");
ar.push("Yuzuru Otonashi  -Angel Beats-");
ar.push("Noda -Angel Beats-");
ar.push("Takamatsu -Angel Beats-");
ar.push("Ooyama -Angel Beats-");
ar.push("Takeyama -Angel Beats-");
ar.push("Mysterious Boy -Angel Beats-");
ar.push("Chaa -Angel Beats-");
ar.push("Takeyama -Angel Beats-");
ar.push("Haruyuki Arita -Accel World-");
ar.push("Takumu Mayuzumi -Accel World-");
ar.push("Ash Roller -Accel World-");
ar.push("Seiji Noumi -Accel World-");
ar.push("Yellow Radio -Accel World-");
ar.push("Blue Knight -Accel World-");
ar.push("Purple Thorn -Accel World-");
ar.push("Hayato Hayama -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Kakeru Tobe -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Saika Totsuka -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Yoshiteru Zaimokuza -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Hachiman Hikigaya -Yahari Ore no Seishun Love Comedy wa Machigatteiru-");
ar.push("Ken Masters -Street Fighter-");
ar.push("Akuma -Street Fighter-");
ar.push("Ryu -Street Fighter-");
ar.push("Evil Ryu -Street Fighter-");
ar.push("M. Bison -Street Fighter-");
ar.push("Adon -Street Fighter-");
ar.push("Oni -Street Fighter-");
ar.push("Charlie Nash -Street Fighter-");
ar.push("Rolento F. Schugerg -Street Fighter-");
ar.push("Seth -Street Fighter-");
ar.push("Sagat -Street Fighter-");
ar.push("Vega -Street Fighter-");
ar.push("Gouken -Street Fighter-");
ar.push("Abel -Street Fighter-");
ar.push("Dan Hibiki -Street Fighter-");
ar.push("Hugo -Street Fighter-");
ar.push("Cody Travers -Street Fighter-");
ar.push("Gill -Street Fighter-");
ar.push("Balrog -Street Fighter-");
ar.push("Blanka -Street Fighter-");
ar.push("Urien -Street Fighter-");
ar.push("Guile -Street Fighter-");
ar.push("Guy -Street Fighter-");
ar.push("Hakan -Street Fighter-");
ar.push("Dudley -Street Fighter-");
ar.push("Yun -Street Fighter-");
ar.push("Gen -Street Fighter-");
ar.push("Alex -Street Fighter-");
ar.push("Zangief -Street Fighter-");
ar.push("Fei Long -Street Fighter-");
ar.push("Sean Matsuda -Street Fighter-");
ar.push("Q -Street Fighter-");
ar.push("Dhalsim -Street Fighter-");
ar.push("Yang -Street Fighter-");
ar.push("Dee Jay -Street Fighter-");
ar.push("Thunder Hawk -Street Fighter-");
ar.push("El Fuerte -Street Fighter-");
ar.push("Edmond Honda -Street Fighter-");
ar.push("Rufus -Street Fighter-");
ar.push("Michael Haggar -Street Fighter-");
ar.push("Tomoya Okazaki -CLANNAD-");
ar.push("Youhei Sunohara -CLANNAD-");
ar.push("Akio Furukawa -CLANNAD-");
ar.push("Garbage Doll -CLANNAD-");
ar.push("Naoyuki Okazaki -CLANNAD-");
ar.push("Yusuke Yoshino -CLANNAD-");
ar.push("Toshio Koumura -CLANNAD-");
ar.push("Hermes -DanMachi-");
ar.push("Takemikazuchi -DanMachi-");
ar.push("Finne Deimne -DanMachi-");
ar.push("Soma -DanMachi-");
ar.push("Miach -DanMachi-");
ar.push("Bete Loga -DanMachi-");
ar.push("Welf Crozzo -DanMachi-");
ar.push("Bell Cranel -DanMachi-");
ar.push("Ouka Kashima -DanMachi-");
ar.push("Protagonist -Shin Megami Tensei: Persona 3-");
ar.push("Shinjiro Aragaki -Shin Megami Tensei: Persona 3-");
ar.push("Akihiko Sanada -Shin Megami Tensei: Persona 3-");
ar.push("Ken Amada -Shin Megami Tensei: Persona 3-");
ar.push("Koromaru -Shin Megami Tensei: Persona 3-");
ar.push("Igor -Persona-");
ar.push("Junpei Iori -Shin Megami Tensei: Persona 3-");
ar.push("Theodore -Shin Megami Tensei: Persona 3-");
ar.push("Pharos -Shin Megami Tensei: Persona 3-");
ar.push("Takeharu Kirijo -Shin Megami Tensei: Persona 3-");
ar.push("Eiichiro Takeba -Shin Megami Tensei: Persona 3-");
ar.push("Takaya Sakaki -Shin Megami Tensei: Persona 3-");
ar.push("Jin Shirato -Shin Megami Tensei: Persona 3-");
ar.push("Yu Narukami -Shin Megami Tensei: Persona 4-");
ar.push("Yosuke Hanamura -Shin Megami Tensei: Persona 4-");
ar.push("Kanji Tatsumi -Shin Megami Tensei: Persona 4-");
ar.push("Teddie -Shin Megami Tensei: Persona 4-");
ar.push("Ryotaro Dojima -Shin Megami Tensei: Persona 4-");
ar.push("Tohru Adachi -Shin Megami Tensei: Persona 4-");
ar.push("Kinshiro Morooka -Shin Megami Tensei: Persona 4-");
ar.push("Mitsuo Kubo -Shin Megami Tensei: Persona 4-");
ar.push("Shu Nakajima -Shin Megami Tensei: Persona 4-");
ar.push("Taro Namatame -Shin Megami Tensei: Persona 4-");
ar.push("Kou Ichijo -Shin Megami Tensei: Persona 4-");
ar.push("Arata Kasuga -Trinity Seven-");
ar.push("Tanukichi Okuma -Shimoneta: A Boring World Where the Concept of Dirty Jokes Doesn’t Exist-");
ar.push("Raiki Gouriki -Shimoneta: A Boring World Where the Concept of Dirty Jokes Doesn’t Exist-");
ar.push("Asahi Kuromine -Jitsu wa Watashi wa-");
ar.push("Okada -Jitsu wa Watashi wa-");
ar.push("Sakurada -Jitsu wa Watashi wa-");
ar.push("Shimada -Jitsu wa Watashi wa-");
ar.push("Tsukune Aono -Rosario to Vampire-");
ar.push("Ginei Morioka -Rosario to Vampire-");
ar.push("Bus Driver -Rosario to Vampire-");
ar.push("Tenmei Mikogami -Rosario to Vampire-");
ar.push("Kuyou -Rosario to Vampire-");
ar.push("Okuto Kotsubo -Rosario to Vampire-");
ar.push("Shiroe -Log Horizon-");
ar.push("Nyanta -Log Horizon-");
ar.push("Naotsugu -Log Horizon-");
ar.push("Rundellhous Kode -Log Horizon-");
ar.push("Krusty -Log Horizon-");
ar.push("Soujirou Seta -Log Horizon-");
ar.push("William Massachusetts -Log Horizon-");
ar.push("Isaac -Log Horizon-");
ar.push("Regan -Log Horizon-");
ar.push("Touya -Log Horizon-");
ar.push("Michitaka -Log Horizon-");
ar.push("Demiqas -Log Horizon-");
ar.push("Roderick -Log Horizon-");
ar.push("Serjiad Corwen -Log Horizon-");
ar.push("Kon Hokaze -Ixion Saga DT-");
ar.push("Erekpyle Dukakis -Ixion Saga DT-");
ar.push("Sainglain -Ixion Saga DT-");
ar.push("Leon -Ixion Saga DT-");
ar.push("Gustave -Ixion Saga DT-");
ar.push("KT -Ixion Saga DT-");
ar.push("Variation -Ixion Saga DT-");
ar.push("Nabokov Jugglaburk -Ixion Saga DT-");
ar.push("Tooru Acura -Hitsugi no Chaika-");
ar.push("Guy -Hitsugi no Chaika-");
ar.push("Albéric Gillette -Hitsugi no Chaika-");
ar.push("Shin Acura -Hitsugi no Chaika-");
ar.push("Nikolai Avtotor -Hitsugi no Chaika-");
ar.push("Matthäus Callaway -Hitsugi no Chaika-");
ar.push("Leonardo Stora -Hitsugi no Chaika-");
ar.push("Robert Abarth -Hitsugi no Chaika-");
ar.push("Konrad Steinmetz -Hitsugi no Chaika-");
ar.push("David -Hitsugi no Chaika-");
ar.push("Simon Scania -Hitsugi no Chaika-");
ar.push("Grad Lancia -Hitsugi no Chaika-");
ar.push("Ricardo Gavarni -Hitsugi no Chaika-");
ar.push("Bernard Chizeta -Hitsugi no Chaika-");
ar.push("Kiril Tatra 47 -Hitsugi no Chaika-");
ar.push("Arthur Gaz -Hitsugi no Chaika-");
ar.push("Renton Thurston -Eureka Seven-");
ar.push("Holland Novak -Eureka Seven-");
ar.push("Dominic Sorel -Eureka Seven-");
ar.push("Charles Beams -Eureka Seven-");
ar.push("Moondoggie -Eureka Seven-");
ar.push("Stoner -Eureka Seven-");
ar.push("Matthieu -Eureka Seven-");
ar.push("Norb -Eureka Seven-");
ar.push("William B. Baxter -Eureka Seven-");
ar.push("Dewey Novak -Eureka Seven-");
ar.push("Axel Thurston -Eureka Seven-");
ar.push("Hap -Eureka Seven-");
ar.push("Woz -Eureka Seven-");
ar.push("Jobs -Eureka Seven-");
ar.push("Captain Jurgens -Eureka Seven-");
ar.push("Ken-Goh -Eureka Seven-");
ar.push("Greg Egan -Eureka Seven-");
ar.push("Adroc Thurston -Eureka Seven-");
ar.push("Gonzy -Eureka Seven-");
ar.push("Morita -Eureka Seven-");
ar.push("Yukatan Iglasias -Eureka Seven-");
ar.push("Neal -Eureka Seven-");
ar.push("Brittany -Eureka Seven-");

if ($.inidb.get("howners", "num_husbandos") == null || $.inidb.get("howners", "num_husbandos") == 0) {

    $.inidb.set("howners", "num_husbandos", ar.length);
    for (var temp = 0; temp < ar.length; ++temp) {
        $.inidb.set('husbandos', 'husbando_' + temp, ar[temp]);
    }
}

$.registerChatCommand("./commands/husbandoCommand.js", "husbando");
$.registerChatCommand("./commands/husbandoCommand.js", "sethusbando");
$.registerChatCommand("./commands/husbandoCommand.js", "splithusbando");
$.registerChatCommand("./commands/husbandoCommand.js", "delhusbando", "mod");
$.registerChatCommand("./commands/husbandoCommand.js", "addhusbando", "mod");
$.registerChatCommand("./commands/husbandoCommand.js", "edithusbando", "mod");
