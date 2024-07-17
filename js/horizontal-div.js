// (function(){
//     init();

//     var g_containerInViewport;
//     function init(){
//         setStickyContainersSize();
//         bindEvents();
//     }

//     function bindEvents(){
//         window.addEventListener("wheel", wheelHandler);        
//     }

//     function setStickyContainersSize(){
//         document.querySelectorAll('.sticky-container').forEach(function(container){
//             const stikyContainerHeight = container.querySelector('.hori-box').scrollWidth;
//             container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
//         });
//     }

//     function isElementInViewport (el) {
//         const rect = el.getBoundingClientRect();
//         return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
//     }

//     function wheelHandler(evt){
        
//         const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function(container){
//             return isElementInViewport(container);
//         })[0];

//         if(!containerInViewPort){
//             return;
//         }

//         var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
//         var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
//         let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

//         if(g_canScrollHorizontally){
//             containerInViewPort.querySelector('.hori-box').scrollLeft += evt.deltaY;
//         }
//     }
// })();

"use strict"

// Adding scroll event listener
document.addEventListener('scroll', horizontalScroll);

//Selecting Elements
let sticky = document.querySelector('.sticky');
let stickyParent = document.querySelector('.sticky-parent');

let scrollWidth = sticky.scrollWidth;
let verticalScrollHeight = stickyParent.getBoundingClientRect().height-sticky.getBoundingClientRect().height;

//Scroll function 
function horizontalScroll(){

    //Checking whether the sticky element has entered into view or not
    let stickyPosition = sticky.getBoundingClientRect().top;
    if(stickyPosition > 1){
        return;
    }else{
        let scrolled = stickyParent.getBoundingClientRect().top; //how much is scrolled?
        sticky.scrollLeft =(scrollWidth/verticalScrollHeight)*(-scrolled)*0.85;
    
    }
}