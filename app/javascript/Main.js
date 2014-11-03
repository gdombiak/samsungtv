var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main =
{

};

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	
	// Tell jQuery to not cache things
	$.ajaxSetup({ cache: false });

	// Fetch data
	this.fetchStatus();
	
};

Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.fetchStatus = function()
{
	// Delete existing rows
	$('#content').children( 'section' ).remove();
	// Fetch new status and add rows for each element
	$.getJSON('http://192.168.252.10/reader/v1/status/current', function(data) {
		$.each(data, function( index, value ) {
			  var category = value.category;
			  var status = value.status;
			  var categoryName = "Unknown: ";
			  if (category == 1) {
				  categoryName = "Home Security";
			  } else if (category == 2) {
				  categoryName = "Car Maintenance";
			  } else if (category == 3) {
				  categoryName = "Budget";
			  } else {
				  categoryName = categoryName.concat(category);
			  }

			  var newSection = $( "#section-template" ).clone();
			  newSection.removeAttr("id");
			  newSection.css("display","inherit");
			  newSection.find(".section-label").text(categoryName);

			  var stateCanvas = newSection.find(".section-canvas")[0].getContext('2d');
			  if (status == 'GREEN') {
				  stateCanvas.fillStyle = "rgb(28,250,57)";
			  } else if (status == 'RED') {
				  stateCanvas.fillStyle = "rgb(255,0,0)";
			  } else if (status == 'YELLOW') {
				  stateCanvas.fillStyle = "rgb(239,255,0)";
			  }
			  stateCanvas.fillRect(30, 30, 50, 50);
			  
			  var div = $( "#content" ).append(newSection);
			});
	});
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			break;
		case tvKey.KEY_UP:
			alert("UP");
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN - Fetching status");
			this.fetchStatus();
			alert("DOWN - Done fetching status");
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
