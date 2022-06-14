function actualizarSaldo(div, elemento){
    if(div){
        div.innerHTML = ""
    }
    div.innerHTML += `
        <div class="card-body conteiner" id="divUsuario">
            <h5 class="card-title">Nombre: ${elemento.nombre} ${elemento.apellido}</h5>
            <p class="card-text">DNI: ${elemento.dni}</p>
            <p class="card-text">Saldo: $${elemento.saldo}</p>
        </div>
        <br>
        <div>
        <p class="texto">Ingrese la operacion a realizar</p>
        <input id= "ingreso" type="number">
        <button class="btn btn-link boton" id="botonSuma">Sumar</button>
        <button class="btn btn-link boton" id ="botonResta">Restar</button>
        </div>
        `
        sumaRestaSaldo()
}

function sumaRestaSaldo(){
    let botonResta = document.getElementById("botonResta")
    let botonSuma = document.getElementById("botonSuma")
    let ingreso = document.getElementById("ingreso")
    botonSuma.addEventListener('click', () =>  {
        const dinero = parseInt(ingreso.value)
        personas.map(persona => {
            if(persona.dni=== parseInt(user.value)){persona.saldo+=dinero
                console.log(persona.saldo)
                let personaActiva = personas.find(persona => persona.dni === parseInt(user.value))
                actualizarSaldo(divUsuario, personaActiva)
                let arrayAux = [{dni:persona.dni}, {saldo:persona.saldo}]
                let personaJSON = JSON.stringify(arrayAux)
                localStorage.setItem("saldoActualizado", personaJSON)
                let personaParse = JSON.parse(localStorage.getItem("saldoActualizado"))
                console.log(personaParse)
                
                
                
            }Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Saldo Actualizado',
                showConfirmButton: false,
                timer: 1500
              })
            
        })
    })
    botonResta.addEventListener('click', () => {
        const dinero = parseInt(ingreso.value)
        personas.map(persona => {
            if(persona.dni===parseInt(user.value)){persona.saldo-=dinero
                console.log(persona.saldo)
                let personaActiva = personas.find(persona => persona.dni === parseInt(user.value))
                actualizarSaldo(divUsuario, personaActiva)
                let arrayAux = [{dni:persona.dni}, {saldo:persona.saldo}]
                let personaJSON = JSON.stringify(arrayAux)
                localStorage.setItem("saldoActualizado", personaJSON)
                let personaParse = JSON.parse(localStorage.getItem("saldoActualizado"))
                console.log(personaParse)

            }Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Saldo Actualizado!',
                showConfirmButton: false,
                timer: 1500
              })
        })
            
    })
}


let divUsuario = document.getElementById("divUsuario")
let user = document.getElementById("user")
let userPassword = document.getElementById("userPassword")
let formulario2 = document.getElementById('login')

class Persona {
    constructor(nombre, apellido, dni, contrasena, saldo){
        this.nombre = nombre
        this.apellido = apellido
        this.dni = parseInt(dni)
        this.contrasena = contrasena
        this.saldo = parseInt(saldo)
    }
}

const persona1 = new Persona("Ignacio", "Ramon", 42249095, "123456", 10000)
const persona2 = new Persona("Jorge", "Perez", 41142456, "qwerty", 5000)
const persona3 = new Persona("Pedro", "Sanchez", 42132978, "asdfgh", 15000)
const persona4 = new Persona("Juan", "Perez", 42566780, "67890", 12000)

let personas = []

fetch('clientes.json')
                .then(response => response.json())
                    .then(cargaPersonas => {
                        console.log(cargaPersonas)
                        cargaPersonas.forEach(humano => {
                            console.log(humano)
                            personas.push(new Persona(humano.nombre, humano.apellido, humano.dni, humano.contrasena, humano.saldo))})
                            if (localStorage.getItem("Persona")){
                                const personaNueva=JSON.parse(localStorage.getItem('Persona'))
                                personas.push(new Persona (personaNueva.nombre,personaNueva.apellido,personaNueva.dni,personaNueva.contrasena,personaNueva.saldo))
                            }
                        
                    })    

formulario2.addEventListener('submit', (event) => {
    event.preventDefault()
    let dataForm = new FormData(event.target)
        if(!isNaN(dataForm.get('user')) && (dataForm.get('userPassword') !="")){
            if(personas.find(cliente => (cliente.dni === parseInt(dataForm.get('user'))) && (cliente.contrasena == dataForm.get('userPassword')))){
                Swal.fire({
                    title: 'Sesion Iniciada',
                    icon: 'success',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    }
                  })
                let personaActiva = personas.find(persona => persona.dni === parseInt(user.value))
                actualizarSaldo(divUsuario, personaActiva)
                console.log(personaActiva)
                 
    
               }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El DNI no esta registrado',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
            }
        }else{
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario no esta registrado',
            footer: '<a href="">Why do I have this issue?</a>'
          })
              
        }
    
})