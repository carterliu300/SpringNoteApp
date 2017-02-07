package hello;

import java.util.ArrayList;


public class NoteList {
	//TODO: Use ConcurrentHashMap
	ArrayList<Note> noteList;
	
	public NoteList(){
		noteList = new ArrayList<Note>();
	}
	
	public void makeNote(Note entry){
		noteList.add(entry);
	}
	public Note getNote(long id){
		for (int i = 0; i < noteList.size(); i++){
			if (noteList.get(i).getID() == id){
				return noteList.get(i);
			}
		}
		return null;
	}
	
	//TODO: Now uses ID, which is unique
	public void deleteNote(long index){
		for (int i = 0; i < noteList.size(); i++){
			if (noteList.get(i).getID() == index){
				noteList.remove(i);
				return;
			}
		}
	}
	
	
	public void editTitle(long id, String newTitle){
		Note n = getNote(id);
		if(n != null){
			n.setTitle(newTitle);
		}
	}
	
	
	public void editContent(long id, String newContent){
		Note n = getNote(id);
		if(n != null){
			n.setContent(newContent);
		}
	}
	
	public ArrayList<Note> getNoteList(){
		return noteList;
	}

	public ArrayList<Note> searchTitle(String target){
		ArrayList<Note> result = new ArrayList<Note>();
		for (int i  = 0; i < noteList.size(); i++){
			if (noteList.get(i).getTitle().contains(target)){
				result.add(noteList.get(i));
			}
		}
		return result;
	}
	
	public ArrayList<Note> searchLabel(String target){
		ArrayList<Note> result = new ArrayList<Note>();
		for (int i = 0; i < noteList.size(); i++){
			//A note may have multiple labels
			if (noteList.get(i).containsLabel(target)){
				result.add(noteList.get(i));
			}
		}
		if (result.size() > 0){
			return result;
		}
		return null;
	}
	
	public void addLabel(long id, String label){
		Note n = getNote(id);
		if (n!=null){
			n.addLabel(label);
		}
	}
	public void deleteLabel(long id, String labelString){
		Note n = getNote(id);
		if (n!=null){
			n.removeLabel(labelString);
		}
	}
}
