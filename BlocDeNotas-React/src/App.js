import './App.css';
import NoteList from './components/NoteList';

function App() {

  return (
    <div className="App">
      <div className="container align-self-center text-center">
        <div className="row">
          <h1 className="col-md-12 my-3">Aplicacion de Notas</h1>
        </div>
        <div className="row">
          <NoteList />
        </div>
      </div>
    </div>
  );
}

export default App;
