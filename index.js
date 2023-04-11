const { leerInput, inquirerMenu, pause } = require("./helpers/inquirer");





const main = async() => {
    // const texto = await leerInput('Hola: ');
    let opt;
   
    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:              
              const ciudad = await leerInput('Ciudad:');
              console.log(ciudad);             
              break;
            case 2:
              await console.log('hola 2');
              break;
            case 0:
              await console.log('salgo');
              break;

        }
        await pause();

    } while (opt !== 0);
    
}

main();