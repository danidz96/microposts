import { http } from "./http";
import { ui } from "./ui";

// Obtener posts cuando cargue el DOM
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}