/*****************************************************************************
** Project: PIXELDIVS Final Project
** Authors: Chitali Buge, Chih-Yun Wu, Andrew Johnson, and Alyssa Pratt
** Date: 18 May 2020
** Description: Contains all the client-side JavaScript for the entire project
*****************************************************************************/

/*****************************************************************************
** HOME PAGE (home.html Client-Side JavaScript)
*****************************************************************************/
/* Global variable */
var newDrawingCount = 0;

var newDrawing = document.getElementsByClassName("new-drawing");
var searchdrawing = document.getElementById('search-input');
var allDrawings = document.getElementsByClassName('drawings');

newDrawing[0].addEventListener('click', createDrawing);
searchdrawing.addEventListener('input', searchforDrawingTitle);
for(var i = 0; i < allDrawings.length; i++){
	allDrawings[i].addEventListener('click', selectDrawing);
}


/*****************************************************************************
** Function: createDrawing
** Description: Adds a new drawing to the home gallery when the user clicks on the plus button
** Parameters: None
** Pre-coditions: User clicks on add a new drawing
** Post-conditions: A new drawing is created in the gallery and the user is redirected to the drawing page 
*****************************************************************************/
function createDrawing(event){

	var drawingContainer = document.createElement('div');
	drawingContainer.classList.add('drawings');

	var preview = document.createElement('div');
	preview.classList.add('preview', 'square');
	drawingContainer.appendChild(preview);

	var drawingName = document.createElement('label');
    drawingName.classList.add('title-drawings');
    if( newDrawingCount === 0){
        drawingName.textContent = 'Untitled Drawing'
    }else{
        drawingName.textContent = 'Untitled Drawing ' + newDrawingCount;
    }
	newDrawingCount++;
	drawingContainer.appendChild(drawingName);

	var alldrawings = document.getElementById('drawing-container');
    alldrawings.appendChild(drawingContainer);

    window.location.href = "index.html";
}

/*****************************************************************************
** Function: searchDrawing
** Description: Live Research to find the drawing title that the user is looking for
** Parameters: Search text input
** Pre-coditions: User enters text in the search bar
** Post-conditions: Only display the search results
*****************************************************************************/
function searchforDrawingTitle(event){
	var searchVal = event.currentTarget.value.toLowerCase();
	var drawing = document.getElementsByClassName('drawings');
	for(var i = drawing.length-1; i>=0; i--){
		var title = drawing[i].textContent.toLowerCase();
		if(title.search(searchVal) === -1){
			drawing[i].style.display = 'none';
		}
		else{
			drawing[i].style.display = 'block';
		}
	}
}
/*****************************************************************************
** Function: selectDrawing
** Description: When user clicks on a drawing they are reddirected to the drawing page
** Parameters: Click on drawing
** Pre-coditions: User clicks on the drawing that they want to open
** Post-conditions: Drawing page is open instead, index.html
*****************************************************************************/

function selectDrawing(event){
	window.location.href = "index.html";
	/* Need databases to finish implementing this function */
}