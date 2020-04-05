function execute(f, iterations, probability, nest_number) {
    let limit_x1 = f.limit_x1;
    let limit_x2 = f.limit_x2;

    let func = f.func
    
    let nests = initNests(limit_x1, limit_x2, nest_number);
    let cuckoo = getUniformCoord(limit_x1, limit_x2);

    let best = findBestSolution(func, nests);

    for (let i = 0; i < iterations; i++) {

        nests = process_iteration(func, nests, cuckoo, probability, limit_x1, limit_x2);
        let temp = findBestSolution(func, nests);
        if (temp < best) {
            best = temp;
        }
    }

    let value = func(best);
    setSolution(best, value);

    let size = 200;
    let step_number = 200;
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
    let nests = []
    for (let i = 0; i < nest_number; i++) {
        nests[i] = getUniformCoord(limit_x1, limit_x2)
    }
    return nests
}


function getUniformCoord(limit_x1, limit_x2) {
    return [Math.random()*(limit_x1[1] - limit_x1[0]) + limit_x1[0], 
        Math.random()*(limit_x2[1] - limit_x2[0]) + limit_x2[0]]
}


function findBestSolution(func, nests) {
    let best = nests[0];

    nests.forEach( nest => {
        if (func(nest) < func(best)) {
            best = nest;
        } 
    }) 
    return best;
}


function process_iteration(func, nests, cuckoo, probability, l_x1, l_x2) {
    let index = Math.floor(Math.random()*nests.length);
        
    if (func(cuckoo) < func(nests[index])) {
        nests[index] = cuckoo;    
    }

    let worst_nests = findWorstNests(func, nests);
    worst_nests.forEach( nest => {
        let p = Math.random();
        if (p < probability) {          
            nest = getUniformCoord(l_x1, l_x2);
        }
    })
    return nests;
}


function findWorstNests(func, nests) {
    let temp_arr = nests.map( (nest, i) => [func(nest), i]);

    temp_arr.sort((a, b) => {
        return b[0] - a[0];
    });
     
    temp_arr.length = nests.length / 2;  
    return temp_arr; 
}