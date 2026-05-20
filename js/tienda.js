let carrito = [];


function abrirCarrito() {
  document.getElementById('overlay').classList.add('activo');
  document.getElementById('carritoPanel').classList.add('activo');
}

function cerrarCarrito() {
  document.getElementById('overlay').classList.remove('activo');
  document.getElementById('carritoPanel').classList.remove('activo');
}

function agregarCarrito(nombre, precio, imagen) {

  const existente = carrito.find(function(producto) {
    return producto.nombre === nombre;
  });

  if (existente) {
    
    existente.cantidad = existente.cantidad + 1;
  } else {
    
    carrito.push({
      nombre:   nombre,
      precio:   precio,
      imagen:   imagen,
      cantidad: 1
    });
  }

  
  actualizarCarrito();
}


function eliminarProducto(nombre) {
  carrito = carrito.filter(function(producto) {
    return producto.nombre !== nombre;
  });

  actualizarCarrito();
}


function actualizarCarrito() {

  
  const contenedor = document.getElementById('carritoItems');  
  const contador   = document.getElementById('carritoCount');  
  const total      = document.getElementById('carritoTotal');  

  let totalItems = 0;
  for (let i = 0; i < carrito.length; i++) {
    totalItems = totalItems + carrito[i].cantidad;
  }
  contador.textContent = totalItems;

  
  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
    total.textContent = '$0';
    return; 
  }

  
  let html = '';  
  let suma = 0;  

  for (let i = 0; i < carrito.length; i++) {
    let p = carrito[i]; // el producto actual

    suma = suma + (p.precio * p.cantidad);

    
    html = html + '<div class="carrito-item">';
    html = html +   '<img src="' + p.imagen + '" alt="' + p.nombre + '">';
    html = html +   '<div class="carrito-item-info">';
    html = html +     '<h4>' + p.nombre + ' x' + p.cantidad + '</h4>';
    html = html +     '<p>$' + (p.precio * p.cantidad).toLocaleString('es-CO') + '</p>';
    html = html +   '</div>';
    html = html +   '<button class="btn-eliminar" onclick="eliminarProducto(\'' + p.nombre + '\')">🗑</button>';
    html = html + '</div>';
  }

  contenedor.innerHTML = html;

  total.textContent = '$' + suma.toLocaleString('es-CO');
}