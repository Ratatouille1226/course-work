export const updatePost = ({ id, imageUrl, title, content }) =>
	fetch(`http://localhost:3000/posts/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			image_url: imageUrl,
			content,
		}),
	}).then((loadedPost) => loadedPost.json());
