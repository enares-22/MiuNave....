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
let reproduciendo = false;
let modoAleatorio = false;
let modoLoop = false;

// --- Playlists fijas ---
const playlists = [
  {
    titulo: "Rock Clásico",
    imagen: "https://s0.smartresize.com/wallpaper/963/312/HD-wallpaper-music-heavy-metal-1980s-cover-art-rock-music-rock-and-roll-thumbnail.jpg",
    colorDegradado: "rgba(255, 0, 0, 0.6)",
    canciones: [
      { nombre: "AC/DC - Back In Black", url: "rock clasicos/ACDC - Back In Black (Official Video).mp3" },
      { nombre: "AC/DC - Highway To Hell", url: "rock clasicos/ACDC - Highway to Hell (Official Video).mp3" },
      { nombre: "AC/DC - Thunderstruck", url: "rock clasicos/ACDC - Thunderstruck (Official Video).mp3" },
      { nombre: "Evanescence - Bring Me To Life", url: "rock clasicos/Evanescence - Bring Me To Life (Official HD Music Video).mp3" },
      { nombre: "Guns N Roses - Welcome To The Jungle", url: "rock clasicos/Guns N' Roses - Welcome To The Jungle.mp3" },
      { nombre: "Kiss - I Was Made For Lovin You Baby", url: "rock clasicos/Kiss - I Was Made For Lovin' You.mp3" },
      { nombre: "Queen - Somebody To Love", url: "rock clasicos/Queen - Somebody To Love (Official Video).mp3" },
      { nombre: "Red Hot Chili Peppers - Californication", url: "rock clasicos/Red Hot Chili Peppers - Californication (Official Music Video) [HD UPGRADE].mp3" },
      { nombre: "Survivor - Eye Of The Tiger", url: "rock clasicos/Survivor - Eye Of The Tiger (Official HD Video).mp3" },
      { nombre: "Guns N Roses - Sweet Child O Mine", url: "rock clasicos/Sweet Child O' Mine.mp3" },
      { nombre: "The Rolling Stones - Paint It, Black", url: "rock clasicos/The Rolling Stones - Paint It, Black (Official Lyric Video).mp3" },
      { nombre: "The Beatles - Dont Let Me Down", url: "rock clasicos/The Beatles - Don't Let Me Down.mp3" }
    ]
  },
  {
    titulo: "Pop Hits",
    imagen: "https://previews.123rf.com/images/studioaccendo/studioaccendo2304/studioaccendo230406225/202236994-pop-art-comic-book-explosion-background-pop-art-comics-book-magazine-cover.jpg.jpg",
    colorDegradado: "rgba(0, 123, 255, 0.6)",
    canciones: [
      { nombre: "Michael Jackson - Billie Jean", url: "pop hitss/Billie Jean - Michael Jackson.mp3" },
      { nombre: "The Weeknd - Blinding Lights", url: "pop hitss/The Weeknd - Blinding Lights (Lyrics) - 7clouds.mp3" },
      { nombre: "Mark Ronson ft. Bruno Mars - Uptown Funk", url: "pop hitss/Mark Ronson - Uptown Funk (Lyrics) ft. Bruno Mars - 7clouds.mp3" },
      { nombre: "Michael Jackson - Thriller", url: "pop hitss/Michael Jackson - Thriller (Lyrics) - The Greatest Songs.mp3" },
      { nombre: "a-ha - Take On Me", url: "pop hitss/a-ha - Take On Me (Official Video) [4K] - a-ha.mp3" },
      { nombre: "Lady Gaga, Bruno Mars - Die With A Smile", url: "pop hitss/Lady Gaga, Bruno Mars - Die With A Smile (Official Music Video) - LadyGagaVEVO.mp3" },
      { nombre: "Harry Styles - As It Was", url: "pop hitss/Harry Styles - As It Was (Lyrics) - Fans Music.mp3" },
      { nombre: "Billie Eilish - BIRDS OF A FEATHER", url: "pop hitss/Billie Eilish - BIRDS OF A FEATHER (Official Music Video) - BillieEilishVEVO.mp3" },
      { nombre: "Katy Perry - Firework", url: "pop hitss/Katy Perry - Firework (Lyrics) - TikTokHymn.mp3" },
      { nombre: "Rihanna - Umbrella", url: "pop hitss/Umbrella - Rihanna (Lyrics)  - Pillow.mp3" },
      { nombre: "Beyoncé - Crazy In Love ft. JAY Z", url: "pop hitss/Beyoncé - Crazy In Love ft. JAY Z - BeyoncéVEVO.mp3" },
      { nombre: "Spice Girls - Wannabe", url: "pop hitss/Spice Girls - Wannabe [Lyrics] - GlyphoricVibes.mp3" }
    ]
  },
  {
    titulo: "Rock Nacional ",
    imagen: "https://cdn-images.dzcdn.net/images/talk/8000396a999b5073426a77512589d31d/500x500.jpg",
    colorDegradado: "rgba(40, 167, 69, 0.6)",
    canciones: [
      { nombre: "Soda Stereo - Prófugos (Gira Me Verás Volver)", url: "rock nacional/Soda Stereo - Prófugos (Gira Me Verás Volver).mp3" },
      { nombre: "Soda Stereo - De Musica Ligera", url: "rock nacional/Soda Stereo - De Música Ligera (Official Video).mp3" },
      { nombre: "Intoxicados - Nunca Quise", url: "rock nacional/Intoxicados - Nunca quise (video oficial) [HD].mp3" },
      { nombre: "Rata Blanca - Mujer Amante", url: "rock nacional/Rata Blanca - Mujer Amante.mp3" },
      { nombre: "SPINETTA - BAJAN", url: "rock nacional/SPINETTA - BAJAN.mp3" },
      { nombre: "Gustavo Cerati - Adiós", url: "rock nacional/Gustavo Cerati Adiós (Official Video).mp3" },
      { nombre: "Andrés Calamaro - Flaca", url: "rock nacional/Andrés Calamaro - Flaca (Videoclip Oficial).mp3" },
      { nombre: "No Te Va Gustar - A Las Nueve", url: "rock nacional/A las Nueve.mp3" },
      { nombre: "La Renga - El Revelde", url: "rock nacional/El Revelde.mp3" },
      { nombre: "Indio Solari - Un Poco De Amor Francés (Indio en Concierto Estadio Unico De La Plata)", url: "rock nacional/Un poco de amor francés - Estadio Único de La Plata - Indio en Concierto [2008] Full HD.mp3" },
      { nombre: "Ciro y Los Persas - ASTROS", url: "rock nacional/Ciro y Los Persas  ASTROS  (Registro Oficial de la Grabación).mp3" }
    ]
  },
  {
    titulo: "Trap Argentino",
    imagen: "https://i.pinimg.com/736x/82/86/b2/8286b254915c576c20b49b6bbc265ad9.jpg",
    colorDegradado: "rgba(111, 66, 193, 0.6)",
    canciones: [
      { nombre: "YSY A x BHAVI ft. MILO J - FLECHAZO EN EL CENTRO", url: "trap argentino/08  - YSY A x BHAVI ft. MILO J - FLECHAZO EN EL CENTRO (PROD. ONIRIA).mp3" },
      { nombre: "Bhavi ft. Ecko - Piso", url: "trap argentino/Bhavi ft. Ecko - Piso (Prod. by Omar Varela).mp3" },
      { nombre: "DUKI - GIVENCHY", url: "trap argentino/DUKI - GIVENCHY (Video Oficial).mp3" },
      { nombre: "DUKI - Goteo", url: "trap argentino/DUKI - Goteo (Video Oficial).mp3" },
      { nombre: "DUKI -Rockstar", url: "trap argentino/DUKI - Rockstar (Video Oficial).mp3" },
      { nombre: "DUKI - She Don't Give a FO (ft. Khea)", url: "trap argentino/Duki - She Don't Give a FO (ft. Khea) Prod. by Omar Varela.mp3" },
      { nombre: "DUKI, Ysy A, C.R.O - Hijo De La Noche", url: "trap argentino/DUKI, Ysy A, C.R.O - Hijo de la Noche (Video Oficial).mp3" },
      { nombre: "ECKO - DORADO", url: "trap argentino/ECKO - DORADO (Prod. by Omar Varela).mp3" },
      { nombre: "Khea - Loca ft. Duki & Cazzu", url: "trap argentino/Khea - Loca ft. Duki & Cazzu (Prod. Omar Varela & Mykka).mp3" },
      { nombre: "Trueno, WOS - SANGRÍA", url: "trap argentino/Trueno, WOS - SANGRÍA  Atrevido.mp3" },
      { nombre: "Tumbando el Club (Remix)", url: "trap argentino/Tumbando el Club (Remix) (Official VIdeo).mp3" }
    ]
  },
  {
    titulo: "Reggaetón Viejo",
    imagen: "https://i1.sndcdn.com/avatars-Ja0cz1ZARCNmLw3B-20rHyw-t500x500.jpg",
    colorDegradado: "rgba(255, 193, 7, 0.6)",
    canciones: [
      { nombre: "Nicky Jam - Hasta el Amanecer ", url: "reggaeton viejo/22. Hasta el Amanecer - Nicky Jam  Video Oficial - NickyJamTV.mp3" },
      { nombre: "Hector y Tito ft. Don Omar", url: "reggaeton viejo/Baila Morena - Hector y Tito ft. Don Omar _ Glory ( Tiktok song, Lyrics Video) - LyricsForYou.mp3" },
      { nombre: "Daddy Yankee - Lo Que Pasó Pasó", url: "reggaeton viejo/Daddy Yankee   Lo Que Paso Paso HQ - Neranjan manabharana.mp3" },
      { nombre: "Daddy Yankee - Gasolina", url: "reggaeton viejo/Daddy Yankee - Gasolina - Music.mp3" },
      { nombre: "Don Omar - Dile", url: "reggaeton viejo/Don Omar - Dile - Sonido Mix.mp3" },
      { nombre: "Hector El Father - Noche De Travesura", url: "reggaeton viejo/Noche De Travesura - ( Hector El Father ) - Reggaetoneando.mp3" },
      { nombre: "Tego Calderón - Pa' Que Retozen", url: "reggaeton viejo/Pa' Que Retozen - Tego Calderón.mp3" },
      { nombre: "Nicky Jam - Si Tu No Estas", url: "reggaeton viejo/Si Tu No Estas - Nicky Jam Ft De la Ghetto  Video Oficial - NickyJamTV.mp3" },
      { nombre: "Nicky Jam - Travesuras", url: "reggaeton viejo/Travesuras - Nicky Jam  Video Oficial - NickyJamTV.mp3" },
      { nombre: "(feat. Daddy Yankee) - Zion & Lennox - Yo Voy", url: "reggaeton viejo/Yo Voy (feat. Daddy Yankee) - Zion & Lennox.mp3" },
      { nombre: "Zion Ft. Eddie Dee - Amor De Pobre", url: "reggaeton viejo/Zion Ft. Eddie Dee - Amor de Pobre [Video Oficial] - Zion & Lennox.mp3" }
    ]
  },
  {
    titulo: "Rap 90s",
    imagen: "https://i.pinimg.com/474x/7b/0b/79/7b0b79d10a0d054f9e4240dc4467b864.jpg",
    colorDegradado: "rgba(108, 117, 125, 0.6)",
    canciones: [
      { nombre: "2Pac - All Eyez On Me", url: "rap 90's pa/2Pac - All Eyez On Me - Seven Hip-Hop.mp3" },
      { nombre: "2Pac - Hit 'Em Up (Dirty)", url: "rap 90's pa/2Pac - Hit 'Em Up (Dirty) (Music Video) HD - Seven Hip-Hop.mp3" },
      { nombre: "The Notorious B.I.G. - Big Poppa", url: "rap 90's pa/Big Poppa (2007 Remaster) - The Notorious B.I.G..mp3" },
      { nombre: "Dr. Dre - Still D.R.E. ft. Snoop Dogg", url: "rap 90's pa/Dr. Dre - Still D.R.E. ft. Snoop Dogg - DrDreVEVO.mp3" },
      { nombre: "Dr. Dre - The Next Episode ft. Snoop Dogg, Kurupt, Nate Dogg", url: "rap 90's pa/Dr. Dre - The Next Episode (Official Music Video) ft. Snoop Dogg, Kurupt, Nate Dogg - DrDreVEVO.mp3" },
      { nombre: "Eazy E - Boyz-n-the-Hood", url: "rap 90's pa/Eazy E - Boyz-n-the-Hood (Music Video) - TheHipHopSyko.mp3" },
      { nombre: "Eazy E - No More Question's", url: "rap 90's pa/Eazy E - No More Question's - TehRapChannel.mp3" },
      { nombre: "Eazy E - Eazy-Duz-It", url: "rap 90's pa/Eazy-Duz-It - Ruthless Records.mp3" },
      { nombre: "Eazy E - Real Muthaphuckkin G's", url: "rap 90's pa/Eazy-E - Real Muthaphuckkin G's (Music Video) - Creative Hip-Hop.mp3" },
      { nombre: "Eminem - Stan", url: "rap 90's pa/Eminem - Stan (Long Version) ft. Dido - EminemVEVO.mp3" },
      { nombre: "Eminem - The Real Slim Shady", url: "rap 90's pa/Eminem - The Real Slim Shady (Official Video - Clean Version) - EminemVEVO.mp3" },
      { nombre: "Eminem - Without Me", url: "rap 90's pa/Eminem - Without Me (Official Music Video) - EminemVEVO.mp3" },
      { nombre: "Ice Cube - It Was A Good Day", url: "rap 90's pa/Ice Cube - It Was A Good Day - IceCubeVEVO.mp3" },
      { nombre: "Snoop Dogg ft. Pharrell Williams - Drop It Like It's Hot", url: "rap 90's pa/Snoop Dogg - Drop It Like It's Hot (Official Music Video) ft. Pharrell Williams - SnoopDoggVEVO.mp3" }
    ]
  },
  {
    titulo: "Cumbia ",
    imagen: "https://img.freepik.com/vector-premium/ilustracion-texto-cumbia-dibujada-mano_23-2150777894.jpg",
    colorDegradado: "rgba(220, 53, 69, 0.6)",
    canciones: [
      { nombre: "Antonio Rios - Nunca Me Faltes", url: "cumbia clasicos/Antonio Rios - Nunca me Faltes.mp3" },
      { nombre: "Nestor En Bloque - Dejenlá Que Llore", url: "cumbia clasicos/Dejenlá Que Llore.mp3" },
      { nombre: "La Nueva Luna - Hojita Seca", url: "cumbia clasicos/Hojita Seca.mp3" },
      { nombre: "LA DELIO VALDEZ - INOCENTE (Vivo Gran Rex)", url: "cumbia clasicos/LA DELIO VALDEZ - INOCENTE - (Vivo en Gran Rex).mp3" },
      { nombre: "Los Ángeles Azules - Cómo Te Voy A Olvidar", url: "cumbia clasicos/Los Ángeles Azules - Cómo Te Voy A Olvidar (Video Oficial).mp3" },
      { nombre: "Los Ángeles Azules - Nunca Es Suficiente ft. Natalia Lafourcade", url: "cumbia clasicos/Los Ángeles Azules - Nunca Es Suficiente ft. Natalia Lafourcade (Live).mp3" },
      { nombre: "Mario Luis - Voy A Olvidarme De Mí", url: "cumbia clasicos/Mario Luis - Voy A Olvidarme De Mi.mp3" },
      { nombre: "Gilda - No Me Arrepiento De Este Amor", url: "cumbia clasicos/No Me Arrepiento de Este Amor.mp3" },
      { nombre: "Yerba Brava - Pibe Cantina", url: "cumbia clasicos/Pibe Cantina.mp3" },
      { nombre: "Mario Luis - Tu Historia Entre Mis Dedos", url: "cumbia clasicos/Tu Historia Entre Mis Dedos.mp3" },
      { nombre: "Yerba Brava - La Cumbia De Los Trapos", url: "cumbia clasicos/Yerba Brava - La Cumbia de los Trapos.mp3" },
      { nombre: "Amar Azul - Yo Tomo Licor", url: "cumbia clasicos/Yo Tomo Licor.mp3" }
    ]
  },
  {
    titulo: "Heavy Metal Clasicos",
    imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/f8/01/f801e5411aa5550906b439459ef42782.jpg",
    colorDegradado: "rgba(0, 0, 0, 0.6)",
    canciones: [
      { nombre: "Metallica - Blackened", url: "heavy metal clasicos/Blackened (Remastered).mp3" },
      { nombre: "System Of A Down - Chic N' Stu", url: "heavy metal clasicos/Chic 'N' Stu.mp3" },
      { nombre: "Pantera - Floods", url: "heavy metal clasicos/Floods.mp3" },
      { nombre: "Metallica - Harvester Of Sorrow", url: "heavy metal clasicos/Harvester of Sorrow (Remastered).mp3" },
      { nombre: "Judas priest - Breaking The Law", url: "heavy metal clasicos/Judas Priest - Breaking The Law (Official Music Video).mp3" },
      { nombre: "Judas Priest - Night Crawler", url: "heavy metal clasicos/Judas Priest - Night Crawler (Official Audio).mp3" },
      { nombre: "Judas Priest - Painkiller", url: "heavy metal clasicos/Judas Priest - Painkiller.mp3" },
      { nombre: "Metallica - Master Of Puppets", url: "heavy metal clasicos/Master of Puppets (Remastered).mp3" },
      { nombre: "Metallica - Enter Sandman", url: "heavy metal clasicos/Metallica Enter Sandman (Official Music Video).mp3" },
      { nombre: "Metallica - One", url: "heavy metal clasicos/Metallica One (Official Music Video).mp3" },
      { nombre: "Slayer - Raining Blood", url: "heavy metal clasicos/Raining Blood.mp3" },
      { nombre: "Rammstein - Du Hast", url: "heavy metal clasicos/Rammstein - Du Hast (Official 4K Video).mp3" },
      { nombre: "Rammstein - Sonne", url: "heavy metal clasicos/Rammstein - Sonne (Official Video).mp3" },
      { nombre: "Metallica - Seek And Destroy", url: "heavy metal clasicos/Seek & Destroy (Remastered).mp3" },
      { nombre: "System Of A Down - Aerials", url: "heavy metal clasicos/System Of A Down - Aerials (Official HD Video).mp3" },
      { nombre: "System Of A Down - B.Y.O.B.", url: "heavy metal clasicos/System Of A Down - B.Y.O.B. (Official HD Video).mp3" },
      { nombre: "System Of A Down - Chop Suey!", url: "heavy metal clasicos/System Of A Down - Chop Suey! (Official HD Video).mp3" },
      { nombre: "System Of A Down - Cigaro", url: "heavy metal clasicos/System Of A Down - Cigaro (Official Audio).mp3" },
      { nombre: "System Of A Down - I-E-A-I-A-I-O", url: "heavy metal clasicos/System Of A Down - I-E-A-I-A-I-O (Official Audio).mp3" },
      { nombre: "System Of A Down - Toxicity", url: "heavy metal clasicos/System Of A Down - Toxicity (Official HD Video).mp3" }
    ]
  }
];

