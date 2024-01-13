import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json();
    try {
        const users = JSON.parse(readFileSync("data/users.txt"));
        const userInfo = JSON.parse(readFileSync("data/userInfo.txt"));
        const user = {
            email: data.email,
            password: data.password,
            type: data.type
        };
        const userDetails = {
            name: data.name,
            email: data.email,
            edad: data.edad,
            city: data.city,
            intereses: data.intereses,
            offer: data.offer
        };
        writeFileSync("data/users.txt", JSON.stringify([...users, user]));
        writeFileSync("data/userInfo.txt", JSON.stringify([...userInfo, userDetails]));
    } catch(e) {
        writeFileSync("data/users.txt", JSON.stringify([{
            email: data.email,
            password: data.password,
            type: data.type
        }]));
        writeFileSync("data/userInfo.txt", JSON.stringify([{
            name: data.name,
            email: data.email,
            edad: data.edad,
            city: data.city,
            intereses: data.intereses,
            offer: data.offer
        }]));
    }
    return NextResponse.json({message: "Guardando datos..."});
}

export async function GET() {
    try{
        const comerce = JSON.parse(readFileSync("data/userInfo.txt"))
        //console.log(comerce)
        return NextResponse.json({comerce})
    } catch(e){  
        return NextResponse.json({message: "Comercios no existen...", status: 400})
    }
}