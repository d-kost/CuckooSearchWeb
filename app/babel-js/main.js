'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var lower_x1 = -15;
var upper_x1 = -5;
var lower_x2 = -3;
var upper_x2 = 3;
execute(bukin, [lower_x1, upper_x1], [lower_x2, upper_x2], 100, 0.5, 20);

function execute(func, limit_x1, limit_x2, iterations, probability, nest_number) {

    nests = initNests(limit_x1, limit_x2, nest_number);
    cuckoo = getUniformCoord(limit_x1, limit_x2);

    var best = findBestSolution(func, nests);

    for (var i = 0; i < iterations; i++) {

        nests = process_iteration(func, nests, probability, limit_x1, limit_x2);
        best = findBestSolution(func, nests);
    }

    console.log('best', best);
    console.log('func', func(best));

    var size = 500;
    var step_number = 500;
    plotFunction(limit_x1, limit_x2, size, step_number);
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

function bukin(x) {
    return 100 * Math.sqrt(Math.abs(x[1] - 0.01 * x[0] * x[0])) + 0.01 * Math.abs(x[0] + 10);
}
function plotFunction(limit_x1, limit_x2, size, step_number) {

    var plot_holder = document.getElementById('plot-holder');
    var x1 = [],
        x2 = [],
        z = [];

    var _createCoordForSurfac = createCoordForSurface(limit_x1, limit_x2, size, step_number);

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

function createCoordForSurface(limit_x1, limit_x2, size, step_number) {
    var z = [];

    var _getXCoord = getXCoord(limit_x1, limit_x2, size, step_number),
        _getXCoord2 = _slicedToArray(_getXCoord, 2),
        x1 = _getXCoord2[0],
        x2 = _getXCoord2[1];

    for (var i = 0; i < size; i++) {
        z[i] = [];
        for (var j = 0; j < step_number; j++) {
            z[i].push(bukin([x1[i][j], x2[i][j]]));
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