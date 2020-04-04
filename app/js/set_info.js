function setInfo(object) {
    let info_list = document.querySelector('.info-list');
    // document.querySelector('#function').append(object[func]);
    // document.querySelector('#limit_x1').append(object[func]);
    // document.querySelector('#limit_x2').append(object[func]);
    // document.querySelector('#probability').append(object[func]);
    // document.querySelector('#iterations').append(object[func]);
    // document.querySelector('#nests').append(object[func]);
    // func, limit_x1, limit_x2, iterations, probability, nest_number

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
    document.querySelector('.results__coord').append(`[${coord}]`);
    document.querySelector('.results__value').append(value);
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