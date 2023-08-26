import env from '@/config/env.js'

//definir configuraciones de la aplicación

const Config = {

    'version': "Estable 1.1.3.0 26-08-2023 15:31",

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