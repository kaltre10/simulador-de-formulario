window.addEventListener('load', () => {
    let app = document.getElementById('app');
    let preLoader = document.querySelector('.pre-loader'); 
    preLoader.style.display = 'none';
    app.style.display = 'grid';
    

    let correo = document.getElementById('correo');
    let titulo = document.getElementById('titulo');
    let mensaje = document.getElementById('mensaje');
    let form = document.getElementById('form');
    let btnEnviar = document.getElementById('btn-enviar');

    correo.addEventListener('blur', validarFormulario);
    titulo.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    form.addEventListener('submit', enviandoForm);
    btnEnviar.disable = false;

});

function validarFormulario(e){

    if(e.target.id === 'correo'){
        let ExpReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if(ExpReg.test(e.target.value)){
            removeInputError(e.target.id);
        }else if(!e.target.nextElementSibling){
            addInputError('correo invalido', e.target.id);
        }

    }else{

        if(e.target.value.length == 0 && !e.target.nextElementSibling){
            addInputError('campo requerido', e.target.id);
        }
    
        if(e.target.value.length > 0){
            removeInputError(e.target.id);
        }    

    }

    verificarForm();

}

function addInputError(mensaje, etiqueta){

    let $input = document.getElementById(etiqueta);
    $input.setAttribute('class','input-error');
    let $divError = document.createElement('div');
    let $p = document.createElement('p');
    $p.textContent = mensaje; 
    $divError.setAttribute('class', 'error');
    $divError.appendChild($p);
    $input.after($divError);

}

function removeInputError(etiqueta){
    let $input = document.getElementById(etiqueta);
    if($input.nextElementSibling){
        $input.nextElementSibling.remove();
        $input.classList.remove('input-error');
    }
}

function enviandoForm(e){
    e.preventDefault();
    let btnEnviar = document.getElementById('btn-enviar');
    if(btnEnviar.disable){
        btnEnviar.style.cursor = 'no-alloweb';
        btnEnviar.textContent = '';
        let divLoader = document.createElement('div');
        let div = document.createElement('div');
        divLoader.setAttribute('class', 'lds-ripple-btn');
        divLoader.appendChild(div);
        divLoader.appendChild(div);
        btnEnviar.appendChild(divLoader);
        setTimeout(() => {
            btnEnviar.removeChild(btnEnviar.children[0])
            btnEnviar.textContent = 'Enviar';
            btnEnviar.disable = false;
            btnEnviar.style.backgroundColor = 'rgba(148, 149, 150, 0.3)';
            btnEnviar.style.color = 'white';
            btnEnviar.style.cursor = 'no-alloweb';
            form.reset();
        }, 3000);
    }
    
    

}

function verificarForm(){
    let btnEnviar = document.getElementById('btn-enviar');

    if(!document.querySelector('.error') && correo.value.length > 0 && titulo.value.length > 0 && mensaje.value.length > 0){
        btnEnviar.style.backgroundColor = 'rgba(116, 185, 255, .3)';
        btnEnviar.style.color = '#0984e3';
        btnEnviar.style.cursor = 'pointer';
        btnEnviar.disable = true;
    }else{
        btnEnviar.style.backgroundColor = 'rgba(148, 149, 150, 0.3)';
        btnEnviar.style.color = 'white';
        btnEnviar.style.cursor = 'no-allowed';
        btnEnviar.disable = false;
    }
    
}