document.addEventListener('DOMContentLoaded', function () {
  // Show the loading container initially
  const loadingContainer = document.getElementById('loading-container');

  // Simulate a delay (replace this with your actual loading logic)
  setTimeout(function () {
    // Add the 'hidden' class to dissolve the container
    loadingContainer.classList.add('hidden');
  }, 800); // Adjust the delay time as needed
});
