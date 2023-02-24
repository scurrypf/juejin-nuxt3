import axios from "axios";


const LOGIN_UAL = 'http://127.0.0.1:1337/api'


const http = axios.create({
    baseURL:LOGIN_UAL,
    timeout:1000,
    // headers:{
    //     Authorization:'APPCODE d686570081264047b8b7aaec01fb82dc',
    //     // token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6Imtva29taSIsImV4cCI6MTY3NTg1MDQ4NiwiaWF0IjoxNjc1NzY0MDg2fQ.LbqfyQ6O4zsZ1YWurTQmQHxMVMK2ZqwF9JCicyNKVR0'
    // }
})

// http.interceptors.request.use((config) => {
//     if (config.url === '/api/login') {
//         return config;
//     }
//     config.headers['token'] = sessionStorage.getItem('token')
//     console.log('interceptors', config)
//     return config;
// })

export{
    http
}