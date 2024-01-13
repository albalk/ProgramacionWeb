

function Buscador ({onSubmit}) {

    const handleChangeB = (event) =>{
        onSubmit(event.target.value);
    };

    return(
        <>
        <div className="input-group mb-3">
            <span className="input-group-text">Buscador</span>
            <div 
                className="form-floating"
                onChange={handleChangeB}>
                <input type="text" className="form-control" id="inputBuscador" placeholder="Título de la nota"></input>
                <label for="floatingInputGroup1">Título de la nota</label>
            </div>
        </div>
        </>
    );
}

export default Buscador;