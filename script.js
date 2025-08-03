const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener("click", () => createNote());

function saveNotes() {
  const notes = document.querySelectorAll(".note");

  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(data));
}

function createNote(text = "") {
  // noteDiv
  const noteDiv = document.createElement("div");
  noteDiv.className = "noteDiv";

  // header to wrap buttons
  const header = document.createElement("div");
  header.className = "note-header";

  // edit button
  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
  editBtn.setAttribute("aria-label", "Edit note");
  editBtn.setAttribute("title", "Edit");

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteBtn.setAttribute("aria-label", "Delete note");
  deleteBtn.setAttribute("title", "Delete");

  // appending the edit, delete button in header
  header.appendChild(editBtn);
  header.appendChild(deleteBtn);

  // textarea -> note
  const textarea = document.createElement("textarea");
  textarea.className = "note";
  textarea.placeholder = "Write your note here...";
  textarea.value = text;

  // appending the header in noteDiv
  // appending the textarea in noteDiv
  // appending the noteDic in main
  noteDiv.appendChild(header);
  noteDiv.appendChild(textarea);
  main.appendChild(noteDiv);

  // edit event listener
  editBtn.addEventListener("click", () => {
    textarea.focus();
    textarea.disabled = !textarea.disabled;
    editBtn.style.color = textarea.disabled ? "#fff" : "#00ffcc";
  });

  // delete event listener
  deleteBtn.addEventListener("click", () => {
    noteDiv.remove();
    saveNotes();
  });

  textarea.addEventListener("input", () => {
    if (!textarea.disabled) {
      // textarea.disabled = true;
      saveNotes();
      editBtn.style.color = "#fff";
    }
  });
}

const savedNotes = JSON.parse(localStorage.getItem("notes"));

if (savedNotes) {
  savedNotes.forEach((note) => createNote(note));
}
