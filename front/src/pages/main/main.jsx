import { useMemo, useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard, Pagination, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce, getLastPageFromLinks } from './utils/';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ response: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPageFromLinks(links));
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};
	return (
		<div className={className}>
			<div className="post-and-search">
				<Search onChange={onSearch} searchPhrase={searchPhrase} />
				{posts.length ? (
					<div className="post-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, commentsCount }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>

			{lastPage > 1 && posts.length > 0 && (
				<Pagination page={page} setPage={setPage} lastPage={lastPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px 20px 80px;
	}

	& .no-posts-found {
		margin: 0 auto;
		padding: 20px;
		font-size: 20px;
		text-align: center;
	}
`;
