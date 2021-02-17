const axios = require('axios')
const config = require('../config/config')

const createtask = async(task) => {
    try{
        axios.post(`${config.API_URL}/api/task`, {
            "title": task.title,
            "content": task.content,
            "isModel": task.isModel,
            "isEmergency": task.isEmergency,
            "isImportant": task.isImportant
        })
        return true
    }catch{
        return false
    }
}

const getTasks = async() => {
    try{
        const response = await axios.get(`${config.API_URL}/api/task`)
        return response.data
    }catch{
        return false
    }
}

const removeTask = async(task) => {
    // console.log(task)
    try{
        const response = await axios.delete(`${config.API_URL}/api/task/${task.id}`)
        return response.status === 200 ? true : false
    }catch{
        return false
    }
}

const updateTask = async (task) => {
    task.status = true 
    ? task.status === "Đã hoàn thành" 
    : false
    if(task.isModel === "Yes" || task.isModel === true){
        task.isModel = true
    }else{
        task.isModel = false
    }

    if(task.isImportant === "Yes" || task.isImportant === true){
        task.isImportant = true
    }else{
        task.isImportant = false
    }

    if(task.isEmergency === "Yes" || task.isEmergency === true){
        task.isEmergency = true
    }else{
        task.isEmergency = false
    }
    try{
        const response = await axios.put(`${config.API_URL}/api/task/`,{
            task
        })
        return response.data.code === 200 ? true : false
    }catch{
        return false
    }
}
const getMatrixTasks = async() => {
    try{
        const response = await axios.get(`${config.API_URL}/api/task/eisenhower`)
        return response.data
    }catch{
        return false
    }
}

const getDataForBarChar = async(dateRanger) => {
    let dataRequest = {}
    if(dateRanger){
        dataRequest = {
        "startDate": dateRanger.startDate,
        "endDate": dateRanger.endDate
        }
    }
    
    try{
        const response = await axios.post(`${config.API_URL}/api/task/bar-chart`, dataRequest)
        return response.data
    }catch{
        return false
    }
}

const getTaskByDate = async (date) => {
    const requestdata = {
        "date" : date
    }
    try{
        const response = await axios.post(`${config.API_URL}/api/task/by-date`, requestdata)
        return response.data
    }catch{
        return false
    }
}
export{
    createtask,
    getTasks,
    updateTask,
    removeTask,
    getMatrixTasks,
    getDataForBarChar,
    getTaskByDate
}