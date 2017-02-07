package hello;

import java.util.ArrayList;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {
    
    private NoteList myNoteList = new NoteList();
    
    @RequestMapping("/content")
    public NoteList getSomeContent(){
    	return myNoteList;
    }
    
    @RequestMapping("/newNote")
    public void createNote(@RequestParam(value = "name", required = true) String tTitle,
    		@RequestParam(value = "content", defaultValue = "") String tContent){
    	//TODO Make sure the noteList actually exists first, otherwise create from scratch
    	myNoteList.makeNote(new Note (tTitle, tContent));
    	//TODO:Make new constructor for Note.java
    }
    @RequestMapping("/deleteNote")
    public void deleteNote(@RequestParam(value = "ID", required = true) long index){
    	myNoteList.deleteNote(index);
    }
    @RequestMapping("/editNote")
    public void editNote(@RequestParam(value = "ID", required = true) long id,
    		@RequestParam(value = "title", defaultValue = "") String title,
    		@RequestParam(value = "content", defaultValue = "") String content){
    	if (!title.isEmpty()){//If string is not empty
    		myNoteList.editTitle(id, title);
    	}
    	if (!content.isEmpty()){
    		myNoteList.editContent(id, content);
    	}
    }
    @RequestMapping("/getNote")
    public Note getNote(@RequestParam(value = "ID", required = true) long id){
    	return myNoteList.getNote(id);
    }
    
    @RequestMapping("/addLabel")
    public void addLabel(@RequestParam(value = "ID", required = true) long id,
    		@RequestParam(value = "newLabel", required = true) String newLabel){
    	myNoteList.addLabel(id, newLabel);
    }
  //TODO: Unimplemented
    @RequestMapping("/deleteLabel")
    public void deleteLabel(@RequestParam(value = "ID", required = true) long id,
    		@RequestParam(value = "labelString", required = true) String labelString){
    	myNoteList.deleteLabel(id, labelString);
    }
    @RequestMapping("/labelList")
    public ArrayList<String> getLabelList(@RequestParam(value = "ID", required = true) long id){
    	return myNoteList.getNote(id).getLabelList();
    }
    
  //TODO: Unimplemented
    public ArrayList<Note> searchLabel(
    		@RequestParam(value = "labelTarget", required = true) String labelTarget){
    	return myNoteList.searchLabel(labelTarget);
    }
    //TODO: Unimplemented
    public ArrayList<Note> searchTitle(
    		@RequestParam(value = "titleTarget", required = true) String titleTarget){
    	return myNoteList.searchTitle(titleTarget);
    }
}
