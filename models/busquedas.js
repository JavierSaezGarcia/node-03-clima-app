const axios = require('axios');

class Busquedas {

    historial = ['Madrid', 'Barcelona', 'Sagunto'];

    constructor() {
        // leer DB si existe
    }

    async ciudad( lugar = '') {
        // console.log('ciudad',lugar);
        try {
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data.data);
            return []; // retornar lugares que  coincidan con la busqueda
            
        } catch (error) {
            return [];
            
        }

       
        
    }

}

module.exports = Busquedas;