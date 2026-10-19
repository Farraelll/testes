from flask import Flask, jsonify, request

app = Flask(__name__)
pessoas = [{'id': 1, 'nome': 'Carlos', 'idade': 18}, {'id': 2, 'nome': 'Jose', 'idade': 25}]
nextid = 3
@app.get('/pessoas')
def get_pessoas():
    return jsonify(pessoas)

@app.get('/pessoas/<int:id>')
def get_pessoa(id):
    for pessoa in pessoas:
        if pessoa['id'] == id:
            return jsonify(pessoa)
    else:
        return jsonify({'mensagem': 'não existe burro'}), 404

@app.post('/pessoas')
def post_pessoa():
    global nextid
    dados = request.get_json()
    if not dados or 'nome' not in dados:
        return jsonify({'mensagem': 'Kd o nome amigo?'}), 400

    nova_pessoa = {'id': nextid, 'nome': dados['nome'], 'idade': dados['idade']}
    pessoas.append(nova_pessoa)
    nextid += 1
    return jsonify(nova_pessoa)

@app.put('/pessoas/<int:id>')
def put_pessoa(id):
    dados=request.get_json()
    for pessoa in pessoas:
        if pessoa['id'] == id:
            pessoa['nome'] = dados['nome']
            pessoa['idade'] = dados['idade']
            return jsonify(pessoa)
    else:
        return jsonify({"Mensagem": "?????"}), 404
@app.delete('/pessoas/<int:id>')
def delete_pessoa(id):
    for pessoa in pessoas:
        if pessoa['id'] == id:
            temp_pessoa = pessoa
            pessoas.remove(pessoa)
            return jsonify(temp_pessoa),200
    else:
        return jsonify({"Mensagem": "Essa pessoa nao existe seu arrombado"}), 404



if __name__ == '__main__':
    app.run(debug=True)