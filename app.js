const personForm = document.querySelector('#personForm');
const nameInput = document.querySelector('#nameInput');
const ageInput = document.querySelector('#ageInput');
const addPersonButton = document.querySelector('#addPersonButton');
const peopleList = document.querySelector('#peopleList');
const errorSection = document.querySelector('.errorDiv');

/* la variable index no está definida globalmente, está declarada en el ámbito del script principal.
En JavaScript, las variables que no están declaradas dentro de una función se consideran globales  */
let isEditing = false;
let index = 0;
const people = [];

personForm.addEventListener('submit', addPerson);


function addPerson(event) {
    console.log("valor de index en addPerson")
    console.log(index)
    event.preventDefault();
    console.log(isEditing)  

    //si estoy editando un objeto del array(persona)
    if (isEditing) {
        actualizarPersona();
        isEditing = false;
        document.querySelector("form").reset();
        document.querySelector("button[type='submit']").innerText = "Agregar persona";
        return;
    }

    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim());

    try {
        // si name es falso (es decir, null, undefined, false, una cadena vacía, etc.) o si age no es un número válido 
        if (!name || isNaN(age)) {
            throw new Error('Ingrese un nombre y una edad válida');
        }

        //creo el objeto person con las variables name y age (el nombre de la variable será el nombre de la propiedad)
        const person = {name, age};
        console.log(person);

        //añado el objero al array people
        people.push(person);

        //limpio los campos del formulario
        nameInput.value = '';
        ageInput.value = '';

        //llamo a la funcion de pintar las personas
        displayPeople();
    } 
    catch (error) {
        //console.error se muestra acompañados de un icono de error.
        console.error(error);
        showError(error);
    }
}

function displayPeople() {
    //limpio el listado
    peopleList.innerHTML = '';

    //recorro el array people
    people.forEach((person, index) => {

    const divName = document.createElement('div');
    divName.textContent = person.name;

    const divAge = document.createElement('div');
    divAge.textContent = person.age;

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit', 'edit-icon');

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');

    //añado un listener a lso botones de editar y borrar, pasando el index a la funcion
    deleteIcon.addEventListener('click', () => deletePerson(index));
    editIcon.addEventListener('click', () => editPerson(index));

    peopleList.appendChild(divName);
    peopleList.appendChild(divAge);
    peopleList.appendChild(editIcon);
    peopleList.appendChild(deleteIcon);

    });
}

function showError(message) {
    const errorMessage = document.createElement("div");
    errorMessage.id = "error-message";
    errorMessage.innerHTML = '<div><i class="fas fa-exclamation-triangle"></i><span>' + message + '</span></div><i id="close-button" class="fas fa-times-circle fa-lg"></i>';
    document.body.appendChild(errorMessage);

    const closeButton = document.getElementById("close-button");
    
    //al pulsar en la x, borro el hojo anteriormente añadido
    closeButton.addEventListener("click", function() {
        document.body.removeChild(errorMessage);
    });
}



function deletePerson(index) {
    console.log("Entra en la función delete con el index:",index)

   /*  es un método en JavaScript que se utiliza para modificar el contenido de un array eliminando o reemplazando elementos existentes y/o agregando nuevos elementos en su lugar
   En este caso elimino 1 elemento desde el índice  */ 
    people.splice(index, 1);
    displayPeople();
}

/* editIndex se refiere al índice de la persona que se está editando, para  evitar la confusión entre el parámetro de la función y la variable global index  */
function editPerson(editIndex) {
    console.log("entro en editar persona y el index es:")
    console.log(editIndex)
    isEditing = true;
    //asignamos el valor de editIndex a la variable global index.
    index = editIndex;
    const person = people[index];
    nameInput.value = person.name;
    ageInput.value = person.age;
    console.log("valor de index antes de cambiar boton")
    console.log(index)
    document.querySelector("button[type='submit']").innerText = "Guardar cambios";
    //alert(`Editando a ${person.name}, ${person.age} años.`);
}


function actualizarPersona() {
console.log("entro en actualizar persona y el index es:")
console.log(index)
// Actualizar la persona en el arreglo
const name = document.querySelector('#nameInput').value;
const age = document.querySelector('#ageInput').value;
const person = { name, age};
people[index] = person;

// Actualizar la tabla y resetear el formulario
displayPeople();
document.querySelector("form").reset();
}