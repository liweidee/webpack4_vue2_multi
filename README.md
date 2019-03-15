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
