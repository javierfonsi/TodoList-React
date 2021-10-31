import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Todo from './Components/Todo';
import Loader from './Components/Loader';
import "./styles/App.css"

const App = () => {
  //State
  const [todoList, setTodoList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [counterComplete, setCounterComplete] = useState(0);

  //EFFECT
  useEffect (() =>{
    const handleTodoList = async () => {
      const url = "https://jsonplaceholder.typicode.com/todos"
      const response = await fetch(url)
      const result = await response.json();
      const resultTodoList = result.slice(0,20);
      setTodoList(resultTodoList)
    }; 
    handleTodoList()
  }, []);

  //Funciones
  useEffect(() =>{
    const handleAddCounter = () =>{
      const complete = todoList.filter(dato => dato.completed === true)
      setCounterComplete (complete.length)
      const unComplete = todoList.filter(dato => dato.completed === false)
      setCounter (unComplete.length)      
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

  return (
    <div className="App">
      <Header
      enTotal={todoList.length}

      contarComplete={counterComplete}
      contar={counter}
        
      /> 
      <div className="todo-container">
        {
          todoList && todoList.length > 0 ? (
            todoList.map(singleTodo => (
              <Todo
                Key={singleTodo.id}
                title={singleTodo.title}
                status={singleTodo.completed}
                handleCompleteTodo={handleCompleteTodo}
                id={singleTodo.id}
              />
            ))
          ) : (
            <Loader /> 
          )
        }
      </div>          
    </div>
  );
};

export default App;
