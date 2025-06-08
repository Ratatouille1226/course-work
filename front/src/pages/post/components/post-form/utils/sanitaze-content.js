export const sanitazeContent = (content) =>
	content
		.replaceAll('&nbsp;', ' ')
		.replaceAll('&amp;nbsp;', ' ')
		.replace(/ +/, ' ')
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '');
