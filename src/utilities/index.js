     import Store from '@/store'
     import Router from '@/router'
     import Aplicacion from '@/controllers/Aplicacion'

const funciones = {

    check_login(){ if(!Store.state.user.id >= 1 && !Store.state.token.length && !Store.state.login){ Router.push({'name':'Home'}); return false }else{ return true } },  
    check_email(i){ var e = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); return e.test(i); },
    format_tnumber(i){ if(i != 0 || i!='0'){ return i.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }else{ return 0 } },
    format_tnumber_dec(i){ if(i){return parseInt( i.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))} },
    largotext(t,l){ if(t != null){ if(t.length > parseInt(l)){ var res = t.slice(0,parseInt(l)); return res+'..' }else{ return t} } },
    
    fechas(f){try{ var x = f.split("-"); var form = x[2]+'-'+x[1]+'-'+x[0]; return form }catch(error){ return '' } },
    fecha_time(i){ try { let x = i.split(" "); var y =x[0].split("-"); var f = y[2]+'-'+y[1]+'-'+y[0]+' '+x[1]; return f }catch(error){ return '' } },
    fechaonly(i){ try { let x = i.split(" "); var y =x[0].split("-"); var f = y[2]+'-'+y[1]+'-'+y[0]; return f }catch(error){ return '' } },
    
    fecha_iso(i,x){
        let d = new Date(i);
        let temp = '';
    
        if(x=='t'){ temp = d.getDate()+'-'+ (d.getMonth()+1) +'-'+d.getFullYear()} 
        if(x=='l'){ temp = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()+'  '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds() } 
        
        return temp
    },

    textodia(i){
      let t = '';
      switch(i){
        case 'Mo': t='Monday';break;
        case 'Tu': t='Twesday';break;
        case 'We': t='wednesday';break;
        case 'Th': t='Thursday';break;
        case 'Fr': t='Friday';break;
        case 'Sa': t='Saturday';break;
        case 'Su': t='Sunday';break;
        default: t = 'undefined'; break;
      }
      return t
    },

    textomes(int){

      let text = ''
      
      switch(int){
        case 1: text='Enero';break;
        case 2: text='Febrero';break;
        case 3: text='Marzo';break;
        case 4: text='Abril';break;
        case 5: text='Mayo';break;
        case 6: text='Junio';break;
        case 7: text='Julio';break;
        case 8: text='Agosto';break;
        case 9: text='Septiembre';break;
        case 10: text='Octubre';break;
        case 11: text='Noviembre';break;
        case 12: text='Diciembre';break;
        default: text = 'undefined'; break;
      }
      return text
    },

    textomeslite(i){

      let t = ''
      
      switch(i){
        case '01': t='Jan';break;
        case '02': t='Feb';break;
        case '03': t='Mar';break;
        case '04': t='Apr';break;
        case '05': t='May';break;
        case '06': t='Jun';break;
        case '07': t='Jul';break;
        case '08': t='Aug';break;
        case '09': t='Sep';break;
        case '10': t='Oct';break;
        case '11': t='Nov';break;
        case '12': t='Dec';break;
        default: t = 'undefined'; break;
      }
      return t
    },

    fechalite(i) {
      try{
        var x = i.split("-")
        /*var format = x[2]+'-'+x[1]+'-'+x[0];*/
        var format = x[2]
        return format
      }catch(error){
        return ''
      } 
    },


    // palabra_buscada, arreglo en que buscar, key del arreglo a comparar //
    buscador_texto(word,array,clave){ 
        
        let temp = []
        
        for(let index = 0; index < array.length; index++){

            let str_n = array[index][clave.toString()].toString().toLowerCase()
            let bool_n = str_n.includes(word.toString().toLowerCase())
            if(bool_n){ temp.push(array[index]) } 
    
        }

        // retorna areglo con las coincidencias
        return temp
    },

    check_config_vista(vista,name_config){
	
        var vista_config = vista ? vista:[]
        var config = []
  
        let bool_config = localStorage.getItem(name_config) ? true : false
  
        if(bool_config){
  
            let config_ = JSON.parse(localStorage.getItem(name_config))
    
            if( typeof config_ == 'object'){
                config = config_
            }
  
        }

        var control0 = true 
        var control1 = true
      
        for (let index1 = 0; index1 < vista_config.length; index1++){
          
            let value_item_config = config[index1]
            let value_item_vista = vista_config[index1]
            
            if(typeof value_item_config == 'object' &&  Object.keys(value_item_config).length == Object.keys(value_item_vista).length){
    
                var variables = Object.keys(value_item_vista).length
                
                for(let index = 0; index < variables; index++){
                  
                   if(Object.keys(value_item_vista)[index] == Object.keys(value_item_config)[index]){
                   
                     if(index == 0 && value_item_vista[[Object.keys(value_item_vista)[index]]] !== value_item_config[[Object.keys(value_item_config)[index]]]){
                      
                        //console.log('fallo nombre')
                        control0 = false
    
                     }
                     
                     if(index == 1 && typeof value_item_config[[Object.keys(value_item_config)[index]]] != 'boolean'){
                         //console.log('fallo boolean')
                        control1 = false
                     }   
                     
                    
                   }
                   
    
                }

            }else{
               control0 = false
               control1 = false
                
            }
    
        }
      
        if(control0 && control1){
            return config
        }else{
            return vista_config   
        }
      
    
    },

    set_config(json){
        
        let bool_config = localStorage.getItem('config') ? true : false
  
        if(!bool_config){

           localStorage.setItem('config',JSON.stringify([json]))

        }else{

          let config_ = JSON.parse(localStorage.getItem('config'))
    
          if( typeof config_ == 'object'){

              let bool_exist = false
              var index = 0

              for (let index_ = 0; index_ < config_.length; index_++){

                  if( Object.keys(config_[index_])[0] == Object.keys(json)[0] ){
                      index = index_
                      bool_exist = true  
                      break  
                  }

              }

              if(bool_exist){

                let new_config1 = config_.splice(index,0)     
                new_config1.push(json)
                localStorage.setItem('config',JSON.stringify(new_config1))

              }else{
  

                let new_config0 = config_.push(json)
                localStorage.setItem('config',JSON.stringify(new_config0))
    
              }

          }

        }
      

    },

    check_config(string_key){
	
        //{'sede_id': 0}
  
        let bool_config = localStorage.getItem('config') ? true : false
  
        let result = {'status':false }

        if(bool_config){
  
            let config_ = JSON.parse(localStorage.getItem('config'))
    
            if( typeof config_ == 'object'){
                for (let index_ = 0; index_ < config_.length; index_++){

                  if( Object.keys(config_[index_])[0] == string_key ){

                      result.status = true
                      result[string_key] = Object.values(config_[index_])[0]
                    
                      break  
                  }

              }

            }
  
        }
      
        return result
    
    }


}

export default funciones