import React from "react";

const Pagination = (props) =>{
    const {page, totalPages, onLeftClick, onRightClick} = props
    return(
        <div className="pagination-container">
            <button onClick={onLeftClick} ><img className="img-BG" alt="left" src="https://img.icons8.com/stickers/100/000000/back.png"/></button>
            <div id="contPages">{page} de {totalPages}</div>
            <button onClick={onRightClick} ><img className="img-BG" alt="right" src="https://img.icons8.com/stickers/100/000000/forward.png"/></button>
        </div>
    )
}
export default Pagination