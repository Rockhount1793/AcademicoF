import env from '@/config/env.js'

//definir configuraciones de la aplicación

const Config = {

    'version': "Estable 1.1.4.0 1-09-2023 13:17",

    // development o production
    'status': import.meta.env.VITE_ENVIRONMENT || "development",

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