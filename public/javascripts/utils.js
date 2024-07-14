if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

function initializeCode() {
    const ingredients = [];
    const instructions = [];

    document.getElementById('add-ingredient').addEventListener('click', function() {
        const ingredient = document.getElementById('ingredients-text').value;
        ingredients.push(ingredient);
        document.getElementById('ingredients-text').value = '';
    });

    document.getElementById('add-instruction').addEventListener('click', function() {
        const instruction = document.getElementById('instructions-text').value;
        instructions.push(instruction);
        document.getElementById('instructions-text').value = '';
    });

    document.getElementById('submit').addEventListener('click', function() {
        const name = document.getElementById('name-text').value;
        const data = {
            name: name,
            ingredients: ingredients,
            instructions: instructions
        };

        fetch('/recipe/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Recipe added:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        const formData = new FormData();
        const imageInput = document.getElementById('image-input');
        for (let i = 0; i < imageInput.files.length; i++) {
            formData.append('images', imageInput.files[i]);
        }

        fetch('/images', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Images uploaded:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    fetch('/recipe/pizza')
    .then(response => response.json())
    .then(data => {
        document.getElementById('recipe').innerHTML = `
            <h4>${data.name}</h4>
            <h5>Ingredients</h5>
            <ul>${data.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
            <h5>Instructions</h5>
            <ol>${data.instructions.map(i => `<li>${i}</li>`).join('')}</ol>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}