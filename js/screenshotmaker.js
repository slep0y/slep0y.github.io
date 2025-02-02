// ! SCREENSHOT MAKER ************************
if(document.querySelector('.screenshot-block')){
    let screenWidth = document.querySelector('#screenWidth');
    let screenShotFileWidth = document.querySelector('#screenShotFileWidth');
    let fileFormat = document.querySelector('#fileFormat');
    let urlOfSiteToScreen = document.querySelector('#urlOfSiteToScreen');
    let screenshotButton = document.querySelector('.screenshot-button');

    screenshotButton.onclick = getScreenOnButtonClick;

    function getScreenOnButtonClick(){
        if(urlOfSiteToScreen.value != ''){
            let url = 'https://mini.s-shot.ru/';
            url += screenWidth.value!=''?screenWidth.value:'1024';
            url += '/';
            url += screenShotFileWidth.value!=''?screenShotFileWidth.value:'600';
            url += '/';
            url += fileFormat.value;
            url += '/?';
            url += urlOfSiteToScreen.value;
            window.open(url, '_blank');
        }else{
            alert('Введите запрос');
        }
    }
}
// http://mini.s-shot.ru/1024/400/png/?http://www.site.ru