// --- Objeto Reproductor Unificado ---
const Reproductor = {
    playlist: [],
    index: -1,
    origen: null,

    cargarPlaylist(listaCanciones, origen) {
        this.playlist = listaCanciones;
        this.index = 0;
        this.origen = origen;
        this.reproducir();
        miniReproductor.style.display = "flex";
    },

    reproducir() {
        if (this.playlist.length === 0 || this.index === -1) {
            this.parar();
            return;
        }

        const cancion = this.playlist[this.index];
        let url;
        if (this.origen === "fija") {
            url = cancion.url;
        } else {
            const mp3Local = archivosMP3.find(a => a.name === cancion.nombre);
            if (!mp3Local) {
                alert("Archivo MP3 no encontrado.");
                return;
            }
            url = URL.createObjectURL(mp3Local.file);
        }

        audio.src = url;
        audio.play();
        reproduciendo = true;
        actualizarInfoMiniReproductor();
        actualizarBotonPlayPause();
    },

 
    siguiente() {
        if (this.playlist.length === 0) return;
        if (modoAleatorio) {
            let nuevoIndex;
            do {
                nuevoIndex = Math.floor(Math.random() * this.playlist.length);
            } while (nuevoIndex === this.index && this.playlist.length > 1);
            this.index = nuevoIndex;
        } else {
            this.index = (this.index + 1) % this.playlist.length;
        }
        this.reproducir();
    },

    anterior() {
        if (this.playlist.length === 0) return;
        if (modoAleatorio) {
            this.index = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.index = (this.index - 1 + this.playlist.length) % this.playlist.length;
        }
        this.reproducir();
    },

    parar() {
        audio.pause();
        audio.currentTime = 0;
        reproduciendo = false;
        this.playlist = [];
        this.index = -1;
        this.origen = null;
        actualizarBotonPlayPause();
    }
};

