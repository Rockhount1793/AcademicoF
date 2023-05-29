import env from '@/config/env.js'

//definir configuraciones de la aplicacion

const Config = {

    'version': "Estable 1.1.1.8 28-5-2023 19:49",

    // development o production
    'status': "development",

    /**
     * @param {String} key
     * @param {String} value
     */
    'get': function(key,value){

        if(this.status === "development"){
            return env.development[key][value]
        }

        if(this.status === "production"){
            return env.production[key][value]
        }
        
    }

}

export default Config