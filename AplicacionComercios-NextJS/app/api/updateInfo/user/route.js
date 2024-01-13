import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function PUT(request) {
    const data = await request.json();

    try {
        const users = JSON.parse(readFileSync('data/users.txt'));
        const userInfo = JSON.parse(readFileSync('data/userInfo.txt'));
        const currentUser = readFileSync('data/currentUser.txt').toString();
        console.log(currentUser);
        
        // Encuentra y actualiza el usuario en users.txt
        const user = users.find((user) => user.email === data.email);
        console.log(user);
        if(data.email == currentUser){
            user.password = data.password;
        }else{
            return NextResponse.json({ message: 'Usuario no encontrado...', status: 404 });
        }

        // Encuentra y actualiza el usuario en userInfo.txt
        const userInformation = userInfo.find((info) => info.email === data.email);
        console.log(userInformation);
        if(data.email == currentUser){
            userInformation.name = data.name;
            userInformation.edad = data.edad;
            userInformation.city = data.city;
            userInformation.intereses = data.intereses;
            userInformation.offer = data.offer;
        }else{
            return NextResponse.json({ message: 'Información del usuario no encontrada...', status: 404 });
        }

        // Guarda los datos actualizados en los archivos
        writeFileSync('data/users.txt', JSON.stringify(users));
        writeFileSync('data/userInfo.txt', JSON.stringify(userInfo));

        return NextResponse.json({ message: 'Guardando datos...', status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'Error al guardar datos...', status: 500 });
    }
}


export async function DELETE(request) {
    const data = await request.json()
    try {
        const users = JSON.parse(readFileSync('data/users.txt'));
        const userInfo = JSON.parse(readFileSync('data/userInfo.txt'));
        const currentUser = readFileSync('data/currentUser.txt');

        // Encuentra el usuario en users.txt
        const user = users.find((user) => user.email === data.emailDelete);

        if(user && user.password === data.passwordDelete){
            if(data.emailDelete == currentUser){
                // Elimina el usuario actual de users.txt
                const usersFilter = users.filter((user) => user.email !== data.emailDelete);
                // Elimina el usuario de userInfo.txt
                const userInfoFilter = userInfo.filter((info) => info.email !== data.emailDelete);
                // Guarda los datos actualizados en los archivos
                writeFileSync('data/users.txt', JSON.stringify(usersFilter));
                writeFileSync('data/userInfo.txt', JSON.stringify(userInfoFilter));

                // Cambia el contenido del archivo currentUser.txt a "none"
                writeFileSync('data/currentUser.txt', 'none');

                return NextResponse.json({ message: 'Eliminando datos...', status: 200 });
            }else{
                throw new Error ('El email no coincide');
            }
        }else{
            throw new Error ('Contraseña incorrecta');
        }
        
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: e.message , status: 500 });
    }
}

export async function GET(request) {
    try {
        const currentUser = readFileSync('data/currentUser.txt', 'utf-8');
        return NextResponse.json({ currentUser });
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: e.message, status: 500 });
    }
}