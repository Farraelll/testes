const area_resposta = document.getElementById("resposta")
const rota_pessoa = "http://127.0.0.1:5000/pessoas"
async function testGet(){

    area_resposta.textContent = "Carregando...";
    const resposta = await fetch(rota_pessoa)
    const dados = await resposta.json();
    area_resposta.textContent = JSON.stringify(dados, null, 2)
}


async function testPost() {
    const texto = document.getElementById("text_post").value
    area_resposta.textContent = "Carregando..."
    const resposta = await fetch(rota_pessoa, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: texto
    })
    const dados = await resposta.json()
    area_resposta.textContent = JSON.stringify(resposta, null, 2)


}