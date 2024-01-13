import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function PUT(request) {
    const data = await request.json();
    console.log(data);
    try {
        const users = JSON.parse(readFileSync('data/users.txt'));
        const comerceInfo = JSON.parse(readFileSync('data/comerceInfo.txt'));
        const currentUser = readFileSync('data/currentUser.txt').toString();
        console.log(currentUser);

        // Encuentra y actualiza el usuario en users.txt
        const user = users.find((user) => user.email === currentUser);
        //console.log(user);
        if (data.email == currentUser) {
            user.password = data.password;
        }else{
            return NextResponse.json({ message: 'Usuario no encontrado...', status: 404 });
        }

        // Encuentra y actualiza el usuario en comerceInfo.txt
        const comerceInformation = comerceInfo.find((info) =>  info.email === currentUser);
        //console.log(comerceInformation);
        if (data.email == currentUser) {
            comerceInformation.nombreComercio = data.nombreComercio;
            comerceInformation.direccion = data.direccion;
            comerceInformation.actividad = data.actividad;
            comerceInformation.descripcion = data.descripcion;
            comerceInformation.fotos = data.fotos;
        }else if(!comerceInformation){
            return NextResponse.json({ message: 'Información del usuario no encontrada...', status: 404 });
        }

        // Guarda los datos actualizados en los archivos
        writeFileSync('data/users.txt', JSON.stringify(users));
        writeFileSync('data/comerceInfo.txt', JSON.stringify(comerceInfo));

        return NextResponse.json({ message: 'Guardando datos...', status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'Error al guardar datos...', status: 500 });
    }
}

export async function POST(request) {
    const data = await request.json()
    try{
        writeFileSync('data/currentComerce.txt', data.comercio);
    } catch(e){  
        return NextResponse.json({message: "Comercio no existe...", status: 400})
    }
}

export async function DELETE(request) {
    const data = await request.json()

    try{
        const comerceInfo = JSON.parse(readFileSync('data/comerceInfo.txt'));
        const comentarios = JSON.parse(readFileSync('data/comentarios.txt'));
        const valoraciones = JSON.parse(readFileSync('data/valoracion.txt'));
        const usuarios = JSON.parse(readFileSync('data/users.txt'));
        const currentUser = readFileSync('data/currentUser.txt');

        //encuentra el usuario
        const user = usuarios.find((user) => user.email === data.emailDelete);

        if(user && user.password === data.passwordDelete){ //si la constraseña y el correo son correctos
            if(data.emailDelete == currentUser){ // y coinciden con el usuario actual
                //elimina los datos de comerceInfo.txt
                const comerceInfoFilter = comerceInfo.filter((user) => user.email !== data.emailDelete);
                //elimina los datos de comentarios
                const comentariosFilter = comentarios.filter((user) => user.comerce !== data.emailDelete);
                //elimina las valoraciones
                const valoracionesFilter = valoraciones.filter((user) => user.email !== data.emailDelete);
                //elimina el usuario
                const usuariosFiler = usuarios.filter((user) => user.email !== data.emailDelete);

                //Guarda los datos actualizados en los archivos
                writeFileSync('data/comerceInfo.txt', JSON.stringify(comerceInfoFilter));
                writeFileSync('data/comentarios.txt', JSON.stringify(comentariosFilter));
                writeFileSync('data/valoracion.txt', JSON.stringify(valoracionesFilter));
                writeFileSync('data/users.txt', JSON.stringify(usuariosFiler));

                // Cambia el contenido del archivo currentUser.txt a "none"
                writeFileSync('data/currentUser.txt', 'none');

                return NextResponse.json({ message: 'Eliminando datos...', status: 200 });
            }else{
                throw new Error ('El email no coincide');
            }
        }else{
            throw new Error ('Contraseña incorrecta');
        }

    }catch(e){
        console.log(e)
        return NextResponse.json({ message: e.message , status: 500 });
    }


}