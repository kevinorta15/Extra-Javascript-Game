var canvas = document.querySelector('canvas');

//Set height and width of document, innerwidth sets it to the complete window size
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext('2d');

c.fillRect(100,100,100,100);
