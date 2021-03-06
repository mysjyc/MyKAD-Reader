
  function pluginLoaded() {
    
	hideMykidDiv();
    window.webcard = document.getElementById("webcard");
    if (webcard.attachEvent) {
      webcard.attachEvent("oncardpresent", cardPresent);
      webcard.attachEvent("oncardremoved", cardRemoved);
	  console.log("No Card Reader" );
    } else {
      webcard.addEventListener("cardpresent", cardPresent, false);
      webcard.addEventListener("cardremoved", cardRemoved, false);
	  console.log("Card Reader Detected ");
	  cardPresent(cardPresent);
    }
  }
  
    
  function cardPresent(reader) {
    
    reader.connect(2); 
    showProgressDiv();
    console.log("ATR : " + reader.atr);
	console.log("Reader Name="+reader.name);
    var SELECT_APDU 		= "00A404000AA0000000744A504E0010";
	var SET_LENGTH_CMD 		= "C832000005080000";
    var COMMAND_APDU 		= "CC0000000801000100";
	var READ_INFO 			= "CC060000";
	var InsertedCard_ATR 	= reader.atr;
	var ATR 				= "3B670000";	//"3B6700007320006C009000";
	var CARD_ATR 			= InsertedCard_ATR.substring(0,8);
	var MyKID_ATR 			= "3BDE1100";	//"3BDE11000049434F5335330000000000000008";
	
	if(ATR == CARD_ATR ){
		showMyKADdiv();
		//alert("You inserted MyKAD");
    
	var mykadFlag = true;
	var mykidFlag = false;
	
	/**   Address1   **/
	var add1_response_data = reader.transcieve(SELECT_APDU);
	reader.transcieve(SET_LENGTH_CMD+"1E00");
	reader.transcieve("CC000000080400010003001E00");
	add1_response_data = reader.transcieve(READ_INFO+"1E");
	add1_response_data = hextostring(add1_response_data);
	console.log("Address1: " + add1_response_data); 
	
	/**  Adress2  **/
	var add2_response_data = reader.transcieve(SET_LENGTH_CMD+"1E00");
	reader.transcieve("CC000000080400010021001E00");
	add2_response_data = reader.transcieve(READ_INFO+"1E");
	add2_response_data = hextostring(add2_response_data);
    console.log("Address2:" + add2_response_data);
	
	/**  Adress3  **/
	var add3_response_data = reader.transcieve(SET_LENGTH_CMD+"1E00");
	reader.transcieve("CC00000008040001003F001E00");
	add3_response_data = reader.transcieve(READ_INFO+"1E");
	add3_response_data = hextostring(add3_response_data);
	console.log("Address3: " + add3_response_data);
	
	 /** DOB **/
	var dob_response_data = reader.transcieve(SET_LENGTH_CMD+"0400");
	reader.transcieve(COMMAND_APDU+"27010400");
	dob_response_data = reader.transcieve(READ_INFO+"04");
	dob_response_data = dob_response_data.replace("9000", "");
	dob_response_data = dob_response_data.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$2/$3/$1');
	console.log("dobDate="+dob_response_data);
	
	/**  Birth Place  **/
	var birthPlace_response_data = reader.transcieve(SET_LENGTH_CMD+"1900");
	reader.transcieve(COMMAND_APDU+"2B011900");
	birthPlace_response_data = reader.transcieve(READ_INFO+"19");
	birthPlace_response_data = hextostring(birthPlace_response_data);
	console.log("birth place: " + birthPlace_response_data);
	
	/**  Card Ver  **/
	var card_ver_response_data = reader.transcieve(SET_LENGTH_CMD+"0100");
	reader.transcieve(COMMAND_APDU+"8F010100");
	card_ver_response_data = reader.transcieve(READ_INFO+"01");
	card_ver_response_data = card_ver_response_data.replace("9000", "");
	console.log("Card Ver: " + card_ver_response_data);
	
	/**  Category  **/
	var categoryresponse_data = reader.transcieve(SET_LENGTH_CMD+"0100");
	reader.transcieve(COMMAND_APDU+"8E010100");
	categoryresponse_data = reader.transcieve(READ_INFO+"01");
	categoryresponse_data = hextostring(categoryresponse_data);
	console.log("Category: " + categoryresponse_data);	
	
	/** Citizenship **/
    var citizen_response_data = reader.transcieve(SET_LENGTH_CMD+"1200");
	reader.transcieve(COMMAND_APDU+"48011200");
	citizen_response_data = reader.transcieve(READ_INFO+"12");
	citizen_response_data = hextostring(citizen_response_data)
	console.log("Citizenship: " + citizen_response_data);
	
	/**  City  **/
	var city_response_data = reader.transcieve(SET_LENGTH_CMD+"1900");
	reader.transcieve("CC000000080400010060001900");
	city_response_data = reader.transcieve(READ_INFO+"19");
	city_response_data = hextostring(city_response_data);
	console.log("City: " + city_response_data); 	
	
	/** Issued Date **/
	var issued_date_response_data = reader.transcieve(SET_LENGTH_CMD+"0400");
	reader.transcieve(COMMAND_APDU+"44010400");
	issued_date_response_data = reader.transcieve(READ_INFO+"04");
	issued_date_response_data = issued_date_response_data.replace("9000", "");
	issued_date_response_data = issued_date_response_data.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$2/$3/$1');
	console.log("Issued date="+issued_date_response_data);
	
	 /** East Malaysian **/
	var east_msian_response_data = reader.transcieve(SET_LENGTH_CMD+"0100");
	reader.transcieve(COMMAND_APDU+"7E010100");
	east_msian_response_data = reader.transcieve(READ_INFO+"01");
	east_msian_response_data = hextostring(east_msian_response_data);
	console.log("East Msian: " + east_msian_response_data);
	
	/**  Gender  **/
	var gender_response_data = reader.transcieve(SET_LENGTH_CMD+"0100");
	reader.transcieve(COMMAND_APDU+"1E010100");
	gender_response_data = reader.transcieve(READ_INFO+"01");
	gender_response_data = hextostring(gender_response_data);
	gender_response_data = gender_response_data.trim();
	if(gender_response_data.charCodeAt(0)=="L".charCodeAt(0)){
		gender_response_data = 'MALE';
	}else if(gender_response_data.charCodeAt(0)=="P".charCodeAt(0)){
		gender_response_data = 'FEMALE';
	}
	
	/**  GPMC Name  **/
	var gpmcName_response_data = reader.transcieve(SET_LENGTH_CMD+"5000");
	reader.transcieve(COMMAND_APDU+"99005000");
	gpmcName_response_data = reader.transcieve(READ_INFO+"50");
	gpmcName_response_data = hextostring(gpmcName_response_data);
	gpmcName_response_data = gpmcName_response_data.replace(/\s+/g,' ').trim();
	console.log("GPMC Name:" + gpmcName_response_data);
	
	
	
	/**   Green Card Expiry Date  **/
	var gCarD_Exp_response_data = reader.transcieve(SET_LENGTH_CMD+"0400");
	reader.transcieve(COMMAND_APDU+"90010400");
	gCarD_Exp_response_data = reader.transcieve(READ_INFO+"04");
	gCarD_Exp_response_data = gCarD_Exp_response_data.replace("9000", "");
	gCarD_Exp_response_data = gCarD_Exp_response_data.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$2/$3/$1');
	console.log("gCard Expiry Date="+gCarD_Exp_response_data);
	
	 /**  Green Card Nationality **/
	var gCard_Nation_response_data = reader.transcieve(SET_LENGTH_CMD+"1400");
	reader.transcieve(COMMAND_APDU+"94011400");
	gCard_Nation_response_data = reader.transcieve(READ_INFO+"14");
	gCard_Nation_response_data = hextostring(gCard_Nation_response_data);
	console.log("Green Card Nationality:" + gCard_Nation_response_data);
	
	/**   ID Number   **/
	var id_Num_response_data = reader.transcieve(SET_LENGTH_CMD+"0D00");
	reader.transcieve(COMMAND_APDU+"11010D00");
	id_Num_response_data = reader.transcieve(READ_INFO+"0D");
	id_Num_response_data = hextostring(id_Num_response_data);
	console.log("ID Num:" + id_Num_response_data);
	
	/** KPT Name **/
	var kptName_response_data = reader.transcieve(SET_LENGTH_CMD+"2800");
	reader.transcieve(COMMAND_APDU+"E9002800");
	kptName_response_data = reader.transcieve(READ_INFO+"28");
	kptName_response_data = hextostring(kptName_response_data);
	kptName_response_data = kptName_response_data.replace(/\s+/g,' ').trim();
	console.log("KPT Name: " + kptName_response_data);
	
	/**  KT **/
	var kt_response_data = reader.transcieve(SET_LENGTH_CMD+"0200");
	reader.transcieve(COMMAND_APDU+"81010200");
	kt_response_data = reader.transcieve(READ_INFO+"02");
	kt_response_data = hextostring(kt_response_data);
	console.log("KT:" + kt_response_data);
	
	 /**  OLD IC  **/
	var oldIC_response_data = reader.transcieve(SET_LENGTH_CMD+"0800");
	reader.transcieve(COMMAND_APDU+"1F010800");
	oldIC_response_data = reader.transcieve(READ_INFO+"08");
	oldIC_response_data = hextostring(oldIC_response_data);
	console.log("OLD IC:" + oldIC_response_data);
	
	/**  Other ID  **/
	var otherID_response_data = reader.transcieve(SET_LENGTH_CMD+"0B00");
	reader.transcieve(COMMAND_APDU+"83010B00");
	otherID_response_data = reader.transcieve(READ_INFO+"0B");
	otherID_response_data = hextostring(otherID_response_data);
	console.log("other ID:" + otherID_response_data);

	/**  Post Code  **/
	var posCode_response_data = reader.transcieve(SET_LENGTH_CMD+"0300");
	reader.transcieve("CC00000008040001005D000300");
	posCode_response_data = reader.transcieve(READ_INFO+"03");
	posCode_response_data = posCode_response_data.replace("9000", "");
    posCode_response_data = posCode_response_data.substring(0,5);
	console.log("Post Code:" +posCode_response_data);
	
	/**Race */
	var race_response_data = reader.transcieve(SET_LENGTH_CMD+"1900");
	reader.transcieve(COMMAND_APDU+"5A011900");
	race_response_data = reader.transcieve(READ_INFO+"19");
	race_response_data = hextostring(race_response_data);
	console.log("Race:" + race_response_data);
	
	/** Religion **/
	var religion_response_data = reader.transcieve(SET_LENGTH_CMD+"0B00");
	reader.transcieve(COMMAND_APDU+"73010B00");
	religion_response_data = reader.transcieve(READ_INFO+"0B");
	religion_response_data = hextostring(religion_response_data);
	console.log("Religion:" + religion_response_data);
	
	/**  RJ **/
	var rj_response_data = reader.transcieve(SET_LENGTH_CMD+"0200");
	reader.transcieve(COMMAND_APDU+"7F010200");
	rj_response_data = reader.transcieve(READ_INFO+"02");
	rj_response_data = hextostring(rj_response_data);
	console.log("RJ: " + rj_response_data);
	
	/**  State  **/
	var state_response_data = reader.transcieve(SET_LENGTH_CMD+"1E00");
	reader.transcieve("CC000000080400010079001E00");
	state_response_data = reader.transcieve(READ_INFO+"1E");
	state_response_data = hextostring(state_response_data);
	console.log("State:" + state_response_data); 	
	
	/****************************************
			PHOTO SECTION 
			Edited by: Nuruzzaman 
			Dated	 : 23rd April 2015 	
	*****************************************/
	var offset = 0x03;
	var length = 0xFF;
	var max = 5100;		// Could be more dynamic based on CHIP 
	var finalPicResp = "";
	var photo = new Image();
	var go = true;
	
	do{
		var tmp = offset.toString(16).toUpperCase();
		var tmpOffset = null;
		if(tmp.length == 1){
			tmpOffset = "0" + tmp + " 00";
		}else{
			tmpOffset = tmp.substring (1, 3) + " 0" + tmp.substring (0, 1);
		}
		
		var pic_command = "CC0000000802000100"
		reader.transcieve(SET_LENGTH_CMD+"FF00");
		reader.transcieve(pic_command+trimAllSpace(tmpOffset)+"FF00")
		pic_responseData = finalPicResp + reader.transcieve(READ_INFO+"FF");
		finalPicResp = pic_responseData.replace("9000", "");
		
		if((offset + length) > max){	
			offset += (max - offset);
			go = false;
		}else {offset += length};
		
	}while(go);

     console.log("allfinalresp="+finalPicResp);
	 photo.src = "data:image/jpeg;base64,"+hexToBase64(finalPicResp);
	 console.log("Photo Size ="+photo.naturalWidth * photo.naturalHeight);
	 //console.log("Photo="+photo.src);
	 // END PHOTO SECTION 
	
	if (reader != null) {
		reader.disconnect();
	}
	
	document.getElementById("JPN_Address1").value = add1_response_data;
	document.getElementById("JPN_Address2").value = add2_response_data;
	document.getElementById("JPN_Address3").value = add3_response_data;
	document.getElementById("JPN_BirthDate").value = dob_response_data;
	document.getElementById("JPN_BirthPlace").value = birthPlace_response_data;
	document.getElementById("JPN_CardVer").value = card_ver_response_data;
	document.getElementById("JPN_Category").value = categoryresponse_data;
	document.getElementById("JPN_Citizenship").value = citizen_response_data;
	document.getElementById("JPN_City").value = city_response_data;
    document.getElementById("JPN_DateIssued").value = issued_date_response_data;	
	document.getElementById("JPN_EastMsian").value = east_msian_response_data;
	document.getElementById("JPN_Gender").value = gender_response_data;
	document.getElementById("JPN_GMPCName").value = gpmcName_response_data;
	document.getElementById("JPN_GreenCardExpiry").value = gCarD_Exp_response_data;
	document.getElementById("JPN_GreenCardNationality").value = gCard_Nation_response_data;
	document.getElementById("JPN_IDNum").value = id_Num_response_data;
	document.getElementById("JPN_KPTName").value = kptName_response_data;
	document.getElementById("JPN_KT").value = kt_response_data;
	document.getElementById("JPN_OldIDNum").value = oldIC_response_data;
	document.getElementById("JPN_OtherID").value = otherID_response_data;
	document.getElementById("JPN_Postcode").value = posCode_response_data;
	document.getElementById("JPN_Race").value = race_response_data;
	document.getElementById("JPN_Religion").value = religion_response_data;
	document.getElementById("JPN_RJ").value = rj_response_data;
	document.getElementById("JPN_State").value = state_response_data;
	document.getElementById("base64Photo").src = photo.src;
	document.getElementById('progressDiv').style.display = "none";

	} else if(CARD_ATR == MyKID_ATR){
	alert("You inserted MyKID");	
	showMyKIDdiv();
	var mykadFlag = false;
	var mykidFlag = true;
	
	/**  Kid Name  **/
	var KidName_response_data = reader.transcieve(SELECT_APDU);
	reader.transcieve(SET_LENGTH_CMD+"9600");
	reader.transcieve("CC00000008010001001E009600");
	KidName_response_data = reader.transcieve(READ_INFO+"96");
	KidName_response_data = hextostring(KidName_response_data);
	console.log("Kid Name:" + KidName_response_data);
	
	/**  Kid Birth Certificate No  **/
    reader.transcieve(SET_LENGTH_CMD+"0F00");//0xF
    reader.transcieve(COMMAND_APDU+"03000F00");//0x3
    var Kid_birthCertNo_response_data = reader.transcieve(READ_INFO+"0F");
	Kid_birthCertNo_response_data = hextostring(Kid_birthCertNo_response_data);
    console.log("BirthCertNo: " + Kid_birthCertNo_response_data);
	
	/**  Kid IC  **/
	reader.transcieve(SET_LENGTH_CMD+"0C00");
	reader.transcieve(COMMAND_APDU+"12000C00");
	var Kid_IC_response_data = reader.transcieve(READ_INFO+"0C");
	Kid_IC_response_data = hextostring(Kid_IC_response_data);
	console.log("Kid IC No:" + Kid_IC_response_data);
	
	/** Kid Gender  **/
    reader.transcieve(SET_LENGTH_CMD+"0100");
	reader.transcieve("CC0000000801000100B4000100");
	var gender_response_data = reader.transcieve(READ_INFO+"01");
	gender_response_data = hextostring(gender_response_data);
	gender_response_data = gender_response_data.trim();
	if(gender_response_data.charCodeAt(0)=="L".charCodeAt(0)){
	 gender_response_data = 'MALE';
	}
	else if(gender_response_data.charCodeAt(0)=="P".charCodeAt(0)){
	 gender_response_data = 'FEMALE';
	}
	
	 /** Kid BirthPlace  **/
    reader.transcieve(SET_LENGTH_CMD+"1E00");
    reader.transcieve(COMMAND_APDU+"C6001E00");
    var Kid_birthPlace_response_data = reader.transcieve(READ_INFO+"1E");
	Kid_birthPlace_response_data = hextostring(Kid_birthPlace_response_data);
    console.log("Kid BirthPlace:" +Kid_birthPlace_response_data);
	
	 /** Kid DOB **/
	reader.transcieve(SET_LENGTH_CMD+"0400");
	reader.transcieve("CC000000080200010003000400");
	var Kid_dob_response_data = reader.transcieve(READ_INFO+"04");
	Kid_dob_response_data = Kid_dob_response_data.replace("9000", "");
	Kid_dob_response_data = Kid_dob_response_data.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$2/$3/$1');
	console.log("kidDobDate="+Kid_dob_response_data);
	
	/** Kid Citizenship **/
    reader.transcieve(SET_LENGTH_CMD+"1000");
	reader.transcieve(COMMAND_APDU+"B5001000");
	var kid_citizen_response_data = reader.transcieve(READ_INFO+"10");
	kid_citizen_response_data = hextostring(kid_citizen_response_data);
	console.log("Kid Citizenship: " + kid_citizen_response_data);
	
	 /**  KId Father ID  **/
     reader.transcieve(SET_LENGTH_CMD+"1800");
     reader.transcieve("CC0000000802000100A9021800");
     var Kid_Father_ID_response_data = reader.transcieve(READ_INFO+"18");
	 Kid_Father_ID_response_data = hextostring(Kid_Father_ID_response_data);
     console.log("kid father id: " +Kid_Father_ID_response_data );
	 
	  /** Kid Father Name  **/
     reader.transcieve(SET_LENGTH_CMD+"9600");
     reader.transcieve("CC0000000802000100F6029600");
     var Kid_Father_Name_response_data = reader.transcieve(READ_INFO+"96");
	 Kid_Father_Name_response_data = hextostring(Kid_Father_Name_response_data);
     console.log("kid Father name: " + Kid_Father_Name_response_data);
	 
	  /**  KId Father race  **/
     reader.transcieve(SET_LENGTH_CMD+"1900");
     reader.transcieve("CC0000000802000100A7031900");
     var Kid_Father_Race_response_data = reader.transcieve(READ_INFO+"19");
	 Kid_Father_Race_response_data = hextostring(Kid_Father_Race_response_data);
     console.log("kid father race: " + Kid_Father_Race_response_data);
	 
	  /**  KId Father Citizenship  **/
     reader.transcieve(SET_LENGTH_CMD+"1500");
     reader.transcieve("CC000000080200010090031500");
     var Kid_Father_Citizenship_response_data = reader.transcieve(READ_INFO+"15");
	 Kid_Father_Citizenship_response_data = hextostring(Kid_Father_Citizenship_response_data);
     console.log("kid father Citizenship: " + Kid_Father_Citizenship_response_data);
	 
	 
	/** Kid Father Religion  **/
	reader.transcieve(SET_LENGTH_CMD+"0900");
	reader.transcieve(COMMAND_APDU+"7D010900");
	var kid_Father_religion_response_data = reader.transcieve(READ_INFO+"09");
	kid_Father_religion_response_data = hextostring(kid_Father_religion_response_data);
	console.log("kid father religion:" + kid_Father_religion_response_data);
	 
	  /**  Kid Mother ID  **/
     reader.transcieve(SET_LENGTH_CMD+"1800");
     reader.transcieve("CC00000008020001008D011800");
     var Kid_Mother_ID_response_data = reader.transcieve(READ_INFO+"18");
	 Kid_Mother_ID_response_data = hextostring(Kid_Mother_ID_response_data);
     console.log("kid Mother id: " + Kid_Mother_ID_response_data);
	 
	  /**  Kid Mother Name  **/
     reader.transcieve(SET_LENGTH_CMD+"9600");
     reader.transcieve("CC0000000802000100DA019600");
     var Kid_Mother_Name_response_data = reader.transcieve(READ_INFO+"96");
	 Kid_Mother_Name_response_data = hextostring(Kid_Mother_Name_response_data);
     console.log("kid Mother name: " + Kid_Mother_Name_response_data);
		 
	 /**  Kid Mother race  **/
     reader.transcieve(SET_LENGTH_CMD+"1800");
     reader.transcieve("CC00000008020001008B021800");
     var Kid_Mother_Race_response_data = reader.transcieve(READ_INFO+"18");
	 Kid_Mother_Race_response_data = hextostring(Kid_Mother_Race_response_data);
     console.log("kid Mother race: " + Kid_Mother_Race_response_data);
	
	 /**  Kid Mother Citizenship  **/
     reader.transcieve(SET_LENGTH_CMD+"1500");
     reader.transcieve("CC000000080200010074021500");
     var Kid_Mother_Citizenship_response_data = reader.transcieve(READ_INFO+"15");
	 Kid_Mother_Citizenship_response_data = hextostring(Kid_Mother_Citizenship_response_data);
     console.log("kid Mother Citizenship: " + Kid_Mother_Citizenship_response_data);
	 
	 /** Kid Mother Religion  **/
	reader.transcieve(SET_LENGTH_CMD+"0900");
	reader.transcieve(COMMAND_APDU+"8B010900");
	var kid_Mother_religion_response_data = reader.transcieve(READ_INFO+"09");
	kid_Mother_religion_response_data = hextostring(kid_Mother_religion_response_data);
	console.log("kid Mother religion:" + kid_Mother_religion_response_data);

	/**  Kid  Address1   **/
	reader.transcieve(SET_LENGTH_CMD+"3000");
	reader.transcieve(COMMAND_APDU+"E4003000");
	var kid_add1_response_data = reader.transcieve(READ_INFO+"19");
	kid_add1_response_data = hextostring(kid_add1_response_data);
	console.log("kid Address1: " + kid_add1_response_data); 
	
	/** Kid Address2 **/
	reader.transcieve(SET_LENGTH_CMD+"1900");
	reader.transcieve(COMMAND_APDU+"02011900");
	var kid_add2_response_data = reader.transcieve(READ_INFO+"19");
	kid_add2_response_data = hextostring(kid_add2_response_data);
	console.log("kid address2: " + kid_add2_response_data);
	
	 /**  Kid Address3  **/
	reader.transcieve(SET_LENGTH_CMD+"1900");
	reader.transcieve(COMMAND_APDU+"20011900");
	var kid_add3_response_data = reader.transcieve(READ_INFO+"19");
	kid_add3_response_data = hextostring(kid_add3_response_data);
	console.log("kid address3:" +kid_add3_response_data);
	
	/** Kid Post Code  **/
	reader.transcieve(SET_LENGTH_CMD+"0300");
	reader.transcieve("CC00000008010001003E010300");
	var kid_posCode_response_data = reader.transcieve(READ_INFO+"03");
	kid_posCode_response_data = kid_posCode_response_data.replace("9000", "");
    kid_posCode_response_data = kid_posCode_response_data.substring(0,5);
	console.log("Post Code:" +kid_posCode_response_data);
	
	/** Kid  City  **/
	reader.transcieve(SET_LENGTH_CMD+"1900");
	reader.transcieve("CC000000080100010041011900");
	var kid_city_response_data = reader.transcieve(READ_INFO+"19");
	kid_city_response_data = hextostring(kid_city_response_data);
    console.log("kid City: " + kid_city_response_data); 	
	
	/** Kid State */
	reader.transcieve(SET_LENGTH_CMD+"1900");
	reader.transcieve(COMMAND_APDU+"5F011900");
	var kid_state_response_data = reader.transcieve(READ_INFO+"19");
	kid_state_response_data =  hextostring(kid_state_response_data);
    console.log("kid state:" +kid_state_response_data);
	
	/** Kid Version */
	reader.transcieve(SET_LENGTH_CMD+"0100");
	reader.transcieve(COMMAND_APDU+"00000100");
	var kid_version_response_data = reader.transcieve(READ_INFO+"01");
    kid_version_response_data = kid_version_response_data.replace("9000", "");
	console.log("kid version:" +kid_version_response_data);
	 
    reader.disconnect();
	
	document.getElementById("JPN_Kid_Name").value = KidName_response_data;
	document.getElementById("JPN_Kid_Birth_Cert_No").value = Kid_birthCertNo_response_data;
	document.getElementById("JPN_KID_IC_No").value = Kid_IC_response_data;
	document.getElementById("JPN_Kid_Gender").value = gender_response_data;
	document.getElementById("JPN_Kid_BirthPlace").value = Kid_birthPlace_response_data;
	document.getElementById("JPN_Kid_BirthDate").value = Kid_dob_response_data;
	document.getElementById("JPN_Kid_Citizenship").value = kid_citizen_response_data;
	document.getElementById("JPN_Kid_Father_ID").value = Kid_Father_ID_response_data;
	document.getElementById("JPN_Kid_Father_Name").value = Kid_Father_Name_response_data;
	document.getElementById("JPN_Kid_Father_Race").value = Kid_Father_Race_response_data;
	document.getElementById("JPN_Kid_Father_Citizenship").value = Kid_Father_Citizenship_response_data;
	document.getElementById("JPN_Kid_Father_Religion").value = kid_Father_religion_response_data;
	document.getElementById("JPN_Kid_Mother_ID").value = Kid_Mother_ID_response_data;
	document.getElementById("JPN_Mother_Name").value = Kid_Mother_Name_response_data;
	document.getElementById("JPN_Kid_Mother_Race").value = Kid_Mother_Race_response_data;
	document.getElementById("JPN_Kid_Mother_Citizenship").value = Kid_Mother_Citizenship_response_data;
	document.getElementById("JPN_Kid_Mother_Religion").value = kid_Mother_religion_response_data;
	document.getElementById("JPN_Kid_Address1").value = kid_add1_response_data;
	document.getElementById("JPN_Kid_Address2").value = kid_add2_response_data;
	document.getElementById("JPN_Kid_Address3").value = kid_add3_response_data;
	document.getElementById("JPN_Kid_Postcode").value = kid_posCode_response_data;
	document.getElementById("JPN_Kid_City").value = kid_city_response_data;
	document.getElementById("JPN_Kid_State").value = kid_state_response_data;
	document.getElementById("JPN_Kid_Version").value = kid_version_response_data;
	document.getElementById('progressDiv').style.display = "none";
	}
  
	 }

	 function cardRemoved(reader) {
	console.log("Exit program ");
  }
  
