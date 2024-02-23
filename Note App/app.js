let addnote = document.getElementById("addnote-btn");
let title = document.getElementById("title");
let details = document.getElementById("details")
addnote.addEventListener("click" , ()=>{

    if(title.value == "" || details.value == ""){

        return alert("Please Enter Notes data before adding notes")
    }

    let notes = localStorage.getItem("notes");
    if(notes == null) {

        noteObj = [];
    }else {

        noteObj = JSON.parse(notes);
    }

    let myObj = {

        title : title.value,
        details : details.value
    }

    title.value = "";
    details.value = "";

    noteObj.push(myObj);
    localStorage.setItem("notes" , JSON.stringify(noteObj));

    showNotes()
    
})

function showNotes () {

    let notes = localStorage.getItem("notes");
    if(notes == null) {

        noteObj = [];
    }else {

        noteObj = JSON.parse(notes);
    }

    let html = "" ;

    noteObj.forEach(function(element , index){

       html += `  
       <div class="user-note-container">
       <div class="delete-note-container">
       <h2>Your Note</h2>
       <hr>
       <br>
       <div class="user-note-content">
       <p class="note-counter">${index + 1}</p>
       <p class="note-title">${element.title}</p>
       <p class="note-details">${element.details}</p>
       <div class="button-container">
           <button class="btn" id=${index} onClick="deleteNotes(this.id)">Delete</button>
           <button class="btn" id=${index} onClick="editNotes(this.id)">Edit</button>
       </div>
       </div>
   </div>
   </div>
       `

       if(noteObj !== 0 ){

        let noteElement = document.getElementById("notes");
        noteElement.innerHTML = html;
       }else{

        let noteElement = document.getElementById("notes");
        noteElement.innerHTML = "No Notes Present Yet.............";
       }
       
       localStorage.setItem("notes" ,JSON.stringify(noteObj));

    });
}





function deleteNotes(index) {

    let confirmdel = confirm("Are you sure you want to delete this note")

    if(confirmdel == true){

        let notes = localStorage.getItem("notes");
        if(notes == null) {
    
            noteObj = [];
        }else {
    
            noteObj = JSON.parse(notes);
        }

        noteObj.splice(index , 1)
        localStorage.setItem("notes" , JSON.stringify(noteObj));
        showNotes();

        let noteElement = document.querySelector(`.user-note-container:nth-child(${index + 1})`)

        if(noteElement){

            noteElement.remove();
        }

    }

}

function editNotes () {

    if(title.value != "" || details.value != ""){

        return alert("please clear the note boxex before editing the notes")
    }

    let notes = localStorage.getItem("notes");
    if(notes == null){

        noteObj = [];
    }else{

        noteObj = JSON.parse(notes)
    }

    noteObj.findIndex((element  , index) =>{
       
        title.value = element.title;
        details.value = element.details;

        noteObj.splice(index , 1 )
        localStorage.setItem("notes" , JSON.stringify(noteObj));
       
        showNotes();
      

    }) 


    


}


showNotes();