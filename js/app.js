// Variables
const selectMarca = document.querySelector('#marca');
const selectYear = document.querySelector('#year');
const selectMinimo = document.querySelector('#minimo');
const selectMaximo = document.querySelector('#maximo');
const selectPuertas = document.querySelector('#puertas');
const selectTransmision = document.querySelector('#transmision');
const selectColor = document.querySelector('#color');

const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '', 
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}


// Eventos 
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los automoviles al cargar

    // Llena las opciones de años
    LlenarSelect();
});

// Event listener para los select de busqueda
selectMarca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

selectYear.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

selectMinimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtrarAuto();
});

selectMaximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtrarAuto();
});

selectPuertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

selectTransmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

selectColor.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

// Funciones
function mostrarAutos( autos ) {
    limpiarHTML();

    autos.forEach( auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;

        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color} 
        `

        resultado.appendChild( autoHTML );
    });
}

function limpiarHTML() {
    while( resultado.firstChild ) {
        resultado.removeChild(resultado.firstChild);
    }
}

function LlenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('OPTION');
        opcion.value = i;
        opcion.textContent = i;
        selectYear.appendChild(opcion);
    }
}

// Filtrar en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTrasmision).filter(filtrarColor);

    if( resultado.length ) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado, intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado)
}

function filtrarMarca( auto ) {
    if( datosBusqueda.marca ) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear( auto ) {
    if( datosBusqueda.year ) {
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function filtrarMinimo( auto ) {
    if( datosBusqueda.minimo ) {
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}

function filtrarMaximo( auto ) {
    if( datosBusqueda.maximo ) {
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}

function filtrarPuertas( auto ) {
    if( datosBusqueda.puertas ) {
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTrasmision( auto ) {
    if( datosBusqueda.transmision ) {
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor( auto ) {
    if( datosBusqueda.color ) {
        return auto.color === datosBusqueda.color;
    }
    return auto;
}