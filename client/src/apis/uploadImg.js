import axiosService from '../comom/axiosServices';
import { API_UPLOAD_IMG } from '../constants';
import axios from 'axios';
const url = '/upload';
export const uploadImgAPI = (data) => {
    return axiosService.post(`${API_UPLOAD_IMG}${url}`, data);
};
export const handleDrop = (files) => {
    const array = [];
    const uploads = files.map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append("tags", `codeinfuse, medium, gist`);
        formData.append('upload_preset', 'y58ntib0');
        formData.append("timestamp", (Date.now() / 1000) | 0);
        return axiosService.post(`${API_UPLOAD_IMG}${url}`, formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        }).then(response => {
            const data = response.data;
            const fileURL = data.secure_url;
            array.push(`${fileURL};`);
            console.log(data, fileURL);
        })
    });
    axios.all(uploads).then(() => {
        test(array);
    });
    return array;
}
