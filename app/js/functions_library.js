let library = {
    mccormick: {
        show: 'sin(x1 + x2) + (x1 - x2)^2 = 1.5x1 + 2.5x2 + 1',
        func: x => {
            return Math.sin(x[0] + x[1]) + Math.pow((x[0] - x[1]), 2) - 1.5*x[0] * 2.5*x[1] + 1;
        }
    },

    goldstein_price: {
        show: '[1 + (x1 + x2 + 1)^2 * (19 - 14x1 + 3x1^2 - 14x2 + 6x1x2 ' + 
        '+ 3x2^2)] * [30 + (2x1 - 3x2)^2 * (18 - 32x1 + 12x1^2 + 48x2 - ' +
        '36x1x2 + 27x2^2)]',
        func: x => {
            let first_part = 1 + Math.pow((x[0] + x[1] + 1), 2) * (19 - 14*x[0] + 3*x[0]*x[0] - 14*x[1] + 6*x[0]*x[1] + 3*x[1]*x[1]);
            let second_part = 30 + Math.pow((2*x[0] - 3*x[1]), 2) * (18 - 32*x[0] + 12*x[0]*x[0] + 48*x[1] - 36*x[0]*x[1] + 27*x[1]*x[1]);
            return first_part * second_part;
        }
    },

    schwefel_two_dimensional: {
        show: '418.9829*2 - (x1*sin(sqrt(abs(x1))) + x2*sin(sqrt(abs(x2))))',
        func: x => {
            return 418.9829*2 - (x[0]*Math.sin(Math.sqrt(Math.abs(x[0]))) + x[1]*Math.sin(Math.sqrt(Math.abs(x[1]))));
        }
    },

    rosenbrock_two_dimensional: {
        show: '[100*(x2 - x1^2)^2 + (x1 - 1)^2]',
        func: x => {
            return (100 * Math.pow((x[1] - x[0]*x[0]), 2) + Math.pow((x[0] - 1), 2));
        }
    },

    bukin: {
        show: '100*sqrt(abs(x2 - 0.01x1^2)) + 0.01 * abs(x1 + 10)',
        func: x => {
            return 100 * Math.sqrt(Math.abs(x[1] - 0.01 * x[0]*x[0])) + 0.01*Math.abs(x[0] + 10);
        }
    },

    cross_in_tray: {
        show: '-0.0001 * ( abs( sin(x1)sin(x2)exp( abs(100 - (sqrt( x1^2 + x2^2 )) / PI) ) ) + 1 )^(0.1)',
        func: x => {
            let exp_entry = Math.abs(100 - (Math.sqrt(x[0]*x[0] + x[1]*x[1]) / Math.PI));
            let part = Math.sin(x[0]) * Math.sin(x[1]) * Math.exp(exp_entry);

            return -0.0001 * Math.pow((Math.abs(part)+1), 0.1);
        }
    },

    drop_wave: {
        show: '- ( 1 + cos( 12 * sqrt(x1^2 + x2^2) ) ) / ( 0.5 * (x1^2 + x2^2) + 2 )',
        func: x => {
            let first_part = 1 + Math.cos(12 * Math.sqrt(x[0]*x[0] + x[1]*x[1]));
            let second_part = 0.5 * (x[0]*x[0] + x[1]*x[1]) + 2;
            return - (first_part / second_part);
        }
    },

    eggholder: {
        show: '',
        func: x => {
            let first_part = Math.sin(Math.sqrt(Math.abs(x[1] + x[0]/2 + 47)));
            let second_part = x[0] * Math.sin(Math.sqrt(Math.abs(x[0] - (x[1] + 47))));

            return -(x[1]+47) * first_part - second_part;
        }
    },

    booth: {
        show: '',
        func: x => {
            return Math.pow((x[0] + 2*x[1] - 7), 2) + Math.pow((2*x[0] + x[1] - 5), 2)
        }
    }
    
}