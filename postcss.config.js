module.exports = {
	plugins: [
		require('autoprefixer')({
			remove: false,
            browsers: ['last 10 versions']
		})
	]
};