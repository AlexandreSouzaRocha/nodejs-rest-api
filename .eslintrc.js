module.exports = {
	root: true,
	env: {
		es2021: true,
		node: true,
	},
	extends: ['airbnb', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2021,
	},
	parser: 'babel-eslint',
	settings: {
		'import/extensions': ['.js'],
		'import/resolver': {
			node: {
				extensions: ['.js'],
			},
		},
		ignorePackages: true,
	},
	plugins: ['prettier'],
	rules: {},
};
