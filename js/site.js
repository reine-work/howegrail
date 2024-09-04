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

// "use strict"

// ------------------------------------------------------------------

// Adding scroll event listener
// document.addEventListener('scroll', horizontalScroll);

// //Selecting Elements
// let sticky = document.querySelector('.sticky');
// let stickyParent = document.querySelector('.sticky-parent');

// let scrollWidth = sticky.scrollWidth;
// let verticalScrollHeight = stickyParent.getBoundingClientRect().height-sticky.getBoundingClientRect().height;

// //Scroll function 
// function horizontalScroll(){

//     //Checking whether the sticky element has entered into view or not
//     let stickyPosition = sticky.getBoundingClientRect().top;
//     if(stickyPosition > 1){
//         return;
//     }else{
//         let scrolled = stickyParent.getBoundingClientRect().top; //how much is scrolled?
//         sticky.scrollLeft =(scrollWidth/verticalScrollHeight)*(-scrolled)*1.75;
    
//     }
// }

// var MySite = MySite || {};

// MySite.AjaxLoader = (function() {
//     var links, contentDiv;

//     // Function to load page content using AJAX
//     function loadPage(url) {
//         var xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 contentDiv.innerHTML = xhr.responseText;

//                 // Reinitialize the horizontal scrolling function after content is loaded
//                 MySite.HorizontalScroller.init();
//             }
//         };
//         xhr.send();
//     }

//     function init() {
//         links = document.querySelectorAll('.menu-link');
//         contentDiv = document.getElementById('content');

//         for (var i = 0; i < links.length; i++) {
//             links[i].addEventListener('click', function(event) {
//                 event.preventDefault();
//                 var url = this.getAttribute('href');
//                 loadPage(url);
//             });
//         }

//         document.addEventListener('DOMContentLoaded', function() {
//             loadPage('home.htm');

//             // Initialize the horizontal scrolling function when the page first loads
//             MySite.HorizontalScroller.init();
//         });
//     }

//     return {
//         init: init
//     };
// })();

// // Horizontal Scrolling Function
// MySite.HorizontalScroller = (function() {
//     // Variables for sticky elements
//     let sticky, stickyParent, scrollWidth, verticalScrollHeight;

//     function init() {
//         // Selecting elements
//         sticky = document.querySelector('.sticky');
//         stickyParent = document.querySelector('.sticky-parent');

//         // Only proceed if elements exist
//         if (!sticky || !stickyParent) return;

//         // Calculating dimensions
//         scrollWidth = sticky.scrollWidth;
//         verticalScrollHeight = stickyParent.getBoundingClientRect().height - sticky.getBoundingClientRect().height;

//         // Adding scroll event listener
//         document.addEventListener('scroll', horizontalScroll);
//     }

//     function horizontalScroll() {
//         // Checking whether the sticky element has entered into view or not
//         let stickyPosition = sticky.getBoundingClientRect().top;
//         if (stickyPosition > 1) {
//             return;
//         } else {
//             let scrolled = stickyParent.getBoundingClientRect().top; // How much is scrolled?
//             sticky.scrollLeft = (scrollWidth / verticalScrollHeight) * (-scrolled) * 1.75;
//         }
//     }

//     return {
//         init: init
//     };
// })();

// // Initialize the AJAX loader when the page loads
// MySite.AjaxLoader.init();

// const hamburger = document.querySelector(".hamburger")
// const nav_menu = document.querySelector(".nav-menu")

// hamburger.addEventListener("click",()=>{
//   hamburger.classList.toggle("active");
//   nav_menu.classList.toggle("active");
// })

// document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
//   hamburger.classList.remove("active");
//   nav_menu.classList.remove("active");
// }))

// Modal
document.addEventListener('DOMContentLoaded', function() {
    // Check if the user has visited before
    if (!localStorage.getItem('popupShown')) {
        // Display the pop-up
        document.getElementById('popup').style.display = 'block';

        // Set local storage item so the pop-up won't show again
        localStorage.setItem('popupShown', 'true');
    }

    // Close the pop-up when the close button is clicked
    document.querySelector('.popup .close').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });
});

var MySite = MySite || {};

MySite.AjaxLoader = (function() {
    var links, contentDiv;

    // Function to load page content using AJAX
    function loadPage(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                contentDiv.innerHTML = xhr.responseText;

                // Reinitialize the horizontal scrolling function
                MySite.HorizontalScroller.init();

                // Reinitialize Bootstrap components and navbar
                bootstrapInit();

                // Reinitialize Instagram embeds
                reinitializeInstagramEmbeds();
            }
        };
        xhr.send();
    }

    function init() {
        links = document.querySelectorAll('.menu-link');
        contentDiv = document.getElementById('content');

        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function(event) {
                event.preventDefault();
                var url = this.getAttribute('href');
                loadPage(url);
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            loadPage('home.htm');

            // Initialize the horizontal scrolling function
            MySite.HorizontalScroller.init();

            // Initialize Bootstrap components and navbar
            bootstrapInit();

            // Initialize Instagram embeds
            reinitializeInstagramEmbeds();
        });
    }

    function bootstrapInit() {
        // Initialize Bootstrap dropdowns
        var dropdowns = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        dropdowns.forEach(function (dropdown) {
            new bootstrap.Dropdown(dropdown);
        });

        // Initialize Bootstrap tooltips
        var tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltips.forEach(function (tooltip) {
            new bootstrap.Tooltip(tooltip);
        });

        // Reinitialize the Bootstrap navbar toggle
        var navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler) {
            navbarToggler.addEventListener('click', function() {
                var target = navbarToggler.getAttribute('data-bs-target');
                var targetEl = document.querySelector(target);
                if (targetEl) {
                    var bsCollapse = new bootstrap.Collapse(targetEl);
                    bsCollapse.toggle();
                }
            });
        }
    }

    function reinitializeInstagramEmbeds() {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        } else {
            var script = document.createElement('script');
            script.async = true;
            script.src = "https://www.instagram.com/embed.js";
            document.body.appendChild(script);
        }
    }

    return {
        init: init
    };
})();

// Horizontal Scrolling Function
MySite.HorizontalScroller = (function() {
    let sticky, stickyParent, scrollWidth, verticalScrollHeight;

    function init() {
        // Selecting elements
        sticky = document.querySelector('.sticky');
        stickyParent = document.querySelector('.sticky-parent');

        // Only proceed if elements exist
        if (!sticky || !stickyParent) return;

        // Calculating dimensions
        scrollWidth = sticky.scrollWidth;
        verticalScrollHeight = stickyParent.getBoundingClientRect().height - sticky.getBoundingClientRect().height;

        // Adding scroll event listener
        document.addEventListener('scroll', horizontalScroll);
    }

    function horizontalScroll() {
        // Checking whether the sticky element has entered into view or not
        let stickyPosition = sticky.getBoundingClientRect().top;
        if (stickyPosition > 1) {
            return;
        } else {
            let scrolled = stickyParent.getBoundingClientRect().top; // How much is scrolled?
            sticky.scrollLeft = (scrollWidth / verticalScrollHeight) * (-scrolled) * 1.75;
        }
    }

    return {
        init: init
    };
})();

// Initialize the AJAX loader when the page loads
MySite.AjaxLoader.init();


// Responsive Nav
const hamburger = document.querySelector(".hamburger")
const nav_menu = document.querySelector(".nav-menu")

hamburger.addEventListener("click",()=>{
  hamburger.classList.toggle("active");
  nav_menu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  nav_menu.classList.remove("active");
}))