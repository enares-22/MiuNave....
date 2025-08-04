// Elementos principales
const configBtn = document.getElementById("configBtn");
const menuConfig = document.getElementById("menuConfig");
const toggleModo = document.getElementById("toggleModo");
const body = document.body;
const playlistsContainer = document.getElementById("playlists");
const miniReproductor = document.getElementById("miniReproductor");
const nombrePlaylistElem = document.getElementById("nombrePlaylist");
const listaCancionesElem = document.getElementById("listaCanciones");
const listaMenuCanciones = document.getElementById("listaMenuCanciones");
const menuCanciones = document.getElementById("menuCanciones");
const btnCerrarMenu = document.getElementById("btnCerrarMenu");
const barraProgreso = document.getElementById("barraProgreso");

// Botones mini reproductor
const btnShuffle = document.getElementById("btnShuffle");
const btnPrev = document.getElementById("btnPrev");
const btnPlayPause = document.getElementById("btnPlayPause");
const btnNext = document.getElementById("btnNext");
const btnLoop = document.getElementById("btnLoop");
const btnDownload = document.getElementById("btnDownload");
const btnMenuCanciones = document.getElementById("btnMenuCanciones");

// Audio real
const audio = document.getElementById("audio");

// Estado
let playlistActualIndex = 0;
let cancionActualIndex = 0;
let reproduciendo = false;
let modoAleatorio = false;
let modoLoop = false;

// --- IndexedDB para guardar MP3 ---
const DB_NAME = "miunaveDB";
const DB_STORE = "mp3files";
let db;

function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject("Error abriendo DB");
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = e => {
      db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE, { keyPath: "name" });
      }
    };
  });
}

// Guardar archivo
function guardarArchivoMP3(file) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    const store = tx.objectStore(DB_STORE);
    const item = {
      name: file.name,
      file: file
    };
    const req = store.put(item);
    req.onsuccess = () => resolve();
    req.onerror = () => reject("Error guardando archivo");
  });
}

// Obtener todos los archivos guardados
function obtenerTodosArchivos() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const store = tx.objectStore(DB_STORE);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error obteniendo archivos");
  });
}

// Eliminar archivo por nombre
function eliminarArchivo(nombre) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    const store = tx.objectStore(DB_STORE);
    const request = store.delete(nombre);
    request.onsuccess = () => resolve();
    request.onerror = () => reject("Error eliminando archivo");
  });
}

// Variables para MP3 locales
let archivosMP3 = []; // Array con objetos {name, file}

