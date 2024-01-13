import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';
//Crea un componente NoteEditor para añadir y editar notas.
//Utiliza useState para mantener el contenido de la nota actualmente en edición.
//Opcionalmente, utiliza useRef para manejar el enfoque del campo de texto.

function NoteEditor(props) {
    
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");

    const handleChangeT = (event) =>{
        setNoteTitle(event.target.value);
    };

    const handleChangeC = (event) =>{
        setNoteContent(event.target.value);
    };

    const handleSend = (event) => {
        event.preventDefault();
        //console.log(noteTitle);
        //console.log(noteContent);

        const newNote = {
            id: uuidv4(),
            title: noteTitle,
            content: noteContent
        }

        props.onSubmit(newNote);
   
    }


    return(
        <>
        <h2>Insertar nota</h2>
        <form id="formEditor" onSubmit={handleSend}>
            <div className="input-group my-3">
                <span className="input-group-text">Título</span>
                <div className="form-floating">
                    <input 
                        type="text" 
                        name="title"
                        id="textInput"
                        className="form-control" 
                        placeholder="Título" 
                        onChange={handleChangeT}
                    />
                    <label for="floatingInputGroup1">Título</label>
                </div>
            </div>
            
            <div className="form-floating"> 
                <textarea 
                    type="text" 
                    name="content"
                    id="textArea"
                    className="form-control"
                    placeholder="Leave a comment here"
                    onChange={handleChangeC}
                />
                <label for="floatingTextarea">Nota</label>
            </div>

            <button 
                type="button"
                className="btn btn-primary mt-2"
                id="botonGuardar"
                onClick={handleSend}>Guardar
            </button>

        </form>
        </>
    );
};

export default NoteEditor;