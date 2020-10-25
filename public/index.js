	/*****************************************************************************
** Project: PIXELDIVS Final Project
** Authors: Chitali Buge, Chih-Yun Wu, Andrew Johnson, and Alyssa Pratt
** Date: 18 May 2020
** Description: Contains all the client-side JavaScript for the entire project
*****************************************************************************/


/* Global variable */
var currentColor = "rgb(0, 0, 0)";
var gridWidth = 16;
var gridHeight = 32;
var squareSize = 75;
var palette = [
	"rgb(0,0,0)",
	"rgb(256, 256, 256)",
	"rgb(128, 128, 128)",
	"rgb(256, 0, 0)",
	"rgb(0, 256, 0)",
	"rgb(0, 0, 256)",
	"rgb(256, 256, 0)",
	"rgb(0, 256, 256)",
	"rgb(256, 0, 256)",
	"rgb(128, 0, 0)",
	"rgb(0, 128, 0)",
	"rgb(0, 0, 128)",
	"rgb(128, 128, 0)",
	"rgb(0, 128, 128)",
	"rgb(128, 0, 128)",
	"rgb(256, 128, 128)",
	"rgb(128, 256, 128)",
	"rgb(128, 128, 256)",
	"rgb(256, 256, 128)",
	"rgb(128, 256, 256)",
	"rgb(256, 128, 256)"
];
var addButton = document.getElementById("add-button");
addButton.onclick = openModal;

var closeButton = document.getElementById("modal-close-button");
closeButton.onclick = closeModal;

var modalAddButton = document.getElementById("modal-add-button");
modalAddButton.onclick = addColor;

var saveButton = document.getElementById('save-button');
saveButton.onclick = saveDrawing;

var modalColor = [0, 0, 0];

function start (width, height) {
	gridWidth = width;
	gridHeight = height;
	console.log("Is it working?");
	console.log(arrayOfGridPixels);
	console.log(arrayOfPalettePixels);
	loadDrawing();
	fillPalette();
}


function loadDrawing () {
	var grid = document.getElementById("grid");
	for (var i=0; i < arrayOfGridPixels.length; i++) {
		grid.appendChild(addPixel(arrayOfGridPixels[i], false));
	}
}


/*****************************************************************************
** Function: addPixel
** Description: Creates a div that acts like a pixel on the canvas.
** Parameters: none
** Pre-coditions: none
** Post-conditions: Return pixel
*****************************************************************************/
function addPixel (color, source) {
	var pixel = document.createElement("div");
	pixel.style.background = color;
	var squareSize = 75;
	if (source) {
		pixel.classList.add("palette-pixel");
		pixel.onclick = function () {
			currentColor = pixel.style.background;
		};
	}
	else {
		pixel.classList.add("grid-pixel");
		if (600/gridWidth > 600/gridHeight) {
			squareSize = 600/gridHeight;
		}
		else {
			squareSize = 600/gridWidth;
		}
		pixel.style.width = squareSize + "px";
		pixel.style.height = squareSize + "px";
		pixel.onclick = function () {
			pixel.style.background = currentColor;
		};
	}
	return pixel;
}


/*****************************************************************************
** Function: addColumn
** Description: Adds a div holding a column of pixels to the grid.
** Parameters: none
** Pre-coditions: none
** Post-conditions: Column of pixels added to the grid.
*****************************************************************************/
function addColumn (element, color) {
	var col = document.createElement("div");
	col.classList.add("grid-column");
	for (var i=0; i < gridWidth; i++) {
		col.appendChild(addPixel(color[i], false));
	}
	document.getElementById(element).appendChild(col);
}


/*****************************************************************************
** Function: fillGrid
** Description: Fills the entire canvas grid with a given color of pixels.
** Parameters: color is the desired color for the entire grid
** Pre-coditions: none
** Post-conditions: Grid filled with the designated color
*****************************************************************************/
function fillGrid (color) {
	var grid = document.getElementById('grid');
	for (var i=0; i < gridWidth*gridHeight; i++) {
		grid.appendChild(addPixel(color, false));
	}
	if (600/gridWidth > 600/gridHeight) {
		squareSize = 600/gridHeight;
	}
	else {
		squareSize = 600/gridWidth;
	}
	grid.style.width = squareSize * gridWidth + 'px';
}


/*****************************************************************************
** Function: fillPalette
** Description: Adds the palette of colors for the user to chose
** Parameters: none
** Pre-coditions: palette is defined
** Post-conditions: Palette added
*****************************************************************************/
function fillPalette () {
	var canvasColor = document.getElementById("palette");
	for (var i=0; i < palette.length; i++) {
		canvasColor.appendChild(addPixel(palette[i], true));
	}
	for (var i=0; i < arrayOfPalettePixels.length; i++) {
		canvasColor.appendChild(addPixel(arrayOfPalettePixels[i], true));
	}
}


/*****************************************************************************
** Function: clearGrid
** Description: Sets the color of the current grid to the current color.
** Parameters: color to set the grid to
** Pre-coditions: grid must alread exist
** Post-conditions: Grid set to color
*****************************************************************************/
function clearGrid (color) {
	var grid = document.getElementById("grid");
	for (var i=0; i < gridWidth*gridHeight; i++) {
			grid.children[i].style.background = "blue";
	}
	/*
	for (var i=0; i < gridHeight; i++) {
		for (var j=0; j < gridWidth; j++) {
			grid.children[i].children[j].style.background = color;
		}
	}
	*/
}


