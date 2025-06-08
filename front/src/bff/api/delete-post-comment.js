export const deletePostComment = (commentId) =>
	fetch(`http://localhost:3000/comments/${commentId}`, {
		method: 'DELETE',
	});
