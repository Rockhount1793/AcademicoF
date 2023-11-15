import { createStore } from 'vuex'

const Aplicacion = createStore({

    state () {
        return {
            // Aplicacion
            loading: false
        }
    },

    mutations: {
        set_loading(state,boolean){
            state.loading = boolean
        }
    }

})


export default Aplicacion