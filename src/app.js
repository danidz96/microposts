import { http } from "./http";
import { ui } from "./ui";

// Obtener posts cuando cargue el DOM
document.addEventListener('DOMContentLoaded', getPosts);

// Evento para añadir un post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Evento para eliminar un post
document.querySelector('#posts').addEventListener('click', deletePost);

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
    
    const data = {
        title,
        body
    }

    // Crear post
    http.post('http://localhost:3000/posts', data)
        .then(data => {
            ui.showAlert('Se ha eviado correctamente',  'alert alert-success');
            ui.clearFields();
            getPosts();
        })
        .catch(err => console.log(err));
}

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