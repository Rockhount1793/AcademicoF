import env from '@/config/env.js'

//definir configuraciones de la aplicacion

const Config = {

    'version':'1.0.0.0 17-11-2022 19:35',

    // development o production
    'status': 'development',

    'get': function(key,value){

        if(this.status === 'development'){
            return env.development[key][value]
        }

        if (this.status === 'production'){
            return env.production[key][value]
        }
    }

}

export default Config