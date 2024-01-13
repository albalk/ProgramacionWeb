import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json();
    try {
        const users = JSON.parse(readFileSync("data/users.txt"));
        const comercioInfo = JSON.parse(readFileSync("data/comerceInfo.txt"));
        const comercioValoracion = JSON.parse(readFileSync("data/valoracion.txt"));
        const userDetails = {
            email: data.email,
            password: data.password,
            type: data.type
        };
        const comercioDetails = {
            email: data.email,
            nombreComercio: data.nombreComercio,
            cif: data.cif,
            direccion: data.direccion,
            telefono: data.telefono,
            actividad: data.actividad,
            descripcion: data.descripcion,
            fotos: data.fotos
        };
        const valoracion = {
            email: data.email,
            positiva: "0",
            negativa: "0",
            puntuacion: "0"
        };
        writeFileSync("data/users.txt", JSON.stringify([...users, userDetails]));
        writeFileSync("data/comerceInfo.txt", JSON.stringify([...comercioInfo, comercioDetails]));
        writeFileSync("data/valoracion.txt", JSON.stringify([...comercioValoracion, valoracion]));
    } catch(e) {
        writeFileSync("data/users.txt", JSON.stringify([{
            email: data.email,
            password: data.password,
            type: data.type
        }]));
        writeFileSync("data/comerceInfo.txt", JSON.stringify([{
            email: data.email,
            nombreComercio: data.nombreComercio,
            cif: data.cif,
            direccion: data.direccion,
            telefono: data.telefono,
            actividad: data.actividad,
            descripcion: data.descripcion,
            fotos: data.fotos
        }]));
        writeFileSync("data/valoracion.txt", JSON.stringify([{
            email: data.email,
            positiva: "0",
            negativa: "0",
            puntuacion: "0"
        }]));
    }
    return NextResponse.json({message: "Guardando datos..."});
}

export async function GET() {
    try{
        const comerce = JSON.parse(readFileSync("data/comerceInfo.txt"))
        console.log(comerce)
        return NextResponse.json({comerce})
    } catch(e){  
        return NextResponse.json({message: "Comercios no existen...", status: 400})
    }
}

export async function DELETE(request) {
    const data = await request.json()
    try {
        const comerce = JSON.parse(readFileSync("data/users.txt")) //comerce
        const comerceInfo = JSON.parse(readFileSync("data/comerceInfo.txt")) //comerceInfo
        //console.log(comerce)
        const comerceFIlter = comerce.filter(comerce => comerce.email != data.email) //comerce
        const comerceInfoFilter = comerceInfo.filter(comerce => comerce.email != data.email) //comerceInfo
        //console.log(comerceFIlter)
        writeFileSync("data/users.txt", JSON.stringify(comerceFIlter)) //comerce
        writeFileSync("data/comerceInfo.txt", JSON.stringify(comerceInfoFilter)) //comerceInfo
        return NextResponse.json({message: "Usuario eliminado...", status: 200})
     } catch(e){
        console.log(e)
     }
}