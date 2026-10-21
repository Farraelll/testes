from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
db = SQLAlchemy(app)

class Pessoa(db.Model):
    __tablename__ = 'PESSOA'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String, nullable=False)
    idade = db.Column(db.Integer, nullable=False)
    
    def to_dict(self):
        return {"id": self.id, "nome": self.nome, "idade": self.idade}
    
with app.app_context():
    db.create_all()
    
pessoas = [{'id': 1, 'nome': 'Carlos', 'idade': 18}, {'id': 2, 'nome': 'Jose', 'idade': 25}]
nextid = 3
@app.get('/pessoas')
def get_pessoas():
    pessoas = Pessoa.query.all()
    lista_pessoas = []
    for p in pessoas:
        lista_pessoas.append(p.to_dict())
    return jsonify(lista_pessoas)
@app.get('/site')
def get_site():
    return render_template('pessoa.html')
@app.get('/pessoas/<int:id>')
def get_pessoa(id):
    pessoa = db.session.get(Pessoa, id)
    try:
        return jsonify(pessoa.to_dict())
    except Exception:
        return jsonify({'mensagem': 'não existe burro'}), 404

@app.post('/pessoas')
def post_pessoa():
    global nextid
    dados = request.get_json()
    if not dados or 'nome' not in dados:
        return jsonify({'mensagem': 'Kd o nome amigo?'}), 400
    return jsonify(dados)

    nova_pessoa = Pessoa(nome=dados.nome, idade=dados.idade)
    try:
        db.session.add(nova_pessoa)
        db.session.commit()
    except Exception:
        db.session.rollback()
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