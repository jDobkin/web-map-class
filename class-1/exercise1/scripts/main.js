// Get the current date and time
const timeElapsed = Date.now();
const today = new Date(timeElapsed).toUTCString();

// Update the <h1> tag with today's date and time
const myHeading = document.querySelector("h1");
myHeading.textContent = "The current date is " + today;
