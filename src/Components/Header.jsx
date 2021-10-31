import React from "react";
import "../styles/Header.css"

//Estilos 
const Header = ({captureTodas, contar, contarComplete, enTotal}) =>{
  return (
    <header className="encabezado">
      <h4 className="Logo">Todolist</h4>
      <span>By Javier Fonseca</span>
      <div className="Buttons">
        <button onClick={()=>captureTodas('Muestra Todo')}>Todas: {enTotal} </button>
        <button onClick={()=>captureTodas(true)}>Completas: {contarComplete}  </button>
        <button onClick={()=>captureTodas(false)}>A completar: {contar} </button>
      </div>  
    </header>
  )
}
export default Header;