/**
 * $ = using jQuery
 */
$(document).ready(function() {
	$(".createNoteButton").on("click", function () {
		var noteTitle = $(".notes-title").val();
		var noteContent = $(".notes-content").val();
		$.ajax({
	        url: "http://localhost:8080/newNote",
	        data:{"name": noteTitle, "content" : noteContent}
		});
		$(".notes-title").val("");
		$(".notes-content").val("");
	});
});