import { deletePost, getComments, deletePostComment } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePost = async (hash, id) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	await deletePost(id);

	const comments = await getComments(id);

	await Promise.all(comments.map(({ id: commentId }) => deletePostComment(commentId)));

	return {
		error: null,
		response: true,
	};
};
