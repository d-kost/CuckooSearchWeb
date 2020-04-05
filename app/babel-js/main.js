'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function execute(f, iterations, probability, nest_number) {
    var limit_x1 = f.limit_x1;
    var limit_x2 = f.limit_x2;

    var func = f.func;

    var nests = initNests(limit_x1, limit_x2, nest_number);
    var cuckoo = getUniformCoord(limit_x1, limit_x2);

    var best = findBestSolution(func, nests);

    for (var i = 0; i < iterations; i++) {

        nests = process_iteration(func, nests, cuckoo, probability, limit_x1, limit_x2);
        var temp = findBestSolution(func, nests);
        if (temp < best) {
            best = temp;
        }
    }

    var value = func(best);
    setSolution(best, value);

    var size = 200;
    var step_number = 200;
    plotFunction(func, limit_x1, limit_x2, size, step_number, best.concat(value));

    setInfo({
        x1: limit_x1,
        x2: limit_x2,
        'Number of iterations': iterations,
        Probability: probability,
        'Number of nests': nest_number
    });
}

function initNests(limit_x1, limit_x2, nest_number) {
    var nests = [];
    for (var i = 0; i < nest_number; i++) {
        nests[i] = getUniformCoord(limit_x1, limit_x2);
    }
    return nests;
}

function getUniformCoord(limit_x1, limit_x2) {
    return [Math.random() * (limit_x1[1] - limit_x1[0]) + limit_x1[0], Math.random() * (limit_x2[1] - limit_x2[0]) + limit_x2[0]];
}

function findBestSolution(func, nests) {
    var best = nests[0];

    nests.forEach(function (nest) {
        if (func(nest) < func(best)) {
            best = nest;
        }
    });
    return best;
}

function process_iteration(func, nests, cuckoo, probability, l_x1, l_x2) {
    var index = Math.floor(Math.random() * nests.length);

    if (func(cuckoo) < func(nests[index])) {
        nests[index] = cuckoo;
    }

    var worst_nests = findWorstNests(func, nests);
    worst_nests.forEach(function (nest) {
        var p = Math.random();
        if (p < probability) {
            nest = getUniformCoord(l_x1, l_x2);
        }
    });
    return nests;
}

function findWorstNests(func, nests) {
    var temp_arr = nests.map(function (nest, i) {
        return [func(nest), i];
    });

    temp_arr.sort(function (a, b) {
        return b[0] - a[0];
    });

    temp_arr.length = nests.length / 2;
    return temp_arr;
}
function onContentLoaded() {
    setFunctionToSelect(library);

    applySelectedFucntion();

    document.querySelector('.choose-function__button').addEventListener('click', selectButtonClick);
}

function selectButtonClick() {
    applySelectedFucntion();
}

function applySelectedFucntion() {

    var selected_name = getSelectedOption();
    var f = getFunctionByName(selected_name);
    if (f) {
        execute(f, 100, 0.5, 20);
    }
}

function setFunctionToSelect(lib) {
    var select = document.querySelector('.choose-function__select');

    var selected = true;
    for (var key in lib) {
        if (lib.hasOwnProperty(key)) {
            var element = lib[key];

            select.append(createOption(element.name, selected));
            selected = false;
        }
    }
}

function createOption(text, selected) {
    var option = document.createElement('option');
    option.textContent = text;
    option.value = text;
    if (selected) {
        option.setAttribute('selected', 'selected');
    }
    return option;
}

function getSelectedOption() {
    var select = document.querySelector('.choose-function__select');
    return select.options[select.selectedIndex].value;
}

document.addEventListener('DOMContentLoaded', onContentLoaded);

