import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-builder-c4e24.firebaseio.com/'
});

export default instance;