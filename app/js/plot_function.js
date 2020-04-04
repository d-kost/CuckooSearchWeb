function plotFunction(limit_x1, limit_x2, size, step_number) {

    let plot_holder = document.getElementById('plot-holder');
    let x1 = [], x2 = [], z = [];

    [x1, x2, z] = createCoordForSurface(limit_x1, limit_x2, size, step_number);

    let data = [{
        z: z,
        x: x1,
        y: x2,
        type: 'surface',
        colorscale : 'Jet'
    }]

    let layot = {
        title: "Func",
        scene: {
            xaxis: {title: 'x1'},
            yaxis: {title: 'x2'},
            zaxis: {title: 'f(x1, x2)'}
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
    }

    let config = {
        responsive: true
    }

    Plotly.newPlot(plot_holder, data, layot, config)

}

function createCoordForSurface(limit_x1, limit_x2, size, step_number) {
    let z = []
    let [x1, x2] = getXCoord(limit_x1, limit_x2, size, step_number);

    for (let i = 0; i < size; i++) {
        z[i] = [];
        for (let j = 0; j < step_number; j++) {
        z[i].push(bukin([x1[i][j], x2[i][j]]));
        }
    }

    return [x1, x2, z];
    
    // console.log('x1', x1);
    // console.log('x2', x2);
    // console.log('z', z);
}

function getXCoord(l_x1, l_x2, row_number, step_number) {
    let x1_coord = [];
    let x2_coord = [];

    let step_x1 = (l_x1[1] - l_x1[0]) / (step_number - 1);
    let step_x2 = (l_x2[1] - l_x2[0]) / (row_number - 1);

    for(let i = 0; i < row_number; i++) {

        let temp_x1 = []
        let temp_x2 = []

        for (let j = 0; j < step_number; j++) {
        temp_x1.push(l_x1[0] + (j * step_x1));
        temp_x2.push(l_x2[0] + (i * step_x2))
        }

        x1_coord.push(temp_x1);
        x2_coord.push(temp_x2);

    }

    return [x1_coord, x2_coord];
}