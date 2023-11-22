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
   
    event.preventDefault();

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
        //o es menor que 0
        if (!name || isNaN(age) || age < 0) {
            throw new Error('Ingrese un nombre y una edad válida');
        }

        //creo el objeto person con las variables name y age (el nombre de la variable será el nombre de la propiedad)
        const person = {name, age};
        console.log(person);

        //añado el objero al array people
        people.push(person);

        //limpio los campos del formulario
        document.querySelector("form").reset();

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
    peopleList.textContent = '';

    //recorro el array people
    people.forEach((person, index) => {

    const divName = document.createElement('div');
    divName.textContent = person.name;

    const divAge = document.createElement('div');
    divAge.textContent = person.age;

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit', 'edit-icon');
    // Establecer el atributo data-index en el índice actual
    editIcon.setAttribute('data-index', index);


    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');

    //añado un listener a lso botones de editar y borrar, pasando el index a la funcion
    deleteIcon.addEventListener('click', () => deletePerson(index));
    editIcon.addEventListener('click', (e) => editPerson(e));

    peopleList.appendChild(divName);
    peopleList.appendChild(divAge);
    peopleList.appendChild(editIcon);
    peopleList.appendChild(deleteIcon);

    });
}

function showError(message) {
    const errorMessage = document.createElement("div");
    errorMessage.id = "error-message";
    errorMessage.className="emergentes"

    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-exclamation-triangle");

    const messageSpan = document.createElement("span");
    messageSpan.textContent = message;

    const closeButton = document.createElement("i");
    closeButton.id = "close-button";
    closeButton.classList.add("fas", "fa-times-circle", "fa-lg");

    errorMessage.appendChild(icon);
    errorMessage.appendChild(messageSpan);
    errorMessage.appendChild(closeButton);

    document.body.appendChild(errorMessage);

    // Al pulsar en la x, borro el nodo anteriormente añadido
    closeButton.addEventListener("click", function() {
        document.body.removeChild(errorMessage);
    });
}

function showCustomConfirm(message, onConfirm) {
    const confirmDialog = document.createElement("div");
    confirmDialog.id = "custom-confirm";
    confirmDialog.className="emergentes";

    const iconExclamation = document.createElement("i");
    iconExclamation.classList.add("fa-solid","fa-exclamation");

  
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
  
    const buttonsDiv = document.createElement("div");
    buttonsDiv.id = "custom-confirm-buttons";
  
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Aceptar";

    confirmButton.addEventListener("click", function () {
      onConfirm();
      document.body.removeChild(confirmDialog);
    });
  
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.addEventListener("click", function () {
      document.body.removeChild(confirmDialog);
    });
  
    buttonsDiv.appendChild(confirmButton);
    buttonsDiv.appendChild(cancelButton);
  
    confirmDialog.appendChild(iconExclamation);
    confirmDialog.appendChild(messageDiv);
    confirmDialog.appendChild(buttonsDiv);
  
    document.body.appendChild(confirmDialog);
  }


function deletePerson(index) {
    
     showCustomConfirm("¿Seguro que quieres borrar esta persona?", function () {
       /* splice es un método en JavaScript que se utiliza para modificar el contenido de un array eliminando o reemplazando elementos existentes y/o   agregando nuevos elementos en su lugar
        En este caso elimino 1 elemento desde el índice  */ 
        people.splice(index, 1);
        displayPeople();
      });
          
    //Version usando window.confirm
    // Utilizamos window.confirm para mostrar un mensaje de confirmación
    // const confirmDelete = window.confirm("¿Seguro que quieres borrar esta persona?");
    /* if(confirmDelete){
        people.splice(index, 1);
        displayPeople();
    } */
}


function editPerson(event) {
    //pongo a true el booleano para saber que estoy editando
    isEditing = true;

    //asignamos el valor a la variable global index.
    //para acceder al valor del atributo data-index tenemos 2 maneras
    //1-event.target.getAttribute('data-index'):  accede al valor del atributo data-index del elemento que desencadenó el evento.
    //2-event.target.dataset.index : event.target es el mismo elemento de origen del evento y
    //dataset es una propiedad de los elementos DOM que proporciona acceso a todos los atributos de datos (data-*).
    index = event.target.dataset.index;

    //guardo en person el objeto del array que queremos editar
    const person = people[index];

    //Dejo los valores en las input
    nameInput.value = person.name;
    ageInput.value = person.age;

   //Cambio el texto del botón
    document.querySelector("button[type='submit']").innerText = "Guardar cambios";  
}


function actualizarPersona() {

    // Actualizar la persona en el arreglo
    const name = document.querySelector('#nameInput').value;
    const age = document.querySelector('#ageInput').value;
    const person = {name, age};
    people[index] = person;

    // Actualizar la tabla y resetear el formulario
    displayPeople();
    document.querySelector("form").reset();
}