// Mostrar lista filtrada con búsqueda
function mostrarMP3s(filtro = "") {
  const lista = document.getElementById("listaMP3");
  lista.innerHTML = "";

  const filtrados = archivosMP3.filter(a =>
    a.name.toLowerCase().includes(filtro.toLowerCase())
  );

  if (filtrados.length === 0) {
    lista.innerHTML = "<li>No hay archivos que coincidan</li>";
    return;
  }

  filtrados.forEach(({ name }) => {
    const li = document.createElement("li");
    li.textContent = name;
    li.style.cursor = "pointer";

    // Click para reproducir archivo local
    li.addEventListener("click", () => {
      reproducirArchivoLocal(name);
    });

    // Botón para eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "🗑️";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.title = "Eliminar archivo";
    btnEliminar.addEventListener("click", async (e) => {
      e.stopPropagation();
      await eliminarArchivo(name);
      await cargarArchivosDB();
      mostrarMP3s(filtro);
      alert(`Archivo "${name}" eliminado`);
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

// Reproducir archivo local guardado
function reproducirArchivoLocal(nombre) {
  const archivo = archivosMP3.find(a => a.name === nombre);
  if (!archivo) {
    alert("Archivo no encontrado");
    return;
  }
  const url = URL.createObjectURL(archivo.file);
  audio.src = url;
  audio.play();
  reproduciendo = true;
  playlistActualIndex = -1; // Para diferenciar que es MP3 local
  cancionActualIndex = -1;

  // Mostrar info en mini reproductor
  nombrePlaylistElem.textContent = `MP3 local — ${nombre}`;
  listaCancionesElem.innerHTML = `<li style="font-weight:bold; color:${
    body.classList.contains("modo-oscuro") ? "#a020f0" : "#0a3d91"
  }">${nombre}</li>`;
  miniReproductor.style.display = "flex";
  actualizarBotonPlayPause();
}

// Cargar archivos de IndexedDB a variable global
async function cargarArchivosDB() {
  archivosMP3 = await obtenerTodosArchivos();
}

// Input para cargar archivos
const inputMP3 = document.getElementById("inputMP3");
inputMP3.addEventListener("change", async (e) => {
  const files = Array.from(e.target.files);
  for (const file of files) {
    if (file.type === "audio/mpeg" || file.type === "audio/mp3") {
      await guardarArchivoMP3(file);
    }
  }
  await cargarArchivosDB();
  mostrarMP3s();
  e.target.value = ""; // resetear input
  alert("Archivos guardados");
});

// Playlists fijas

const playlists = [
  {
    titulo: "Rock Clásico",
    imagen: "https://i.imgur.com/zrZDPXW.jpg",
    colorDegradado: "rgba(255, 0, 0, 0.6)",
    canciones: [
      { nombre: "Bohemian Rhapsody", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { nombre: "Hotel California", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { nombre: "Stairway to Heaven", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
    ]
  },
  {
    titulo: "Pop Hits",
    imagen: "https://i.imgur.com/ogvZbUI.jpg",
    colorDegradado: "rgba(0, 123, 255, 0.6)",
    canciones: [
      { nombre: "Shape of You", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { nombre: "Blinding Lights", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { nombre: "Uptown Funk", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
    ]
  },
  {
    titulo: "Indie Chill",
    imagen: "https://i.imgur.com/LdC6xLw.jpg",
    colorDegradado: "rgba(40, 167, 69, 0.6)",
    canciones: [
      { nombre: "Sunset Lover", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
      { nombre: "Electric Feel", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
      { nombre: "Somebody Else", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
    ]
  },
  {
    titulo: "Trap Argento",
    imagen: "https://i.imgur.com/1W9T1YF.jpg",
    colorDegradado: "rgba(111, 66, 193, 0.6)",
    canciones: [
      { nombre: "Entre Nosotros", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
      { nombre: "She Don't Give a FO", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
      { nombre: "Dance Crip", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" }
    ]
  },
  {
    titulo: "Reggaetón Vieja Escuela",
    imagen: "https://i.imgur.com/1cw5tKD.jpg",
    colorDegradado: "rgba(255, 193, 7, 0.6)",
    canciones: [
      { nombre: "Gasolina", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
      { nombre: "Lo Que Pasó, Pasó", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3" },
      { nombre: "Rakata", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" }
    ]
  },
  {
    titulo: "Lo-Fi para Estudiar",
    imagen: "https://i.imgur.com/xqGRcoF.jpg",
    colorDegradado: "rgba(108, 117, 125, 0.6)",
    canciones: [
      { nombre: "Night Vibes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3" },
      { nombre: "Rainy Study", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3" },
      { nombre: "Focus Loop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3" }
    ]
  },
  {
    titulo: "Cumbia Villera",
    imagen: "https://i.imgur.com/NB9FnND.jpg",
    colorDegradado: "rgba(220, 53, 69, 0.6)",
    canciones: [
      { nombre: "La Cumbia de los Trapos", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3" },
      { nombre: "Soy Sabalero", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3" },
      { nombre: "El Tano Pasman", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3" }
    ]
  },
  {
    titulo: "Metal Pesado",
    imagen: "https://i.imgur.com/5xNRIxU.jpg",
    colorDegradado: "rgba(0, 0, 0, 0.6)",
    canciones: [
      { nombre: "Master of Puppets", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3" },
      { nombre: "Painkiller", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3" },
      { nombre: "La Leyenda del Hada y el Mago", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3" }
    ]
  },
  {
    titulo: "Internacionales Random",
    imagen: "https://i.imgur.com/P2Fl9cq.jpg",
    colorDegradado: "rgba(23, 162, 184, 0.6)",
    canciones: [
      { nombre: "Let It Happen", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3" },
      { nombre: "Yellow", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-26.mp3" },
      { nombre: "Take On Me", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-27.mp3" }
    ]
  },
  {
    titulo: "Playlist Random",
    imagen: "https://i.imgur.com/urqZUpc.jpg",
    colorDegradado: "rgba(52, 58, 64, 0.6)",
    canciones: [
      { nombre: "Random Track 1", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-28.mp3" },
      { nombre: "Random Track 2", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-29.mp3" },
      { nombre: "Random Track 3", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-30.mp3" }
    ]
  }
];


// Render playlists (visibles)
function renderizarPlaylists() {
  playlistsContainer.innerHTML = "";
  playlists.forEach((pl, index) => {
    const div = document.createElement("div");
    div.className = "playlist-item";
    div.style.backgroundImage = `
      linear-gradient(to top, ${pl.colorDegradado}, transparent),
      url(${pl.imagen})
    `;
    div.innerHTML = `
      <div class="playlist-overlay"></div>
      <div class="playlist-content">
        <h3>${pl.titulo}</h3>
        <button class="btn-reproducir" data-index="${index}" title="Reproducir Playlist"><i class="fa-solid fa-play"></i></button>
      </div>
    `;
    playlistsContainer.appendChild(div);
  });

  document.querySelectorAll(".btn-reproducir").forEach(btn => {
    btn.addEventListener("click", e => iniciarReproduccion(parseInt(e.currentTarget.dataset.index)));
  });
}

// Iniciar reproducción playlist
function iniciarReproduccion(idxPlaylist) {
  playlistActualIndex = idxPlaylist;
  cancionActualIndex = 0;
  miniReproductor.style.display = "flex";
  reproducirCancion();
}

// Reproducir canción actual (playlist)
function reproducirCancion() {
  if (playlistActualIndex === -1) return; // MP3 local no pasa por acá

  const playlist = playlists[playlistActualIndex];
  if (!playlist || !playlist.canciones.length) return; // Por si no existe o está vacía

  const cancion = playlist.canciones[cancionActualIndex];
  audio.src = cancion.url;
  audio.play();
  reproduciendo = true;
  actualizarBotonPlayPause();
  actualizarMiniReproductor();
}

// Actualiza mini reproductor con info de playlist
function actualizarMiniReproductor() {
  if (playlistActualIndex === -1) return; // MP3 local no pasa por acá

  const playlist = playlists[playlistActualIndex];
  if (!playlist) return;

  const cancion = playlist.canciones[cancionActualIndex];
  if (!cancion) return;

  nombrePlaylistElem.textContent = `${playlist.titulo} — ${cancion.nombre}`;

  listaCancionesElem.innerHTML = "";
  playlist.canciones.forEach((c, i) => {
    const li = document.createElement("li");
    li.textContent = c.nombre;
    if (i === cancionActualIndex) {
      li.style.fontWeight = "bold";
      li.style.color = body.classList.contains("modo-oscuro") ? "#a020f0" : "#0a3d91";
    }
    listaCancionesElem.appendChild(li);
  });

  aplicarColoresModo();
}

// Play/pause
btnPlayPause.addEventListener("click", () => {
  if (reproduciendo) {
    audio.pause();
    reproduciendo = false;
  } else {
    audio.play();
    reproduciendo = true;
  }
  actualizarBotonPlayPause();
});

// Actualiza ícono play/pause
function actualizarBotonPlayPause() {
  btnPlayPause.innerHTML = reproduciendo ? `<i class="fa-solid fa-pause"></i>` : `<i class="fa-solid fa-play"></i>`;
  if (!reproduciendo && audio.currentTime === 0) miniReproductor.style.display = "none";
}

// Siguiente canción
btnNext.addEventListener("click", () => {
  if (playlistActualIndex === -1) return; // No para MP3 local

  const playlist = playlists[playlistActualIndex];
  if (!playlist || !playlist.canciones.length) return;

  if (modoAleatorio) {
    cancionActualIndex = Math.floor(Math.random() * playlist.canciones.length);
  } else {
    cancionActualIndex = (cancionActualIndex + 1) % playlist.canciones.length;
  }
  reproducirCancion();
});

// Canción anterior
btnPrev.addEventListener("click", () => {
  if (playlistActualIndex === -1) return; // No para MP3 local

  const playlist = playlists[playlistActualIndex];
  if (!playlist || !playlist.canciones.length) return;

  if (modoAleatorio) {
    cancionActualIndex = Math.floor(Math.random() * playlist.canciones.length);
  } else {
    cancionActualIndex = (cancionActualIndex - 1 + playlist.canciones.length) % playlist.canciones.length;
  }
  reproducirCancion();
});

// Shuffle toggle
btnShuffle.addEventListener("click", () => {
  modoAleatorio = !modoAleatorio;
  aplicarColoresModo();
});

// Loop toggle
btnLoop.addEventListener("click", () => {
  modoLoop = !modoLoop;
  audio.loop = modoLoop;
  aplicarColoresModo();
});

// Descargar canción actual (simulado)
btnDownload.addEventListener("click", () => {
  if (playlistActualIndex === -1) {
    alert(`Descargando archivo local`);
  } else {
    const playlist = playlists[playlistActualIndex];
    if (!playlist || !playlist.canciones.length) return;
    alert(`Descargando: ${playlist.canciones[cancionActualIndex].nombre}`);
  }
});

// Barra progreso actualización
audio.addEventListener("timeupdate", () => {
  const progresoActual = (audio.currentTime / audio.duration) * 100 || 0;
  barraProgreso.style.width = progresoActual + "%";
  barraProgreso.setAttribute("aria-valuenow", progresoActual.toFixed(2));
});

// Click barra para cambiar tiempo
barraProgreso.parentElement.addEventListener("click", e => {
  const barraPadre = barraProgreso.parentElement;
  const rect = barraPadre.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const nuevoPorcentaje = clickX / rect.width;
  audio.currentTime = nuevoPorcentaje * audio.duration;
});

// Menú canciones playlist
btnMenuCanciones.addEventListener("click", () => {
  if (playlistActualIndex === -1) return; // No para MP3 local
  menuCanciones.style.display = "flex";
  listaMenuCanciones.innerHTML = "";

  const playlist = playlists[playlistActualIndex];
  if (!playlist || !playlist.canciones.length) return;

  playlist.canciones.forEach((c, i) => {
    const li = document.createElement("li");
    li.textContent = c.nombre;
    if (i === cancionActualIndex) li.classList.add("activa");
    li.addEventListener("click", () => {
      cancionActualIndex = i;
      reproducirCancion();
      menuCanciones.style.display = "none";
    });
    listaMenuCanciones.appendChild(li);
  });
});
btnCerrarMenu.addEventListener("click", () => {
  menuCanciones.style.display = "none";
});

// Navegación
document.querySelectorAll(".btn-nav").forEach(boton => {
  boton.addEventListener("click", () => {
    document.querySelectorAll(".btn-nav").forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");
    document.querySelectorAll("main.contenido > section").forEach(seccion => seccion.classList.add("seccion-oculta"));
    document.getElementById(boton.getAttribute("data-seccion")).classList.remove("seccion-oculta");

    // Mostrar/ocultar chat
    const chatSection = document.getElementById("chatSection");
    if (boton.getAttribute("data-seccion") === "chats") {
      chatSection.style.display = "block";
    } else {
      chatSection.style.display = "none";
    }

    aplicarColoresModo();
  });
});

// Configuración modo oscuro/claro
configBtn.addEventListener("click", () => {
  menuConfig.style.display = menuConfig.style.display === "block" ? "none" : "block";
});
toggleModo.addEventListener("click", () => {
  body.classList.toggle("modo-oscuro");
  body.classList.toggle("modo-claro");
  toggleModo.textContent = body.classList.contains("modo-oscuro") ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro";
  aplicarColoresModo();
});

// Escuchar búsqueda MP3
const busquedaInput = document.getElementById("busquedaMP3");
if (busquedaInput) {
  busquedaInput.addEventListener("input", (e) => {
    mostrarMP3s(e.target.value);
  });
}

// Mostrar lista al entrar a Descargas
const botonDescargas = document.getElementById("botonDescargas");
if (botonDescargas) {
  botonDescargas.addEventListener("click", async () => {
    await cargarArchivosDB();
    mostrarMP3s();
  });
}

// CHAT - Variables y funciones
const chatSection = document.getElementById("chatSection");
const chatUsers = document.querySelectorAll(".chat-user");
const chatHeader = document.getElementById("chatHeader");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendMsgBtn = document.getElementById("sendMsgBtn");

let chatActual = null;

// Al hacer clic en un usuario
chatUsers.forEach(user => {
  user.addEventListener("click", () => {
    chatActual = user.dataset.user;
    chatHeader.textContent = `Chat con ${user.querySelector("span").textContent}`;
    cargarMensajes(chatActual);
  });
});

// Enviar mensaje
sendMsgBtn.addEventListener("click", () => {
  const texto = chatInput.value.trim();
  if (!texto || !chatActual) return;

  guardarMensaje(chatActual, "enviado", texto);
  mostrarMensaje("enviado", texto);
  chatInput.value = "";
});

// Mostrar mensajes previos del chat
function cargarMensajes(usuario) {
  chatMessages.innerHTML = "";
  const historial = JSON.parse(localStorage.getItem("chat_" + usuario)) || [];
  historial.forEach(msg => {
    mostrarMensaje(msg.tipo, msg.texto);
  });
}

// Mostrar un mensaje en pantalla
function mostrarMensaje(tipo, texto) {
  const div = document.createElement("div");
  div.className = `mensaje ${tipo}`;
  div.textContent = texto;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Guardar en localStorage
function guardarMensaje(usuario, tipo, texto) {
  const historial = JSON.parse(localStorage.getItem("chat_" + usuario)) || [];
  historial.push({ tipo, texto });
  localStorage.setItem("chat_" + usuario, JSON.stringify(historial));
}

// Función para aplicar colores según modo
function aplicarColoresModo() {
  if (body.classList.contains("modo-oscuro")) {
    btnShuffle.style.color = modoAleatorio ? "#a020f0" : "";
    btnLoop.style.color = modoLoop ? "#a020f0" : "";
  } else {
    btnShuffle.style.color = modoAleatorio ? "#0a3d91" : "";
    btnLoop.style.color = modoLoop ? "#0a3d91" : "";
  }
}

// Ocultar mini reproductor al inicio
miniReproductor.style.display = "none";

// Inicialización DB y carga inicial
abrirDB().then(async () => {
  await cargarArchivosDB();
  renderizarPlaylists();
  aplicarColoresModo();
  if (typeof lucide !== "undefined" && lucide.createIcons) lucide.createIcons(); // JIT icons
});
// Cuando termina la canción, ir a la siguiente según modo
audio.addEventListener("ended", () => {
  if (playlistActualIndex === -1) {
    // Si es archivo local, no hacemos nada (no hay lista)
    reproduciendo = false;
    actualizarBotonPlayPause();
    return;
  }

  if (modoLoop) {
    audio.currentTime = 0;
    audio.play();
  } else if (modoAleatorio) {
    const playlist = playlists[playlistActualIndex];
    cancionActualIndex = Math.floor(Math.random() * playlist.canciones.length);
    reproducirCancion();
  } else {
    const playlist = playlists[playlistActualIndex];
    cancionActualIndex++;
    if (cancionActualIndex >= playlist.canciones.length) {
      cancionActualIndex = 0; // vuelve al principio
    }
    reproducirCancion();
  }
});

// Para que el mini reproductor cierre al pausar y no estar vacío
audio.addEventListener("pause", () => {
  reproduciendo = false;
  actualizarBotonPlayPause();
});

// Para que el mini reproductor se abra si la canción comienza a reproducirse
audio.addEventListener("play", () => {
  reproduciendo = true;
  miniReproductor.style.display = "flex";
  actualizarBotonPlayPause();
});

// Al cargar página, por si hay modo oscuro guardado (opcional)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  body.classList.add("modo-oscuro");
  body.classList.remove("modo-claro");
  toggleModo.textContent = "Cambiar a Modo Claro";
} else {
  body.classList.add("modo-claro");
  body.classList.remove("modo-oscuro");
  toggleModo.textContent = "Cambiar a Modo Oscuro";
}
aplicarColoresModo();


