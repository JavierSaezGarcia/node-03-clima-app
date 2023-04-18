const { leerInput, inquirerMenu, pause } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");





const main = async() => {
    // const texto = await leerInput('Hola: ');
    let opt;

    const busquedas = new Busquedas();
   
    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:    
              // Mostrar mensaje          
              const lugar = await leerInput('Ciudad:');
              await busquedas.ciudad( lugar );
              
              // Mostrar los lugares

              // Seleccionar el lugar

              //  clima

              // Mostrar resultados
              console.log('\nInformación de la ciudad\n');
              console.log('Ciudad: ');
              console.log('Lat: ');
              console.log('Lng: ');
              console.log('Temperatura: ');
              console.log('Mínima: ');
              console.log('Máxima: ');
              break;
            case 2:
             // sdfgsdf
              break;
            case 0:
              console.log('salgo');
              break;

        }
        await pause();

    } while (opt !== 0);
    
}

main();