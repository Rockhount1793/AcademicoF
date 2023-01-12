
const Development = {

    'app':{
        'urlsf': "http://localhost:8080",
        'urlsb': "http://localhost:8000",
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