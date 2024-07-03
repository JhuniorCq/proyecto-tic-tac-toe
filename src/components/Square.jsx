// Dato: Al utilizar un Componente -> NO es OBLIGATORIO que ese Componente USE a TODAS las props
export const Square = ({ children, isSelected, updateBoard, index }) => {

    const handleClick = () => {
      updateBoard(index);
    }
  
    return (
      <div onClick={handleClick} className={isSelected ? "square is-selected" : "square"}>
        {children}
      </div>
    );
  };