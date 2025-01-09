import env from '@/config/env.js'

//definir configuraciones de la aplicación

const Config = {

    'version': "1.3.0.1 8-12-2024 13:08",

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