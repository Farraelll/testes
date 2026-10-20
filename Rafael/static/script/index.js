const p = document.getElementById("contador")

let cont = 0

function certo() {
    cont++
    p.textContent = cont
}

function errado() {
    cont--
    p.textContent = cont
}

function gay(){
    alert("Sou Gay")
}