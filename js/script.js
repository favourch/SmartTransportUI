var map, originVar, destinationVar, transitObject, originVarx, destinationVarx, endinst, latitude, longitude;
var vehicles = [], fullroute = [], userid, searchtemp, lmaddtheme="", mmaddtheme="", usertheme="";
var alternative = false, gotlocation = false, isfullrouteset=false,setad=false;
var ridesharedata='';
var countr=0;
var countrRS=0;
var currentdiv='';
var currentRSdiv='';
var sharelinks = '';

var emojis = ["smile","happy-1","happy-2","happy","ninja","quiet","surprised","suspicious","wtf"];
	var yabacon='<a href="images/yabacon.png" target="_blank"><img src="images/yabacon.png" class="yabaconimg"></a>' +
		'<ol>' +
		'<li><a href="#" onclick="processyc(\'yacojumia\')">Jumia</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacoecenter\')">E-centre/Cafe Neo</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacocodulab\')">Codulab</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacohotels\')">Hotels.ng</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacoidea\')">Idea Hub</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacocchub\')">CCHub</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacoprep\')">Prepclass</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacoandela\')">Andela</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacobudgit\')">Budgit</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacoleadspace\')">LeadSpace</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacoogavenue\')">Ogavenue</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacocabal\')">Techcabal</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacopoint\')">TechPoint</a></li>' +
		'<li><a href="#" onclick="processyc(\'yacotech\')">PagaTech</a></li>' +
		'</ol>' +
		'</div>';
$('#cbutton').on('click', function() {
	scrollDown();
	var usertext = $('#chatinput').val();
	if(usertext!=="") {
		var messagediv = document.createElement('div');
		messagediv.className = 'messagediv';
		var mymessage = document.createElement('div');
		mymessage.className = 'mymessage'+mmaddtheme;
		mymessage.innerHTML = usertext;
		var msgtime = document.createElement('span');
		msgtime.className = 'msgtime';
		var msgtimeimg = document.createElement('img');
		msgtimeimg.className = 'readmsg';
		msgtimeimg.setAttribute('src', 'images/icons/read.svg');
		msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
		mymessage.appendChild(msgtime);
		mymessage.appendChild(msgtimeimg);

		messagediv.appendChild(mymessage);
		document.getElementById('chatarea').appendChild(messagediv);
		scrollDown();
		if (!alternative)
			processQueryx();
		else showAlternative();
		$('#chatinput').val('');
	}
});

function processyc(location) {
	$('#chatinput').val(location);
	processQueryx();
	$('#chatinput').val('');
}

$('#chatinput').keypress(function (e) {
	if (e.which == 13) {
		scrollDown();
		var usertext = $('#chatinput').val();
		if(usertext!=="") {
			var messagediv = document.createElement('div');
			messagediv.className = 'messagediv';
			var mymessage = document.createElement('div');
			mymessage.className = 'mymessage'+mmaddtheme;
			mymessage.innerHTML = usertext;
			var msgtime = document.createElement('span');
			msgtime.className = 'msgtime';
			var msgtimeimg = document.createElement('img');
			msgtimeimg.className = 'readmsg';
			msgtimeimg.setAttribute('src', 'images/icons/read.svg');
			msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
			mymessage.appendChild(msgtime);
			mymessage.appendChild(msgtimeimg);

			messagediv.appendChild(mymessage);
			document.getElementById('chatarea').appendChild(messagediv);
			scrollDown();
			if (!alternative)
				processQueryx();
			else showAlternative();
			$('#chatinput').val('');
		}
		return false;    //<---- Add this line
	}
});
$('#getloc').on('click', function() {
	locator();
});
$('.emoji').on('click', function() {
	sendemoji(this.id);
});

