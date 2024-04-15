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
  };

  return (
    <div className='App'>
      <div className='todoHeader'>
        <h1>Lista To Do</h1>
      </div>
      <div className='formTodo'>
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
          <input type='submit' value='Enviar' />
        </form>
      </div>
      <div className='listTodo'>
        <h2>Lista de tarefas: </h2>
        {toDos.length === 0 && <p>Não há tarefas pendentes.</p>}
      </div>
    </div>
  );
}

export default App;