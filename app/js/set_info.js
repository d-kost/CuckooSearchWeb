function setInfo(object) {
    let info_list = document.querySelector('.info-list');
    info_list.innerHTML = '';

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            let element = object[key];

            if (key == 'x1' || key == 'x2') {
                element = `[${element}]`;
            }
            info_list.append(createItem(key, element));
            
        }
    }

}

function setSolution(coord, value) {
    let result = document.querySelector('.results__coord');
    result.textContent = `[${coord}]`;
    document.querySelector('.results__value').textContent = value;
}

function createItem(title, text) {
    let li = document.createElement('li');
    li.className = 'info-list__item';

    let span = document.createElement('span');
    span.className = 'info-list__title';
    span.textContent = `${title}: `;
    li.append(span);

    li.append(text);

    return li;
}