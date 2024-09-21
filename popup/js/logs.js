chrome.storage.local.get(['logs'], function(result) {
const noteTextarea = document.getElementById('logs');
if (result.logs) {
  noteTextarea.value = result.logs;
}
});
backButton.addEventListener('click', function() {
	window.history.back(); 
});