$('#emojies').on('click', function() {
	$('#emojigroup').slideToggle();
});
$('#menucont').on('click', function() {
	$('#menucont').toggle();
});
$('.menuicon').on('click', function() {
	$('#menucont').toggle();
});
$('#bwt').on('click', function() {
	setBWTTheme();
});
$('#bgt').on('click', function() {
	setBGTTheme();
});
$('#ggt').on('click', function() {
	clearThemes();
});
function setBWTTheme() {
	clearThemes();
	$('.menubar').addClass("bwtmenubar");
	$('.chatbody').addClass("bwtchatbody");
	$('.laramessage').addClass("bwtlaramessage");
	$('.mymessage').addClass("bwtmymessage");
	$('.sendicon').addClass("bwtsendicon");
	lmaddtheme=" bwtlaramessage";
	mmaddtheme=" bwtmymessage";
	usertheme="bwt";
	setit("laratheme", usertheme, 365);
}
function setBGTTheme() {
	clearThemes();
	$('.menubar').addClass("bgtmenubar");
	$('.chatbody').addClass("bgtchatbody");
	$('.laramessage').addClass("bgtlaramessage");
	$('.mymessage').addClass("bgtmymessage");
	$('.sendicon').addClass("bgtsendicon");
	lmaddtheme=" bgtlaramessage";
	mmaddtheme=" bgtmymessage";
	usertheme="bgt";
	setit("laratheme", usertheme, 365);
}

function clearThemes() {
	$('.menubar').removeClass("bwtmenubar");
	$('.chatbody').removeClass("bwtchatbody");
	$('.laramessage').removeClass("bwtlaramessage");
	$('.mymessage').removeClass("bwtmymessage");
	$('.sendicon').removeClass("bwtsendicon");
	$('.menubar').removeClass("bgtmenubar");
	$('.chatbody').removeClass("bgtchatbody");
	$('.laramessage').removeClass("bgtlaramessage");
	$('.mymessage').removeClass("bgtmymessage");
	$('.sendicon').removeClass("bgtsendicon");
	lmaddtheme="";
	mmaddtheme="";
	usertheme="ggt";
	setit("laratheme", usertheme, 365);
}

function doautocomplete(autocomplete) {
	var place = autocomplete.getPlace();
	if (!place.geometry) {
		return;
	}
	// Set the position of the marker using the place ID and location.
	return place.geometry.location;
}
function checkboth() {
	if ($("#start").val() && $("#end").val())
		return true;
	else return false;
}

var route = {"Route":{"Start":{"Name":"Ilepo Alhaji Bus stop","Latitude":"6.586943","Longitude":"3.286178"},"End":{"Name":"Alaroro Bus Stop","Latitude":"6.599600","Longitude":"3.292934"}},"Legs":[[{"Start":{"Name":"Ilepo Alhaji Bus stop","Latitude":"6.586943","Longitude":"3.286178"},"End":{"Name":"Mokola Bus Stop","Latitude":"6.600428","Longitude":"3.291836"},"HeadSign":"Iyana ipaja bus station","TravelTime":" 8 mins","Vehicle":{"Type":"MiniBus","MinFare":"50"}},{"Start":{"Name":"Mokola Bus Stop","Latitude":"6.600428","Longitude":"3.291836"},"End":{"Name":"Alaroro Bus Stop","Latitude":"6.599600","Longitude":"3.292934"},"Vehicle":{"Type":"Walk","MinFare":"0"}},{"Info":{"TravelTime":" 8 mins","MinFare":50,"MaxFare":50}}]]};

function newDiv() {
	var iDiv = document.createElement('div');
	iDiv.id = 'block'+countr;
	currentdiv = iDiv.id;
	directions = document.getElementById('directions');
	// The variable iDiv is still good... Just append to it.
	directions.appendChild(iDiv);
	countr++;
}

function addmessage(msg) {
	var messagediv = document.createElement('div');
	messagediv.className = 'messagediv';
	var laramessage = document.createElement('div');
	laramessage.className = 'laramessage'+lmaddtheme;
	laramessage.innerHTML = msg;
	var msgtime = document.createElement('span');
	msgtime.className = 'msgtime';
	msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
	laramessage.appendChild(msgtime);
	messagediv.appendChild(laramessage);
	document.getElementById('chatarea').appendChild(messagediv);
	scrollDown();
}

function addimage(img) {
	var messagediv = document.createElement('div');
	messagediv.className = 'messagediv';
	var laramessage = document.createElement('div');
	laramessage.className = 'laramessage'+lmaddtheme;
	laramessage.appendChild(img);
	messagediv.appendChild(laramessage);
	document.getElementById('chatarea').appendChild(messagediv);
	scrollDown();
}

