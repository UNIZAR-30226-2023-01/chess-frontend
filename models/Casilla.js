import react from "react";


export default function Casilla({posicion,imagen}){

    if(posicion % 2 == 0){//Si la posicion era de casilla negra o blanca
        return <div className="casilla casilla-blanca">
            {imagen && <div style={{backgroundImage: `url(${imagen})`}} className="pieza"></div>}
            </div>   
    }//Carga las imagenes como fondo, solo si estas existen
    else{
        return <div className="casilla casilla-negra">
            {imagen && <div style={{backgroundImage: `url(${imagen})`}} className="pieza"></div>}
            </div>
            
        
    }
}
