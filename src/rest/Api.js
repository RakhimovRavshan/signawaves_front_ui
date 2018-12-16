import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: 'http://192.168.43.118:5000/api/1.0.0/',
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
