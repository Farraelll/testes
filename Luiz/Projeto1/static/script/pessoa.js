async function testGet(){
    const area_resposta = document.getElementById("resposta");
    area_resposta.textContent = "Carregando...";
    const resposta = await fetch("http://127.0.0.1:5000/pessoas")
    const dados = await resposta.json();
    area_resposta.textContent = JSON.stringify(dados, null, 2)
}

const texto = document.getElementById("text_post")