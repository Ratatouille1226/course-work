import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input } from '../../../../components';
import { savePostAsync } from '../../../../action';
import { useServerRequest } from '../../../../hooks';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitazeContent } from './utils';
import { PROP_TYPE } from '../../../../constants';
import styled from 'styled-components';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const onSave = () => {
		const newContent = sanitazeContent(contentRef.current.innerText);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text/plain');

		const selection = window.getSelection();
		if (!selection.rangeCount) return;

		selection.deleteFromDocument();
		const range = selection.getRangeAt(0);
		range.insertNode(document.createTextNode(text));

		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);
	};

	const onImageChange = ({ target }) => {
		setImageUrlValue(target.value);
	};

	const onTitleChange = ({ target }) => {
		setTitleValue(target.value);
	};

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				value={titleValue}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0 20px"
				editButton={
					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						size="22px"
						onClick={onSave}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				onPaste={handlePaste}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 9px 0;
	}

	& .post-text {
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST,
};
