let numJugadores;
let eleccionJ1; //eleccion de J1
let eleccionJ2; //eleccion de J2
let contador1=0; //contador de puntos J1
let contador2=0; //contador de puntos J2
const fotosJ1 = ['img/default.png', 'img/piedra1.png', 'img/papel1.png', 'img/tijera1.png', 'img/countdown.gif'];
const fotosJ2 = ['img/default.png', 'img/piedra2.png', 'img/papel2.png', 'img/tijera2.png', 'img/countdown.gif'];
let vicotria = new Audio ('audio/success.mp3');
let empate = new Audio ('audio/empate.mp3');

const jugador0 = () => { //inicializa el numero de jugadores
    numJugadores=0;
};

const jugador1 = () => { //inicializa el numero de jugadores
    numJugadores=1;
};

const jugador2 = () => { //inicializa el numero de jugadores
    numJugadores=2;
};

//inicia la partida, dependiendo del numero de jugadores genera elecciones random o las pide por teclado
const partida = () => {
    
    if(numJugadores!=0 & numJugadores!=1 & numJugadores!=2){
        alert("Error: debes elegir el número de jugadores");
    }else{
        
        if(numJugadores==0){ //las maquinas eligen
            eleccionJ1=getRandomIntInclusive(1,3); //consigue numero random entre 1 y 3 (incluidos)
            eleccionJ2=getRandomIntInclusive(1,3);
            document.getElementById("image1").src = fotosJ1[4]; //pone el gif durante el delay
            document.getElementById("image2").src = fotosJ2[4]; //pone el gif durante el delay
            setTimeout(delayRonda, 1700);//DELAY DE 1,7 SEG para que se pueda ver el gif completo
            //vuelve a activar los botones
            document.getElementById("botonJugar").disabled=true;
            document.getElementById("botonTerminar").disabled=true;

        }else if(numJugadores==1){ //una maquina y un jugador
            eleccionJ1=getRandomIntInclusive(1,3); //consigue numero random entre 1 y 3 (incluidos)
            var temp=prompt("Elige tu movimiento:\n1.Piedra\n2.Papel\n3.Tijera");
            eleccionJ2=parseInt(temp); //pasa de string a int

            if(eleccionJ2>=1 & eleccionJ2<=3){ //si se introduce un valor entre 1 y 3 funciona
                document.getElementById("image1").src = fotosJ1[4]; //pone el gif durante el delay
                document.getElementById("image2").src = fotosJ2[4]; //pone el gif durante el delay
                setTimeout(delayRonda, 1700);//DELAY DE 1 SEG
                //vuelve a activar los botones
                document.getElementById("botonJugar").disabled=true;
                document.getElementById("botonTerminar").disabled=true;
                
            }else{ //sino da error
                alert("Error: introduce una opción valida");
            }
            
        }else if(numJugadores==2){ //dos jugadores
            var temp1=prompt("Jugador 1 elige tu movimiento:\n1.Piedra\n2.Papel\n3.Tijera");
            eleccionJ1=parseInt(temp1); //pasa de string a int

            var temp2=prompt("Jugador 2 elige tu movimiento:\n1.Piedra\n2.Papel\n3.Tijera");
            eleccionJ2=parseInt(temp2); //pasa de string a int

            if(eleccionJ1>=1 & eleccionJ1<=3 & eleccionJ2>=1 & eleccionJ2<=3){ //si se introduce un valor entre 1 y 3 funciona
                document.getElementById("image1").src = fotosJ1[4]; //pone el gif durante el delay
                document.getElementById("image2").src = fotosJ2[4]; //pone el gif durante el delay
                setTimeout(delayRonda, 1700);//DELAY DE 1 SEG
                //vuelve a activar los botones
                document.getElementById("botonJugar").disabled=true;
                document.getElementById("botonTerminar").disabled=true;
                
            }else{ //sino da error
                alert("Error: introduce una opción valida");
            }
        }
    }

    
};

//Al terminar la partida compara los puntos de los jugadores, resalta al ganador y pone un sonido, en caso de empate se resaltan ambos
const terminar = () => {

    if(contador1>contador2){ //gana J1
        vicotria.play();
        document.getElementById("panelJ1").style.backgroundColor= "#00FF00"; //resalta el ganador (verde)
        //alert("Gana jugador 1");
    }else if (contador1<contador2){ //gana J2
        vicotria.play();
        document.getElementById("panelJ2").style.backgroundColor= "#00FF00"; //resalta el ganador (verde)
        //alert("Gana jugador2");
    }else{ //empate
        empate.play();
        //se resaltan ambos jugadores por el empate (rojo)
        document.getElementById("panelJ1").style.backgroundColor= "#FF0000";
        document.getElementById("panelJ2").style.backgroundColor= "#FF0000";
        //alert("Empate");
    }

    //desactivar botones hasta que acabe el delay
    document.getElementById("botonJugar").disabled=true;
    document.getElementById("botonTerminar").disabled=true;
    setTimeout(delayFinal, 10000);//DELAY DE 10 SEGS
    
};

//Genera un número random entre dos valores, incluidos esos dos
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
};

//Hay un delay de 1 seg cada vez que se de a jugar, después del delay se muestran los resultados
const delayRonda = () => {
    //desactiva el boton para que no se pueda pulsar mientras haya un delay activo
    document.getElementById("botonJugar").disabled=false;
    document.getElementById("botonTerminar").disabled=false;
    //muestra las imagenes de las elecciones de cada jugador
    document.getElementById("image1").src = fotosJ1[eleccionJ1];
    document.getElementById("image2").src = fotosJ2[eleccionJ2];
    contarPuntos(eleccionJ1, eleccionJ2);

};

//recibe las elecciones de los jugadores, los compara y cuenta los puntos
const contarPuntos = (J1, J2) => {
    if(J1==1 & J2==2){ //piedra y papel
        contador2++;
    }else if(J1==2 & J2==1){ //papel y piedra
        contador1++;
    }else if(J1==1 & J2==3){ //piedra y tijera
        contador1++;
    }else if(J1==3 & J2==1){ //tijera y piedra
        contador2++;
    }else if(J1==2 & J2==3){ //papel y tijera
        contador2++;
    }else if(J1==3 & J2==2){ //tijera y papel
        contador1++;
    }else if(J1==J2){ //si hay empate no se suma ningún punto
        //alert("EMPATE");
    }

    document.getElementById("puntos1").innerHTML=contador1;
    document.getElementById("puntos2").innerHTML=contador2;

};

//Al terminar la partida reinicia todos los valores y colores de los paneles de jugador
const delayFinal = () => {
    //reinicia numero de jugadores
    numJugadores=4;
    //reinicia contadores
    contador1=0;
    contador2=0;
    document.getElementById("puntos1").innerHTML=contador1;
    document.getElementById("puntos2").innerHTML=contador2;
    //reinicia fotos
    document.getElementById("image1").src = fotosJ1[0];
    document.getElementById("image2").src = fotosJ2[0];
    //reinicia colores de resaltado
    document.getElementById("panelJ1").style.backgroundColor= "#fea85d";
    document.getElementById("panelJ2").style.backgroundColor= "#fea85d";
    //volver a activar los botones
    document.getElementById("botonJugar").disabled=false;
    document.getElementById("botonTerminar").disabled=false;
};