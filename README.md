## webpack4.x + vue2.x多页面

webpack4.x + vue2.x 多入口，多页面项目构建案例

**目录说明**

```shell
.
├── build              # webpack配置文件
├── dist               # 构建命令生成的页面
├── config             # 公共配置文件
├── node_modules       # node模块
├── src                # 页面源码
├── README.md
└── package.json
```

**1、安装依赖npm install**

```
npm install
```

**2、运行run**

```
npm run dev // 开发环境
npm run build // 生产环境打包
npm run server // 基于当前目录启动服务器

指定文件目录打包
npm run build

默认打包全部
npm run build -- --pages=page1,page2
打包page1和page2 多文件用逗号','间隔

```

## 参考资料
- [wepack官方文档](https://webpack.js.org/concepts/)
- [Webpack4不完全迁移指北](https://github.com/dwqs/blog/issues/60)
- [基于 Webpack4 + Vue 的多页应用解决方案](https://www.jianshu.com/p/c52df2689d34)
- [webpack4之高级篇](https://juejin.im/post/5ab7c222f265da237f1e4434)
- [Webpack4优化之路](https://juejin.im/post/5ac42d5c6fb9a028b617b851)
- [使用webpack4提升180%编译速度](https://juejin.im/entry/5c302140f265da611b587f99)
- [webpack中的hash、chunkhash、contenthash区别](https://juejin.im/post/5a4502be6fb9a0450d1162ed)
- [[webpack] devtool里的7种SourceMap模式是什么鬼？](https://juejin.im/post/58293502a0bb9f005767ba2f)
