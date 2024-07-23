import env from '@/config/env.js'

//definir configuraciones de la aplicación

const Config = {

    'version': "1.2.0.0 23-07-2024 18:29",

    // development o production
    'status': import.meta.env.VITE_ENVIRONMENT || "development",
    /**
     * @param {String} key
     * @param {String} value
     */
    'get':(key,value)=>{
        return env[Config.status][key][value]
    }

}

export default Config