module.exports = {
	plugins: [
		require('autoprefixer')({
			remove: false,
            browsers: ['last 10 versions']
		}) // 自动添加css前缀
	]
};