一个用于 hexo 的 live2d 看板娘插件，支持所有版本的模型。

oh-my-live2d 官网: https://oml2d.com/

将 CDN 改为 local 使用本地(不推荐)

\_config.yml

```yaml
# hexo-oh-my-live2d 配置
OhMyLive2d:
  enable: true
  CDN: https://registry.npmmirror.com/oh-my-live2d/latest/files
  # CDN: https://registry.npmmirror.com/oh-my-live2d/0.9/files/dist/index.min.js
  option:
    fixed: true # 组件是否使用固定定位
    libraryUrls:
      cubism2: https://registry.npmmirror.com/live2dcubismcore/latest/files/live2d.min.js
      cubism5: https://registry.npmmirror.com/live2dcubismcore/latest/files/live2dcubismcore.min.js
      # cubism2: https://registry.npmmirror.com/live2dcubismcore/1.0.2/files/live2d.min.js
      # cubism5: https://registry.npmmirror.com/live2dcubismcore/1.0.2/files/live2dcubismcore.min.js
    models:
      - path: https://registry.npmmirror.com/live2d-widget-model-shizuku/1.0.5/files/assets/shizuku.model.json
        motionPreloadStrategy: IDLE
        showHitAreaFrames: false
        scale: 0.15
        position: [-10, 35]
        stageStyle:
          width: 250
          height: 250
      - path: 'https://registry.npmmirror.com/live2d-widget-model-koharu/1.0.5/files/assets/koharu.model.json'
        scale: 0.12
        position: [0, 0]
        # stageStyle:
        #   backgroundColor: 'rgba(0, 0, 0, 0)'
        #   width: 300
        #   height: 400
      - path: 'https://registry.npmmirror.com/live2d-widget-model-haruto/1.0.5/files/assets/haruto.model.json'
        scale: 0.12
        position: [0, 0]
        # stageStyle:
        #   backgroundColor: 'rgba(0, 0, 0, 0)'
        #   width: 300
        #   height: 400
    parentElement: document.body #为组件提供一个父元素，如果未指定则默认挂载到 body 中
    sayHello: false # 是否在初始化阶段打印项目信息
    tips:
      style:
        width: 230
        height: 120
        offsetX: 0
        offsetY: -100
      idleTips:
        interval: 15000
        # message:
        #   - 你好呀~
        #   - 欢迎来到我的小站~
        # 自定义提示语 需要 引入 axios 库 ,也可以使用其他方法
        message: |
          function(){
            return axios.get('https://v1.hitokoto.cn')
              .then(function (response) {
                return response.data.hitokoto ;
              })
              .catch(function (error) {
                console.error(error);
              });
          }
        # wordTheDay: true
        # 自定义  https://v1.hitokoto.cn  数据
        # wordTheDay: |
        #   function(wordTheDayData){
        #     return `${wordTheDayData.hitokoto}    by.${wordTheDayData.from}`;
        #   }
```

css 修改

```css
/* live2d 模型居右 */
#oml2dStage {
  right: 60px !important;
  left: auto !important;
  z-index: 30 !important;
}
/* live2d tips 深色 */
[data-theme='dark'] #oml2dTips {
  background-color: #121212 !important;
  border: 2px solid rgba(255, 255, 255, 0.3) !important;
  /* filter: drop-shadow(0 0 5px #999)!important; */
  filter: none !important;
}
/* live2d 左边提示 深色 */
[data-theme='dark'] #oml2dStatusBar {
  background-color: #121212 !important;
  border-style: solid !important;
  border-width: 2px 2px 2px 0px !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 0 4px #999 !important;
}
/* live2d 切换按钮 深色 */
[data-theme='dark'] #oml2dMenus .oml2d-menus-item {
  background-color: #1f1f1f;
}
[data-theme='dark'] #oml2dMenus .oml2d-menus-item:hover {
  background-color: #787878;
}
[data-theme='dark'] #oml2dMenus .oml2d-menus-item svg {
  color: rgba(255, 255, 255, 0.7);
}
```
