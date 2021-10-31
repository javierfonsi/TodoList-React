import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Todo from './Components/Todo';
import Loader from './Components/Loader';
import "./styles/App.css"

const App = () => {
  //State
  const [todoList, setTodoList] = useState([]);
  const [counterFalse, setCounterFalse] = useState(0);
  const [counterComplete, setCounterComplete] = useState(0);
  const [arrayComplete, setArrayComplete] = useState([]);
  const [arrayUncomplete, setArrayUncomplete] = useState([]);
  const [valores, setValores] = useState(undefined)

  //EFFECT
  useEffect (() =>{
    const handleTodoList = async () => {
      const url = "https://jsonplaceholder.typicode.com/todos"
      const response = await fetch(url)
      const result = await response.json();
      const resultTodoList = result.slice(0,20);
      setTodoList(resultTodoList)
      setValores('todo')
    }; 
    handleTodoList()
  }, []);

  //Funciones
  useEffect(() =>{
    const handleAddCounter = () =>{
      const complete = todoList.filter(dato => dato.completed === true)
      setCounterComplete (complete.length)
      setArrayComplete(complete)
      const unComplete = todoList.filter(dato => dato.completed === false)
      setCounterFalse (unComplete.length)
      setArrayUncomplete(unComplete)      
    }
    handleAddCounter()
  },[todoList]  )

  const handleCompleteTodo = id =>{
    setTodoList(
      todoList.map(todo =>
        todo.id === id? { ...todo, completed: !todo.completed } : todo
      )
    )
    //alert(id);
  }

  const captureTodas = (valor) => { 
    if(valor === 'Muestra Todo'){
      setValores('todo')
    }
    if(valor === true){
      setValores('completos')
    }
    if(valor === false){
      setValores('incompletos')
    }
  }

  const mostrar = () => {
    if(valores === 'todo'){
      return(
        todoList.map(singleTodo => (
          <Todo
            Key={singleTodo.id}
            title={singleTodo.title}
            status={singleTodo.completed}
            handleCompleteTodo={handleCompleteTodo}
            id={singleTodo.id}
          />
        )) 
      )
    }
    if(valores === 'completos'){
      return(
        arrayComplete.map(singleTodo => (
          <Todo
            Key={singleTodo.id}
            title={singleTodo.title}
            status={singleTodo.completed}
            handleCompleteTodo={handleCompleteTodo}
            id={singleTodo.id}
          />
        )) 
      )
    }
    if(valores === 'incompletos'){
      return(
        arrayUncomplete.map(singleTodo => (
          <Todo
            Key={singleTodo.id}
            title={singleTodo.title}
            status={singleTodo.completed}
            handleCompleteTodo={handleCompleteTodo}
            id={singleTodo.id}
          />
        )) 
      )
    }
  }
  return (
    <div className="App">
      <Header
      enTotal={todoList.length}
      captureTodas={captureTodas}
      contarComplete={counterComplete}
      contar={counterFalse}  
      /> 
      <div className="todo-container">
        {
          todoList && todoList.length > 0 ? (
            mostrar()  
          ) : (
            <Loader /> 
          )
        }
      </div>          
    </div>
  );
};

export default App;