var library = {
    mccormick: {
        name: 'McCormick function',
        limit_x1: [-4, 4],
        limit_x2: [-4, 4],
        func: function func(x) {
            return Math.sin(x[0] + x[1]) + Math.pow(x[0] - x[1], 2) - 1.5 * x[0] * 2.5 * x[1] + 1;
        }
    },

    goldstein_price: {
        name: 'Goldstein-Price function',
        limit_x1: [-2, 2],
        limit_x2: [-2, 2],
        func: function func(x) {
            var first_part = 1 + Math.pow(x[0] + x[1] + 1, 2) * (19 - 14 * x[0] + 3 * x[0] * x[0] - 14 * x[1] + 6 * x[0] * x[1] + 3 * x[1] * x[1]);
            var second_part = 30 + Math.pow(2 * x[0] - 3 * x[1], 2) * (18 - 32 * x[0] + 12 * x[0] * x[0] + 48 * x[1] - 36 * x[0] * x[1] + 27 * x[1] * x[1]);
            return first_part * second_part;
        }
    },

    schwefel_two_dimensional: {
        name: 'Schwefel function',
        limit_x1: [-500, 500],
        limit_x2: [-500, 500],
        func: function func(x) {
            return 418.9829 * 2 - (x[0] * Math.sin(Math.sqrt(Math.abs(x[0]))) + x[1] * Math.sin(Math.sqrt(Math.abs(x[1]))));
        }
    },

    rosenbrock_two_dimensional: {
        name: 'Rosenbrock function',
        limit_x1: [-10, 10],
        limit_x2: [-6, 6],
        func: function func(x) {
            return 100 * Math.pow(x[1] - x[0] * x[0], 2) + Math.pow(x[0] - 1, 2);
        }
    },

    bukin: {
        name: 'Bukin function N.6',
        limit_x1: [-15, -5],
        limit_x2: [-3, 3],
        func: function func(x) {
            return 100 * Math.sqrt(Math.abs(x[1] - 0.01 * x[0] * x[0])) + 0.01 * Math.abs(x[0] + 10);
        }
    },

    cross_in_tray: {
        name: 'Cross-in-Tray function',
        limit_x1: [-10, 10],
        limit_x2: [-10, 10],
        func: function func(x) {
            var exp_entry = Math.abs(100 - Math.sqrt(x[0] * x[0] + x[1] * x[1]) / Math.PI);
            var part = Math.sin(x[0]) * Math.sin(x[1]) * Math.exp(exp_entry);

            return -0.0001 * Math.pow(Math.abs(part) + 1, 0.1);
        }
    },

    drop_wave: {
        name: 'Drop-Wave function',
        limit_x1: [-5.12, 5.12],
        limit_x2: [-5.12, 5.12],
        func: function func(x) {
            var first_part = 1 + Math.cos(12 * Math.sqrt(x[0] * x[0] + x[1] * x[1]));
            var second_part = 0.5 * (x[0] * x[0] + x[1] * x[1]) + 2;
            return -(first_part / second_part);
        }
    },

    eggholder: {
        name: 'Eggholder function',
        limit_x1: [-600, 600],
        limit_x2: [-600, 600],
        func: function func(x) {
            var first_part = Math.sin(Math.sqrt(Math.abs(x[1] + x[0] / 2 + 47)));
            var second_part = x[0] * Math.sin(Math.sqrt(Math.abs(x[0] - (x[1] + 47))));

            return -(x[1] + 47) * first_part - second_part;
        }
    },

    booth: {
        name: 'Booth function',
        limit_x1: [-10, 10],
        limit_x2: [-10, 10],
        func: function func(x) {
            return Math.pow(x[0] + 2 * x[1] - 7, 2) + Math.pow(2 * x[0] + x[1] - 5, 2);
        }
    }
};

function getFunctionByName(name) {
    for (var key in library) {
        if (library.hasOwnProperty(key)) {
            var element = library[key];
            if (element.name == name) {
                return element;
            }
        }
    }
    return null;
}
function plotFunction(func, limit_x1, limit_x2, size, step_number, best_coord) {

    var plot_holder = document.getElementById('plot-holder');
    var x1 = [],
        x2 = [],
        z = [];

    var _createCoordForSurfac = createCoordForSurface(func, limit_x1, limit_x2, size, step_number);

    var _createCoordForSurfac2 = _slicedToArray(_createCoordForSurfac, 3);

    x1 = _createCoordForSurfac2[0];
    x2 = _createCoordForSurfac2[1];
    z = _createCoordForSurfac2[2];


    var data = [{
        z: z,
        x: x1,
        y: x2,
        type: 'surface',
        colorscale: 'Jet'
    }, {
        z: [best_coord[2]],
        x: [best_coord[0]],
        y: [best_coord[1]],
        mode: 'markers',
        marker: {
            color: 'rgb(0, 0, 0)',
            size: 8,
            symbol: 'circle'
        },
        type: 'scatter3d'
    }];

    var layot = {
        title: "Func",
        scene: {
            xaxis: { title: 'x1' },
            yaxis: { title: 'x2' },
            zaxis: { title: 'f(x1, x2)' }
        },
        autosize: false,
        width: 500,
        height: 500,
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        }
    };

    var config = {
        responsive: true
    };

    Plotly.newPlot(plot_holder, data, layot, config);
}

function createCoordForSurface(func, limit_x1, limit_x2, size, step_number) {
    var z = [];

    var _getXCoord = getXCoord(limit_x1, limit_x2, size, step_number),
        _getXCoord2 = _slicedToArray(_getXCoord, 2),
        x1 = _getXCoord2[0],
        x2 = _getXCoord2[1];

    for (var i = 0; i < size; i++) {
        z[i] = [];
        for (var j = 0; j < step_number; j++) {
            z[i].push(func([x1[i][j], x2[i][j]]));
        }
    }

    return [x1, x2, z];
}

function getXCoord(l_x1, l_x2, row_number, step_number) {
    var x1_coord = [];
    var x2_coord = [];

    var step_x1 = (l_x1[1] - l_x1[0]) / (step_number - 1);
    var step_x2 = (l_x2[1] - l_x2[0]) / (row_number - 1);

    for (var i = 0; i < row_number; i++) {

        var temp_x1 = [];
        var temp_x2 = [];

        for (var j = 0; j < step_number; j++) {
            temp_x1.push(l_x1[0] + j * step_x1);
            temp_x2.push(l_x2[0] + i * step_x2);
        }

        x1_coord.push(temp_x1);
        x2_coord.push(temp_x2);
    }

    return [x1_coord, x2_coord];
}
function setInfo(object) {
    var info_list = document.querySelector('.info-list');
    info_list.innerHTML = '';

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var element = object[key];

            if (key == 'x1' || key == 'x2') {
                element = '[' + element + ']';
            }
            info_list.append(createItem(key, element));
        }
    }
}

function setSolution(coord, value) {
    var result = document.querySelector('.results__coord');
    result.textContent = '[' + coord + ']';
    document.querySelector('.results__value').textContent = value;
}

function createItem(title, text) {
    var li = document.createElement('li');
    li.className = 'info-list__item';

    var span = document.createElement('span');
    span.className = 'info-list__title';
    span.textContent = title + ': ';
    li.append(span);

    li.append(text);

    return li;
}