import axios from 'axios'

axios.interceptors.response.use(function (response) {
	return response.data;
})

export default function Request (url, params) {
	return axios({
		baseURL: 'http://localhost:8000/',
		url,
		method: 'get',
		...params
	})
}
