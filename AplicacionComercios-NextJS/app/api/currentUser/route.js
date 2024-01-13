import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function GET() {
    try{
        //const comerce = JSON.parse(readFileSync("data/currentComerce.txt"))
        const comerce = readFileSync("data/currentUser.txt", 'utf8')

        //console.log(comerce)
        return NextResponse.json({comerce})
    } catch(e){  
        return NextResponse.json({message: "Comercios no existen...", status: 400})
    }
}