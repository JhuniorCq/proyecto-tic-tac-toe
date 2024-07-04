import { Square } from "./Square";

export const Board = ({ board, updateBoard }) => {
  return (
    <section className="game">
      {board.map((square, index) => {
        return (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {square}
          </Square>
        );
      })}
    </section>
  );
};

/*
  En React si tengo un MAP que me renderiza VARIOS COMPONENTES, por ejemplo:

  const arrayNumeros = [1, 2, 3, 4, 5];

  arrayNumeros.map((boton, index) => {
    return (
      <Boton key={index} index={index} funcionClick={funcionClick} >
        {boton}
      </Boton>
    );
  })

  En este caso se renderiza 5 veces el Componente <Boton>, pero cada <Boton> tendrá 
  sus propios VALORES para sus "props", por ejemplo:
    - El <Boton> que se renderizó primero tendrá como VALOR de su prop "index" a 0, 
    sin importar que los Elementos HTML que renderiza <Boton> NO utilicen el VALOR 
    de esta prop "index".
    - <Boton> renderiza -> <button onClick={funcionClick}>{children}</button>

*/