function addAd(msg,imgSource) {
	var messagediv = document.createElement('div');
	messagediv.className = 'messagediv';
	var addiv = document.createElement('div');
	addiv.className = 'addiv';
	var adlink = document.createElement('a');
	adlink.setAttribute('href', 'http://convers-e.com/rpdev/getdeals/13');
	adlink.setAttribute('target', '_blank');
	var admessage = document.createElement('div');
	admessage.className = 'admessage';
	admessage.innerHTML = msg;
	var adinsert = document.createElement('div');
	adinsert.className = 'adinsert';
	adinsert.innerHTML = "Ad";
	admessage.appendChild(adinsert);
	if (imgSource !=null) {
		var adimage = document.createElement('img');
		adimage.setAttribute('src', "images/ads/"+imgSource);
		adlink.appendChild(adimage);
	}
	
	adlink.appendChild(admessage);
	addiv.appendChild(adlink);
	messagediv.appendChild(addiv);
	document.getElementById('chatarea').appendChild(messagediv);
	scrollDown();
}

function sendemoji(eid) {
	var messagediv = document.createElement('div');
	messagediv.className = 'messagediv';
	var mymessage = document.createElement('div');
	mymessage.className = 'mymessage'+mmaddtheme;
	var emojimsg = document.createElement('div');
	emojimsg.className = 'emojimsg '+eid;
	var msgtime = document.createElement('span');
	msgtime.className = 'msgtime';
	var msgtimeimg = document.createElement('img');
	msgtimeimg.className = 'readmsg';
	msgtimeimg.setAttribute('src', 'images/icons/read.svg');
	msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
	mymessage.appendChild(emojimsg);
	mymessage.appendChild(msgtime);
	mymessage.appendChild(msgtimeimg);

	messagediv.appendChild(mymessage);
	document.getElementById('chatarea').appendChild(messagediv);
	scrollDown();
	replyemoji(eid);
	
	var emojies = document.getElementById('emojigroup');
	emojies.style.display='none';
}


function newRSDiv() {
	var iDiv = document.createElement('div');
	iDiv.id = 'block'+countrRS;
	currentRSdiv = iDiv.id;
	directions = document.getElementById('directions');

	// The variable iDiv is still good... Just append to it.
	directions.appendChild(iDiv);
	countrRS++;
	console.log("flesoul " +countrRS);
}

function replyemoji(eid) {
	switch(eid) {
			case "smile":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "happy-1":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "happy-2":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "happy":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "in-love":
				randx = Math.floor(Math.random() * 4)+5;
				myeid = emojis[randx];
			break;
			case "ninja":
				randx = Math.floor(Math.random() * 4);
				myeid = emojis[randx];
			break;
			case "quiet":
				randx = Math.floor(Math.random() * 9);
				myeid = emojis[randx];
			break;
			case "surprised":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "suspicious":
				randx = Math.floor(Math.random() * 3);
				myeid = emojis[randx];
			break;
			case "sad":
				randx = Math.floor(Math.random() * 3)+5;
				myeid = emojis[randx];
			break;
			case "unhappy":
				randx = Math.floor(Math.random() * 3)+5;
				myeid = emojis[randx];
			break;
			case "wtf":
				randx = Math.floor(Math.random() * 9);
				myeid = emojis[randx];
			break;
		}

	var messagediv = document.createElement('div');
	messagediv.className = 'messagediv';
	var laramessage = document.createElement('div');
	laramessage.className = 'laramessage'+lmaddtheme;
	var emojimsg = document.createElement('div');
	emojimsg.className = 'emojimsg '+myeid;
	var msgtime = document.createElement('span');
	msgtime.className = 'msgtime';
	msgtime.innerHTML = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});
	laramessage.appendChild(emojimsg);
	laramessage.appendChild(msgtime);

	messagediv.appendChild(laramessage);
	document.getElementById('chatarea').appendChild(messagediv);
	scrollDown();
} 

function populateTemplateb(template,templatediv,data)
{
	var userTemplate = $("#"+"allstepsTemplate").html();
	// filling templates with data
	var populateduserTemplate = doT.template(userTemplate)(data);
	// rendering templates with data
	$(templatediv).html(populateduserTemplate);
}

