import React, {useState, useContext, useEffect} from 'react';

const ChessContext = React.createContext();

export function useChess() {
  return useContext(ChessContext);
}

export function ChessProvider({children}) {
// {
// model:  ...
// fichas_negras: /...
// fichas blancas: /....
// }*/
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true); // nuevo estado isLoading
  const saveBoard = (newModel) => setData({...data, model: newModel});
  const saveColor = (newBlack, newWhite) => setData({...data, whitePiece: newWhite, blackPiece: newBlack});

  useEffect(() => {
    const _data = localStorage.getItem('ChangeData');
    if (_data) {
      try {
        const parsedData = JSON.parse(_data);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setData({model: 'normal', whitePiece: '#E3C16F', blackPiece: '#B88B4A'});
      }
    } else {
      setData({model: 'normal', whitePiece: '#E3C16F', blackPiece: '#B88B4A'});
    }
  }, []);


  useEffect(() => {
    if (data && data.blackPiece && data.whitePiece && data.model) {
      setIsLoading(false);
      localStorage.setItem('ChangeData', JSON.stringify(data));
    }
  }, [data]);

  if (isLoading) {
    return <div>Cargando...</div>; // o cualquier otro indicador de carga
  }
  return (
    <ChessContext.Provider value={{
      data,
      saveBoard,
      saveColor,
    }}>
      {children}
    </ChessContext.Provider>
  );
}
