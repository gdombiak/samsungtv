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
	$('#TableItems tbody').children( 'tr:not(:first)' ).remove();
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
			  var color ="#FFFFFF";
			  if (status == 'GREEN') {
				  color = "#31B404";
			  } else if (status == 'RED') {
				  color = "#B40404";
			  } else if (status == 'YELLOW') {
				  color = "#FFFF00";
			  }
			  
			  var table = document.getElementById("TableItems");
			  var row = table.insertRow(1);
			  row.bgColor="#FFFFFF";
			  var td1 = row.insertCell(0);
			  td1.style.color="#170B3B";
			  td1.innerHTML = categoryName;
			  td1 = row.insertCell(1);
			  td1.style.color = color;
			  td1.innerHTML = status;
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
