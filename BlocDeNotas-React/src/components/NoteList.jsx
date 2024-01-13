// Crea un componente NoteList para mostrar todas las notas existentes.
//Utiliza el Hook useState para mantener una lista de notas.
import { useState, useEffect  } from 'react';
import NoteEditor from './NoteEditor';
import Note from './Note';
import '../App.css';
import Buscador from './Buscador';

function NoteList() {

    const [lista, setLista] = useState([]);
    const [search, setSearch] = useState("");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Utiliza useEffect para cargar las notas del almacenamiento local al iniciar la aplicación
    useEffect(() => {
        const storedNotes = localStorage.getItem('notes');
        if (storedNotes) {
            setLista(JSON.parse(storedNotes));
        }
    }, []); // El segundo parámetro vacío [] significa que este efecto solo se ejecuta una vez al montar el componente


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const addNote = (note) => {
        if(note.title.trim()){
            note.title = note.title.trim();
            note.content = note.content.trim();

            const updatedNotes = [note, ...lista];
            setLista(updatedNotes);

            // Guarda las notas en el almacenamiento local cada vez que la lista se modifica
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
        }
    };

    const searchNote = (noteTitle) => {
        setSearch(noteTitle);
    }

    const deleteNote = (id) => {
        const updatedNotes = lista.filter(note => note.id !== id);
        setLista(updatedNotes);
        // Guarda las notas en el almacenamiento local cada vez que la lista se modifica
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    const filteredNotes = lista.filter((nota) =>
        nota.title.includes(search.toLowerCase()) ||
        nota.content.includes(search.toLowerCase())
    );
    
    return (
        <>
            <Buscador onSubmit={searchNote}/>
            <NoteEditor onSubmit={addNote} />
            <div className="col-md-12">
                {
                    filteredNotes.map((note) =>
                        <Note
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            noted={addNote}
                            deleted={deleteNote}
                        />
                    )
                }
            </div>
        </>
    );
}

export default NoteList;