
const Development = {
    'app':{
        'urlsb': "http://localhost:8000",
        'token_header_key' : "_token",
    }
}

const Production = {
    'app':{
        'urlsb': import.meta.env.VITE_URLSB,
        'token_header_key' : "_token",
    }
}

export default {"development":Development,"production":Production}