function populateTemplateg(templatediv,data)
{
	var userTemplate = $("#"+"gmwTemplate").html();
	// filling templates with data
	var populateduserTemplate = doT.template(userTemplate)(data);
	// rendering templates with data
	$(templatediv).html(populateduserTemplate);
}
function allSteps(route)
{
	//get route legs
	buildSteps();
	
	currentroute = fullroute[route];
	currroutelegs = [];
	i=0;
	$.each(currentroute, function () {
		currroutelegs[i] = this;

		if (this.Vehicle.MaxFare !=undefined)
		{
			currroutelegs[i].Vehicle.Fare = this.Vehicle.MinFare + " - " + this.Vehicle.MaxFare;
		}
		else currroutelegs[i].Vehicle.Fare = this.Vehicle.MinFare;
		i++;
	});
	//get route info
	alllegs = transitObject["Legs"][route];
	numlegs = Object.keys(alllegs).length;
	currentrouteinfo = alllegs[numlegs-1];

	currroute = [];
	currroute["Legs"]=currroutelegs;
	currroute["Info"]=currentrouteinfo["Info"];
	currroute["Info"]["Start"]=$("#start").val();
	currroute["Info"]["End"]=$("#end").val();
	
	//currroute["destinationinfo"]=destinationinfo;
	populateTemplateb("allstepsTransit","#rpbody",currroute);
}
function allStepsx(route)
{
	//get route legs
	buildSteps();
	
	currentroute = fullroute[route];
	currroutelegs = [];
	i=0;
	$.each(currentroute, function () {
		currroutelegs[i] = this;

		if (this.Vehicle.MaxFare !=undefined)
		{
			currroutelegs[i].Vehicle.Fare = this.Vehicle.MinFare + " - " + this.Vehicle.MaxFare;
		}
		else currroutelegs[i].Vehicle.Fare = this.Vehicle.MinFare;
		i++;
	});
	//get route info
	alllegs = transitObject["Legs"][route];
	numlegs = Object.keys(alllegs).length;
	currentrouteinfo = alllegs[numlegs-1];

	currroute = [];
	currroute["Legs"]=currroutelegs;
	currroute["Info"]=currentrouteinfo["Info"];
	currroute["Info"]["Start"]=$("#start").val();
	currroute["Info"]["End"]=$("#end").val();
	divv="#rpbody"+countr;
	//currroute["destinationinfo"]=destinationinfo;
	newDiv();
	populateTemplateb("allstepsTransit","#"+currentdiv,currroute);
}

function tester(msg)
{
	console.log(msg);
}

function buildSteps()
{
	numlegs = Object.keys(transitObject["Legs"]).length;
	//tester(transitObject);	
	//for all legs
	if(!isfullrouteset)
	{
		for (j=0; j < numlegs; j++)
		{
			//initialize start and end object
			if (transitObject["Legs"][j]!=undefined)
			{
				leg = transitObject["Legs"][j];
				startinst = {};
				endinst = {};
				//populate start object
				if (originVar) {
					olat = originVar.lat();
					olng = originVar.lng();
				} else {
					olat = originVarx['lat'];
					olng = originVarx['lng'];
				}
				if (destinationVar) {
					dlat = destinationVar.lat();
					dlng = destinationVar.lng();
				} else {
					dlat = destinationVarx['lat'];
					dlng = destinationVarx['lng'];
				}
				
				startinst["Start"]={"Name":leg[0]["Start"]["Name"], "Latitude":olat,"Longitude":olng};
				startinst["End"]=leg[0]["Start"];
				numlegs = Object.keys(leg).length;
				fullroute[j] = {0:startinst};
				fullroute[j][0]["Vehicle"] = {"Type":"Walk"};
				//populate middle with objects
				for(i=1; i<(numlegs); i++)
				{
					fullroute[j][i] = leg[i-1];
				}
				//populate end object
				endinst["Start"] = {"Name":"Your Destination", "Latitude":dlat,"Longitude":dlng};
				endinst["End"] = {"Name":"Your Destination", "Latitude":dlat,"Longitude":dlng};
				endinst["Vehicle"] = {"Type":"Walk"};
				fullroute[j][i] = endinst;
				
			}
		}
		isfullrouteset = true;
	}
}

