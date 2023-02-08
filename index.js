'use strict';

const urlFor = require('hexo-util').url_for.bind(hexo);
const { readFileSync } = require('fs');
const { resolve } = require('path');
hexo.extend.filter.register('after_generate', function () {
  // 首先获取整体的配置项名称
  const config = hexo.config.OhMyLive2d;
  // 如果配置开启
  if (!(config && config.enable)) return;
  // 集体声明配置项
  const data = {
    CDN: config.CDN
      ? config.CDN === 'local'
        ? 'local'
        : urlFor(config.CDN)
      : 'https://npm.elemecdn.com/oh-my-live2d/dist/index.min.js',
    option: config.option ? JSON.stringify(config.option) : undefined
  };

  //cdn资源声明
  //脚本资源
  //脚本资源
  let js_text;
  if (data.CDN === 'local') {
    js_text = `<script data-pjax>
    ${readFileSync(resolve('./node_modules/oh-my-live2d/dist/index.min.js'), {
      encoding: 'utf-8'
    })}
    </script>`;
  } else {
    js_text = `<script data-pjax src="${data.CDN}"></script>`;
  }

  //挂载容器脚本
  var user_info_js = `<script>
  OML2D.loadOhMyLive2D(${data.option});
  </script>`;
  // 注入用户脚本
  // 注入样式资源
  hexo.extend.injector.register('body_end', js_text, 'default');
  // 此处利用挂载容器实现了二级注入
  hexo.extend.injector.register('body_end', user_info_js, 'default');
});
