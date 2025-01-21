// ! YANDEX-SEARCH ************************
let searchInput = document.querySelector('.yandex-search');
let searchInSite = document.querySelector('.search-in-site');

let searchButton = document.querySelector('.yandex-search-button');

searchInput.onkeyup = searchCheck;
searchButton.onclick = searchOnButtonClick;

function searchCheck(ev){
    if(ev.key == 'Enter'){
        let url = 'https://yandex.ru/search/?text=' + searchInput.value + ' host:' + searchInSite.value;
        window.open(url, '_blank');
        searchInput.value = '';
    }
}
function searchOnButtonClick(){
    if(searchInput.value != ''){
        let url = 'https://yandex.ru/search/?text=' + searchInput.value + ' host:' + searchInSite.value;
        window.open(url, '_blank');
        searchInput.value = '';
    }else{
        alert('Введите запрос');
    }
}