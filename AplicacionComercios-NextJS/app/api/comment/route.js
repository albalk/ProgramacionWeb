import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json();
    const currentUser = readFileSync('data/currentUser.txt').toString();
    const currentComerce = readFileSync('data/currentComerce.txt').toString();
    try {
        const comments = JSON.parse(readFileSync("data/comentarios.txt"));
        
        const comment = {
            user: currentUser,
            comerce: currentComerce,
            comment: data.comentario
        };
        writeFileSync("data/comentarios.txt", JSON.stringify([...comments, comment]));
    } catch(e) {
        writeFileSync("data/comentarios.txt", JSON.stringify([{
            user: currentUser,
            comerce: currentComerce,
            comment: data.comentario
        }]));
    }
    return NextResponse.json({message: "Guardando comentario..."});
}

export async function GET() {
    try{
        const comerce = JSON.parse(readFileSync("data/comentarios.txt"))
        //console.log(comerce)
        return NextResponse.json({comerce})
    } catch(e){  
        return NextResponse.json({message: "Comercios no existen...", status: 400})
    }
}