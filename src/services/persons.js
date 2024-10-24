import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
	return axios.get(baseUrl);
};

const create = (newObject) => {
	return axios.post(baseUrl, newObject);
};

const update = (id, personsObject) => {
	return axios.put(`${baseUrl}/${id}`, personsObject);
};
const deletePerson = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};

export default {
	getAll,
	create,
	update,
	delete: deletePerson,
};
