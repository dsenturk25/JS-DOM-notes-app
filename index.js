
let d = new Date();

//fake database

let Notes =[
    {
        "date": "23/6/2017",
        "title": "Bursa",
        "type": "business",
        "text": "Being the savage's bowsman, that is, the person who pulled the bow-oar."
    },
    {
        "date": "23/6/2017",
        "title": "Adana",
        "type": "personal",
        "text": "Being the savage's bowsman, that is, the person who pulled the bow-oar."
    },
    {
        "date": "23/6/2017",
        "title": "İstanbul",
        "type": "personal",
        "text": "Being the savage's bowsman, that is, the person who pulled the bow-oar."
    }
]

//fake database for colors of types

let colorsOfTypes = {
    projects: '#ffff00',
    business: '#ff8800',
    personal: '#00e1ff',
}

//Filtering with filtering tools

function createNewNote(date, title, type, text) {

    let noteContent = document.getElementById("note-content");

    let newNote = document.createElement('div');
    let newNoteType = document.createElement('div');
    let newNoteDate = document.createElement('div')
    let newNoteTitleContent = document.createElement('div');
    let newNoteTitle = document.createElement('div');
    let newNoteText = document.createElement('p');

    //css formatting classes
    newNote.classList.add("each-note");
    newNoteTitleContent.classList.add("title-content");
    newNoteTitle.classList.add("title");
    newNoteType.classList.add("type");
    newNoteText.classList.add("text");
    newNoteDate.classList.add("date");

    newNoteType.style.backgroundColor = colorsOfTypes[type];
    newNoteDate.innerText = date;
    newNoteTitle.innerHTML = title;
    newNoteText.innerHTML = text;

    newNoteTitleContent.appendChild(newNoteType);
    newNoteTitleContent.appendChild(newNoteTitle);
    newNote.appendChild(newNoteDate);
    newNote.appendChild(newNoteTitleContent);
    newNote.appendChild(newNoteText);

    noteContent.appendChild(newNote);

}

function filterElement(filterElement){

    let all = document.getElementById("all");
    let projects = document.getElementById("projects");
    let business = document.getElementById("business");
    let personal = document.getElementById("personal");

    var clickedButtonId;

    all.style.background = "#f9f9f9";
    all.style.color = "#000";
    projects.style.background = "#f9f9f9";
    projects.style.color = "#000";
    business.style.background = "#f9f9f9";
    business.style.color = "#000";
    personal.style.background = "#f9f9f9";
    personal.style.color = "#000";
    filterElement.style.background = "#6a5eca"; 
    filterElement.style.color = "#fff";

    clickedButtonId = filterElement.id;

    let noteContent = document.getElementById("note-content");
    noteContent.innerHTML = '';

    Notes.forEach(note => {

        if (clickedButtonId==='all') {
            createNewNote(note.date, note.title, note.type, note.text)
        }

        else if (clickedButtonId===note.type) {
            createNewNote(note.date, note.title, note.type, note.text);
        }
    })
}

var filterByType;

function clickedButtonId(idOfButton){
    filterByType = idOfButton.id;
}

window.onload = () => {

    //creating all notes when onload

    Notes.forEach(note => {
        createNewNote(note.date, note.title, note.type, note.text);
    })
    //Filtering with the searchbar
    let searchBar = document.querySelector('#search-input');
    filterByType = 'all';
    searchBar.onkeyup = function () {

        let valueOfSearchBar = searchBar.value;
        let noteContent = document.getElementById("note-content");
        noteContent.innerHTML = '';
        valueOfSearchBar = valueOfSearchBar.toLowerCase();

        // sorting when search
        Notes.forEach(note => {
            let title = note.title;
            title = title.toLowerCase();
            if(filterByType==='all'){
                if (title.includes(valueOfSearchBar)) {
                    createNewNote(note.date, note.title, note.type, note.text);
                }
            }
            else if(note.type===filterByType){
                if (title.includes(valueOfSearchBar)) {
                    createNewNote(note.date, note.title, note.type, note.text);
                }
            }
        })
    }


    let insertNoteButton = document.getElementById("insert-note");

    let typeBox;
    let titleInput;
    let textInput;
    let dateInput;
    let newNoteTemplate;

    insertNoteButton.onclick = function () {

        let noteContent = document.getElementById("note-content");

        newNoteTemplate = document.createElement('div');
        dateInput = document.createElement('div');
        let typeTitleBox = document.createElement('div');
        typeBox = document.createElement('select');
        titleInput = document.createElement('input');
        textInput = document.createElement('textarea');
        let submitButton = document.createElement('button');

        dateInput.placeholder = "Date";
        titleInput.placeholder = "Title";
        textInput.placeholder = "Write your note"

        dateInput.innerHTML = d.getUTCDate().toString() + '/' + parseInt(d.getMonth()+1).toString() + '/' + d.getFullYear().toString();

        submitButton.onclick = triggerCreateFunction;
        submitButton.innerText = 'Save';

        newNoteTemplate.classList.add('each-note');
        dateInput.classList.add('date');
        typeBox.classList.add('type');
        typeBox.style.width = "18px";
        typeBox.style.height = "18px";
        titleInput.classList.add('title');
        titleInput.classList.add('template-inputs')
        textInput.classList.add('text');
        typeTitleBox.classList.add('title-content');
        submitButton.classList.add('template-button');

        let projectsOption = document.createElement('option');
        let businessOption = document.createElement('option');
        let personalOption = document.createElement('option');

        projectsOption.innerText = "Projects";
        businessOption.innerText = "Business";
        personalOption.innerText = "Personal";

        projectsOption.value = "projects";
        businessOption.value = "business";
        personalOption.value = "personal";

        typeBox.appendChild(projectsOption);
        typeBox.appendChild(businessOption);
        typeBox.appendChild(personalOption);

        var optionsArray = [projectsOption, businessOption, personalOption];
        typeBox.onchange = function(){
            optionsArray.forEach(option => {
                if(typeBox.value===option.value){
                    typeBox.style.backgroundColor = colorsOfTypes[option.value];
                }
            })
        }
        newNoteTemplate.appendChild(dateInput);
        typeTitleBox.appendChild(typeBox);
        typeTitleBox.appendChild(titleInput);
        newNoteTemplate.appendChild(typeTitleBox);
        newNoteTemplate.appendChild(textInput);
        newNoteTemplate.appendChild(submitButton);

        noteContent.appendChild(newNoteTemplate);

    }

    function triggerCreateFunction(){
        let dateValue = dateInput.innerText;
        let typeValue = typeBox.value;
        let titleValue = titleInput.value;
        let textValue = textInput.value;

        let noteContent = document.getElementById("note-content");

        createNewNote(dateValue, titleValue, typeValue, textValue);
        Notes.push(
            note={
                date: dateValue,
                title: titleValue,
                type: typeValue,
                text: textValue,
            }
        )
        noteContent.removeChild(newNoteTemplate)
    }

}
