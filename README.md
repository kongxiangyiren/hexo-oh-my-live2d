一个用于 hexo 的 live2d 看板娘插件，支持所有版本的模型。

\_config.yml

```yaml
OhMyLive2d:
  enable: true
  CDN: https://npm.elemecdn.com/oh-my-live2d/dist/index.min.js
#  非全部配置 详情请看 https://oh-my-live2d.netlify.app/
 option:
    source: 'https://npm.elemecdn.com'
    sayHello: false
    transitionTime: 1000
    models:
      scale: 1.2
      path: /live2d-widget-model-koharu@1.0.5/assets/koharu.model.json
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
```
