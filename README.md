# music-163-user-trending

### How to use

1. 安装nodejs和yarn环境，参考：<https://linuxize.com/post/how-to-install-node-js-on-centos-7/>
2. 下载当前项目到本地，在项目根目录执行 `yarn` 命令来安装依赖
3. 使用命令 `./run.sh` 执行程序并获取数据，数据会被写到 `data.txt` 文件中
4. 目前数据是每分钟获取一次，可以根据需要自行修改，定时任务使用到了[cron](https://www.npmjs.com/package/cron)库
