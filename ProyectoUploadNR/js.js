
var sujetos = [];


// Objeto representando un sujeto con información predeterminada
var sujetos = [
    {
        nombre: "David Choak",
        tipo: "descargado",
        Culpabilidad: "perpetrador",
        dondeVive: "Lake View",
        fechaDescarga: "10/10/2020",
        urlImagen: "https://www.themoviedb.org/t/p/w500/b4imZtShd4kK6xFu2ccuPd0fqXA.jpg",
        comentarios: "Líder de la banda"
    }
];




window.onload = function () {
    localStoragUp();
    verPersonas();
    document.getElementById("nombre").addEventListener("click", function (event) {
        if (event.target.classList.contains("subject")) {
            var sujeto = sujetos.find(function (s) {
                return s.nombre === event.target.querySelector("p").innerText;
            });

            if (sujeto) {
                mostrarEdicion(sujeto);
            }
        }
    });
    document.getElementById("guardarCambios").addEventListener("click", guardarCambios);
    mostrarFecha();
};

// Intenta obtener y parsear los datos almacenados en localStorage

function localStoragUp() {
    var storedSujetos = localStorage.getItem("sujetos");
    if (storedSujetos) {
        try {
            sujetos = JSON.parse(storedSujetos);
        } catch (error) {
            console.error("Error al analizar los datos del localStorage:", error);
        }
    }
}






 // Alterna la visibilidad del formulario de añadir (muestra/oculta)
function aform() {
    
    var botonA = document.getElementById("botonAgregar");
     var botonO = document.getElementById("cambiarfondo");
    botonA.style.display = "none";
    botonO.style.display = "none";

    var form = document.getElementById("anadirFormulario");

if (form.style.display === "none" ||form.style.display === "") {
    form.style.display = "block";
}else{
    form.style.display = "none"
}


    var container = document.getElementById("container");
  container.style.display = form.style.display === "block" ? "none" : "grid";

 
   
}

// Obtiene los valores del formulario y crea un nuevo objeto sujeto
    // Luego, lo agrega al arreglo 'sujetos', actualiza localStorage y actualiza la interfaz
    // Finalmente, reinicia los valores del formulario

    function guardarSujeto() {
        var nombre = document.getElementById("nombre").value;
        var tipo = document.getElementById("tipo").value;
        var dondeVive = document.getElementById("dondeVive").value;
        var fechaDescarga = document.getElementById("fechaDescarga").value;
        var Culpabilidad = document.getElementById("Culpabilidad").value;
        var urlImagen = document.getElementById("urlImagen").value;
        var comentarios = document.getElementById("comentarios").value;
    
        if (nombre === "" || tipo === "" || dondeVive === "" || (tipo === "descargado" && fechaDescarga === "") || Culpabilidad === "") {
            alert("Complete los campos");
        } else {
            var nuevoSujeto = {
                nombre: nombre,
                tipo: tipo,
                dondeVive: dondeVive,
                fechaDescarga: fechaDescarga,
                Culpabilidad: Culpabilidad,
                urlImagen: urlImagen,
                comentarios: comentarios
            };
    
            sujetos.push(nuevoSujeto);
    
           
            localStorage.setItem('sujetos', JSON.stringify(sujetos));
    
            verPersonas();
           
          
            document.getElementById("nombre").value = "";
            document.getElementById("tipo").value = "descargado";
            document.getElementById("dondeVive").value = "";
            document.getElementById("fechaDescarga").value = "";
            document.getElementById("Culpabilidad").value = "candidato";
            document.getElementById("urlImagen").value = "";
            document.getElementById("comentarios").value = "";
    
         
    
            aform();
    
            var botonA = document.getElementById("botonAgregar");
            var botonO = document.getElementById("cambiarfondo");
           botonA.style.display = "block";
           botonO.style.display = "block";
        }
    }
    



//Función para mostrar la pantalla de imagen de fondo y ocultar elementos relacionados.
function mostrarImagen() {
    var imagenFondo = document.getElementById("imagenFondo");
    var volverBoton = document.getElementById("volver");
    var boton = document.getElementById("botonAgregar");
    var contenedorB = document.getElementById("contenedorB");
  
    var container = document.getElementById("container");

    container.style.display = "none";
    contenedorB.style.display = "none";
    imagenFondo.style.display = "block";
    volverBoton.style.display = "block";
    document.body.style.overflow = 'hidden';
    cambiarfondo.style.display = "none";
    boton.style.display = "none";
}


//Función para volver a la visualización principal desde la pantalla de imagen de fondo.

function volver() {
    var imagenFondo = document.getElementById("imagenFondo");
    var volver = document.getElementById("volver");
    var boton = document.getElementById("botonAgregar");

    var container = document.getElementById("container");
    var formu = document.getElementById("anadirFormulario");

   
    imagenFondo.style.display = "none";
    volver.style.display = "none";
    document.body.style.overflow = 'auto';
    cambiarfondo.style.display = "block";
    boton.style.display = "block";
    container.style.display = "grid";
    formu.style.display = "none";
    verPersonas();
}

