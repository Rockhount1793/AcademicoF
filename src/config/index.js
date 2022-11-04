import Production from './env_prod.js'
import Development from './env_dev.js'

//definir configuraciones de la aplicacion

const Config = {

    'version':'1.0.0.0 03-11-2022 19:22',

    // dev o prod
    'status': 'dev',


    'get': function(key,value){

        if(this.status === 'dev'){
            return Development[key][value]
        }

        if (this.status === 'prod'){
            return Production[key][value]
        }
    }

}

export default Config