// --- Manejo de IndexedDB para guardar MP3 ---
const DB_NAME = "miunaveDB";
const DB_STORE = "mp3files";
let db;
let archivosMP3 = [];

async function abrirDB() {
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
async function guardarArchivoMP3(file) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, "readwrite");
        const store = tx.objectStore(DB_STORE);
        const req = store.put({ name: file.name, file: file });
        req.onsuccess = () => resolve();
        req.onerror = () => reject("Error guardando archivo");
    });
}
async function obtenerTodosArchivos() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, "readonly");
        const store = tx.objectStore(DB_STORE);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error obteniendo archivos");
    });
}
async function eliminarArchivo(nombre) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, "readwrite");
        const store = tx.objectStore(DB_STORE);
        const request = store.delete(nombre);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Error eliminando archivo");
    });
}
async function cargarArchivosDB() {
    archivosMP3 = await obtenerTodosArchivos();
}

// --- Manejo de LocalStorage para Playlists ---
const STORAGE_PLAYLISTS = "miunave_playlists";
function obtenerPlaylists() {
    const data = localStorage.getItem(STORAGE_PLAYLISTS);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}
function guardarPlaylists(playlists) {
    localStorage.setItem(STORAGE_PLAYLISTS, JSON.stringify(playlists));
}
function crearPlaylist(nombre, urlPortada = "") {
    if (!nombre.trim()) {
        alert("El nombre de la playlist no puede estar vacío");
        return false;
    }
    const playlists = obtenerPlaylists();
    if (playlists.find(p => p.nombre.toLowerCase() === nombre.toLowerCase())) {
        alert("Ya existe una playlist con ese nombre");
        return false;
    }
    playlists.push({
        nombre,
        canciones: [],
        portada: urlPortada
    });
    guardarPlaylists(playlists);
    return true;
}
function eliminarPlaylist(nombre) {
    let playlists = obtenerPlaylists();
    playlists = playlists.filter(p => p.nombre !== nombre);
    guardarPlaylists(playlists);
}
function agregarCancionAPlaylist(nombrePlaylist, nombreCancion) {
    const playlists = obtenerPlaylists();
    const playlist = playlists.find(p => p.nombre === nombrePlaylist);
    if (!playlist) return false;
    if (!playlist.canciones.find(c => c.nombre === nombreCancion)) {
        playlist.canciones.push({ nombre: nombreCancion, url: null });
        guardarPlaylists(playlists);
        return true;
    }
    return false;
}

