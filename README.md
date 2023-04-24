一个用于 hexo 的 live2d 看板娘插件，支持所有版本的模型。

oh-my-live2d 官网: https://oml2d.com/

将 CDN 改为 local 使用本地(不推荐)

\_config.yml

```yaml
OhMyLive2d:
  enable: true
  CDN: https://npm.elemecdn.com/oh-my-live2d@0.3.0/dist/index.min.js
  option:
    source: 'https://npm.elemecdn.com'
    mobileShow: true # 手机端是否展示
    sayHello: false
    transitionTime: 1000
    models:
      - scale: 1.2
        path: /live2d-widget-model-koharu@1.0.5/assets/koharu.model.json
        x: 0
        'y': 0
        stageStyle:
          backgroundColor: 'rgba(0, 0, 0, 0)'
          width: auto
          height: auto
      - scale: 1.2
        path: /live2d-widget-model-haruto@1.0.5/assets/haruto.model.json
        x: 0
        'y': 0
        stageStyle:
          backgroundColor: 'rgba(0, 0, 0, 0)'
          width: auto
          height: auto
    tips:
      style:
        width: 230
        height: 120
        offsetX: 0
        offsetY: 90
      idleTips:
        interval: 15000
        # remote: false # 自定义
        remote: |
          function() {
            return new Promise((resolve, reject) => {
              $.ajax({
                type: 'get',
                url: 'https://v1.hitokoto.cn?c=i',
                dataType: 'json',
                success: res => {
                 // console.log(res);
                  resolve({text: res.hitokoto});
                }
              });
            });
          }
```

css 修改

```css
/* live2d 模型居右 */
#oml-stage {
  right: 60px !important;
  left: auto !important;
  z-index: 30 !important;
}
/* live2d tips 深色 */
[data-theme='dark'] #oml-tips {
  background-color: #121212;
  border: 2px solid rgba(255, 255, 255, 0.3);
  /* filter: drop-shadow(0 0 5px #999); */
  filter: none;
}
/* live2d 左边提示 深色 */
[data-theme='dark'] #oml-levitated-btn {
  background-color: #121212;
  border-style: solid;
  border-width: 2px 2px 2px 0px;
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 4px #999;
}
/* live2d 切换按钮 深色 */
[data-theme='dark'] #oml-controls .oml-control-item {
  background-color: #1f1f1f;
}
[data-theme='dark'] #oml-controls .oml-control-item:hover {
  background-color: #787878;
}
[data-theme='dark'] #oml-controls .oml-control-item svg {
  color: rgba(255, 255, 255, 0.7);
}
```
