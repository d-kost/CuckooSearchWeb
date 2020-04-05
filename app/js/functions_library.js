let library = {
    mccormick: {
        name: 'McCormick function',
        limit_x1: [-4, 4],
        limit_x2: [-4, 4],
        func: x => {
            return Math.sin(x[0] + x[1]) + Math.pow((x[0] - x[1]), 2) - 1.5*x[0] + 2.5*x[1] + 1;
        }
    },

    goldstein_price: {
        name: 'Goldstein-Price function',
        limit_x1: [-2, 2],
        limit_x2: [-2, 2],
        func: x => {
            let first_part = 1 + Math.pow((x[0] + x[1] + 1), 2) * (19 - 14*x[0] + 3*x[0]*x[0] - 14*x[1] + 6*x[0]*x[1] + 3*x[1]*x[1]);
            let second_part = 30 + Math.pow((2*x[0] - 3*x[1]), 2) * (18 - 32*x[0] + 12*x[0]*x[0] + 48*x[1] - 36*x[0]*x[1] + 27*x[1]*x[1]);
            return first_part * second_part;
        }
    },

    schwefel_two_dimensional: {
        name: 'Schwefel function',
        limit_x1: [-500, 500],
        limit_x2: [-500, 500],
        func: x => {
            return 418.9829*2 - (x[0]*Math.sin(Math.sqrt(Math.abs(x[0]))) + x[1]*Math.sin(Math.sqrt(Math.abs(x[1]))));
        }
    },

    rosenbrock_two_dimensional: {
        name: 'Rosenbrock function',
        limit_x1: [-10, 10],
        limit_x2: [-6, 6],
        func: x => {
            return (100 * Math.pow((x[1] - x[0]*x[0]), 2) + Math.pow((x[0] - 1), 2));
        }
    },

    bukin: {
        name: 'Bukin function N.6',
        limit_x1: [-15, -5],
        limit_x2: [-3, 3],
        func: x => {
            return 100 * Math.sqrt(Math.abs(x[1] - 0.01 * x[0]*x[0])) + 0.01*Math.abs(x[0] + 10);
        }
    },

    cross_in_tray: {
        name: 'Cross-in-Tray function',
        limit_x1: [-10, 10],
        limit_x2: [-10, 10],
        func: x => {
            let exp_entry = Math.abs(100 - (Math.sqrt(x[0]*x[0] + x[1]*x[1]) / Math.PI));
            let part = Math.sin(x[0]) * Math.sin(x[1]) * Math.exp(exp_entry);

            return -0.0001 * Math.pow((Math.abs(part)+1), 0.1);
        }
    },

    drop_wave: {
        name: 'Drop-Wave function',
        limit_x1: [-5.12, 5.12],
        limit_x2: [-5.12, 5.12],
        func: x => {
            let first_part = 1 + Math.cos(12 * Math.sqrt(x[0]*x[0] + x[1]*x[1]));
            let second_part = 0.5 * (x[0]*x[0] + x[1]*x[1]) + 2;
            return - (first_part / second_part);
        }
    },

    eggholder: {
        name: 'Eggholder function',
        limit_x1: [-600, 600],
        limit_x2: [-600, 600],
        func: x => {
            let first_part = Math.sin(Math.sqrt(Math.abs(x[1] + x[0]/2 + 47)));
            let second_part = x[0] * Math.sin(Math.sqrt(Math.abs(x[0] - (x[1] + 47))));

            return -(x[1]+47) * first_part - second_part;
        }
    },

    booth: {
        name: 'Booth function',
        limit_x1: [-10, 10],
        limit_x2: [-10, 10],
        func: x => {
            return Math.pow((x[0] + 2*x[1] - 7), 2) + Math.pow((2*x[0] + x[1] - 5), 2)
        }
    }
}

function getFunctionByName(name) {
    for (const key in library) {
        if (library.hasOwnProperty(key)) {
            const element = library[key];
            if (element.name == name) {
                return element;
            }
       
        }
    }
    return null;
}