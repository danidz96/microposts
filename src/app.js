import { http } from "./http";
import { ui } from "./ui";

// Obtener posts cuando cargue el DOM
document.addEventListener('DOMContentLoaded', getPosts);

// Evento para añadir un post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Evento para eliminar un post
document.querySelector('#posts').addEventListener('click', deletePost);

// Evento para entrar en estado de edición
document.querySelector('#posts').addEventListener('click', enableEdit);

// Evento para cancelar el estado de edición
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Obtener posts
function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Enviar post
function submitPost(post) {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data = {
        title,
        body
    }
    
    // Validar los inputs
    if (title === '' || body === '') {
        ui.showAlert('Por favor rellena todos los campos', 'alert alert-danger')
    } else {
    
        // Comprobar la id
        if (id === '') {
            
            // Crear Post
            http.post('http://localhost:3000/posts', data)
                .then(data => {
                    ui.showAlert('Se ha eviado correctamente',  'alert alert-success');
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err));
        } else {
            // Actualizar el post
            http.put(`http://localhost:3000/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Actualizado correctamente', 'alert alert-success');
                    ui.changeFromState('add');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }
}

// Eliminar post
function deletePost(e) {
    if(e.target.parentElement.classList.contains('delete')) {
      const id = e.target.parentElement.dataset.id;
      if(confirm('Estás seguro?')) {
        http.delete(`http://localhost:3000/posts/${id}`)
          .then(data => {
            ui.showAlert('Post eliminado', 'alert alert-success');
            getPosts();
          })
          .catch(err => console.log(err));
      }
    }
    e.preventDefault();
}

// Habilitar edición
function enableEdit(e) {
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }

        // Rellenar el formulario con el post seleccionado
        ui.fillForm(data);

        // Ir al princio de la página
        window.scrollTo(0, 0);
    }
    
    e.preventDefault();
}

// Salir del modo edición
function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFromState('add');
    }

    e.preventDefault();
}