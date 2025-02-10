// Edited by: Nicholas Novak, Matthew Szarmach. Matthew Hardenburg, Cassidy Marquis

// resizer.ts
//console.log('Resizer script loaded');
// Select the resizer and sidebar elements
const resizer = document.querySelector('.resizer') as HTMLElement;
const sidebar = document.querySelector('.sideBar') as HTMLElement;

// Variables to store initial mouse position and sidebar width
let startX: number;
let startWidth: number;

// Mouse down event handler for starting the resizing
const mouseDownHandler = (e: MouseEvent) => {
    //console.log(resizer);
    // Log the event for debugging
    //console.log('Resizer mousedown event triggered');

    startX = e.clientX; // Get the current mouse X position
    startWidth = parseInt(window.getComputedStyle(sidebar).width, 10); // Get current width of the sidebar

    // Attach event listeners for mouse move and mouse up
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    e.preventDefault(); // Prevent default behavior
};

// Mouse move event handler for resizing the sidebar
const mouseMoveHandler = (e: MouseEvent) => {
    //console.log('Resizing in progress');

    // Calculate new width based on mouse movement
    const newWidth = startWidth + (e.clientX - startX);

    // Set the new width of the sidebar, ensuring it doesn't go below 100px
    sidebar.style.width = `${newWidth}px`;
};

// Mouse up event handler for stopping the resizing
const mouseUpHandler = () => {
    //console.log('Resizer mouseup event triggered');

    // Remove the event listeners after resizing
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

// Check if the resizer element exists and add the mouse down event listener
if (resizer) {
    resizer.addEventListener('mousedown', mouseDownHandler);
} else {
    console.error('Resizer element not found');
}
