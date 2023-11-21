import React, { useState, useEffect } from "react";
import './TodoList.css';
import Icone from './assets/icon.webp'
function TodoList() {

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState('');
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista])

    function adiconaItem(form) {
        form.preventDefault();
        if (!novoItem) {
            return;
        }

        setLista([...lista, { text: novoItem, isCompleted: false, priority: opcaoSelecionada }])
        setNovoItem('');
        document.getElementById('input-entrada').focus();
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index) {
        const listAux = [...lista];
        listAux.splice(index, 1);
        setLista(listAux)
    }
    function deletaTudo() {
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>

            <div className="subtitle-block">
                <h2 className="subtitle">Legenda de prioridade</h2>

                <span className="high">Alta</span>
                <span className="medium">Média</span>
                <span className="low">Baixa</span>
            </div>
            <form onSubmit={adiconaItem}>
                <input
                    id="input-entrada"
                    type="text"
                    value={novoItem}
                    placeholder="Adicione uma tarefa"
                    onChange={(e) => { setNovoItem(e.target.value) }}
                />

                <select id="selecao" required value={opcaoSelecionada} onChange={ (e) => { setOpcaoSelecionada(e.target.value) }}>
                    <option value="">Prioridade</option>
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">baixa</option>
                </select>

                <button className="add" type="submit">Add</button>
            </form>

            <div className="listaTarefas">
                {
                    lista.length < 1
                        ?
                        <img className="image-central" src={Icone} />
                        :
                        lista.map((item, index) => (
                            <div className={item.isCompleted ? `item completo ${item.priority}` : `item ${item.priority}`}>
                                <span onClick={() => { clicou(index) }}>{item.text}</span>
                                <button onClick={() => { deleta(index) }}>Deletar</button>
                            </div>
                        ))

                }
                {
                    lista.length > 0 &&
                    <button onClick={() => { deletaTudo() }} className="delAll">Deletar todos</button>
                }
            </div>
        </div>
    )
}

export default TodoList