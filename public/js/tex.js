const input = document.getElementById('content');
const output = document.getElementById('output');
const form = document.getElementById('form-main');
const buttons = document.getElementsByName('edit');

/*
 * @param {String} input
 * @param {Boolean} reverse 
 */
function formatNextLine(input, reverse){
    if(reverse) {return  input.replace(/\<br\>/g, '  \n');}
    else {return  input.replace(/  \n/g, '<br>');}
}


input.addEventListener('input', ()=>{
    let content = input.value;
    output.innerHTML = formatNextLine(content);
    MathJax.typeset();
});

form.addEventListener('submit', (e)=>{
    e.preventDefault;
    input.value = formatNextLine(input.value);
    form.submit();
});


// Add event listener to all buttons: 

for(let i=0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(){

    // Create a form and a textarea. Set textarea classes. This will serve as the content editor:

        let contentEditor = document.createElement('form');
        contentEditor.action = '/edit';
        contentEditor.method = 'post';

        let textEditor = document.createElement('textarea');
        textEditor.name = 'content'
        textEditor.classList.add('form-control');
        textEditor.rows = 10;

        let problemId = document.createElement('input');
        problemId.type = "hidden";
        problemId.name = "problem";
        problemId.value = this.dataset.refId;

        contentEditor.append(problemId,textEditor);


    // Grab the span which holds the content:

        let cardContent = document.getElementById(this.dataset.refId).firstElementChild;

    // Set the value of text editor to the input format of the content:

        textEditor.value = formatNextLine(cardContent.innerHTML, true);

    // Replace the child:

        cardContent.parentElement.replaceChild(contentEditor, cardContent);

    // Change the edit button to save:

        // create save button with full config:

        let saveButton = document.createElement('button');
        saveButton.classList.add('btn','btn-success','ax-buttons');
        
        saveButton.innerHTML = 'Save';
        saveButton.addEventListener('click', function (){
            textEditor.value = formatNextLine(textEditor.value);
            contentEditor.submit();
        });

        // Grab the container of the toggling buttons:

        let toggleContainer = document.getElementById(`toggle_${this.dataset.refId}`);

        // create cancel button: 

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('btn','btn-secondary','ax-buttons');
        cancelButton.innerHTML = 'Back';
        cancelButton.addEventListener('click', ()=>{
            contentEditor.parentElement.replaceChild(cardContent, contentEditor);
            
            // Empty the toggleContainer and then append the old button

            toggleContainer.replaceChildren();
            toggleContainer.appendChild(this); 
            /* NOTE: 'this' here refers to the edit button as
             * arrow function is used. */
            
        });

    // replace the button
        toggleContainer.replaceChildren();
        toggleContainer.append(saveButton, cancelButton);

    });
}

