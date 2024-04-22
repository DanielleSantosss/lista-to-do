import './App.css';
import { useState } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

const API = 'http://localhost:5000';

function App() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const toDo = {
      id: Math.random(),
      title,
      time,
      done: false
    }

    console.log(toDo);

      setTitle('')
      setTime('')
  };

  return (
    <div className='App'>
      <div className='todoHeader'>
        <h1>Lista To Do</h1>
      </div>
      <div className='formToDo'>
        <h2>Insira sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className='formControl'>
            <label htmlFor='title'>O que você precisa fazer?</label>
            <input
              type='text'
              name='title'
              placeholder='Título da tarefa'
              onChange={(e) => setTitle(e.target.value)}
              value={title || ''}
              required
            />
          </div>
          <div className='formControl'>
            <label htmlFor='time'>Qual a duração?</label>
            <input
              type='text'
              name='time'
              placeholder='Tempo estimado (em horas)'
              onChange={(e) => setTime(e.target.value)}
              value={time|| ''}
              required
            />
          </div>
          <input type='submit' value='Criar tarefa' />
        </form>
      </div>
      <div className='listToDo'>
        <h2>Lista de tarefas: </h2>
        {toDos.length === 0 && <p>Não há tarefas pendentes.</p>}
      </div>
    </div>
  );
}

export default App;