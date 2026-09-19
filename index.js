// CONFIGURACIÓN Y ESTADO GLOBAL
const API_URL = "http://127.0.0.1:8000/api";

// Cargar estado inicial del carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carritoAutopartes")) || [];

// ==========================================
// 📦 BASE DE DATOS LOCAL POR SECCIONES
// ==========================================

// 🏠 VISTA PRINCIPAL (Destacados / Inicio)
const productosInicio = [
    { id: 1, nombre: "Sedán Deportivo 2024", precio: 350000, img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80" },
    { id: 2, nombre: "Filtro de Aceite High Flow", precio: 250, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrg4pENUWYABtwQWvxnngVqoOIj537RJicwLkn7qbXQ&s" },
    { id: 3, nombre: "Kit de Faros LED RGB", precio: 850, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80" }
];

// 🔧 SECCIÓN REFACCIONES
const productosRefacciones = [
    { id: 101, nombre: "Filtro de Aceite", precio: 250, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCKUg6fWnjzyNZz1hd7CMLserU4luTFfnY9W-Jkb3FQ&s=10" },
    { id: 102, nombre: "Juego de Llantas Premium", precio: 1200, img: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&q=80" },
    { id: 103, nombre: "Batería High Performance", precio: 950, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnkXpdu2Xi-6ncT0BAI97pArpu8Y1adNLTSm8forQ48Q&s=10" },
    { id: 101, nombre: "Blatas", precio: 300, img: "https://contentassets.autozone.com/product_image/MEX/1684/CFHH/MKD1592/MKD1592-01.jpg" },
    { id: 102, nombre: "Rines", precio: 1500, img: "https://www.todosobreruedas.pro/wp-content/uploads/2023/10/Mejores-Marcas-para-Rines-2.jpg" },
    { id: 103, nombre: "Aleron para Auto Hatchback Sedan Metal", precio: 1000, img: "https://m.media-amazon.com/images/I/51SkRT5DmWL.jpg" }
     
];

// 🚗 SECCIÓN AUTOS
const productosAutos = [
    { id: 201, nombre: "Sedán Deportivo 2024", precio: 350000, img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80" },
    { id: 202, nombre: "Camioneta SUV Familiar", precio: 480000, img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80" },
    { id: 203, nombre: "Deportivo Coupe Turbo", precio: 620000, img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500&q=80" },
    
    { id: 201, nombre: "Aveo HB 2026", precio: 4500, img: "https://www.chevrolet.com.mx/content/dam/chevrolet/na/mx/es/vdc-collections/2026/cars/aveo-hb/01-images/2026-aveohb-selector-v2.jpg?imwidth=3000" },
    { id: 202, nombre: "Silverado 2026", precio: 8200, img: "https://www.chevrolet.com.mx/content/dam/chevrolet/na/mx/es/vdc-collections/2026/pickups-and-trucks/silverado/01-images/2026-silverado-custom-selector-v2.jpg?imwidth=3000" },
    { id: 203, nombre: "Corvette ZR1 2026", precio: 5900, img: "https://www.chevrolet.com.mx/content/dam/chevrolet/na/mx/es/vdc-collections/2026/performance/corvette-zr1/01-images/2026-corvette-zr1.jpg?imwidth=3000" }

];

// 🎨 SECCIÓN ACCESORIOS
const productosAccesorios = [
    { id: 301, nombre: "Cubre Asientos de Piel", precio: 1100, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWOrCWwSiqYhS2HyekIgEZTwVBY9R_xc-6oZ2IMrCC_Q&s=10"},
    { id: 302, nombre: "Porta Celular Carga Inalámbrica", precio: 450, img: "https://images.samsung.com/is/image/samsung/p6pim/mx/feature/166685824/mx-feature-no-interruptions--just-fast-qi-2-0-wireless-charging-549663017?$FB_TYPE_A_MO_JPG$" },
    { id: 303, nombre: "Tapetes de Alto Rendimiento", precio: 650, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczvkXjI7gfM7Nb9XSj95J3njsgLIAS23-SZAlYD-LEQ&s=10" },
    
    { id: 301, nombre: "PUNTA DE ESCAPE DOBLE SALIDA EN NEGRO PIANO", precio: 7859000, img:"https://www.chevrolet.com.mx/content/dam/chevrolet/na/mx/es/index/accesories/01-images/2026/agosto/05-chevrolet-accesorios-tracker-kit-black-edition-punta-escape-doble.jpg?imwidth=3000"},
    { id: 302, nombre: "Cubre volante", precio: 75900, img: "https://images.sodimac.com/v3/assets/blt2f8082df109cfbfb/bltfb3fc5e1952fc5cf/66c8c45a1793032ce6b55717/cat1660015.jpg" },
    { id: 303, nombre: "Funda para carro ", precio: 55800, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-r1Fdh-oUnScNl27S6yb5diSjWEvmZ3gGv9trzHEA4g&s=10" }

];

// ==========================================
// 🚀 INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuMobile();
    actualizarCarritoUI();
    
    // Si viene desde "Comprar Ahora" en una página externa
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('abrirCarrito') === 'true') {
        abrirCarrito();
    }

    // Carga de promociones desde la API si existe el contenedor correspondiente
    if (document.getElementById('grid-promociones')) {
        cargarPromociones();
    }
    
    // Carga dinámica de productos estáticos según el atributo data-tipo del HTML
    const container = document.getElementById('productos-container');
    if (container) {
        const tipoSeccion = container.dataset.tipo;

        if (tipoSeccion === 'autos') {
            renderizarProductosEstaticos(productosAutos);
        } else if (tipoSeccion === 'refacciones') {
            renderizarProductosEstaticos(productosRefacciones);
        } else if (tipoSeccion === 'accesorios') {
            renderizarProductosEstaticos(productosAccesorios);
        } else {
            // Por defecto carga los productos de Inicio (App.html)
            renderizarProductosEstaticos(productosInicio);
        }
    }
});

// CONTROL DEL MENÚ MÓVIL
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar') || document.getElementById('sidebar');
    const overlay = document.getElementById('overlay') || document.getElementById('sidebar-overlay');
    
    if (sidebar) {
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('active');
    }
    if (overlay) {
        const isOpen = sidebar && (sidebar.classList.contains('open') || sidebar.classList.contains('active'));
        overlay.style.display = isOpen ? 'block' : 'none';
        overlay.classList.toggle('active', isOpen);
    }
}

function inicializarMenuMobile() {
    const toggleBtn = document.getElementById("toggle-menu");
    const closeBtn = document.getElementById("close-menu");
    const overlay = document.getElementById('overlay') || document.getElementById('sidebar-overlay');

    if (toggleBtn) toggleBtn.addEventListener("click", toggleMenu);
    if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
    if (overlay) overlay.addEventListener("click", toggleMenu);
}



// NAVEGACIÓN
function navegar(categoria, btn) {
    document.querySelectorAll('.sidebar nav button, .sidebar nav a').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const vistaInicio = document.getElementById('vista-inicio');
    const vistaCat = document.getElementById('vista-categoria');
    const titulo = document.getElementById('categoria-titulo') || document.getElementById('titulo-seccion');

    if (categoria === 'inicio') {
        if (vistaInicio) vistaInicio.style.display = 'block';
        if (vistaCat) vistaCat.style.display = 'none';
        if (titulo) titulo.innerText = "Promociones y Novedades";
        cargarPromociones();
    } else {
        if (vistaInicio) vistaInicio.style.display = 'none';
        if (vistaCat) vistaCat.style.display = 'block';
        if (titulo) titulo.innerText = "Catálogo de " + categoria.toUpperCase();
        cargarProductosCategoria(categoria);
    }

    const sidebar = document.querySelector('.sidebar') || document.getElementById('sidebar');
    const overlay = document.getElementById('overlay') || document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open', 'active');
    if (overlay) {
        overlay.style.display = 'none';
        overlay.classList.remove('active');
    }
}

// PETICIONES A LA API
async function cargarPromociones() {
    try {
        const res = await fetch(`${API_URL}/productos?promocion=true`);
        const prods = await res.json();
        renderGrid(prods, 'grid-promociones');
    } catch (err) {
        console.error("Error al cargar promociones:", err);
    }
}

async function cargarProductosCategoria(cat) {
    try {
        const res = await fetch(`${API_URL}/productos?categoria=${cat}`);
        const prods = await res.json();
        renderGrid(prods, 'grid-categoria');
    } catch (err) {
        console.error("Error al cargar categoría:", err);
    }
}

// RENDERIZADO DE CARDS DE LA API (VISTA VERTICAL)
function renderGrid(productos, contenedorId) {
    const container = document.getElementById(contenedorId);
    if (!container) return;
    
    if (!productos || productos.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No hay productos disponibles.</p>';
        return;
    }

    const imgPorDefecto = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80";

    container.innerHTML = productos.map(p => {
        const urlImagen = (p.imagen && p.imagen.trim() !== "") ? p.imagen : imgPorDefecto;
        const maxCant = Math.min(p.stock || 10, 10);

        let opcionesCantidad = '';
        for (let i = 1; i <= maxCant; i++) {
            opcionesCantidad += `<option value="${i}">${i}</option>`;
        }
        
        return `
            <div class="card">
                <img src="${urlImagen}" alt="${p.nombre}" onerror="this.src='${imgPorDefecto}'">
                <div class="card-body">
                    <h4>${p.nombre}</h4>
                    <p style="font-size:0.8rem; color:#666; margin-bottom:5px;">${p.descripcion || ''}</p>
                    <div class="price">$${parseFloat(p.precio).toFixed(2)} MXN</div>
                    
                    <div class="cantidad-container" style="display:flex; justify-content:center; align-items:center; gap:8px; margin: 10px 0;">
                        <label for="cant-${p.id}" style="font-size:0.85rem; font-weight:bold;">Cant:</label>
                        <select id="cant-${p.id}" class="select-cantidad" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc;">
                            ${opcionesCantidad}
                        </select>
                    </div>
                </div>
                
                <div class="acciones-card" style="display:flex; flex-direction:column; gap:5px; padding: 0 10px 10px 10px;">
                    <button class="btn-add" onclick="agregarAlCarrito(${p.id}, '${p.nombre}', ${p.precio})">🛒 Agregar al Carrito</button>
                    <button class="btn-add" style="background:#10b981;" onclick="comprarAhora(${p.id}, '${p.nombre}', ${p.precio})">⚡ Comprar Ahora</button>
                </div>
            </div>
        `;
    }).join('');
}

// RENDERIZADO DE PRODUCTOS ESTÁTICOS CON RESPONSIVIDAD MEJORADA
function renderizarProductosEstaticos(listaProductos = productosInicio) {
    const container = document.getElementById("productos-container");
    if (!container) return;
    
    container.innerHTML = "";

    listaProductos.forEach(prod => {
        const col = document.createElement("div");
        // Ajustado para dar independencia y separación entre ventanas
        col.className = "col-12 col-md-6 col-xl-4 mb-3"; 
        col.innerHTML = `
            <div class="card card-horizontal h-100 shadow-sm">
                <div class="row g-0 align-items-center h-100">
                    <div class="col-4 h-100">
                        <img src="${prod.img}" 
                             class="img-fluid rounded-start img-horizontal" 
                             alt="${prod.nombre}"
                             style="height: 100%; width: 100%; object-fit: cover; min-height: 120px;">
                    </div>
                    <div class="col-8">
                        <div class="card-body py-2 px-2 px-sm-3 d-flex flex-column justify-content-between h-100">
                            <div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="card-title m-0 fw-bold" style="font-size: 0.95rem;">${prod.nombre}</h5>
                                    <span class="fw-bold text-success" style="font-size: 0.95rem;">$${prod.precio} MXN</span>
                                </div>
                                
                                <div class="cantidad-container my-2">
                                    <label for="cant-${prod.id}" class="me-1" style="font-size: 0.8rem;">Cant:</label>
                                    <select id="cant-${prod.id}" class="select-cantidad form-select-sm border rounded">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>

                            <div class="d-flex gap-1 gap-sm-2 mt-2">
                                <button class="btn btn-primary btn-sm flex-fill" onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', ${prod.precio})">🛒 Agregar</button>
                                <button class="btn btn-success btn-sm flex-fill" onclick="comprarAhora(${prod.id}, '${prod.nombre}', ${prod.precio})">⚡ Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// LÓGICA DEL CARRITO DE COMPRAS
function guardarCarrito() {
    localStorage.setItem("carritoAutopartes", JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto, nombre, precio) {
    const selectElement = document.getElementById(`cant-${idProducto}`);
    const cantidadSeleccionada = selectElement ? parseInt(selectElement.value) || 1 : 1;

    const productoExistente = carrito.find(item => item.id === idProducto);

    if (productoExistente) {
        productoExistente.cantidad += cantidadSeleccionada;
    } else {
        carrito.push({
            id: idProducto,
            nombre: nombre,
            precio: parseFloat(precio),
            cantidad: cantidadSeleccionada
        });
    }

    guardarCarrito();
    actualizarCarritoUI();
}

function comprarAhora(idProducto, nombre, precio) {
    agregarAlCarrito(idProducto, nombre, precio);

    const modalCarrito = document.getElementById('modal-carrito');
    if (modalCarrito) {
        abrirCarrito();
    } else {
        window.location.href = "App.html?abrirCarrito=true";
    }
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
    actualizarCarritoUI();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const cartCountElement = document.getElementById('cart-count');
    const cartCountMobile = document.getElementById('cart-count-mobile');
    
    if (cartCountElement) cartCountElement.innerText = totalItems;
    if (cartCountMobile) cartCountMobile.innerText = totalItems;

    const container = document.getElementById('cart-items-container');
    let total = 0;
    
    if (container) {
        if (carrito.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#888; margin: 20px 0;">El carrito está vacío 🛒</p>';
        } else {
            container.innerHTML = carrito.map(i => {
                const subtotal = i.precio * i.cantidad;
                total += subtotal;
                return `
                    <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding: 8px 0; border-bottom: 1px solid #eee;">
                        <div>
                            <strong>${i.nombre}</strong>
                            <div style="font-size:0.85rem; color:#666;">Cant: ${i.cantidad} x $${i.precio.toFixed(2)}</div>
                        </div>
                        <div style="display:flex; align-items:center; gap: 10px;">
                            <span style="font-weight:bold;">$${subtotal.toFixed(2)} MXN</span>
                            <button onclick="eliminarDelCarrito(${i.id})" style="background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">🗑️</button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
    
    const cartTotalElement = document.getElementById('cart-total');
    if (cartTotalElement) {
        cartTotalElement.innerText = total.toFixed(2);
    }
}

// CONTROL DE MODALES
function abrirCarrito() {
    actualizarCarritoUI();
    const modal = document.getElementById('modal-carrito');
    if (modal) modal.style.display = 'flex';
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// PROCESAR PAGO
async function procesarPago(e) {
    e.preventDefault();
    if (carrito.length === 0) return alert("El carrito está vacío. Agrega productos antes de pagar.");

    const payload = {
        nombreCliente: document.getElementById('pago-nombre').value,
        tarjeta: document.getElementById('pago-tarjeta').value,
        expiracion: "12/28",
        cvv: "123",
        carrito: carrito
    };

    try {
        const res = await fetch(`${API_URL}/procesar-pago`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail);

        carrito = [];
        guardarCarrito();
        actualizarCarritoUI();
        cerrarModal('modal-carrito');
        
        const ticketContenido = document.getElementById('ticket-contenido');
        if (ticketContenido) {
            ticketContenido.innerHTML = `
                <h3>AUTOPARTES UNIVERSAL</h3>
                <p><strong>Folio:</strong> ${data.ticket.folio}</p>
                <p><strong>Fecha:</strong> ${data.ticket.fecha}</p>
                <p><strong>Cliente:</strong> ${data.ticket.cliente}</p>
                <p><strong>Pago:</strong> ${data.ticket.tarjeta_enmascarada}</p>
                <hr style="margin:8px 0;">
                ${data.ticket.items.map(i => `<p>${i.cantidad}x ${i.nombre} - $${(i.precio * i.cantidad).toFixed(2)}</p>`).join('')}
                <hr style="margin:8px 0;">
                <h4>TOTAL: $${data.ticket.total.toFixed(2)} MXN</h4>
            `;
        }
        
        const modalTicket = document.getElementById('modal-ticket');
        if (modalTicket) modalTicket.style.display = 'flex';

    } catch (err) {
        alert("Error en el pago: " + err.message);
    }
}