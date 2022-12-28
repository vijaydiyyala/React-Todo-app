import react,{useState} from 'react'
import './App.css';

const App= () => {
  const [todo, setTodo]=useState('')
  const [todos,setTodos]=useState([])
  const [editId, setEditId]=useState(0)

  const handleSubmit= (e) =>{
    e.preventDefault();

    if(editId){
      const editTodo= todos.find(t =>t.id===editId )
      const updatedTodo= todos.map((t) =>
      t.id===editTodo.id ?
      (t={id:t.id,todo})
      : {id:t.id, todo:t.todo}
      )
      setTodos(updatedTodo)
      setEditId(0)
      setTodo('')
      return;
    }
    if(todo !==''){
     setTodos([{id:`${todo}-${Date.now()}`, todo},...todos])
     setTodo('')
    }
  };
  const handleDelete=(id) =>{
    const deltodos= todos.filter((del)=> del.id!==id)
    setTodos([...deltodos])
  }
  
  const handleEdit=(id)=>{
    const edittodo=todos.find(i => i.id===id)
    setTodo(edittodo.todo)
    setEditId(id)
  }

  return (
    <div className='app'>
      <div  className='container'>
        <h1>Todo list application</h1>
        <form className='todoform' onSubmit={handleSubmit}>
          <input type='text'value={todo} onChange={(e)=>setTodo(e.target.value)}/>
          <button type='submit'>{editId ? 'Edit' : 'Add'}</button>
        </form>
        <ul className='allTodos'>
            {   
              todos.map((t)=>(
              <li className='singleTodo'>
              <span className='textTodo' key={t.id}>{t.todo}</span>
              <button onClick={()=>handleEdit(t.id)}>Edit</button>
              <button onClick={()=>handleDelete(t.id)}>Delete</button>
              </li>
              ))
            }
        </ul>
      </div>
      </div>
  );
}

export default App;
