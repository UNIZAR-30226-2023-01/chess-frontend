import React, {useState, useContext, useEffect} from 'react';
import { boardTypes, pieceTypes } from '@/data/board';

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
  const saveBoard = (newBoard) => setData({...customization, board: newBoard});
  const savePieces = (newWhite, newBlack) => setData({...customization, whitePiece: newWhite, blackPiece: newBlack});

  useEffect(() => {
    const _data = localStorage.getItem('customization-reign');
    if (_data) {
      try {
        const parsedData = JSON.parse(_data);
        setData(parsedData);
      } catch (error) {
        setData({board: boardTypes[0], whitePiece: pieceTypes[0], blackPiece: pieceTypes[0]});
      }
    } else {
      setData({board: boardTypes[0], whitePiece: pieceTypes[0], blackPiece: pieceTypes[0]});
    }
  }, []);


  useEffect(() => {
    if (customization && customization.blackPiece && customization.whitePiece && customization.board) {
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
      savePieces,
    }}>
      {children}
    </ChessContext.Provider>
  );
}
