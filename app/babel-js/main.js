'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var lower_x1 = -15;
var upper_x1 = -5;
var lower_x2 = -3;
var upper_x2 = 3;

var f = library.booth.func;
execute(f, [lower_x1, upper_x1], [lower_x2, upper_x2], 100, 0.5, 20);

function execute(func, limit_x1, limit_x2, iterations, probability, nest_number) {

    nests = initNests(limit_x1, limit_x2, nest_number);
    cuckoo = getUniformCoord(limit_x1, limit_x2);

    var best = findBestSolution(func, nests);

    for (var i = 0; i < iterations; i++) {

        nests = process_iteration(func, nests, probability, limit_x1, limit_x2);
        var temp = findBestSolution(func, nests);
        if (temp < best) {
            best = temp;
        }
    }

    var value = func(best);

    console.log('best', best);
    console.log('func', value);

    setSolution(best, value);

    var size = 200;
    var step_number = 200;
    plotFunction(func, limit_x1, limit_x2, size, step_number, best.concat(value));

    setInfo({
        Function: func,
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

function process_iteration(func, nests, probability, l_x1, l_x2) {
    var index = Math.floor(Math.random() * nests.length);

    if (func(cuckoo) < func(nests[index])) {
        nests[index] = cuckoo;
    }

    worst_nests = findWorstNests(func, nests);
    worst_nests.forEach(function (nest) {
        var p = Math.random();
        if (p < probability) {
            nests[nest[1]] = getUniformCoord(l_x1, l_x2);
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

// function bukin(x) {
//     return 100*Math.sqrt(Math.abs(x[1]-0.01*x[0]*x[0])) + 0.01*Math.abs(x[0] + 10)
// }
var library = {
    mccormick: {
        show: 'sin(x1 + x2) + (x1 - x2)^2 = 1.5x1 + 2.5x2 + 1',
        func: function func(x) {
            return Math.sin(x[0] + x[1]) + Math.pow(x[0] - x[1], 2) - 1.5 * x[0] * 2.5 * x[1] + 1;
        }
    },

    goldstein_price: {
        show: '[1 + (x1 + x2 + 1)^2 * (19 - 14x1 + 3x1^2 - 14x2 + 6x1x2 ' + '+ 3x2^2)] * [30 + (2x1 - 3x2)^2 * (18 - 32x1 + 12x1^2 + 48x2 - ' + '36x1x2 + 27x2^2)]',
        func: function func(x) {
            var first_part = 1 + Math.pow(x[0] + x[1] + 1, 2) * (19 - 14 * x[0] + 3 * x[0] * x[0] - 14 * x[1] + 6 * x[0] * x[1] + 3 * x[1] * x[1]);
            var second_part = 30 + Math.pow(2 * x[0] - 3 * x[1], 2) * (18 - 32 * x[0] + 12 * x[0] * x[0] + 48 * x[1] - 36 * x[0] * x[1] + 27 * x[1] * x[1]);
            return first_part * second_part;
        }
    },

    schwefel_two_dimensional: {
        show: '418.9829*2 - (x1*sin(sqrt(abs(x1))) + x2*sin(sqrt(abs(x2))))',
        func: function func(x) {
            return 418.9829 * 2 - (x[0] * Math.sin(Math.sqrt(Math.abs(x[0]))) + x[1] * Math.sin(Math.sqrt(Math.abs(x[1]))));
        }
    },

    rosenbrock_two_dimensional: {
        show: '[100*(x2 - x1^2)^2 + (x1 - 1)^2]',
        func: function func(x) {
            return 100 * Math.pow(x[1] - x[0] * x[0], 2) + Math.pow(x[0] - 1, 2);
        }
    },

    bukin: {
        show: '100*sqrt(abs(x2 - 0.01x1^2)) + 0.01 * abs(x1 + 10)',
        func: function func(x) {
            return 100 * Math.sqrt(Math.abs(x[1] - 0.01 * x[0] * x[0])) + 0.01 * Math.abs(x[0] + 10);
        }
    },

    cross_in_tray: {
        show: '-0.0001 * ( abs( sin(x1)sin(x2)exp( abs(100 - (sqrt( x1^2 + x2^2 )) / PI) ) ) + 1 )^(0.1)',
        func: function func(x) {
            var exp_entry = Math.abs(100 - Math.sqrt(x[0] * x[0] + x[1] * x[1]) / Math.PI);
            var part = Math.sin(x[0]) * Math.sin(x[1]) * Math.exp(exp_entry);

            return -0.0001 * Math.pow(Math.abs(part) + 1, 0.1);
        }
    },

    drop_wave: {
        show: '- ( 1 + cos( 12 * sqrt(x1^2 + x2^2) ) ) / ( 0.5 * (x1^2 + x2^2) + 2 )',
        func: function func(x) {
            var first_part = 1 + Math.cos(12 * Math.sqrt(x[0] * x[0] + x[1] * x[1]));
            var second_part = 0.5 * (x[0] * x[0] + x[1] * x[1]) + 2;
            return -(first_part / second_part);
        }
    },

    eggholder: {
        show: '',
        func: function func(x) {
            var first_part = Math.sin(Math.sqrt(Math.abs(x[1] + x[0] / 2 + 47)));
            var second_part = x[0] * Math.sin(Math.sqrt(Math.abs(x[0] - (x[1] + 47))));

            return -(x[1] + 47) * first_part - second_part;
        }
    },

    booth: {
        show: '',
        func: function func(x) {
            return Math.pow(x[0] + 2 * x[1] - 7, 2) + Math.pow(2 * x[0] + x[1] - 5, 2);
        }
    }

};
function plotFunction(func, limit_x1, limit_x2, size, step_number, best_coord) {
    console.log('sdgzdg', best_coord);

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

    // console.log('x1', x1);
    // console.log('x2', x2);
    // console.log('z', z);
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
    // document.querySelector('#function').append(object[func]);
    // document.querySelector('#limit_x1').append(object[func]);
    // document.querySelector('#limit_x2').append(object[func]);
    // document.querySelector('#probability').append(object[func]);
    // document.querySelector('#iterations').append(object[func]);
    // document.querySelector('#nests').append(object[func]);
    // func, limit_x1, limit_x2, iterations, probability, nest_number

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
    document.querySelector('.results__coord').append('[' + coord + ']');
    document.querySelector('.results__value').append(value);
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