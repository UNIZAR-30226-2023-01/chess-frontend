import React, {useState, useContext, useEffect} from 'react';

const ChessContext = React.createContext();

export function useChess() {
  return useContext(ChessContext);
}

export function ChessProvider({children}) {
  // ----- SEARCH -----
  // Para la creación de partidas
  const [gameType, setGameType] = useState(null);
  const [selModal, openSelModal] = useState(false);

  const switchModal = () => openSelModal(!selModal);

  // ----- CUSTOMIZATION -----
  const [customization, setData] = useState();
  const saveBoard = (newModel) => setData({...customization, model: newModel});
  const saveColor = (newBlack, newWhite) => setData({...customization, whitePiece: newWhite, blackPiece: newBlack});

  useEffect(() => {
    const _data = localStorage.getItem('customization-reign');
    if (_data) {
      try {
        const parsedData = JSON.parse(_data);
        setData(parsedData);
      } catch (error) {
        setData({model: 'normal', whitePiece: '#E3C16F', blackPiece: '#B88B4A'});
      }
    } else {
      setData({model: 'normal', whitePiece: '#E3C16F', blackPiece: '#B88B4A'});
    }
  }, []);


  useEffect(() => {
    if (customization && customization.blackPiece && customization.whitePiece && customization.model) {
      localStorage.setItem('customization-reign', JSON.stringify(customization));
    }
  }, [customization]);

  if (!customization) {
    return null;
  }

  return (
    <ChessContext.Provider value={{
      // ----- SEARCH -----
      gameType, setGameType,
      selModal, switchModal,
      // ----- CUSTOMIZATION -----
      customization,
      saveBoard,
      saveColor,
    }}>
      {children}
    </ChessContext.Provider>
  );
}
