const snakeToCamel = (object: object) => {
	const str = JSON.stringify(object);
	return JSON.parse(str.replace(
		/([-_][a-z])/g,
		(group: any) => group.toUpperCase()
			.replace('-', '')
			.replace('_', '')
	));
};

export { snakeToCamel }
