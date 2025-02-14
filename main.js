//constantes de la logica
let WITDHCANVAS;
const HEIGTHCANVAS = 810
const WIDTHBLOCK = 8;

//variables de la logica
let $canvas
let ctx
let color = 'rgb(226, 31, 31)'
let borrando = false;
let pintando = false;

//elementos del DOM
let $seleccionado = document.querySelector('.seleccionado')
const $menu = document.getElementById('container-menu')
const $optionMenu = document.querySelectorAll('.container-option-menu')
const $borrarButton = document.querySelector('#button-borrar')


const startPosition = (e) => {
    if ($menu.classList.contains("show")) closeMenu();
    pintando = true;
    draw(e); 
};

const endPosition = () => {
    pintando = false;
    ctx.beginPath(); 
};

const draw = (e) => {
    if (!pintando) return; 
    let xClick = e.clientX
    let yClick = e.clientY
    xClick = Math.round(xClick / WIDTHBLOCK) * WIDTHBLOCK
    yClick = Math.round(yClick / WIDTHBLOCK) * WIDTHBLOCK
    ctx.fillStyle = color;
    ctx.fillRect(xClick + 1, yClick + 1, WIDTHBLOCK - 2, WIDTHBLOCK - 2)

};

document.addEventListener('DOMContentLoaded', () => {
    $canvas = document.querySelector('#canvas')
    ctx = $canvas.getContext('2d')
    reiniciar()
})

window.addEventListener('resize', function () {
    reiniciar()
});

function reiniciar() {
    WITDHCANVAS = Math.round(window.innerWidth / WIDTHBLOCK) * WIDTHBLOCK
    $canvas.width = WITDHCANVAS
    mostrarCuadricula();
    cargarEventos();
}

function mostrarCuadricula() {
    ctx.lineWidth = 0.3; 
    ctx.strokeStyle = "black";
    for (let i = 0; i < WITDHCANVAS; i = i + WIDTHBLOCK) {
        for (let j = 0; j < HEIGTHCANVAS; j = j + WIDTHBLOCK) {
            ctx.strokeRect(i, j, WIDTHBLOCK, WIDTHBLOCK);
        }
    }
}

const openMenu = () => {
    $menu.classList.add("show");
    $menu.style.zIndex = 100
}

const closeMenu = () => {
    $menu.classList.remove("show"); 
    setTimeout(() => {
        $menu.style.zIndex = -10
    }, 500)
}

const handleMenu = (option) => {
    if (option == $seleccionado) return
    option.classList.add("seleccionado")
    $seleccionado.classList.remove("seleccionado")
    $seleccionado = option

    switch (option.id) {
        case "1": color = "rgb(226, 31, 31)"
            break;
        case "2": color = "rgb(214, 146, 19)"
            break;
        case "3": color = "rgb(238, 241, 16)"
            break;
        case "4": color = "rgb(9, 221, 45)"
            break;
        case "5": color = "rgb(23, 207, 231)"
            break;
        case "6": color = "rgb(34, 34, 194)"
            break;
        case "7":
            color = "rgb(235, 232, 232)"
            break;
    }
    closeMenu();
}

function cargarEventos() {
    $canvas.addEventListener("mousedown", startPosition);
    $canvas.addEventListener("mouseup", endPosition);
    $canvas.addEventListener("mousemove", draw);

    $canvas.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        openMenu() 
    });

    $optionMenu.forEach((option) => {
        option.addEventListener('click', (e) => {
            handleMenu(option)
        })
    })

    $borrarButton.addEventListener("click", () => {
        reiniciar()
    })
}

