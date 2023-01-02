import env from '@/config/env.js'

//definir configuraciones de la aplicacion

const Config = {

    'version': "Release 1.0.0.0 02-01-2023 14:52",

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