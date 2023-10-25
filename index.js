// Set current year in footer
const year = new Date().getFullYear();
document.getElementById("copyright").textContent = `Copyright © ${year} Parth. All rights reserved.`;

var notes = [];

var emptyNotes = [
    { title: "Welcome to Note Keeper App", content: "Here you can keep you notes related to study, work and etc." },
    { title: "Adding a new Note", content: "To add new notes, click on title and type the title of you note and add the content you want to add in it." },
    { title: "Deleting a Note", content: "To delete an older note click on the delete icon on the bottom right of the note card." }
]

const createArea = document.getElementById("createArea");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesList = document.getElementById("notesList");

// Load notes from localStorage when the page loads
loadNotesFromLocalStorage();

// Render add cards at load
renderCards();

const close_btn = document.getElementById("close-btn");

close_btn.addEventListener("click", () => {
    renderCards();
})

let currentEditIndex = null; // Initialize a variable to track the index of the note being edited

function createEditForm(index) {
    currentEditIndex = index; // Store the index of the current note being edited

    // Prepopulate the input fields with the existing values
    titleInput.value = notes[index].title;
    contentInput.value = notes[index].content;

    adjustTextAreaHeight();
    renderCards();
}

// Handle form submission (save changes)
createArea.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTitle = titleInput.value;
    const newContent = contentInput.value;

    if (newTitle.trim() !== "" && newContent.trim() !== "") {
        if (currentEditIndex !== null) {
            // Update the existing note with the new values
            notes[currentEditIndex].title = newTitle;
            notes[currentEditIndex].content = newContent;
            currentEditIndex = null; // Reset the edit index
        } else {
            // If currentEditIndex is null, it means you're adding a new note
            const note = { title: newTitle, content: newContent };
            notes.push(note);
        }

        // Clear the input fields after submission
        titleInput.value = "";
        contentInput.value = "";

        // Save the updated notes to localStorage
        saveNotesToLocalStorage();

        renderCards();
    }

    contentInput.style.height = "auto";
});

const search = document.getElementById("search");

search.addEventListener("input", () => {
    // Get the search query
    const searchQuery = search.value.trim();

    // Set a half-second delay before executing the search
    setTimeout(() => {
        renderCards(searchQuery);
    }, 500);
});

function renderCards(searchQuery = "") {
    notesList.innerHTML = "";

    if (notes.length === 0) {
        notes = JSON.parse(JSON.stringify([...emptyNotes]));
        saveNotesToLocalStorage();
    }

    notes.forEach((item, index) => {
        // Check if the title contains the search query
        if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {

            // Creating new note
            const note = document.createElement("div");
            note.classList.add("note");

            const noteTitle = document.createElement("h1");
            noteTitle.textContent = item.title;

            const truncatedContent = item.content.substring(0, 100);
            const noteContent = document.createElement("p");
            noteContent.textContent = truncatedContent;

            const editButton = document.createElement("i");
            editButton.classList.add("fa-solid");
            editButton.classList.add("fa-pen-to-square");

            const deleteButton = document.createElement("i");
            deleteButton.classList.add("fa-solid");
            deleteButton.classList.add("fa-trash");

            const fullContent = item.content;

            const noteContentwindow = document.createElement("p");
            noteContentwindow.textContent = truncatedContent;

            const readMoreButton = document.createElement("button");
            readMoreButton.classList.add("read-more");
            readMoreButton.textContent = " Read More ...";

            // Initially hide the edit and delete buttons
            editButton.style.display = "none";
            deleteButton.style.display = "none";

            // Deleting a note
            deleteButton.addEventListener("click", () => {
                notes.splice(index, 1);

                saveNotesToLocalStorage()
                renderCards();
            });

            // Editing a note
            editButton.addEventListener("click", () => {
                const editForm = createEditForm(index);
                note.replaceWith(editForm);
            });

            // Toggle button visibility on hover
            note.addEventListener("mouseenter", () => {
                editButton.style.display = "block";
                deleteButton.style.display = "block";
            });

            note.addEventListener("mouseleave", () => {
                editButton.style.display = "none";
                deleteButton.style.display = "none";
            });

            // Read more button
            readMoreButton.addEventListener("click", () => {
                openModal(item.title, fullContent);
            });

            noteContent.appendChild(readMoreButton);
            note.appendChild(noteContent);

            note.appendChild(noteTitle);
            note.appendChild(noteContent);
            note.appendChild(deleteButton);
            note.appendChild(editButton);

            notesList.appendChild(note);
        }
    });
}

contentInput.addEventListener("input", () => {
    adjustTextAreaHeight();
});

function adjustTextAreaHeight() {
    contentInput.style.height = "auto"; // Reset the height to auto to prevent scrolling
    contentInput.style.height = contentInput.scrollHeight + "px";
}

// New note pop up window
function openModal(title, content) {
    const modalOverlay = document.getElementById("modalOverlay");
    const modalContainer = document.getElementById("modalContainer");
    const modalTitle = document.getElementById("modalTitle");
    const modalContent = document.getElementById("modalContent");

    modalTitle.textContent = title;
    modalContent.innerText = content;

    modalOverlay.style.display = "block";
}

function closeModal() {
    const modalOverlay = document.getElementById("modalOverlay");
    modalOverlay.style.display = "none";
}

function loadNotesFromLocalStorage() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    } else {
        // If there are no notes in local storage, use the emptyNotes
        notes = [...emptyNotes];
    }
}

// Save notes to local storage
function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}
