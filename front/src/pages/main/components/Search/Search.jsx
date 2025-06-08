import PropTypes from 'prop-types';
import { Input } from '../../../../components';
import { Icon } from '../../../../components';
import { styled } from 'styled-components';

const SearchContainer = ({ className, onChange, searchPhrase }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по заголовкам..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="22px" margin="0 0 0 0" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	margin: 40px auto 0;
	width: 340px;
	height: 40px;

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& > div {
		position: absolute;
		top: 5px;
		right: 9px;
	}
`;

Search.propTypes = {
	onChange: PropTypes.func.isRequired,
	searchPhrase: PropTypes.string.isRequired,
};
