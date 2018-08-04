import { http } from "./http";
import { ui } from "./ui";

// Obtener posts cuando cargue el DOM
document.addEventListener('DOMContentLoaded', getPosts);

// Evento para añadir un post
document.querySelector('.post-submit').addEventListener('click', submitPost);

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
            getPosts();
        })
        .catch(err => console.log(err));
}