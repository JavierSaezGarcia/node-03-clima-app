// Despues de instalar el paquete dotenv podemos usar .env para declarar las variables de entorno
// y en el index hacer un require('dotenv').config(); y ya podemos usarlo en cuakquier sitio de la aplicacion
require('dotenv').config();

const { leerInput, inquirerMenu, pause, listarLugares } = require("./helpers/inquirer");

const Busquedas = require("./models/busquedas");

const main = async() => {
    
    let opt;
    
    const busquedas = new Busquedas();
   
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:    
              // Mostrar mensaje                        
              const termino = await leerInput('Ciudad: ');

              // TODO Mostrar los lugares
              const lugares = await busquedas.ciudades( termino );
              const id = await listarLugares(lugares);
              if ( id === '0' ) continue; 

              // TODO Seleccionar el lugar
              const lugarSel = lugares.find( l => l.id === id );
              
              // Guardar en DB
              busquedas.agregarHistorial(lugarSel.nombre)
              
              // TODO datos del clima
              const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );
              
              
              // TODO Mostrar resultados
              console.clear();
              console.log('\nInformación de la ciudad\n');
              console.log('Ciudad: ', lugarSel.nombre.green);
              console.log('Lat: ', lugarSel.lat);
              console.log('Lng: ', lugarSel.lng);
              console.log('Temperatura: ', clima.temp_today);
              console.log('Mínima: ',clima.temp_min);
              console.log('Máxima: ', clima.temp_max);
              console.log('¿Cómo está el cielo?: ', clima.desc.green);
              
              break;
            case 2:
             // TODO historial 
             
                       
             busquedas.historialCapitalizado.forEach( (lugar, index) => {
              const idx = `${index + 1}`;
              if(index < 6){
                console.log(`${idx}. Ciudad: `.brightGreen + `${lugar}`.brightCyan);
              }
             })     
              break;
            case 0:
              console.log('Thanks for all!');
              break;

        }
        await pause();

    } while (opt !== 0);
    
}

main();