function hextostring(d){
    var r = '', m = ('' + d).match(/../g), t;
    while (t = m.shift())
        r += String.fromCharCode('0x' + t);
    return r;
}

function getBinary() {
    return 'finalresp1';
}

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

function showMyKADdiv(){
	document.getElementById('myKADdiv').style.display = 'block';
	document.getElementById('myKIDdiv').style.display = 'none';
	document.getElementById('Mydiv').style.display = 'none';
	
}
function showMyKIDdiv(){
	document.getElementById('myKIDdiv').style.display = 'block';
	document.getElementById('myKADdiv').style.display = 'none';
	document.getElementById('Mydiv').style.display = 'none';
}
function showProgressDiv(){
document.getElementById('progressDiv').style.display = 'block';
document.getElementById('Mydiv').style.display = 'none';
}
function hideMykidDiv(){
document.getElementById('myKIDdiv').style.display = 'none';
}
function trimAllSpaces(str) {
    return str.replace(/^\s\s*/, '')     // Remove Preceding white space
              .replace(/\s\s*$/, '')     // Remove Trailing white space
              .replace(/([\s]+)/g, '');  // Replace remaining white space with dashes
}
function trimExtraSpaces(str) {
    return str.replace(/(^\s*)|(\s*$)/gi,"")
              .replace(/[ ]{2,}/gi," ")
              .replace(/\n /,"\n");
}