function processQueryx() {
	var usersinput = $("#chatinput").val();
	var checkstr = usersinput.toLowerCase();
	thanks = "hank";
	if((checkstr==="yabacon") || (checkstr==="show me yabacon")) {
		addmessage(yabacon);
		return;
	}
	$("#dir").html("");
	var query = { Query: usersinput, uid:userid };
	var url = "https://conversecom.ipage.com/rpdev/laraqtx";
	if (gotlocation == true) {
		query = { Query: v, lat:latitude, lng:longitude, uid:userid };
		gotlocation = false;
		url = "https://conversecom.ipage.com/rpdev/adeolaloc"; 
	}
	if (setad == true) {
		query = { ad: usersinput, lg: adlanguage, uid:userid };
		gotlocation = false;
		adlanguage="";
		url = "https://conversecom.ipage.com/rpdev/setad"; 
		setad = false;
	}
	$.ajax({
		type: "GET",
		url: url,
		data: query,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		error: function (returnval) {
			addmessage("There seems to be a network issue. Try refreshing the page or trying in a little bit later.");
		},
		success: function (msg) {

			isfullrouteset = false;
			if (msg.length == 2) {
				addmessage(msg[0]);
				setad=true;
				adlanguage = msg[1];
			}else
			if (msg.length !== 6) {
				addmessage(msg);
				if (usersinput.indexOf(thanks) !== -1) {
					showShareLinks();
				}
			}
			else {
				$("#dir").html(msg[0]);
				originVarx = [];
				originVarx['lat'] = msg[2]['latitude'];
				originVarx['lng'] = msg[2]['longitude'];
				destinationVarx = [];
				destinationVarx['lat'] = msg[3]['latitude'];
				destinationVarx['lng'] = msg[3]['longitude'];
				transitObject = msg[1];
				allStepsx(0);
				rideshare='';
				
				if (msg[5]) {
					rideshare = '<br>Ride Share Available: <a href="#" onclick="showgwmroute()"><img src="images/gmw.svg" height="20"> Click for details</a><br>';
					ridesharedata=msg[5];
				}
				sharelinks = msg[4];
				addmessage(msg[0]+"<br"+$("#"+currentdiv).html()+rideshare+msg[4]);
			}
		}
	});
}

function sendLocation(lat, lng) {
	var location = { lat: lat, lng: lng};
	var url = "https://conversecom.ipage.com/rpdev/adeolaloc"; 
	$.ajax({
		type: "GET",
		url: url,
		data: location,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		error: function (returnval) {
			addmessage("Cannot retrieve current location");
		},
		success: function (msg) {
			addmessage("Where would you like to go from your location?");
		}
	});
}

function showAlternative() {
	var usertext = $('#chatinput').val();
	var userinput = usertext.toLowerCase();
	if (userinput.indexOf("yes") !== -1) {
		allStepsx(1);
		$('#chatarea').append("<span class='ademessage'>Adeola:</span> " + $("#"+currentdiv).html() + "<br>");
		$('#chatarea').append("<span class='ademessage'>Adeola:</span>Did I satisfy your query? (Yes/No)<br>");
		scrollDown();
	}
	else $('#chatarea').append("<span class='ademessage'>Adeola:</span>Did I satisfy your query? (Yes/No)<br>");
	alternative=false;
}

function scrollDown() {
	var chatarea = document.getElementById("chatarea");
	chatarea.scrollTop = chatarea.scrollHeight;
}
function showicons() {
	checkit();
	checkTheme();
	if (navigator.userAgent.match(/iPhone|Android/i)) {
		var whatsappshare = document.getElementById('sharelara');
		whatsappshare.style.display='block';
	}
	if (navigator.userAgent.match(/iPhone|iPad/i)) {
		var ilocator = document.getElementById('getloc');
		ilocator.style.display='block';
	}
}
function locator() {
	var output = document.getElementById("out");

	if (!navigator.geolocation){
		var location = document.getElementById("getloc");
		location.style.display = "none";
		return;
	}

	function success(position) {
		latitude  = position.coords.latitude;
		longitude = position.coords.longitude;
		gotlocation = true;
		var img = new Image();
		img.src = "https://conversecom.ipage.com/rpdev/adeolamap/center=" + latitude + "," + longitude;
		addimage(img);
		addmessage("Where would you like to go from your location?");
	}

	function error() {
		switch(error.code) {
			case error.PERMISSION_DENIED:
				addmessage("Sorry, I can't get your location. You might have to grant me permission or turn on your GPS.");
			break;
			case error.POSITION_UNAVAILABLE:
				addmessage("Sorry, I can't get your location. Your location information is unavailable.");
			break;
			case error.TIMEOUT:
				addmessage("Sorry, I can't get your location. It's taking a long time to process.");
			break;
			case error.UNKNOWN_ERROR:
				addmessage("Sorry, I can't get your location at this time.");
			break;
		}
	}

	addmessage("<p>Finding your location…</p>");
	navigator.geolocation.getCurrentPosition(success, error);
}

