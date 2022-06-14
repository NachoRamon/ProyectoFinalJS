let formulario = document.getElementById('idForm')


formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    let dataForm = new FormData(event.target)
    const usuarioNuevo=new Persona(dataForm.get('nombre'),dataForm.get('apellido'),dataForm.get('dni'),dataForm.get('password'),0)
    localStorage.setItem("Persona",JSON.stringify(usuarioNuevo))
    
})