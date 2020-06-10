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
var drawingContainer = document.getElementById('drawing-container');
var drawingPreviews = document.getElementsByClassName('preview');
var setting_modal = document.getElementsByClassName('hidden');
var close_button = document.getElementsByClassName("modal-close-button");
var create_button = document.getElementsByClassName("modal-create-button");

create_button[0].addEventListener('click', createDrawing);
newDrawing[0].addEventListener('click', drawingSetting);
searchdrawing.addEventListener('input', searchforDrawingTitle);

for (let j = 0; j < allDrawings.length; j++){
	let drawing = allDrawings[j]; drawing.addEventListener('click', function() { selectDrawing(j); });
}

for(var i = 0; i < allDrawings.length; i++){
	//allDrawings[i].addEventListener('click', function(){selectDrawing(i)});
	renderPreview(drawingPreviews[i]);
	//drawingPreviews[i].addEventListener( renderPreview);
}


/*****************************************************************************
** Function: createDrawing
** Description: Adds a new drawing to the home gallery when the user clicks on the plus button and renders a preview
** Parameters: None
** Pre-coditions: User clicks on add a new drawing
** Post-conditions: A new drawing is created in the gallery and the user is redirected to the drawing page
*****************************************************************************/
function createDrawing(event){
	setting_modal[0].style.display = 'none';
	setting_modal[1].style.display = 'none';
	var customizedTitle = document.getElementById('title-input');


	if(customizedTitle == null || customizedTitle.value == '\n' || customizedTitle.value == '' || customizedTitle.value == ' '){
		if( newDrawingCount === 0){
			customizedTitle.value = 'Untitled Drawing'
		}else{
			customizedTitle.value = 'Untitled Drawing ' + newDrawingCount;
			newDrawingCount++;
		}
	}
	var choosenWidth = document.getElementById('width-range').value;
	var choosenHeight = document.getElementById('height-range').value;
	var standardPalette = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffffff', '#00ffff', '#ff00ff', '#ffff00'];
	var pixelArr = [];


	for(var i = 0; i < choosenWidth * choosenHeight; i++){
		pixelArr.push('#FFFFFF');
	}
	
	var squareSize = 75;
	if (600/choosenWidth > 600/choosenHeight) {
		squareSize = 600/choosenHeight;
	}
	else {
		squareSize = 600/choosenWidth;
	}
	var gridSizePx = squareSize * choosenWidth + 'px';
	
	var newDrawing = {
		title: customizedTitle.value,
		width: choosenWidth,
		height: choosenHeight,
		pixels: pixelArr,
		palette: standardPalette,
		pixelSize: squareSize,
		widthpx: gridSizePx
	}
	console.log("*********TITLE", newDrawing.title);
	var newDrawinghtml = Handlebars.templates.newDrawing(newDrawing);
	drawingContainer.insertAdjacentHTML('beforeend', newDrawinghtml);
	renderPreview(drawingPreviews[drawingPreviews.length - 1]);
	saveDrawing(newDrawing);
	//window.location.href = "drawingpage";

}


function saveDrawing(drawing){
	var request = new XMLHttpRequest();
	var requestUrl = '/home/save';
	request.open('POST', requestUrl);
	var requestBody = JSON.stringify({
		title: drawing.title,
		width: drawing.width,
		height: drawing.height,
		pixels: drawing.pixels,
		palette: drawing.palette,
		pixelSize: drawing.pixelSize,
		widthpx: drawing.widthpx
	});

	request.setRequestHeader(
		'Content-Type',
		'application/json'
	);
	request.send(requestBody);
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
** Function: renderPreview
** Description: Previews the drawing on the home page
** Parameters: preview rendering
** Pre-coditions: N/A - rendered when page loads
** Post-conditions: Previews can be seen on homepage
*****************************************************************************/
function renderPreview(preview){
	var width= preview.parentNode.childNodes[5].childNodes[1].textContent;
	var height= preview.parentNode.childNodes[5].childNodes[3].textContent;
	var pixels= preview.parentNode.childNodes[5].childNodes[5].textContent;
	var columns = '';
	var rows = '';
	var pixelSize;
	for(var i = 0; i < height * width; i++){
		var pixel = document.createElement('div');
		pixel.classList.add('preview-pixel');
		pixel.textContent;
		pixel.style.backgroundColor = pixels.split(',')[i];
		preview.appendChild(pixel);
	}
	if(width <= height){
		pixelSize = 350/height;
	}
	else if(width > height){
		pixelSize = 350/width;
	}
	for(var j = 0; j < width; j++){
		columns += pixelSize + 'px ';
	}
	for(var j = 0; j < height; j++){
		rows += pixelSize + 'px ';
	}
	preview.style.gridTemplateColumns = columns;
	preview.style.gridTemplateRows = rows;

}


/*****************************************************************************
** Function: selectDrawing
** Description: When user clicks on a drawing they are reddirected to the drawing page
** Parameters: Click on drawing
** Pre-coditions: User clicks on the drawing that they want to open
** Post-conditions: Drawing page is open instead, index.html
*****************************************************************************/

function selectDrawing(index){
	console.log(index);
	window.location.href = "/drawings/"+index;
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
		document.querySelector('#width-range').value = 4;
		document.querySelector('#height-range').value = 4;
		document.querySelector('#w_volume').value = 4;
		document.querySelector('#h_volume').value = 4;
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
