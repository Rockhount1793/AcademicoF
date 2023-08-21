import env from '@/config/env.js'

//definir configuraciones de la aplicacion

const Config = {

    'version': "Estable 1.1.2.0 21-08-2023 14:58",

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