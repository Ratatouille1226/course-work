import PropTypes from 'prop-types';
import { styled } from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдушая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	width: 100%;
	position: absolute;
	margin: 0 0 20px;
	bottom: 140px;
	padding: 0 35px;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		border: 1px solid #000;
		width: 100%;
		height: 32px;
		margin: 0 5px;
		text-align: center;
		font-size: 18px;
		font-weight: 500;
		line-height: 28px;
	}
`;
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,
}
