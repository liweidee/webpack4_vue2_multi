const path = require('path');
const glob = require('glob');
const argv = require('yargs').argv;

// 获取绝对路径
const resolvePath = dir => {
    return path.resolve(__dirname, '../', dir);
};

// 获取入口文件
const entriesPage = (entryPath => {
    let baseName,
        pathName,
        filesPath,
        filesList = {},
        excludes = [];

    filesPath = glob.sync(`${entryPath}/*/*.js`, {
        ignore: excludes
    });

    filesPath.forEach((entry, index) => {
        baseName = path.basename(entry, path.extname(entry));
        pathName = entry.split('src/pages/')[1].split('/')[0];

        let pagesEntry = !argv['pages'] ? [] : argv['pages'].split(',');
        if (pagesEntry.length) {
            pagesEntry.forEach((item, index) => {
                if (entry.indexOf(`pages/${item}`) > -1) {
                    filesList[pathName + '/' + baseName] = entry;
                }
            });
        } else {
            filesList[pathName + '/' + baseName] = entry;
        }
    });
    return filesList;
})(resolvePath('src/pages'));

// 获取页面模板参数
const htmlPages = (entriesPage => {
    let resultFiles = [];

    for (let key in entriesPage) {
        let htmlPlugin = {
            filename: key.split('/')[1],
            filedir: key.split('/')[0],
            chunks: [key, 'manifest', 'vendor']
        };
        resultFiles.push(htmlPlugin);
    }
    return resultFiles;
})(entriesPage);

module.exports = {
	resolvePath,
	htmlPages,
	entriesPage
};