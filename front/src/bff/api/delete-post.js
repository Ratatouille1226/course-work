export const deletePost = (id) =>
	fetch(`http://localhost:3000/posts/${id}`, {
		method: 'DELETE',
	});