/*****************************************************************************
** Function: addColor
** Description: Activates when the user clicks the add new color button
** in the palette. It adds a new color to the palette for the user to use.
** Parameters: none
** Pre-conditions: Project is created and loaded.
** Post-conditions: New color added to the palette
*****************************************************************************/
function addColor () {
	var canvasColor = document.getElementById("palette");
	var rSlider = document.getElementById("red-range");
	var gSlider = document.getElementById("green-range");
	var bSlider = document.getElementById("blue-range");
	modalColor[0] = rSlider.value;
	modalColor[1] = gSlider.value;
	modalColor[2] = bSlider.value;
	var newColor = "rgb(" + modalColor[0] + ", " + modalColor[1] + ", " +
					modalColor[2] + ")";
	canvasColor.appendChild(addPixel(newColor, true));
	palette.push(newColor);
	currentColor = palette[palette.length-1];
	closeModal();
}


/*****************************************************************************
** Function: openModal
** Description: Handles the event of the red button in the lower right corner
** where a modal pops-up to let the user add a twit
** Parameters: none
** Pre-Conditions: button pressed
** Post-Conditions: modal closed and color appropriately voided or added
******************************************************************************/
function openModal () {
	var modalBackdrop = document.getElementById("modal-backdrop");
	var colorModal = document.getElementById("color-modal");
	modalBackdrop.classList.remove("hidden");
	colorModal.classList.remove("hidden");
}


/*****************************************************************************
** Function: closeModal
** Description: Handles the event of the x and cancel buttons on the modal to
** close the modal and clear text in text areas
** Parameters: none
** Pre-Conditions: modal visible
** Post-Conditions: modal hidden and cleared
******************************************************************************/
function closeModal () {
	var modalBackdrop = document.getElementById("modal-backdrop");
	var colorModal = document.getElementById("color-modal");
	var red_slider = document.getElementById("red-range");
	var green_slider = document.getElementById("green-range");
	var blue_slider = document.getElementById("blue-range");
	var red_output = document.getElementById("r_volume");
	var green_output = document.getElementById("g_volume");
	var blue_output = document.getElementById("b_volume");
	modalBackdrop.classList.add("hidden");
	colorModal.classList.add("hidden");
	red_slider.value = 0;
	green_slider.value = 0;
	blue_slider.value = 0;
	red_output.value = 0;
	green_output.value = 0;
	blue_output.value = 0;
	modalColor = [0, 0, 0];
	updateModalPreview();
}


/*****************************************************************************
** Function: r_outputUpdate
** Description: Updates the red value and modal preview with the slider's
** value
** Parameters: value representing the exact numerical value
** Pre-Conditions: none
** Post-Conditions: modal preview and output lable updated
******************************************************************************/
function r_outputUpdate(value) {
	document.getElementById("r_volume").value = value;
	modalColor[0] = value;
	updateModalPreview();
}


/*****************************************************************************
** Function: g_outputUpdate
** Description: Updates the green value and modal preview with the slider's
** value
** Parameters: value representing the exact numerical value
** Pre-Conditions: none
** Post-Conditions: modal preview and output lable updated
******************************************************************************/
function g_outputUpdate(value) {
	document.getElementById("g_volume").value = value;
	modalColor[1] = value;
	updateModalPreview();
}


/*****************************************************************************
** Function: b_outputUpdate
** Description: Updates the blue value and modal preview with the slider's
** value
** Parameters: value representing the exact numerical value
** Pre-Conditions: none
** Post-Conditions: modal preview and output lable updated
******************************************************************************/
function b_outputUpdate(value) {
	document.getElementById("b_volume").value = value;
	modalColor[2] = value;
	updateModalPreview();
}


/*****************************************************************************
** Function: updateModalPreview
** Description: Updates the modal preview with the new color based on the
** values of the sliders
** Parameters: none
** Pre-Conditions: none
** Post-Conditions: modal preview updated with current modal color
******************************************************************************/
function updateModalPreview () {
	var modalPreview = document.getElementById("modal-color-preview");
	var newColor = "rgb(" + modalColor[0] + ", " + modalColor[1] + ", " +
					modalColor[2] + ")";
	modalPreview.style.background = newColor;
}

/*****************************************************************************
** Function: getDrawIDFromURL
** Description: Gets the id of the drawing open
** Parameters: none
** Pre-Conditions: URL
** Post-Conditions: returns the id
******************************************************************************/
function getDrawIDFromURL() {
	var path = window.location.pathname;
	var pathParts = path.split('/');
	if (pathParts[1] === "drawings") {
	  return pathParts[2];
	} else {
	  return null;
	}

}

/*****************************************************************************
** Function: saveDrawing
** Description: saves the edited version of the drawing
** Parameters: none
** Pre-Conditions: URL of the requess
** Post-Conditions: none
******************************************************************************/
function saveDrawing(){

	var request = new XMLHttpRequest();
	var requestUrl = '/drawings/' + getDrawIDFromURL()+' /save';
	request.open('POST', requestUrl);
	var grid = document.getElementById("grid");
	var pixelsColors = [];
	var hexColor;
	for (var i=0; i < gridWidth*gridHeight; i++) {
		hexColor = RGBToHex(grid.children[i].style.backgroundColor);
		pixelsColors.push(hexColor);
	}
	
	var requestBody = JSON.stringify({
		pixels: pixelsColors,
	});


	request.setRequestHeader(
		'Content-Type',
		'application/json'
	);
	request.send(requestBody);
	
}

/*
** Function: RGBToHex
** Description: Parses RGB string and returns hex value
** Parameters: rgb
** Post-conditions: returns hex value
** Source: css-tricks.com/converting-color-spaces-in-javascript/
*/
function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}


// END OF FILE
