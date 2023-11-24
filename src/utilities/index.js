import $swal from 'sweetalert2'


const funciones = {

    format_tnumber(i){ if(i != 0 || i!='0'){ return i.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }else{ return 0 } },
    check_email(i){ var e = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); return e.test(i); },

    // palabra_buscada, arreglo en que buscar, key del arreglo a comparar //
    buscador_texto(word,array,clave){ 
        
        let temp = []
        
        for(let index = 0; index < array.length; index++){

            let str_n = array[index][clave.toString()].toString().toLowerCase()
            let bool_n = str_n.includes(word.toString().toLowerCase())
            if(bool_n){ temp.push(array[index]) } 
    
        }

        return temp
    },

    check_config(string_key){
	
        let bool_config = localStorage.getItem('config') ? true : false
  
        let result = {'status':false }

        if(bool_config){
  
            let config_ = JSON.parse(localStorage.getItem('config'))
    
            if( typeof config_ == 'object' && config_[string_key]){
              
                result.status = true
                result[string_key] = config_[string_key]    
              
            }
  
        }
      
        return result
    
    },

    check_usuario_config(usuario,string_key){
      
      let result = {'status':false }

      let config_ = usuario.configuracion
  
      if( typeof config_ == 'object' && config_[string_key]){
        
          result.status = true
          result[string_key] = config_[string_key]    
        
      }

      return result
  
    },
    show_save(msg){
        $swal.fire({
            position: "top-end",
            icon: "success",
            title: msg,
            showConfirmButton: false,
            timer: 1300
        });
    }

}

export default funciones