function ProcessShare() {
	var locationstring = window.location.search.substring(1);
	var qid = locationstring.split("getdirections=");
	if (qid.length==1) {
		return;
	}
	if (qid.length==2) {
		query = { qid: qid[1] };
		var url = "https://conversecom.ipage.com/rpdev/larashare";
		$.ajax({
			type: "GET",
			url: url,
			data: query,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			error: function (returnval) {
				addmessage("There seems to be a network issue. Try refreshing the page or trying in a little bit later.");
			},
			success: function (msg) {
				isfullrouteset = false;
				if (msg.length == 2) {
					addmessage(msg[0]);
					setad=true;
					adlanguage = msg[1];
				}else
				if (msg.length !== 5) {
					addmessage(msg);
				}
				else {
					$("#dir").html(msg[0]);
					originVarx = [];
					originVarx['lat'] = msg[2]['latitude'];
					originVarx['lng'] = msg[2]['longitude'];
					destinationVarx = [];
					destinationVarx['lat'] = msg[3]['latitude'];
					destinationVarx['lng'] = msg[3]['longitude'];
					transitObject = msg[1];
					allStepsx(0);
					addmessage(msg[0]+"<br"+$("#"+currentdiv).html()+msg[4]);
				}
			}
		});
	}
}

function ProcessReferral() {
	var locationstring = window.location.search.substring(1);
	var rid = locationstring.split("refer=");
	if (rid.length==1) {
		return;
	}
	if (rid.length==2) {
		query = { rid: rid[1] };
		var url = "https://conversecom.ipage.com/rpdev/referral";
		$.ajax({
			type: "GET",
			url: url,
			data: query,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			error: function (returnval) {
				addmessage("There seems to be a network issue. Try refreshing the page or trying in a little bit later.");
			},
			success: function (msg) {
			}
		});
	}
}

