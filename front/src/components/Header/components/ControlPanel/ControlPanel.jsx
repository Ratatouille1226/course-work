import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../selectors';
import { Icon, Button } from '../../../../components';
import styled from 'styled-components';
import { ROLE } from '../../../../constants';
import { logout } from '../../../../action';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 32px;
`;

const UserName = styled.div`
	font-size: 17px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const sessions = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(sessions));
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)} />
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon id="fa-file-text-o" margin="10px 0 0 16px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
