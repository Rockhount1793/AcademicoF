
const Development = {

    'app':{
        'urlsf': import.meta.env.VITE_URLSF,
        'urlsb': import.meta.env.VITE_URLSB,
        'token_header_key' : "_token",
    }

}

const Production = {

    'app':{
        'urlsf': "http://localhost:8080",
        'urlsb': "http://localhost:8000",
        'token_header_key' : "_token",
    }

}

export default { 'development': Development, 'production': Production }