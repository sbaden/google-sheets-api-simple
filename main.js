console.log('connected');


(function(){
$('#signout-button').hide();
	/*$('#authorize-button').on('click', function(){
		console.log('clicked');
		// handleAuthClick;
	});*/

	$.getScript("https://apis.google.com/js/api.js", function(){
	   alert("Script loaded but not necessarily executed.");
	

		// Client ID and API key from the Developer Console
		var CLIENT_ID = '586352309982-p1jq5siolc7stg6r7lhqfr9t3o8crrdt.apps.googleusercontent.com';

		// Array of API discovery doc URLs for APIs used by the quickstart
		var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

		// Authorization scopes required by the API; multiple scopes can be
		// included, separated by spaces.
		var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

		// var authorizeButton = $('#authorize-button').html;

		$('#authorize-button').on('click', function(){
			console.log('clicked');
	  		handleAuthClick;
  		  });
		var signoutButton = document.getElementById('signout-button');

		/**
		*  On load, called to load the auth2 library and API client library.
		*/
		// function handleClientLoad() {
			gapi.load('client:auth2', initClient);
		// }

		/**
		*  Initializes the API client library and sets up sign-in state
		*  listeners.
		*/
		function initClient() {
			gapi.client.init({
			discoveryDocs: DISCOVERY_DOCS,
			clientId: CLIENT_ID,
			scope: SCOPES
			}).then(function () {
			  // Listen for sign-in state changes.
			  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

			  // Handle the initial sign-in state.
			  $('#authorize-button').on('click', function(){
			  	updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		  		handleAuthClick;
	  		  });
	  		  $('#signout-button').on('click', function(){
			  	handleSignoutClick;
		  	  });
			});
		}

		/**
		*  Called when the signed in status changes, to update the UI
		*  appropriately. After a sign-in, the API is called.
		*/
		function updateSigninStatus(isSignedIn) {
			if (isSignedIn) {
				$('#authorize-button').hide();
				$('#signout-button').show();
				listMajors();
			} else {
				$('#authorize-button').show();
				$('#signout-button').hide();
			}
		}

		/**
		*  Sign in the user upon button click.
		*/
		function handleAuthClick(event) {
			gapi.auth2.getAuthInstance().signIn();
		}

		/**
		*  Sign out the user upon button click.
		*/
		function handleSignoutClick(event) {
			gapi.auth2.getAuthInstance().signOut();
		}

		/**
		* Append a pre element to the body containing the given message
		* as its text node. Used to display the results of the API call.
		*
		* @param {string} message Text to be placed in pre element.
		*/
		function appendPre(message) {
			var pre = document.getElementById('content');
			var textContent = document.createTextNode(message + '\n');
			pre.appendChild(textContent);
		}

		/**
		* Print the names and majors of students in a sample spreadsheet:
		* https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
		*/
		function listMajors() {
			gapi.client.sheets.spreadsheets.values.get({
			spreadsheetId: '1uE3tsczNsSZlX54IfjpaZceuAvItFy3pKeWaurhw6U4',  //  586352309982-p1jq5siolc7stg6r7lhqfr9t3o8crrdt.apps.googleusercontent.com (sample ID that works)
			range: 'Sheet1!A2:E',	//  Sheet1 = sheet name
			}).then(function(response) {
				var range = response.result;
				if (range.values.length > 0) {
					appendPre('Name, Major:');
					for (i = 0; i < range.values.length; i++) {
						var row = range.values[i];
						// Print columns A and E, which correspond to indices 0 and 4.
						appendPre(row[0] + ', ' + row[4]);
					}
				} else {
					appendPre('No data found.');
				}
			}, function(response) {
				appendPre('Error: ' + response.result.error.message);
			});
		}
	});
})();





