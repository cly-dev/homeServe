/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-26 23:34:41
 * @Description:
 */
/*
 * @Author: cly-dev 2663118046@qq.com
 * @Date: 2023-11-26 23:34:41
 * @Description: pm2配置
 */
module.exports = {
  apps: [
    {
      name: 'server', //应用名称
      // script: 'main.js', //入口文件
      script: 'npm',
      args: 'run start:prod', //执行脚本的参数
      //   instances: 2, // 允许应用程序的实例数
      //   max_restarts: 7, // 应用程序崩溃，尝试重新启动的最大次数
      //   exec_mode: 'cluster', //应用程序的执行模式。在这里，设置为 'cluster'，表示使用集群模式运行多个实例。
      //   merge_logs: true, //是否将所有实例的日志合并到一个文件中
      //   log_date_format: 'YYYY-MM-DD HH:mm Z', //日志中日期的格式。在这里，设置为 "YYYY-MM-DD HH:mm Z",
      env: {
        //环境变量
        NODE_ENV: 'prod',
      },
    },
  ],
};
