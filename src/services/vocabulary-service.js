const axios = require('axios')
const config = require('../config/config')

const saveVocabulary = async (vocabulary) => {
    const request = {
        "english": vocabulary.english,
        "vietnamese": vocabulary.vietnamese,
        "example" : vocabulary.example
    }
    try{
        const res = await axios.post(`${config.API_URL}/api/vocabulary`, request)
        return res.status === 200? true: false 
    }catch(e){
        return false
    }
} 

const listVocabulary = async () => {
    try{
    const res = await axios.get(`${config.API_URL}/api/vocabulary`)
        return res.data
    }catch{
        return false
    }
}
export{
    saveVocabulary,
    listVocabulary
}