/*****************************************************************************
** Project: PIXELDIVS Final Project
** Authors: Chitali Buge, Chih-Yun Wu, Andrew Johnson, and Alyssa Pratt
** Date: 18 May 2020
** Description: Contains all the client-side JavaScript for the entire project
*****************************************************************************/


/* Global variable */
var currentColor = "rgb(0, 0, 0)";
var gridWidth = 8;
var gridHeight = 8;
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
	if (source) {
		pixel.classList.add("palette-pixel");
		pixel.onclick = function () {
			currentColor = pixel.style.background;
		};
	}
	else {
		pixel.classList.add("grid-pixel");
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
	var colorArray = [];
	var colorCol = [];
	for (var i=0; i < gridHeight; i++) {
		colorCol = [];
		for (var j=0; j < gridWidth; j++) {
			colorCol.push(color);
		}
		colorArray.push(colorCol);
	}
	/* Upon loading the script, fill the grid with pixels */
	for (var i=0; i < gridHeight; i++) {
		addColumn("grid", colorArray[i]);
	}
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
	for (var i=0; i < gridHeight; i++) {
		for (var j=0; j < gridWidth; j++) {
			grid.children[i].children[j].style.background = color;
		}
	}
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
	canvasColor.appendChild(addPixel("rgb(0,0,0)", true));
}


fillGrid("rgb(256, 256, 256)");
fillPalette();

// END OF FILE
