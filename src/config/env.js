
const Development = {

    'app':{
        'urlsf': "http://localhost:5173",
        'urlsb': "http://localhost:8000",
        'token_header_key' : "token",
    }

}

const Production = {

    'app':{
        'urlsf': import.meta.env.VITE_URLSF,
        'urlsb': import.meta.env.VITE_URLSB,
        'token_header_key' : "token",
    }

}

export default { 'development': Development, 'production': Production }