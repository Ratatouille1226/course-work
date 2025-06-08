import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../action';
import { useServerRequest } from '../../../../hooks';
import { Icon } from '../../../../components';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);

	const onPostRemove = () => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon
						inactive={true}
						id="fa-calendar-o"
						size="18px"
						margin="0 7px 0 0"
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							margin="0 0 0 15px"
							size="21px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
		display: flex;
		justify-content: space-between;
		margin: ${({ margin }) => margin};
		font-size: 18px;

	& .published-at {
		display: flex;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .buttons {
		display: flex;
    font-
	}`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