// --- Funciones de Renderizado ---
function mostrarMP3s(filtro = "") {
    const lista = document.getElementById("listaMP3");
    lista.innerHTML = "";
    const filtrados = archivosMP3.filter(a => a.name.toLowerCase().includes(filtro.toLowerCase()));
    if (filtrados.length === 0) {
        lista.innerHTML = "<li>No hay archivos que coincidan</li>";
        return;
    }
    filtrados.forEach(({ name }) => {
        const li = document.createElement("li");
        li.style.cursor = "pointer";
        li.classList.add("mp3-item");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("mp3-checkbox");
        checkbox.title = "Seleccionar para playlist";

        const texto = document.createElement("span");
        texto.textContent = name;
        texto.style.flex = "1";
        texto.addEventListener("click", () => {
            // Corrige la lógica para cargar todos los MP3 locales en la playlist
            const cancionesLocales = archivosMP3.map(a => ({ nombre: a.name, url: null }));
            const indexSeleccionado = cancionesLocales.findIndex(c => c.nombre === name);
            Reproductor.cargarPlaylist(cancionesLocales, "local");
            Reproductor.index = indexSeleccionado;
            Reproductor.reproducir();
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-2 14H7L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>`;
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.title = "Eliminar archivo";
        btnEliminar.addEventListener("click", async (e) => {
            e.stopPropagation();
            if (confirm(`Eliminar archivo "${name}"?`)) {
                await eliminarArchivo(name);
                await cargarArchivosDB();
                mostrarMP3s(filtro);
                alert(`Archivo "${name}" eliminado`);
            }
        });

        li.appendChild(checkbox);
        li.appendChild(texto);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

window.addEventListener("DOMContentLoaded", async () => {
    await abrirDB();
    await cargarArchivosDB();
    mostrarMP3s();
    renderizarPlaylists();
});


function renderizarPlaylists() {
    playlistsContainer.innerHTML = "";
    const playlistsGuardadas = obtenerPlaylists();
    const todasLasPlaylists = playlists.concat(playlistsGuardadas);
    
    todasLasPlaylists.forEach((pl, index) => {
        const div = document.createElement("div");
        div.className = "playlist-item";
        div.style.backgroundImage = `
            linear-gradient(to top, ${pl.colorDegradado || 'rgba(0,0,0,0.6)'}, transparent),
            url(${pl.imagen || pl.portada || ''})
        `;
        div.innerHTML = `
            <div class="playlist-overlay"></div>
            <div class="playlist-content">
                <h3>${pl.titulo || pl.nombre}</h3>
                <button class="btn-reproducir" data-index="${index}" title="Reproducir Playlist"><i class="fa-solid fa-play"></i></button>
            </div>
        `;

        // Si la playlist es local (no tiene 'titulo'), agregamos botón de eliminar
        if (!pl.titulo) {
            const btnEliminarPL = document.createElement("button");
            btnEliminarPL.innerHTML = `<i class="fa-solid fa-trash"></i>`;
            btnEliminarPL.title = "Eliminar Playlist";
            btnEliminarPL.classList.add("btn-eliminar-playlist");
            btnEliminarPL.addEventListener("click", (e) => {
                e.stopPropagation(); // Evita que se active el play
                if (confirm(`Eliminar playlist "${pl.nombre}"?`)) {
                    eliminarPlaylist(pl.nombre);
                    renderizarPlaylists(); // Volvemos a renderizar
                }
            });
            div.querySelector(".playlist-content").appendChild(btnEliminarPL);
        }

        playlistsContainer.appendChild(div);
    });

    document.querySelectorAll(".btn-reproducir").forEach(btn => {
        btn.addEventListener("click", e => {
            const index = parseInt(e.currentTarget.dataset.index);
            const playlistSeleccionada = todasLasPlaylists[index];
            const origen = playlistSeleccionada.titulo ? "fija" : "local";
            if (origen === "local") {
                playlistSeleccionada.canciones = playlistSeleccionada.canciones.map(c => ({ nombre: c.nombre, url: null }));
            }
            Reproductor.cargarPlaylist(playlistSeleccionada.canciones, origen);
        });
    });
}


function actualizarInfoMiniReproductor() {
    if (Reproductor.playlist.length === 0) {
        miniReproductor.style.display = "none";
        return;
    }
    const cancion = Reproductor.playlist[Reproductor.index];
    let tituloOrigen = Reproductor.origen === "fija" ? "Playlist" : "MP3 Local";
    nombrePlaylistElem.textContent = `${tituloOrigen} — ${cancion.nombre}`;
    listaCancionesElem.innerHTML = "";
    Reproductor.playlist.forEach((c, i) => {
        const li = document.createElement("li");
        li.textContent = c.nombre;
        if (i === Reproductor.index) {
            li.style.fontWeight = "bold";
            li.style.color = body.classList.contains("modo-oscuro") ? "#a020f0" : "#0a3d91";
        }
        li.addEventListener("click", () => {
            Reproductor.index = i;
            Reproductor.reproducir();
        });
        listaCancionesElem.appendChild(li);
    });
}
function actualizarBotonPlayPause() {
    btnPlayPause.innerHTML = reproduciendo ? `<i class="fa-solid fa-pause"></i>` : `<i class="fa-solid fa-play"></i>`;
}
function aplicarColoresModo() {
    if (body.classList.contains("modo-oscuro")) {
        btnShuffle.style.color = modoAleatorio ? "#a020f0" : "";
        btnLoop.style.color = modoLoop ? "#a020f0" : "";
    } else {
        btnShuffle.style.color = modoAleatorio ? "#0a3d91" : "";
        btnLoop.style.color = modoLoop ? "#0a3d91" : "";
    }
}
function cargarSelectPlaylists() {
    const selectPlaylists = document.getElementById("selectPlaylists");
    if (!selectPlaylists) return;
    selectPlaylists.innerHTML = `<option value="">-- Seleccioná playlist --</option>`;
    const playlistsGuardadas = obtenerPlaylists();
    playlistsGuardadas.forEach(({ nombre }) => {
        const option = document.createElement("option");
        option.value = nombre;
        option.textContent = nombre;
        selectPlaylists.appendChild(option);
    });
}



// --- Eventos del Reproductor ---
btnNext.addEventListener("click", () => Reproductor.siguiente());
btnPrev.addEventListener("click", () => Reproductor.anterior());
btnPlayPause.addEventListener("click", () => {
    if (reproduciendo) {
        audio.pause();
    } else {
        audio.play();
    }
});
audio.addEventListener("ended", () => {
    if (!modoLoop) { 
        Reproductor.siguiente();
    } else { 
        audio.currentTime = 0;
        audio.play();
    }
});

audio.addEventListener("pause", () => {
    reproduciendo = false;
    actualizarBotonPlayPause();
});
audio.addEventListener("play", () => {
    reproduciendo = true;
    miniReproductor.style.display = "flex";
    actualizarBotonPlayPause();
});
audio.addEventListener("timeupdate", () => {
    const progresoActual = (audio.currentTime / audio.duration) * 100 || 0;
    barraProgreso.style.width = progresoActual + "%";
});

btnLoop.addEventListener("click", () => {
  modoLoop = !modoLoop;
  if (modoLoop) {
    btnLoop.style.color = body.classList.contains("modo-oscuro") ? "#a020f0" : "#0a3d91";
  } else {
    btnLoop.style.color = "";
  }
});

// Seleccionamos los elementos del control de volumen

const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');

// Inicializamos volumen
audio.volume = 1;

// Cambiar volumen desde el slider
volumeSlider.addEventListener('input', () => {
  audio.volume = parseFloat(volumeSlider.value);

  if (audio.volume === 0) {
    muteBtn.textContent = '🔇';
  } else {
    muteBtn.textContent = '🔊';
  }
});

// Mute / Unmute con el botón
muteBtn.addEventListener('click', () => {
  if (audio.volume > 0) {
    audio.dataset.lastVolume = audio.volume; // guardamos el volumen anterior
    audio.volume = 0;
    volumeSlider.value = 0;
    muteBtn.textContent = '🔇';
  } else {
    const lastVolume = audio.dataset.lastVolume || 1;
    audio.volume = lastVolume;
    volumeSlider.value = lastVolume;
    muteBtn.textContent = '🔊';
  }
});


const barraProgresoContainer = document.getElementById("barraProgresoContainer");
barraProgresoContainer.addEventListener("click", e => {
    const rect = barraProgresoContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const nuevoPorcentaje = clickX / rect.width;
    audio.currentTime = nuevoPorcentaje * audio.duration;
});

btnShuffle.addEventListener("click", () => {
  modoAleatorio = !modoAleatorio;
  aplicarColoresModo();
});

btnDownload.addEventListener("click", () => {
    if (Reproductor.index === -1) {
        alert("No hay una canción en reproducción para descargar.");
        return;
    }

    const cancionActual = Reproductor.playlist[Reproductor.index];

    // Lógica para descargar archivos locales 
    if (Reproductor.origen === "local") {
        const mp3Local = archivosMP3.find(a => a.name === cancionActual.nombre);
        if (mp3Local && mp3Local.file) {
            const url = URL.createObjectURL(mp3Local.file);
            const a = document.createElement('a');
            a.href = url;
            a.download = can36cionActual.nombre;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            alert(`Descargando: ${cancionActual.nombre}`);
        } else {
            alert("No se pudo encontrar el archivo local para descargar.");
        }
    } 
  
    else if (Reproductor.origen === "fija") {
        const a = document.createElement('a');
        a.href = cancionActual.url;
        a.download = cancionActual.nombre + ".mp3";
        a.target = "_blank"; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        alert(`Descargando: ${cancionActual.nombre}`);
    } else {
        alert("No se puede descargar esta canción.");
    }
});

btnMenuCanciones.addEventListener("click", () => {
    if (Reproductor.playlist.length === 0) return;
    menuCanciones.style.display = "flex";
    listaMenuCanciones.innerHTML = "";
    Reproductor.playlist.forEach((c, i) => {
        const li = document.createElement("li");
        li.textContent = c.nombre;
        if (i === Reproductor.index) li.classList.add("activa");
        li.addEventListener("click", () => {
            Reproductor.index = i;
            Reproductor.reproducir();
            menuCanciones.style.display = "none";
        });
        listaMenuCanciones.appendChild(li);
    });
});
btnCerrarMenu.addEventListener("click", () => menuCanciones.style.display = "none");

const btnCargarCarpeta = document.getElementById("btnCargarCarpeta");
const inputFolder = document.getElementById("inputFolder");
const inputMP3 = document.getElementById("inputMP3");
btnCargarCarpeta.addEventListener("click", () => inputFolder.click());
inputFolder.addEventListener("change", async (e) => {
    const files = Array.from(e.target.files);
    let mp3Count = 0;
    for (const file of files) {
        if (file.type === "audio/mpeg" || file.name.toLowerCase().endsWith(".mp3")) {
            await guardarArchivoMP3(file);
            mp3Count++;
        }
    }
    await cargarArchivosDB();
    mostrarMP3s();
    inputFolder.value = "";
    alert(`Se cargaron ${mp3Count} archivos MP3.`);
});
inputMP3.addEventListener("change", async (e) => {
    const files = Array.from(e.target.files);
    let mp3Count = 0;
    for (const file of files) {
        if (file.type === "audio/mpeg" || file.name.toLowerCase().endsWith(".mp3")) {
            await guardarArchivoMP3(file);
            mp3Count++;
        }
    }
    if (mp3Count === 0) {
        alert("No se cargó ningún archivo MP3 válido.");
    } else {
        await cargarArchivosDB();
        mostrarMP3s();
        alert(`Se cargaron ${mp3Count} archivo(s) MP3.`);
    }
    inputMP3.value = "";
});
const btnCrearPlaylist = document.getElementById("btnCrearPlaylist");
const inputNombrePlaylist = document.getElementById("inputNombrePlaylist");
if (btnCrearPlaylist && inputNombrePlaylist) {
    btnCrearPlaylist.addEventListener("click", () => {
        const nombre = inputNombrePlaylist.value.trim();
        if (crearPlaylist(nombre)) {
            inputNombrePlaylist.value = "";
            renderizarPlaylists();
            cargarSelectPlaylists();
            alert(`Playlist "${nombre}" creada!`);
        }
    });
}
const btnAgregarSeleccionados = document.getElementById("btnAgregarSeleccionados");
const selectPlaylists = document.getElementById("selectPlaylists");
if (btnAgregarSeleccionados && selectPlaylists) {
    btnAgregarSeleccionados.addEventListener("click", () => {
        const checkboxes = document.querySelectorAll(".mp3-checkbox:checked");
        if (checkboxes.length === 0) {
            alert("Seleccioná al menos una canción para agregar");
            return;
        }
        const playlistNombre = selectPlaylists.value;
        if (!playlistNombre) {
            alert("Seleccioná una playlist para agregar las canciones");
            return;
        }
        let agregadoAlgo = false;
        checkboxes.forEach(cb => {
            const li = cb.parentElement;
            const nombreCancion = li.querySelector("span").textContent;
            if (agregarCancionAPlaylist(playlistNombre, nombreCancion)) {
                agregadoAlgo = true;
            }
        });
        if (agregadoAlgo) {
            alert(`Canciones agregadas a la playlist "${playlistNombre}"`);
            renderizarPlaylists();
        } else {
            alert("Las canciones ya estaban en la playlist");
        }
        checkboxes.forEach(cb => cb.checked = false);
    });
}
const busquedaInput = document.getElementById("busquedaMP3");
if (busquedaInput) {
    busquedaInput.addEventListener("input", (e) => {
        mostrarMP3s(e.target.value);
    });
}
const botonDescargas = document.getElementById("botonDescargas");
if (botonDescargas) {
    botonDescargas.addEventListener("click", async () => {
        await cargarArchivosDB();
        mostrarMP3s();
    });
}

// Obtiene una referencia al botón de borrado masivo
const btnEliminarTodo = document.getElementById("eliminarTodoMP3");

// Función para borrar todos los archivos MP3 del IndexedDB
async function eliminarTodosLosArchivos() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(DB_STORE, "readwrite");
        const store = tx.objectStore(DB_STORE);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Error eliminando todos los archivos.");
    });
}

// Evento para el botón de borrado masivo
btnEliminarTodo.addEventListener("click", async () => {
    if (confirm("¿Estás seguro de que quieres eliminar TODOS los archivos MP3 locales? Esta acción es irreversible.")) {
        try {
            await eliminarTodosLosArchivos();
            await cargarArchivosDB(); 
            mostrarMP3s(); 
            alert("Todos los archivos MP3 han sido eliminados.");
            if (Reproductor.origen === "local") {
                Reproductor.parar(); 
            }
        } catch (error) {
            console.error("Error al eliminar los archivos:", error);
            alert("Hubo un error al intentar eliminar los archivos.");
        }
    }
});

const chatSection = document.getElementById("chatSection");
const chatUsers = document.querySelectorAll(".chat-user");
const chatHeader = document.getElementById("chatHeader");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendMsgBtn = document.getElementById("sendMsgBtn");
let chatActual = null;
chatUsers.forEach(user => {
    user.addEventListener("click", () => {
        chatActual = user.dataset.user;
        chatHeader.textContent = `Chat con ${user.querySelector("span").textContent}`;
        cargarMensajes(chatActual);
    });
});
sendMsgBtn.addEventListener("click", () => {
    const texto = chatInput.value.trim();
    if (!texto || !chatActual) return;
    guardarMensaje(chatActual, "enviado", texto);
    mostrarMensaje("enviado", texto);
    chatInput.value = "";
});
chatInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMsgBtn.click();
    }
});
function cargarMensajes(usuario) {
    chatMessages.innerHTML = "";
    const historial = JSON.parse(localStorage.getItem("chat_" + usuario)) || [];
    historial.forEach(msg => {
        mostrarMensaje(msg.tipo, msg.texto);
    });
}
function mostrarMensaje(tipo, texto) {
    const div = document.createElement("div");
    div.className = `mensaje ${tipo}`;
    div.textContent = texto;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
function guardarMensaje(usuario, tipo, texto) {
    const historial = JSON.parse(localStorage.getItem("chat_" + usuario)) || [];
    historial.push({
        tipo,
        texto
    });
    localStorage.setItem("chat_" + usuario, JSON.stringify(historial));
}

// ----------------------
// Lógica arreglada modo / menu / login
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const configBtn = document.getElementById('configBtn');
  const menuConfig = document.getElementById('menuConfig');
  const toggleModo = document.getElementById('toggleModo');
  const btnAbrirLogin = document.getElementById('btnAbrirLogin');
  const loginFormContainer = document.getElementById('loginFormContainer');
  const emailInput = document.getElementById('email');

  // Safety: si no existen elementos, salimos sin romper todo
  if (!configBtn || !menuConfig || !toggleModo) {
    // No hay elementos críticos, nada que hacer
    return;
  }

  // Helper: mostrar / ocultar por inline style (no toca clases)
  const toggleDisplay = (el, display = 'block') => {
    if (!el) return false;
    const shown = el.style.display === display;
    el.style.display = shown ? 'none' : display;
    return !shown;
  };

  // --- Restaurar modo desde localStorage (clave: "modo") ---
  const modoGuardado = localStorage.getItem('modo'); // 'oscuro' o 'claro' o null
  if (modoGuardado === 'oscuro') {
    body.classList.add('modo-oscuro');
    body.classList.remove('modo-claro');
    toggleModo.textContent = 'Cambiar a Modo Claro';
  } else {
    body.classList.remove('modo-oscuro');
    body.classList.add('modo-claro');
    toggleModo.textContent = 'Cambiar a Modo Oscuro';
  }

  // Si existe la función aplicarColoresModo, llamarla (protección)
  if (typeof aplicarColoresModo === 'function') aplicarColoresModo();

  // --- Abrir/ocultar menú al clic en la ruedita ---
  configBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const opened = toggleDisplay(menuConfig, 'block');
    configBtn.setAttribute('aria-expanded', String(opened));
    if (opened) {
      // foco al primer control visible para accesibilidad
      const primerControl = menuConfig.querySelector('button, input, [tabindex]');
      if (primerControl) primerControl.focus();
    } else {
      // si cerramos el menú, también cerramos el formulario de login
      if (loginFormContainer) loginFormContainer.style.display = 'none';
    }
  });

  // Evitar que clicks dentro del menú lo cierren (listener global)
  menuConfig.addEventListener('click', (ev) => ev.stopPropagation());

  // --- Toggle modo (único listener, consistente y guarda en localStorage) ---
  toggleModo.addEventListener('click', () => {
    const isOscuro = body.classList.toggle('modo-oscuro'); // si quedó activa
    body.classList.toggle('modo-claro', !isOscuro);
    toggleModo.textContent = isOscuro ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
    localStorage.setItem('modo', isOscuro ? 'oscuro' : 'claro');
    if (typeof aplicarColoresModo === 'function') aplicarColoresModo();
  });

  // --- Mostrar/ocultar formulario login dentro del menú ---
  if (btnAbrirLogin && loginFormContainer) {
    btnAbrirLogin.addEventListener('click', (e) => {
      e.stopPropagation();
      const opened = toggleDisplay(loginFormContainer, 'block');
      if (opened && emailInput) setTimeout(() => emailInput.focus(), 50);
    });
  }

  // --- Cerrar menú / formulario si se clickea fuera ---
  document.addEventListener('click', (e) => {
    if (!menuConfig.contains(e.target) && e.target !== configBtn) {
      menuConfig.style.display = 'none';
      configBtn.setAttribute('aria-expanded', 'false');
      if (loginFormContainer) loginFormContainer.style.display = 'none';
    }
  });

  // --- Cerrar con ESC ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (loginFormContainer && loginFormContainer.style.display === 'block') {
        loginFormContainer.style.display = 'none';
      } else if (menuConfig && menuConfig.style.display === 'block') {
        menuConfig.style.display = 'none';
        configBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
});


document.querySelectorAll(".btn-nav").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".btn-nav").forEach(b => b.classList.remove("activo"));
        boton.classList.add("activo");
        document.querySelectorAll("main.contenido > section").forEach(seccion => seccion.classList.add("seccion-oculta"));
        document.getElementById(boton.getAttribute("data-seccion")).classList.remove("seccion-oculta");
        const chatSection = document.getElementById("chatSection");
        if (boton.getAttribute("data-seccion") === "chats") {
            chatSection.style.display = "block";
        } else {
            chatSection.style.display = "none";
        }
        aplicarColoresModo();
    });
});


  document.addEventListener('DOMContentLoaded', () => {
    const audioElement = document.getElementById('audio');

    // 🎧 Creamos el contexto de audio y los nodos de ecualización
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audioElement);

    const bassEQ = audioCtx.createBiquadFilter();
    bassEQ.type = "lowshelf";
    bassEQ.frequency.value = 60;

    const midEQ = audioCtx.createBiquadFilter();
    midEQ.type = "peaking";
    midEQ.Q.value = Math.SQRT1_2;
    midEQ.frequency.value = 1000;

    const trebleEQ = audioCtx.createBiquadFilter();
    trebleEQ.type = "highshelf";
    trebleEQ.frequency.value = 12000;

    const gainNode = audioCtx.createGain();

    // 🔗 Conectamos: fuente → filtros → ganancia → salida
    source.connect(bassEQ);
    bassEQ.connect(midEQ);
    midEQ.connect(trebleEQ);
    trebleEQ.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // 🎚️ Controladores de ecualizador
    const bassControl = document.getElementById('bass');
    const midControl = document.getElementById('mid');
    const trebleControl = document.getElementById('treble');

    bassControl.addEventListener('input', () => {
      bassEQ.gain.value = parseFloat(bassControl.value);
    });

    midControl.addEventListener('input', () => {
      midEQ.gain.value = parseFloat(midControl.value);
    });

    trebleControl.addEventListener('input', () => {
      trebleEQ.gain.value = parseFloat(trebleControl.value);
    });

    // 🌀 Importante: activar el contexto al reproducir
    audioElement.addEventListener('play', () => {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    });
  });

// AJAX login/registro a miunave.php
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const submitBtn = loginForm?.querySelector('button[type="submit"]');

  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn) submitBtn.disabled = true;

    const formData = new FormData(loginForm);

    try {
      const res = await fetch('miunave.php', {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: formData,
        credentials: 'same-origin'
      });

      if (!res.ok) {
        // lectura tentativa del body para mostrar error
        const txt = await res.text().catch(() => '');
        console.error('Respuesta inesperada:', res.status, txt);
        mostrarError('Error del servidor. Código: ' + res.status);
        return;
      }

      const data = await res.json().catch(() => null);
      if (!data) {
        mostrarError('Respuesta inválida del servidor.');
        return;
      }

      if (data.success) {
        // cerrar menú y mostrar username en UI
        cerrarMenuLogin(); // función que ya tenés o definí
        mostrarUsuarioEnUI(data.user.username || document.getElementById('username').value);
        mostrarToast(data.msg || 'Bienvenido');
      } else {
        mostrarError(data.msg || 'Login fallido');
      }

    } catch (err) {
      console.error(err);
      mostrarError('No se pudo conectar al servidor.');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  // funciones placeholder: adaptalas a tu UI
  function cerrarMenuLogin() {
    const menu = document.getElementById('menuConfig');
    const loginContainer = document.getElementById('loginFormContainer');
    if (menu) menu.style.display = 'none';
    if (loginContainer) loginContainer.style.display = 'none';
    document.getElementById('configBtn')?.setAttribute('aria-expanded', 'false');
  }
  function mostrarUsuarioEnUI(username) {
    const icon = document.querySelector('.config-icon');
    if (icon) icon.innerHTML = `<span class="usuario-nombre">${escapeHtml(username)}</span>`;
  }
  function mostrarError(msg) { alert(msg); }
  function mostrarToast(msg) { console.log(msg); }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
});

// Inicialización
async function inicializar() {
    await abrirDB();
    await cargarArchivosDB();
    renderizarPlaylists();
    cargarSelectPlaylists();
    aplicarColoresModo();
    miniReproductor.style.display = "none";
}
window.addEventListener("load", inicializar);
