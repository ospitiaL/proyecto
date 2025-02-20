
window.history.pushState(null, "", window.location.href); 


window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);  
};

window.onload = function () {
    history.pushState(null, null, window.location.href); 
    history.replaceState(null, null, window.location.href); 
};
