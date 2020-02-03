var myResponse = "VOID";



document.write('<table border="1">');
for ( ip = 0 ; ip < myIcrs.length ; ip++ )
	{
	document.write("<tr>");
	document.write("<td> " + myIcrNames[ip] + " Web Services Status = </td>");
	document.write("<td id=" + myIcrs[ip] + ">" + " WAITING " + "</td>");
	document.write("</tr>");
	}
document.write("</table>");
//document.write('<button type="button" onclick="displayStatus()">Display Webservices Status</button>');
document.write('<br><br><a href="iCR Dashboard.html">Back to Dashboard</a> <br>');

function displayStatus() {
for ( i = 0 ; i < myIcrs.length ; i++ ) {
	(function(i) {
		console.log(i);
		var myxmlhttp = new Array();
		myxmlhttp[i] = getHTTPObject();
		WEBSERVICE_NAMESPACE = "http://snellwilcox.com/xmlbinding/icr/2007/04/control";
		/* The web method to invoke */
		WEBSERVICE_METHOD 	 = "isWebServiceControlEnabled";
		WEBSERVICE_URL = "http://" + myIcrs[i] + ":8080/icr/ICRControl";
		try {
		myxmlhttp[i].onreadystatechange = function() {
		if (  4==myxmlhttp[i].readyState ) {
			if (200==myxmlhttp[i].status)  {
				myResp = myxmlhttp[i].responseXML.getElementsByTagName("return")[0].childNodes[0].nodeValue
				if ( myResp == 'true' ) {
					myResp = 'ENABLED' ;
					document.getElementById(myIcrs[i]).style.color="green";
				}
				else {
					myResp = 'DISABLED' ;
					document.getElementById(myIcrs[i]).style.color="red";
				}
				document.getElementById(myIcrs[i]).innerHTML=myResp;
			} // endif 200=
			//else alert("i readyState not 4..." + myxmlhttp[i].readyState);
		} // endif 4=
		//else alert("i status not 200 ..." + myxmlhttp[i].status);
		}  // end anonymous readystatchange function
		// we are here because we dont get the status200 and readyState4 that we need
		document.getElementById(myIcrs[i]).innerHTML="NO RESPONSE";
		}

		catch (myErr) {alert('ONREADYSTATCHANGE FAILED ' + myIcrs[i]);}
		try { myxmlhttp[i].open("POST", WEBSERVICE_URL, true); }
		catch (myErr) { alert('OPEN FAILED TO ' + myIcrs[i]);}
		try{ myxmlhttp[i].setRequestHeader("Content-Type", "text/xml"); }
		catch (myErr) { alert('SETRUQUESTHEADER CONTENT-TYPE FAILED TO ' + myIcrs[i]);}
		try { myxmlhttp[i].setRequestHeader("SOAPAction", WEBSERVICE_NAMESPACE + "/" + WEBSERVICE_METHOD ); }
		catch (myErr) { alert('SETRUQUESTHEADER SOAPACTION FAILED TO ' + myIcrs[i]);}
		try { myxmlhttp[i].send('<?xml version="1.0" ?><S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/"><S:Body><'
			+ WEBSERVICE_METHOD + ' xmlns="' + WEBSERVICE_NAMESPACE + '"/></S:Body></S:Envelope>'); }
		catch (myErr) {alert('SEND FAILED TO ' + myIcrs[i]);}
 	})(i); // end of function(i)
	} // end for loop
}  // end of displayStatus() function


function getHTTPObject() {
var xhr;
if(window.XMLHttpRequest) {
	xhr = new XMLHttpRequest();
}  // end if window.XMLHt
else if(window.ActiveXObject)   {
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}  // end if window.Active
	return xhr;
}   // end function getHTTPObject
