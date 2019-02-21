module.exports = {
	rules: {
		indent: [
			0,
			'tab',
			{
				MemberExpression: 'off',
				CallExpression: { arguments: 1 }
			}
		],
		quotes: [1, 'single', { allowTemplateLiterals: true }],
		'linebreak-style': [1, 'unix'],
		'no-mixed-spaces-and-tabs': 1,
		'no-console': 0,
		'no-unused-vars': [
			1,
			{
				args: 'none',
				ignoreRestSiblings: true
			}
		],
		'no-extra-semi': 1,
		'comma-dangle': 0,
		'no-redeclare': 1,
		'no-empty': 1,
		'no-irregular-whitespace': 1,
		'no-cond-assign': [1, 'except-parens'],
		'no-delete-var': 1,
		'no-inner-declarations': 0,
		'no-constant-condition': [1, { checkLoops: false }],

		// errors
		// 'no-assign-implicit-global': 2,
		semi: [2, 'never'],
		'eol-last': 2,
	},
	env: {
		node: true,
		jest: true,
		es6: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	globals: {
		window: "readonly"
	}
};
