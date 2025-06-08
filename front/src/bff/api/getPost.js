import { transformPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:3000/posts/${postId}`)
		.then((response) => {
			if (response.ok) {
				return response;
			}

			if (response.status === 404) {
				return Promise.reject('Такая страница не найдена');
			}

			return Promise.reject('Неизвестная ошибка. Попробуйте позже');
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost));
