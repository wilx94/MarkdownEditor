// Libraries
var converter = new showdown.Converter();

// text      = '# hello, markdown!',
// html      = converter.makeHtml(text);
// console.log(html)

// Components
var textArea = document.querySelector("textarea");
var showArea = document.querySelector("label");
var nameInput = document.querySelector("#nameInput");
var save = document.querySelector("#save");
var file_container = document.querySelector(".files");
var files = null;
var files_data = {}



loadFiles();



// console.log(files_data);



textArea.addEventListener('keyup', function(){
    // var text = textArea.value
    console.log('here')
    console.log(textArea.value)
    console.log('after')
    // console.log(converter.makeHtml(text))
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




// get all files 

function loadFiles(){
    $.get('http://localhost:8000/load', function(data){
        files_data = data;
        files_to_add = "";
        
        for (var key in files_data){
            files_to_add = files_to_add + "<div class='file'>"+ key +"</div>";
        }

        file_container.innerHTML = files_to_add;
        files = document.querySelectorAll('.file');
        addEventListenerToFiles(files);
    });
}

function addEventListenerToFiles(files){
    files.forEach(function(file){
        file.addEventListener('contextmenu', function(){
            alert('file will be deleted');
        });
        file.addEventListener('click', function(){
            alert('file will be edited');
        });
    });
}

