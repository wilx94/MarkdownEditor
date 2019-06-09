// Libraries
var converter = new showdown.Converter();


// Components
var textArea = document.querySelector("textarea");
var showArea = document.querySelector(".label");
var nameInput = document.querySelector("#nameInput");
var save = document.querySelector("#saveButton");
var file_container = document.querySelector(".files");
var files = null;
var files_data = {}


// Load files when load the web page
loadFiles();



// EVENT LISTENERS
//  ** Inside addEventListenerToFiles function we have two others EventListeners

textArea.addEventListener('keyup', function(){
    showArea.innerHTML = converter.makeHtml(textArea.value);
});


save.addEventListener('click', function(){

    if(nameInput.value !== ""){
        $.ajax({
            url:'http://localhost:8000/save', 
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({filename: nameInput.value, file: showArea.innerHTML }),
            headers: {
                    'Content-Type': 'application/json',
                    "Accept": 'application/json',
                },
            success: function(data){
                console.log('al fin')
                loadFiles();
                alert('Your file was saved!');
            }
        });
    }
    else{
        alert('You need to provide a name for the file to be saved.');
    }
    


    console.log('coplete');
});



// FUNTIONS

// get all files 
function loadFiles(){
    $.get('http://localhost:8000/load', function(data){
        files_data = data;
        files_to_add = "";
        
        for (var key in files_data){
            files_to_add = files_to_add + "<button class=\"file\">"+ key +"</button>";
        }

        file_container.innerHTML = files_to_add;
        files = document.querySelectorAll('.file');
        addEventListenerToFiles(files);
    });
}

// Add event listener to file buttons
function addEventListenerToFiles(files){
    files.forEach(function(file){
        file.addEventListener('dblclick', function(){
            $.ajax({
                url:'http://localhost:8000/delete', 
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({filename: file.textContent }),
                headers: {
                        'Content-Type': 'application/json',
                        "Accept": 'application/json',
                    },
                success: function(data){
                    loadFiles();
                    alert('Your file was deleted!');
                }
            });
        });
        
        file.addEventListener('click', function(){
            // alert('file will be edited');
            console.log('here');
            var filename = file.textContent;
            var data = files_data[filename];
            textArea.value = converter.makeMarkdown(data);
            showArea.innerHTML = data;
            nameInput.value = filename.split('.html')[0];


        });
    });
}
