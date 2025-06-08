import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const ButtonContainer = ({ children, clasName, width, ...props }) => {
	return (
		<button className={clasName} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	width: ${({ width = '100%' }) => width};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	height: 32px;
	border: 1px solid black;
	background-color: #eee;

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;

Button.PropTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
