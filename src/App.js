import './App.css';
import { useEffect, useState } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

const API = 'http://localhost:5000';

function App() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [toDos, setToDos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const response = await fetch(API + '/todos')
        .then((response) => response.json())
        .then((data) => (data))
        .catch((error) => console.log(error))

      setLoading(false)
      setToDos(response)

      
    }
    loadData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toDo = {
      id: Math.random(),
      title,
      time,
      done: false
    };

    await fetch( API + '/todos', {
      method: "POST",
      body: JSON.stringify(toDo),
      headers:{
        'Content-Type': 'application/json',
      },
    }
    )

      setToDos((prevState) => [...prevState, toDo]);

      setTitle('');
      setTime('');
  };

  const handleDelete = async(id) => {
    await fetch(API + '/todos/' + id, {
      method: 'DELETE'
    });

    setToDos((prevState) => prevState.filter((toDo) => toDo.id !== id));
  };


  const data = async(toDo) => {

    toDo.done = !toDo.done;

    await fetch(API + '/todos/' + toDo.id, {
      method: 'PUT',
      body: JSON.stringify(toDo),
      headers:{
        'Content-Type': 'application/json',
      }
    });

    setToDos((prevState) =>
      prevState.map((t) => (t.id === data.id ? (t = data) : t))
  );
  };

  if (loading) {
    return <p>Carregando...</p>
  }

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
        {toDos.map((toDo) => (
          <div className='toDo' key={toDo.id}>
            <h3 className={toDo.done ? 'toDo-done': ''}>{toDo.title}</h3>
            <p>Duração: {toDo.time}</p>
            <div className='actions'>
              <span onClick={() => data(toDo)}>
                {!toDo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}
              </span>
              <BsTrash onClick={() => handleDelete(toDo.id)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;