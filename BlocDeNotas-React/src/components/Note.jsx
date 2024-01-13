//Crea un componente Note para representar una nota individual.
//Añade un botón para eliminar la nota.
//Utiliza propiedades para pasar la información de la nota desde NoteList a Note.

function Note({id, title, content, noted, deleted}) {

    return(
        //<div className={completed ? "note-container completed" : "note-container"}>
        <div className="noteContainer mb-3" id="noteContainer">
            <h3 
                className="note-title">
                {title}
            </h3>
            <div 
                className="note-content"
                id="textoNota">
                {content}
            </div>
            <div className="botones">
                <button 
                    type="button" 
                    className="btn btn-danger mt-2"
                    onClick={() => deleted(id)}>Eliminar
                </button>
            </div>

        </div>
    );

}

export default Note;