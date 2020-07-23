function getViewport(){
	if(document.compatMode === 'BackCompat'){
		return {
			width: document.body.clientWidth,
			height: document.dody.clientHeight
		}
	}else{
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight	
		}
	}
}

function getScroll(element){
	let width = 0, height = 0;
	if(document.compatMode === 'BackCompat'){
		height = document.dody.scrollTop;
		width = document.dody.scrollLeft;
	}else{
		height = document.documentElement.scrollTop;
		width = document.documentElement.scrollLeft;
	}

	return { width: width, height: height }
}

function getElementOffsetRoot(element){
	if(!element) return {left: 0, top: 0};

	let actualTop = element.offsetTop;
	let actualLeft = element.offsetLeft;
	let current = element.offsetParent;

	while(current !== null){
		actualTop += current.offsetTop;
		actualLeft += current.offsetLeft;

		current = current.offsetParent;
	}

	let elementScrollLeft = 0, elementScrollTop = 0;
	if(document.compatMode === 'BackCompat'){
		elementScrollTop = document.dody.scrollTop;
		elementScrollLeft = document.dody.scrollLeft;
	}else{
		elementScrollTop = document.documentElement.scrollTop;
		elementScrollLeft = document.documentElement.scrollLeft;
	}

	return {
		top: actualTop - elementScrollTop,
		left: actualLeft - elementScrollLeft
	}
}