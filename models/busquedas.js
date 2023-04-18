const fs = require('fs');
const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';
    
    
    constructor() {
        // TODO leer DB si existe
        this.leerDB();
    }

    get paramsMapbox() {
        return {             
            'access_token': process.env.MAPBOX_KEY,
            'language':'es',
            'limit': 5
        }
    }

    get paramsOpenweather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,            
            'units': 'metric',
            'lang':'es'
        }
    }

    get historialCapitalizado() {       
        return this.historial.map(h => { 
            let palabras = h.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))
            return palabras.join(' ');
      }) 
    }

    async ciudades( lugar = '') {
        // console.log('ciudad',lugar);
        try {
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
            // const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?proximity=ip&language=es&access_token=pk.eyJ1IjoiYmFuYmxlYWMiLCJhIjoiY2xnbHhvcWpnMDA4aDNyb2VsMjUxendvaSJ9.Nh90anTb7RkAGSPcUqjhrw');
            // retornar lugares que  coincidan con la busqueda usando map para acceder a las propiedades del objeto features
            return resp.data.features.map( lugar => ({                
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]                
            })); 
            
        } catch (error) {
            console.log(error);
            
        }      
        
    }

    async climaLugar( lat, lon ) {

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`, 
                params: {...this.paramsOpenweather, lat, lon }   

            });
            const resp = await instance.get(); 
                    // console.log(resp); 
                    
                    const { weather, main } = resp.data;
                    return {
                        desc: weather[0].description,
                        temp_today: main.temp,
                        temp_min: main.temp_min,
                        temp_max: main.temp_max
                    };
            
        } catch (error) {
            console.log(error);
            
        }

    }

    agregarHistorial( lugar = '') {

        // TODO grabar busquedas y evitar duplicidad
        if(this.historial.includes(lugar.toLowerCase())){
            return;
        }

        // TODO grabar solo los 6 ultimos
        this.historial = this.historial.splice(0,5);

        // TODO grabar el ultimo al principio y en minusculas
        this.historial.unshift(lugar.toLowerCase());

        // TODO grabar en un archivo
        this.guardarDB();
        

    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    leerDB() {
       
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath,  {encoding:'utf-8'});

        if (!info) return;
        const data = JSON.parse(info);
        this.historial = data.historial;        
        
    }

}

module.exports = Busquedas;