// script.js

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Get references to the HTML elements we want to interact with
    const messageElement = document.getElementById('message');
    const actionButton = document.getElementById('actionButton');
    const currentYearElement = document.getElementById('currentYear');
    const notificationBox = document.getElementById('notificationBox');
    const notificationMessage = document.getElementById('notificationMessage');

    // Check if all elements exist before proceeding
    if (!messageElement || !actionButton || !currentYearElement || !notificationBox || !notificationMessage) {
        console.error("One or more essential HTML elements were not found. Script cannot run correctly.");
        return; // Exit if essential elements are missing
    }

    // Variable to keep track of clicks
    let clickCount = 0;

    /**
     * Shows a notification message.
     * @param {string} message - The message to display.
     * @param {string} type - The type of message (e.g., 'success', 'error', 'info'). Defaults to 'success'.
     */
    function showNotification(message, type = 'success') {
        if (!notificationMessage || !notificationBox) return; // Guard clause

        notificationMessage.textContent = message;
        // Reset classes carefully: remove previous type classes before adding the new one.
        notificationBox.classList.remove('success', 'error', 'info'); // Remove any existing type classes
        notificationBox.classList.add(type); // Add the new type class
        notificationBox.classList.add('show'); // Make the notification visible

        // Hide the notification after 3 seconds
        setTimeout(() => {
            notificationBox.classList.remove('show');
        }, 3000);
    }

    // Add an event listener to the button for click events
    actionButton.addEventListener('click', function() {
        clickCount++; // Increment the click counter

        // Change the text content of the message element based on click count
        if (clickCount === 1) {
            messageElement.textContent = "Great! You clicked the button!";
            messageElement.classList.remove('text-blue-600', 'text-purple-600', 'text-xl'); // Reset other colors/styles
            messageElement.classList.add('text-green-600', 'font-semibold'); // Add green color and bold font
            showNotification('Button clicked successfully!', 'success');
        } else if (clickCount > 1 && clickCount < 5) {
            messageElement.textContent = `You've clicked the button ${clickCount} times! Keep going!`;
            messageElement.classList.remove('text-green-600', 'text-purple-600', 'text-xl', 'font-semibold');
            messageElement.classList.add('text-blue-600'); // Add blue color
            showNotification(`Click number ${clickCount}!`, 'info'); // Use 'info' for intermediate clicks
        } else if (clickCount >= 5) {
            messageElement.textContent = `Wow, ${clickCount} clicks! You're a click master!`;
            messageElement.classList.remove('text-green-600', 'text-blue-600', 'font-semibold');
            messageElement.classList.add('text-purple-600', 'text-xl'); // Add purple color and larger text
            actionButton.textContent = "Click me again?"; // Change button text
            showNotification('You are a click master!', 'success');
        }

        // Change button text after the first click
        if (clickCount >= 1 && actionButton.textContent !== "Click me again?") {
             if (clickCount < 5) {
                actionButton.textContent = "Click Me Again!";
             } else {
                actionButton.textContent = "Reset Clicks?"; // Offer a reset option
             }
        } else if (clickCount >=5 && actionButton.textContent === "Reset Clicks?"){
            // Reset functionality
            clickCount = 0;
            messageElement.textContent = "Clicks have been reset. Click to start again!";
            messageElement.classList.remove('text-green-600', 'text-blue-600', 'text-purple-600', 'text-xl', 'font-semibold');
            messageElement.classList.add('text-gray-700');
            actionButton.textContent = "Click Me!";
            showNotification('Counter reset!', 'info');
        }
    });

    // Set the current year in the footer
    const year = new Date().getFullYear();
    if (currentYearElement) {
        currentYearElement.textContent = year;
    }

    // --- Responsive Adjustments & Touch Events ---

    // Example: Log window resize events
    window.addEventListener('resize', function() {
        console.log(`Window resized to: ${window.innerWidth}x${window.innerHeight}`);
        // Add any JavaScript-based responsive adjustments here if needed
    });

    // Add touch event listener to the button for better mobile experience
    // This helps prevent issues like "ghost clicks" or delays on some touch devices.
    actionButton.addEventListener('touchstart', function(event) {
        // Prevent the browser from also processing a 'click' event immediately after,
        // which can sometimes cause the event to fire twice on touch devices.
        event.preventDefault();
        console.log('Button touched!');
        // Programmatically trigger the 'click' event to ensure our existing logic runs.
        actionButton.click();
    }, { passive: false }); // passive:false is needed because we're calling preventDefault()

    console.log("JavaScript initialized successfully!");

}); // End of DOMContentLoaded
