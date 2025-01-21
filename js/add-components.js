function AddComponents(){
    let componentsWrappers = document.querySelectorAll('[data-include]');
    componentsWrappers.forEach((element) => {
            fetch(element.dataset['include'])
            .then(response => {
                return response.text();
            })
            .then(data => {
                    element.insertAdjacentHTML('beforeend', data);
            })
    });
}

AddComponents();
