//se inicializa Muuri.

const grid = new Muuri ('.grid', { 
  layout: {
    rounding:false //al ponerlo en false podemos darle valores en porcetaje a las imagenes para ordenarlas en cada row.
  }
}); 

/* al cargar la página, se ejecuta esta función que le añade al elemento con id "grid" la 
clase "loaded", la cual le da opacidad. Así cargan todas las imágenes juntas.*/

window.addEventListener('load', function(){
    grid.refreshItems().layout();
    document.querySelector(".grid").classList.add("loaded");
}); 

// Se depósita en "categorias" un array donde están los links para filtrar las imágenes [Todos, Pinturas, Murales].

const ENLACES = document.querySelectorAll('.categorias a');
const CATEGORIAS = Array.from(ENLACES); // Transforma la nodeList en un Array.

// Se itera para acceder a cada uno de los elementos del array.

for(i=0 ;i < CATEGORIAS.length; i++){
  
  /* al hacer click se ejecuta un función que retira la clase "active" de todos los que la 
  tengan, y la añade solo a la categoria que clickeamos. */

  CATEGORIAS[i].addEventListener('click', function(param){
    param.preventDefault(); // evita que al hacer click en la categoría haga solo scroll para arriba.
    const ACTIVE = document.querySelector('.active'); 
    ACTIVE.classList.remove('active'); 
    param.target.classList.add('active');

    //filtrado de imágenes.
    
    const FILTER = param.target.innerHTML.toLowerCase();
    if(FILTER === "todos"){
      grid.filter("[data-categoria]");
    } else {
      grid.filter(`[data-categoria="${FILTER}"]`);
    } 
  });
}

//OVERLAY AL CLICKEAR IMG

const OVERLAY = document.getElementById('overlay');
const OVERLAY_NODE = document.querySelectorAll('.grid .item img');
const IMG = Array.from(OVERLAY_NODE);

for(i = 0; i < IMG.length ; i++){
  const ROUTE = IMG[i].getAttribute('src'); //Se accede al src de la imagen.
  const DESCRIPTION = IMG[i].parentNode.parentNode.dataset.descripcion; //con parentNode vamos al elemento padre del IMG[i].
  IMG[i].addEventListener('click',function(){
    OVERLAY.classList.add('active');
    document.querySelector("#overlay img").src = ROUTE; //Se coloca el src en la img que pertenece al id overlay.
    document.querySelector("#overlay .descripcion").innerHTML = DESCRIPTION; //se obtiene la descripcion del data-descripcion y se coloca con innerHTML en la etiqueta <p>
  });
}

//CERRAR OVERLAY AL CLICKEAR BOTÓN X

document.querySelector('#closebtn').addEventListener('click',function(){
  OVERLAY.classList.remove('active');
});

//CERRAR OVERLAY AL CLICKEAR EN CUALQUIER LADO DE LA PANTALLA

OVERLAY.addEventListener('click',function(parameter){
  if(parameter.target.id === 'overlay'){ // si clickeamos en la parte que tiene id overlay, que remueva la clase active. La img y el p no tienen esa clase
    OVERLAY.classList.remove('active');
  }
});

//BOTÓN ABRIR MENÚ MOBILE (HAMBURGUESA)

const OPEN_BTN = document.querySelector('.menu .open-menu');
const HIDDEN_MENU = document.querySelector('header .overlay-menu');
OPEN_BTN.addEventListener('click',function(){
  HIDDEN_MENU.style.height = '100%' ;
});

//BOTÓN CERRAR MENÚ MOBILE

const CLOSE_BTN = document.querySelector('header .overlay-content .close-menu-btn');
const OVER_LINKS = document.querySelectorAll('header .overlay-content li a');
const OVERLAY_NAVLINKS = Array.from(OVER_LINKS);

CLOSE_BTN.addEventListener('click',function(){
  HIDDEN_MENU.style.height = '0' ;
});

//CLICKEAR EN UNA OPCION DEL MENÚ Y QUE SE CIERRE EL MENÚ MOBILE

for(i=0; i < OVERLAY_NAVLINKS.length ;i++){
  OVERLAY_NAVLINKS[i].addEventListener('click',function(){
    HIDDEN_MENU.style.height = '0' ;
  });
}

