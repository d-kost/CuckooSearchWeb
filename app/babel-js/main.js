'use strict';

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