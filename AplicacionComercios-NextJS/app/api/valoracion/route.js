import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

//DEFINITIVO
export async function POST(request) {
    const data = await request.json();
    const currentComerce = readFileSync('data/currentComerce.txt').toString();
    const comercios = JSON.parse(readFileSync('data/valoracion.txt'));
    
    const comercioIndex = comercios.findIndex(comercio => comercio.email === currentComerce);
    if (comercioIndex !== -1) {
        if (data.valoracion === 'positiva') {
            comercios[comercioIndex].positiva = Number(comercios[comercioIndex].positiva || 0) + 1;
        } else if (data.valoracion === 'negativa') {
            comercios[comercioIndex].negativa = Number(comercios[comercioIndex].negativa || 0) + 1;
        }

        // Calcula la puntuación
        comercios[comercioIndex].puntuacion = Number(comercios[comercioIndex].positiva) - Number(comercios[comercioIndex].negativa);

        writeFileSync('data/valoracion.txt', JSON.stringify(comercios));
        return NextResponse.json({message: "Valoración actualizada"});
    } else {
        return NextResponse.json({ error: 'Comercio no encontrado' });
    }
}

export async function GET() {
    try{
        const comerce = JSON.parse(readFileSync("data/valoracion.txt"))
        
        return NextResponse.json({comerce})
    } catch(e){  
        return NextResponse.json({message: "Comercios no existen...", status: 400})
    }
}

// export async function GET() {
//     try {
//         const comercios = JSON.parse(readFileSync("data/valoracion.txt"));
//         const currentComerce = readFileSync('data/currentComerce.txt').toString();

//         const comercio = comercios.find(comercio => comercio.email === currentComerce);

//         if (comercio) {
//             return NextResponse.json({comercio});
//         } else {
//             return NextResponse.json({message: "Comercio no encontrado...", status: 404});
//         }
//     } catch(e) {  
//         return NextResponse.json({message: "Comercios no existen...", status: 400});
//     }
// }