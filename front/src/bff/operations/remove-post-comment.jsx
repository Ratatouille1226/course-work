import { deletePostComment, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const removePostComment = async (hash, commentId, postId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	await deletePostComment(commentId);

	const post = await getPost(postId);

	const commentsWithAuthor = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		response: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
