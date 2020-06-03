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
var drawingPreviews = document.getElementsByClassName('preview');
var setting_modal = document.getElementsByClassName('hidden');
var close_button = document.getElementsByClassName("modal-close-button");
var create_button = document.getElementsByClassName("modal-create-button");

create_button[0].addEventListener('click', createDrawing);
newDrawing[0].addEventListener('click', drawingSetting);
searchdrawing.addEventListener('input', searchforDrawingTitle);

for(var i = 0; i < allDrawings.length; i++){
	allDrawings[i].addEventListener('click', selectDrawing);
	renderPreview(drawingPreviews[i])
	//drawingPreviews[i].addEventListener( renderPreview);
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
	var customizedTitle = document.getElementById('title-input');
	if(customizedTitle.value != null &&  customizedTitle.value != "" && customizedTitle.length == undefined){
		drawingName.textContent = customizedTitle.value;
	}
	else{
		if( newDrawingCount === 0){
			drawingName.textContent = 'Untitled Drawing'
		}else{
			drawingName.textContent = 'Untitled Drawing ' + newDrawingCount;
		}
		newDrawingCount++;
	}

	drawingContainer.appendChild(drawingName);

	var alldrawings = document.getElementById('drawing-container');
    alldrawings.appendChild(drawingContainer);

    window.location.href = "drawingpage";
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

function renderPreview(preview){
	var width= preview.parentNode.childNodes[5].childNodes[1].textContent;
	var height= preview.parentNode.childNodes[5].childNodes[3].textContent;
	var pixels= preview.parentNode.childNodes[5].childNodes[5].textContent;
	var test = pixels.split(',')[10];
	var columns = '';
	var k = 0;
	for(var i = 0; i < height; i++){
		for(var j = 0; j<width; j++){
		
			var pixel = document.createElement('div');
			pixel.classList.add('preview-pixel');
			pixel.textContent;
			pixel.style.backgroundColor = pixels.split(',')[k];
			preview.appendChild(pixel);
			k++;
		}
	}
	for(var j = 0; j < width; j++){
		columns += 'auto ';
	}
	preview.style.gridTemplateColumns = columns;	
}



/*****************************************************************************
** Function: selectDrawing
** Description: When user clicks on a drawing they are reddirected to the drawing page
** Parameters: Click on drawing
** Pre-coditions: User clicks on the drawing that they want to open
** Post-conditions: Drawing page is open instead, index.html
*****************************************************************************/

function selectDrawing(event){
	window.location.href = "drawingpage";
	/* Need databases to finish implementing this function */
}

/*****************************************************************************
** Function: drawingSetting
** Description: When user clicks on create drawing, setting displays
** Parameters: Click on drawing
** Pre-coditions: User clicks on create drawing
** Post-conditions: setting modal shows up
*****************************************************************************/
function drawingSetting(event){

	setting_modal[0].style.display = 'block';
	setting_modal[1].style.display = 'block';

	//close
	close_button[0].addEventListener('click', function(){
		document.querySelector('#title-input').value = "";
		document.querySelector('#width-range').value = 50;
		document.querySelector('#height-range').value = 50;
		document.querySelector('#w_volume').value = 50;
		document.querySelector('#h_volume').value = 50;
		setting_modal[0].style.display = 'none';
		setting_modal[1].style.display = 'none';
	})

}
/*****************************************************************************
** Function: w_outputUpdate(vol)
** Description: show current value of range slider of width
** Parameters: volume
** Pre-coditions: user move the rnage slider
** Post-conditions: value shows up
*****************************************************************************/
function w_outputUpdate(vol) {
	document.querySelector('#w_volume').value = vol;
}
/*****************************************************************************
** Function: h_outputUpdate(vol)
** Description: show current value of randge slider of height
** Parameters: volume
** Pre-coditions: user move the rnage slider
** Post-conditions: value shows up
*****************************************************************************/
function h_outputUpdate(vol) {
	document.querySelector('#h_volume').value = vol;
}
