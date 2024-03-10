import axios from 'axios';

// axios
const posts = [
	{ id: 1, title: '제목1', content: '내용1', createdAt: '2024-01-01' },
	{ id: 2, title: '제목2', content: '내용2', createdAt: '2024-02-02' },
	{ id: 3, title: '제목3', content: '내용3', createdAt: '2024-03-03' },
	{ id: 4, title: '제목4', content: '내용4', createdAt: '2024-04-04' },
	{ id: 5, title: '제목5', content: '내용5', createdAt: '2024-05-05' },
];

export function getPosts(params) {
	// return posts;
	return axios.get('http://localhost:5000/posts', { params });
}

export function getPostById(id) {
	// return posts.find(item => item.id === id);
	return axios.get(`http://localhost:5000/posts/${id}`);
}

export function createPost(data) {
	return axios.post('http://localhost:5000/posts', data);
}

export function updatePost(id, data) {
	return axios.put(`http://localhost:5000/posts/${id}`, data);
}

export function deletePost(id) {
	return axios.delete(`http://localhost:5000/posts/${id}`);
}
