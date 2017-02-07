package hello;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;


public class Note {
	private String title;
	private String content;
	ArrayList<String> labelList = new ArrayList<String>();
	//To prevent 2 or more users from deleting at the same time.
    private final static AtomicLong counter = new AtomicLong();
	private long ID;
	
	//create read update delete
	//TODO: This constructor may need to be deleted
	/**Constructor that takes in 1 string
	 * 
	 * @param someTitle Title of the note
	 */
	public Note(String someTitle){
		title = someTitle;
		ID = counter.getAndIncrement();
	}
	
	/**Constructor that takes in 2 strings.
	 * 
	 * @param someTitle Title of the note
	 * @param someContent Body of the note
	 */
	public Note(String someTitle, String someContent){
		title = someTitle;
		setContent(someContent);
		ID = counter.getAndIncrement();
	}
	
	public long getID(){
		return ID;
	}
	
	public String getTitle(){
		return title;
	}
	public void setTitle(String string){
		title = string;
	}
	
	
	public String getContent(){
		return content;
	}
	public void setContent(String content){
		this.content = content;
	}
	
	
	
	public void addLabel(String label){
		labelList.add(label);
	}
	public void removeLabel(String target){
		for (int i = 0; i < labelList.size(); i++){
			if (labelList.get(i) == target){
				labelList.remove(i);
			}
		}
	}
	public ArrayList<String> getLabelList(){
		return labelList;
	}
	public boolean containsLabel(String target){
		//Should there be no labels, for loop won't even run
		for (int i = 0; i < labelList.size(); i++){
			if (labelList.get(i).contains(target)){
				return true;
			}
		}
		return false;
	}
	
}
