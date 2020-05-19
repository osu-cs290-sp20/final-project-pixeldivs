/*****************************************************************************
** Project: PIXELDIVS Final Project
** Authors: Chitali Buge, Chih-Yun Wu, Andrew Johnson, and Alyssa Pratt
** Date: 18 May 2020
** Description: Contains all the client-side JavaScript for the entire project
*****************************************************************************/


/* Global variable */
var currentColor = "rgb(0, 0, 0)";


/*****************************************************************************
** Function: addPixel
** Description: Creates a div that acts like a pixel on the canvas.
** Parameters: none
** Pre-coditions: none
** Post-conditions: Return pixel
*****************************************************************************/
function addPixel () {
	var pixel = document.createElement("div");
	pixel.classList.add("grid-pixel");
	pixel.style.background = "rgb(256, 256, 256)";
	pixel.onclick = function () {
		pixel.style.background = currentColor;
	};
	return pixel;
}


/*****************************************************************************
** Function: addColumn
** Description: Adds a div holding a column of pixels to the grid.
** Parameters: none
** Pre-coditions: none
** Post-conditions: Column of pixels added to the grid.
*****************************************************************************/
function addColumn () {
	var col = document.createElement("div");
	col.classList.add("grid-column");
	for (var i=0; i < 8; i++) {
		col.appendChild(addPixel());
	}
	document.getElementById("grid").appendChild(col);
}


/* Upon loading the script, fill the grid with pixels */
for (var i=0; i < 8; i++) {
	addColumn();
}

// END OF FILE
