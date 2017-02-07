/**
 * $ = using jQuery
 */
$(document).ready(function() {
	var state;
	var currently_editing = null;
	var refresh_list = function(){
	    $.ajax({
	        url: "http://localhost:8080/content"
	    }).then(function(data) {
	    	var note_list = $('#table-list').children();
	    	note_list.html("");
	    	for (var i = 0; i < data.noteList.length; i++){
	    		note_list.append(
	    				
	    			"<tr>\n<td>" +data.noteList[i].title +"</td>\n" +
	    			"<td><button class = \"delete-note\">Delete</button></td>\n" +
	    			"<td><button class = \"edit-note\">Edit</button></td>" +
	    			"</tr>"
	    			
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
	    			var job = {timeoutID : null};
	    			current_note.find(".edit-note").on("click", function(){
	    				$.ajax({
	    					url: "http://localhost:8080/getNote",
	    					data:{"ID" : data.noteList[i].id}
	    				}).then(function(data2){
	    					var refresh_labels = function(){
	    						$.ajax({
	    							url: "http://localhost:8080/labelList",
	    	    					data:{"ID" : data.noteList[i].id}
	    						}).then(function(labelList){
		    						var label_list = $("#label-list").children().last();
		    						label_list.html("");
		    						for (var j = 0; j < labelList.length; j++){
		    							(function(j){
		    								label_list.append(
		    										"<tr>\n<td>" + labelList[j] +"</td>\n" +
		    										"<td><button class = \"delete-label\">Delete</button></td>\n" +
		    										"</tr>"
		    								);
		    								var current_label = label_list.children().last();
		    								current_label.find(".delete-label").on("click", function(){
		    									$.ajax({
		    										url: "http://localhost:8080/deleteLabel",
		    										data:{"ID" : data.noteList[i].id, "labelString" : labelList[j]}
		    									}).then(function (){
		    										current_label.remove();
		    									});
		    								});
		    							})(j);
		    						}
	    						});
	    					};
	    					refresh_labels();
	    					$("#add-label").off("click").on("click", function(){
	    						$.ajax({
			    					url: "http://localhost:8080/addLabel",
			    					data:{"ID" : data.noteList[i].id, "newLabel" : $("#label-input").val()}
								}).then(function (){
									$("#label-input").val("");
									refresh_labels();
								});
	    					});
	    					
	    					$(".notes-title").val(data2.title);
	    					$(".notes-content").val(data2.content);
	    					$(".notes-title").add(".notes-content").off("input onpropertychange keypress");
	    					$(".notes-title").add(".notes-content").on("input onpropertychange keypress", function(){
	    						if (job.timeoutID){
	    							window.clearTimeout(job.timeoutID);
	    						}
	    						(function(id, noteTitle, noteContent){
	    							job.timeoutID = window.setTimeout(function(){
	    								$.ajax({
	    									url: "http://localhost:8080/editNote",
	    									data:{"ID" : id,"title": noteTitle, "content" : noteContent}
	    								}).then(function(){
	    									current_note.find("td").first().html(noteTitle);
	    								});
	    								job.timeoutID = null;
	    							}, 5000);
	    						})(data.noteList[i].id, $(".notes-title").val(), $(".notes-content").val());
	    					});
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