function setit(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getit(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkit() {
	var user = getit("larauser");
	if (user != "") {
		userid = user;
		usertheme = getit("laratheme");
	} else {
		userid = Math.random().toString(36).substring(3);
		setit("larauser", userid, 365);
		setit("laratheme", usertheme, 365);
	}
}

function checkTheme() {
	var ut = getit("laratheme");
	
	if (usertheme != "") {
		if (usertheme == "bwt") {
			setBWTTheme();
		}
		else if (usertheme == "bgt") {
			setBGTTheme()
		}
	}
}

function showgwmroute() {
	newRSDiv();
	populateTemplateg("#"+currentRSdiv,ridesharedata);
	addmessage($("#"+currentRSdiv).html());
}

function sendForm()
{
	var selection = $('input[name=where]:checked').val();
	if (selection =='Other')
		selection+=": "+$("#wheretext").val();
	switch(selection) {
		case('Friends'):
			question='Friends<br><div class="surveyimg friends"></div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="School" checked> School</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Work"> Work</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Church"> Church</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="NYSC"> NYSC</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Other-Friends"><input type="text" id="wheretext" name="text" placeholder="Other"></div>' +
				'<button id="respond" value="Respond" class="respondbtn" onclick="sendForm()">Respond</button>' +
				'<button id="respond" value="Back" class="gobackbtn" onclick="goBackForm()">Back</button>';
			$("#surveyitems").html(question);
		break;
		case('SocialMedia'):
			question='Social Media<br><div class="surveyimg whatsapp"></div><div class="surveyimg facebook"></div><div class="surveyimg twitter"></div><div class="surveyimg instagram"></div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="WhatsApp" checked> WhatsApp</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Facebook"> Facebook</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Twitter"> Twitter</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Instagram"> Instagram</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Other-SocialMedia"><input type="text" id="wheretext" name="text" placeholder="Other"></div>' +
				'<button id="respond" value="Respond" class="respondbtn" onclick="sendForm()">Respond</button>' +
				'<button id="respond" value="Back" class="gobackbtn" onclick="goBackForm()">Back</button>';
			$("#surveyitems").html(question);
		break;
		case('Online'):
			question='Online Media<br><div class="online"></div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Radar" checked> Radar</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Konbini"> Konbini</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="TechPoint"> TechPoint</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Other-OnlineMedia"><input type="text" id="wheretext" name="text" placeholder="Other"></div>' +
				'<button id="respond" value="Respond" class="respondbtn" onclick="sendFormResults()">Respond</button>' +
				'<button id="respond" value="Back" class="gobackbtn" onclick="goBackForm()">Back</button>';
			$("#surveyitems").html(question);
		break;
		case('Facebook'):
			question='Facebook<br><div class="surveyimg facebook"></div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="FacebookGroupPost" checked> Group Post</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="FacebookSponsoredPost"> Sponsored Post</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Other-Facebook"><input type="text" id="wheretext" name="text" placeholder="Other"></div>' +
				'<button id="respond" value="Respond" class="respondbtn" onclick="sendFormResults()">Respond</button>' +
				'<button id="respond" value="Back" class="gobackbtn" onclick="goBackForm()">Back</button>';
			$("#surveyitems").html(question);
		break;
		case('Twitter'):
			question='Twitter<br><div class="surveyimg twitter"></div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="TwitterPopularTweet" checked> Someone popular tweeted</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="TwitterSponsoredPost"> Sponsored Post</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Other-Twitter"><input type="text" id="wheretext" name="text" placeholder="Other"></div>' +
				'<button id="respond" value="Respond" class="respondbtn" onclick="sendFormResults()">Respond</button>' +
				'<button id="respond" value="Back" class="gobackbtn" onclick="goBackForm()">Back</button>';
			$("#surveyitems").html(question);
		break;
		case('Instagram'):
			question='Instagram<br><div class="surveyimg instagram"></div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="InstaGramPopularPost" checked> Someone popular posted</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="InstaGramSponsoredPost"> Sponsored Post</div>' +
				'<div class="wsurvey"><input type="radio" name="where" value="Other-InstaGram"><input type="text" id="wheretext" name="text" placeholder="Other"></div>' +
				'<button id="respond" value="Respond" class="respondbtn" onclick="sendFormResults()">Respond</button>' +
				'<button id="respond" value="Back" class="gobackbtn" onclick="goBackForm()">Back</button>';
			$("#surveyitems").html(question);
		break;
		default:
			sendFormResults();
		break;

	}
}

function goBackForm()
{
	question='Question for you friend: Where did you first hear about me? <div class="friendly happy-2"></div><br>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Friends" checked>  Friends</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="SocialMedia"> Social Media</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Nairaland"> Nairaland</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Stickers"> Stickers / Bus posters</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Online"> Online articles / news</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Other"><input type="text" id="wheretext" name="text" placeholder="Other"></div>' +
		'<button id="respond" class="respondbtn" value="Respond" onclick="sendForm()">Respond</button>';
	$("#surveyitems").html(question);
}



function sendFormResults()
{
	var selection = $('input[name=where]:checked').val();
	if (selection.indexOf('Other')===0)
		selection+=": "+$("#wheretext").val();

	var userschoice = { selection: selection, uid:userid };
	var url = "https://conversecom.ipage.com/rpdev/wheresurvey"; 

	$.ajax({
		type: "GET",
		url: url,
		data: userschoice,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		error: function (returnval) {
		},
		success: function (msg) {
			$("#surveyitems").html("Thanks for sharing, you rock! <div class='friendly cool'></div>");
			$("#respond").attr("disabled","disabled");
		}
	});
}

function showSendForm()
{
	var survey = '<div id="surveyitems">Question for you friend: Where did you first hear about me? <div class="friendly happy-2"></div><br>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Friends" checked> Friends</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="SocialMedia"> Social Media</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Nairaland"> Nairaland</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Stickers"> Stickers / Bus posters</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Online"> Online articles / news</div>' +
		'<div class="wsurvey"><input type="radio" name="where" value="Other"><input type="text" id="wheretext" name="text" placeholder="Other"></div>' +
		'<button id="respond" value="Respond" onclick="sendForm()">Respond</button></div>';
	addmessage(survey);
}

function showShareLinks()
{
	if (sharelinks !=='') {
		sharelink = sharelinks.replace("Share these directions with a friend", "Help a friend today and share your directions");
		addmessage(sharelink);
	}
}

