import env from '@/config/env.js'

//definir configuraciones de la aplicación

const Config = {

    'version': "1.3.0.0 8-12-2024 9:22",

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