class UI {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('#postSubmit');
        this.forState = 'add';
    }

    showPosts(posts) {
        let output = '';

        posts.forEach(post => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text lead">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>
                        <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
                    </div>
                </div>
            `;
        });

        this.posts.innerHTML = output;
    }

    showAlert(message, className){
        this.clearAlert();

        // Añadir alerta
        let html = `
            <div class="${className}">
            <strong>Hecho!</strong> ${message}.
            </div>
        `;

        document.querySelector('.postContainer').insertAdjacentHTML('beforebegin', html);

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove()
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
}

export const ui = new UI;