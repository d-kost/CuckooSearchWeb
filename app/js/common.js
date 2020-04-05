function onContentLoaded() {
    setFunctionToSelect(library);
    
    applySelectedFucntion();


    document.querySelector('.choose-function__button').addEventListener('click', selectButtonClick);
}

function selectButtonClick() {
    applySelectedFucntion();
}

function applySelectedFucntion() {

    let selected_name = getSelectedOption();
    let f = getFunctionByName(selected_name);
    if (f) {
        execute(f, 100, 0.5, 20);
    }

}


function setFunctionToSelect(lib) {
    let select = document.querySelector('.choose-function__select');

    let selected = true;
    for (const key in lib) {
        if (lib.hasOwnProperty(key)) {
            const element = lib[key];

            select.append(createOption(element.name, selected));
            selected = false;
        }
    }
}


function createOption(text, selected) {
    let option = document.createElement('option');
    option.textContent = text;
    option.value = text;
    if (selected) {
        option.setAttribute('selected', 'selected');
    }
    return option;
}


function getSelectedOption() {
    let select = document.querySelector('.choose-function__select');
    return select.options[select.selectedIndex].value;
}



document.addEventListener('DOMContentLoaded', onContentLoaded);
