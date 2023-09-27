var notes = [];

var emptyNotes = [
    { title: "Welcome to Note Keeper App", content: "Here you can keep you notes related to study, work and etc." },
    { title: "Adding a new Note", content: "To add new notes click on title and type the title of you note and add the content you want to add in it." },
    { title: "Deleting a Note", content: "To delete an older note click on the delete icon on the bottom right of the note card." }
]

const createArea = document.getElementById("createArea");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesList = document.getElementById("notesList");

renderCards();

// createArea.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const title = titleInput.value;
//     const content = contentInput.value;

//     if (title.trim() !== "" && content.trim() !== "") {
//         const note = { title, content };
//         notes.push(note);

//         titleInput.value = "";
//         contentInput.value = "";

//         renderCards();
//     }
// })

// function renderCards() {
//     notesList.innerHTML = "";

//     if (notes.length === 0) {
//         notes = [...emptyNotes];
//     }

//     notes.forEach((item, index) => {
//         const note = document.createElement("div");
//         note.classList.add("note");

//         const noteTitle = document.createElement("h1");
//         noteTitle.textContent = item.title;

//         const noteContent = document.createElement("p");
//         noteContent.textContent = item.content;

//         const editButton = document.createElement("i");
//         editButton.classList.add("fa-solid");
//         editButton.classList.add("fa-pen-to-square");

//         const deleteButton = document.createElement("i");
//         deleteButton.classList.add("fa-solid");
//         deleteButton.classList.add("fa-trash");

//         deleteButton.addEventListener("click", () => {
//             notes.splice(index, 1);

//             renderCards();
//         });

//         editButton.addEventListener("click", () => {
//             const editForm = createEditForm(index);
//             note.replaceWith(editForm);
//         });

//         note.addEventListener("mouseenter", () => {
//             editButton.style.display = "block";
//             deleteButton.style.display = "block";
//         });

//         note.addEventListener("mouseleave", () => {
//             editButton.style.display = "none";
//             deleteButton.style.display = "none";
//         });

//         note.appendChild(noteTitle);
//         note.appendChild(noteContent);
//         note.appendChild(deleteButton);
//         note.appendChild(editButton);

//         notesList.appendChild(note);
//     })
// }

let currentEditIndex = null; // Initialize a variable to track the index of the note being edited

function createEditForm(index) {
    currentEditIndex = index; // Store the index of the current note being edited

    // Prepopulate the input fields with the existing values
    titleInput.value = notes[index].title;
    contentInput.value = notes[index].content;

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

        renderCards();
    }

    contentInput.style.height = "auto";
});

const search = document.getElementById("search");

// search.addEventListener("input", (e) => {
//     const searchInput = search.value;

//     console.log("changes");

//     if(searchInput.trim() != ""){
//         renderCards();
//     }
//     else{

//     }
// })

search.addEventListener("input", () => {
    // Clear any existing search delay (if any)
    // clearTimeout(searchTimeout);

    // Get the search query
    const searchQuery = search.value.trim();

    // Set a 1-second delay before executing the search
    setTimeout(() => {
        renderCards(searchQuery);
    }, 500);
});

function renderCards(searchQuery = "") {
    notesList.innerHTML = "";

    if (notes.length === 0) {
        notes = [...emptyNotes];
    }

    notes.forEach((item, index) => {
        // Check if the title contains the search query
        if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            const note = document.createElement("div");
            note.classList.add("note");

            const noteTitle = document.createElement("h1");
            noteTitle.textContent = item.title;

            const noteContent = document.createElement("p");
            noteContent.textContent = item.content;

            const editButton = document.createElement("i");
            editButton.classList.add("fa-solid");
            editButton.classList.add("fa-pen-to-square");

            const deleteButton = document.createElement("i");
            deleteButton.classList.add("fa-solid");
            deleteButton.classList.add("fa-trash");

            // Initially hide the edit and delete buttons
            editButton.style.display = "none";
            deleteButton.style.display = "none";

            // Toggle button visibility on hover
            note.addEventListener("mouseenter", () => {
                editButton.style.display = "block";
                deleteButton.style.display = "block";
            });

            note.addEventListener("mouseleave", () => {
                editButton.style.display = "none";
                deleteButton.style.display = "none";
            });

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