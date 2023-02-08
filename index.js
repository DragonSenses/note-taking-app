/* Global Elements */
const noteStack = document.getElementById("note-stack");
const title = document.getElementById("title");
const content = document.getElementById("content");
const error = document.getElementById("form-error");

let notesData = [];

/**
 * Displays Note Data. Handles appending the new note to the noteStack
 * div container to persistently display to the user. The note must display
 * the title, content & date based on user input.
 * 
 * Buttons: [edit, save, delete] elements added to execute the corresponding 
 * functions using the note's unique id.
 */
const createNote = (uid, title, text, date) => {
  const note = document.createElement("div");
  note.className = "note";
  note.id = uid;
  note.innerHTML = `
    <div class="note-title">${title}</div>
    <div class="note-controls">
      <button class="note-edit" onclick="editNote(${uid})">
        Edit
      </button>
      <button class="note-save" style="display:none" onclick="saveNote(${uid})">
        Save
      </button>
      <button class="note-delete" onclick="deleteNote(${uid})">
        Delete
      </button>
    </div>
    <div class="note-text">${text}</div>
    <div class="note-date">${date}</div>
  `;
  /* insertBefore() first child to ensure newest is placed at the top */
  noteStack.insertBefore(note, noteStack.firstChild);
};

/**
 * Creates and Stores note data. 
 * Adds a note, called when button is "Add Note" button is clicked. 
 */
const addNote = () => {
  /* Blank Note condition check */
  /* If both title and content field are empty, display an error message */
  if (title.value.trim().length == 0 && content.value.trim().length == 0) {
    error.innerText = "Note cannot be empty";
    return;
  }

  const uid = new Date().getTime().toString();

  /* Note object is created with a unique id (UID) value by using the
  date.getTime() method which returns exact millisecond note is created.
  No two notes will be the same. Also has the date property to store when
  note is created using date.toLocaleDateString() */
  const noteObj = {
    uid: uid,
    date: new Date().toLocaleDateString(),
    title: title.value,
    text: content.value
  };

  notesData.push(noteObj);

  /* Note: localStorage only supports data in string format, so use 
  JSON.stringify() method to convert the array */
  localStorage.setItem("notes", JSON.stringify(notesData));

  createNote(noteObj.uid, noteObj.title, noteObj.text, noteObj.date);

  /* Reset the Title and Content for Next Note */
  title.value = "";
  content.value = "";
  error.innerText = "";
};

/**
 * Updates Data, handles editing and saving a note based on a unique id. When
 * edit button is clicked, we'll hide the edit button and display the save 
 * button. 
 * @param {string} uid note unique id
 */
const editNote = (uid) => {
  /* Find note element in the DOM */
  const note = document.getElementById(uid); 

  /* Target title & text elements inside target note */
  const noteTitle = note.querySelector(".note-title");
  const noteText = note.querySelector(".note-text");
  const noteSave = note.querySelector(".note-save");
  const noteEdit = note.querySelector(".note-edit");

  /* `contentEditable` method is an inbuilt browser attribute that allows a 
  user to change the content of any element if set to true. Allows user to
  make changes to the title and content of the corresponding note */
  noteTitle.contentEditable = "true";
  noteText.contentEditable = "true";
  noteEdit.style.display = "none";
  noteSave.style.display = "block";
  noteText.focus(); // set focus on note text field (and focus ring)
};

/**
 * Updates Data by saving the new data in notesData value and localStorage. 
 * @param {string} uid note unique id
 */
const saveNote = (uid) => {
  const note = document.getElementById(uid);

  const noteTitle = note.querySelector(".note-title");
  const noteText = note.querySelector(".note-text");
  const noteSave = note.querySelector(".note-save");
  const noteEdit = note.querySelector(".note-edit");

  /* Blank Note condition check */
  if (
    noteTitle.innerText.trim().length == 0 &&
    noteText.value.trim().length == 0
  ) {
    error.innerHTML = "Note cannot be empty";
    return;
  }

  /* Find note with corresponding uid, update the content */
  notesData.forEach((note) => {
    if (note.uid == uid) {
      note.title = noteTitle.innerText;
      note.text = noteText.innerText;
    }
  });

  /* Push updated array to local storage */
  localStorage.setItem("notes", JSON.stringify(notesData));

  /* Set contentEditable attributes to false and hide the save button while
  displaying the edit button.  */
  noteTitle.contentEditable = "false";
  noteText.contentEditable = "false";
  noteEdit.style.display = "block";
  noteSave.style.display = "none";
  error.innerText = "";
};

/**
 * Deleting Data, removes the note element from the DOM and also delete the
 * note object from our notesData array. Can handle removing the object from
 * the array by using the .filter() method. Benefit from existing browser
 * features through "confirm()" method to display an inbuilt modal that can
 * handle confirming user input, without the need to build a custom modal and
 * detect a response ourselves.
 * @param {string} uid note unique id
 */
const deleteNote = (uid) => {
  let confirmDelete = confirm("Are you sure you want to delete this note?");
  if(!confirmDelete){
    return;
  }

  const note = document.getElementById(uid);
  note.parentNode.removeChild(note);
  
  notesData = notesData.filter((note) => {
    return note.uid != uid;
  });
  localStorage.setItem("notes", JSON.stringify(notesData));
}

/* Check for Existing Data */
/* Since app uses browser's localStorage, include a condition to check if
there's already existing data for our notes in localStorage and display that
on the page once the page loads. Using JSON.parse() to convert the stringifiied
data back to its original format - the noteObj. */
window.addEventListener("load", () => {
  notesData = localStorage.getItem("notes")
    ? JSON.parse(localStorage.getItem("notes"))
    : [];

  notesData.forEach((note) => {
    createNote(note.uid, note.title, note.text, note.date);
  });
});