//Función para visualizar la lista de sujetos en la interfaz
function verPersonas() {
    var container = document.getElementById("container");
    container.innerHTML = "";

    sujetos.forEach(function (sujeto) {
        var subjectDiv = document.createElement("div");
        subjectDiv.classList.add("subject", sujeto.tipo);
        subjectDiv.style.width = "200px";
        subjectDiv.style.margin = "20px";
        subjectDiv.style.textAlign = "center";

        var imagen = document.createElement("img");
        imagen.onerror = function () {
            imagen.src = 'https://static.vecteezy.com/system/resources/previews/020/911/750/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png';
        };
        imagen.src = sujeto.urlImagen;
        imagen.alt = "Imagen de " + sujeto.nombre;
        imagen.style.maxWidth = "100%";

        var nombreP = document.createElement("p");
        nombreP.style.color = colorNaranja(sujeto.Culpabilidad);
        nombreP.innerText = sujeto.nombre;

        

        subjectDiv.appendChild(imagen);
        subjectDiv.appendChild(nombreP);
       

        container.appendChild(subjectDiv);

        var editarButton = document.createElement("button");
        editarButton.innerText = "Editar";
        editarButton.classList.add("editar-button");
        editarButton.addEventListener("click", function () {
            mostrarEdicion(sujeto);
        });
        subjectDiv.appendChild(editarButton);

       
    });
}



//Función para mostrar u ocultar el campo de fecha de descarga según el tipo seleccionado.
function mostrarFecha() {
    const tipoSelect = document.getElementById('tipo');
    const fechaDescargaInput = document.getElementById('fechaDescarga');
    fechaDescargaInput.disabled = tipoSelect.value !== 'descargado';
    document.getElementById('tipo').addEventListener('change', mostrarFecha);
}

//Muestra el formulario de edición con la información del sujeto seleccionado
function mostrarEdicion(sujeto) {
    
    var formularioEditar = document.getElementById("contenedorB");
    var container = document.getElementById("anadirFormulario");
    var editarform = document.getElementById("formularioEditar");
    var contenedor = document.getElementById("container");
    var botonA = document.getElementById("botonAgregar");
    var botonO = document.getElementById("cambiarfondo")

  
   seleccion(sujeto);
  
   formularioEditar.style.display = "block";
    container.style.display = "none";
    editarform.style.display = "block";
    contenedor.style.display = "none";
    botonA.style.display = "none";
    botonO.style.display = "none"
}


//Función para llenar el formulario de edición con la información del sujeto seleccionado.
function seleccion(sujeto) {
    
    document.getElementById("nombreEditar").value = sujeto.nombre;
    document.getElementById("tipoEditar").value = sujeto.tipo;
    document.getElementById("ubicacionEditar").value = sujeto.dondeVive;
    document.getElementById("fechaEditar").value = sujeto.fechaDescarga;
    document.getElementById("CulpabilidadEditar").value = sujeto.Culpabilidad;
    document.getElementById("urlEditar").value = sujeto.urlImagen;
    document.getElementById("comentariosEditar").value = sujeto.comentarios;

}



// Función para guardar los cambios realizados en un sujeto editado.

function guardarEditados() {
    var nombre = document.getElementById("nombreEditar").value;

    if (nombre !== "") {
    
        var sujeto = sujetos.find(function (s) {
            return s.nombre === nombre;
        });

        if (sujeto) {
            sujeto.tipo = document.getElementById("tipoEditar").value;
            sujeto.dondeVive = document.getElementById("ubicacionEditar").value;
            sujeto.fechaDescarga = document.getElementById("fechaEditar").value;
            sujeto.Culpabilidad = document.getElementById("CulpabilidadEditar").value;
            sujeto.urlImagen = document.getElementById("urlEditar").value;
            sujeto.comentarios = document.getElementById("comentariosEditar").value;


            localStorage.setItem("sujetos", JSON.stringify(sujetos));

      
            verPersonas();

            var formularioEditar = document.getElementById("formularioEditar");
            var container = document.getElementById("container");
            formularioEditar.style.display = "none";
            container.style.display = "grid";
            var botonA = document.getElementById("botonAgregar");
            var botonO = document.getElementById("cambiarfondo");
            botonA.style.display = "block"
            botonO.style.display = "block"
            borrarF();
        }else{
            alert("El nombre no puede ser modificado");
            
        }
    }
}


// Reinicia los valores del formulario de añadir

function borrarF() {

    document.getElementById("nombre").value = "";
    document.getElementById("tipo").value = "descargado";
    document.getElementById("dondeVive").value = "";
    document.getElementById("fechaDescarga").value = "";
    document.getElementById("Culpabilidad").value = "candidato";
    document.getElementById("urlImagen").value = "";
    document.getElementById("comentarios").value = "";
}

// Devuelve un color basado en la culpabilidad del sujeto

function colorNaranja(culpabilidad) {
    if (culpabilidad === "perpetrador") {
        return "red";
    } else if (culpabilidad === "colaborador") {
        return "orange";
    } else {
        return "green";
    }
}





