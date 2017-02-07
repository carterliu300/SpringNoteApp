/**
 * $ = using jQuery
 */
$(document).ready(function() {
	var state;
	var time;
	var job = [];
	var refresh_list = function(){
	    $.ajax({
	        url: "http://localhost:8080/content"
	    }).then(function(data) {
	//    	var note_list = $('#list-section');
	    	var note_list = $('#table-list');
	    	note_list.html("");
	    	for (var i = 0; i < data.noteList.length; i++){
	    		note_list.append(
	    				
	    			"<div>" +
	    			"<tr>\n<td>" +data.noteList[i].title +"</td>\n" +
	    			"<td><button class = \"delete-note\">Delete</button></td>\n" +
	    			"<td><button class = \"display-note\">Display</button></td>"+
	    			"<td><button class = \"edit-note\">Edit</button></td>" +
	    			"</tr>" +
	    			"</div>"
	    			
	    		);
	    		(function(i){
	    			var current_note = note_list.children().last();
	    			current_note.find(".delete-note").on("click", function(){
	    				$.ajax({
	    					url: "http://localhost:8080/deleteNote",
	    					data:{"ID" : data.noteList[i].id}
	    				}).then(function(){
	    					current_note.remove();
	    				});
	    			});
	    			console.log(current_note + " " + i);
	    			current_note.find(".display-note").on("click", function(){
	    				$.ajax({
	    					url: "http://localhost:8080/getNote",
	    					data:{"ID" : data.noteList[i].id}
	    				}).then(function(data2){
	    					$(".notes-title").val(data2.title);
	    					$(".notes-content").val(data2.content);
	    				});
	    			});
	    			var noteTitle = $(".notes-title").val();
	    			var noteContent = $(".notes-content").val();
	    			current_note.find(".edit-note").on("click", function(){
	    				$.ajax({
	    					url: "http://localhost:8080/editNote",
	    					data:{"ID" : data.noteList[i].id,"title": noteTitle, "content" : noteContent}
	    				});
	    			});
	    		})(i);
	    	}
	    });
    };
	refresh_list();
    $(".createNoteButton").on("click", function() {
		var noteTitle = $(".notes-title").val();
		var noteContent = $(".notes-content").val();
		$.ajax({
	        url: "http://localhost:8080/newNote",
	        data:{"name": noteTitle, "content" : noteContent}
		}).then(function(){
			refresh_list();
		});
		$(".notes-title").val("");
		$(".notes-content").val("");
	});
});