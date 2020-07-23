/**
* 获取浏览器窗口的大小
*/
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

/**
* 相对于根节点的所有滚动总和
* @param{domNode} element 起始节点
*/
function getTotalScrollOffsetRoot(element) {
    let width = 0,
        height = 0;

    let pNode = element.parentNode;
    while(pNode !== null && pNode !== document){
    	width += pNode.scrollLeft;
    	height += pNode.scrollTop;

    	pNode = pNode.parentNode;
    }

    return { width: width, height: height }
}

/**
* 节点在浏览器窗口中的位置
* @param{domNode} element 起始节点
*/
function getElementOffsetRoot(element) {
    if (!element) return { left: 0, top: 0 };

    let actualTop = element.offsetTop;
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;

    while (current !== null) {
        actualTop += current.offsetTop ;
        actualLeft += current.offsetLeft;

        current = current.offsetParent;
    }

    let scroll = getScroll(element);
    return {
        top: actualTop - scroll.height,
        left: actualLeft - scroll.width
    }
}