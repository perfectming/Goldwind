## run dev

    npm run hot-dev-server
    npm run start-dev

### 永久外部引用库

* jquery
* fastclick
* bluebird
* lodash

### BaseApplication

* react
* react-dom
* react-router

### 其他常用依赖

* jquery.cookie
* redux

### 项目结构

 |-- cloudLink
    |-- app/                应用代码
        |-- components/     组件包
        |-- common/         通用组件
        |-- redux/          react-redux
        |-- routes/         动态路由包,页面代码
            |-- base/       基础配置
            |-- pages/      页面
        |-- styles/         全局样式
    |-- build/ 前端 build 任务
    |-- config/ 配置文件
    |-- lib/ 依赖库
