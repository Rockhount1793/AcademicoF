import env from '@/config/env.js'

//definir configuraciones de la aplicacion

const Config = {

    'version':'1.0.0.0 14-12-2022 20:30',

    // development o production
    'status': 'development',

    'get': function(key,value){

        if(this.status === 'development'){
            return env.development[key][value]
        }

        if(this.status === 'production'){
            return env.production[key][value]
        }
        
    }

}

export default Config