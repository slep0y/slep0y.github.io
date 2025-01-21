function AddComponents(){
    let componentsWrappers = document.querySelectorAll('[data-include]');
    let scriptBlocks = document.querySelectorAll('[src="js/add-components.js"]');
    componentsWrappers.forEach((element) => {
            fetch(element.dataset['include'])
            .then(response => {
                return response.text();
            })
            .then(data => {
                element.insertAdjacentHTML('beforeend', data);
                element.removeAttribute('data-include');

                scriptBlocks.forEach((el)=>{
                    el.remove();
                });

                AddComponents = undefined;
            })
    });
}

AddComponents();
