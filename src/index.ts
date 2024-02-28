import { readFileSync } from 'fs';
import { join } from 'path';

const fullPath = `oh-my-live2d/dist/index.min.js`;

hexo.extend.filter.register('after_generate', function () {
  // 首先获取整体的配置项名称
  const config = hexo.config.OhMyLive2d;
  // 如果配置开启
  if (!(config && config.enable)) return;

  //声明配置项
  const data = {
    CDN: config.CDN
      ? config.CDN === 'local'
        ? `/pluginsSrc/${fullPath}`
        : config.CDN
      : 'https://registry.npmmirror.com/oh-my-live2d/0.4.2/files/dist/index.min.js',
    option: config.option ? config.option : undefined
  };

  //脚本资源
  let js_text = `<script data-pjax src="${data.CDN}"></script>`;
  //挂载容器脚本
  var user_info_js = `<script>
  OML2D.loadOml2d({
    ${data.option.fixed !== undefined ? `fixed:${data.option.fixed},` : ''}
    ${data.option.models !== undefined ? `models:${JSON.stringify(data.option.models)},` : ''}
    ${data.option.parentElement !== undefined ? `parentElement:${data.option.parentElement},` : ''}
    ${data.option.sayHello !== undefined ? `sayHello:${data.option.sayHello},` : ''}
    ${
      data.option.transitionTime !== undefined
        ? `transitionTime:${data.option.transitionTime},`
        : ''
    }
    ${data.option.tips !== undefined ? `tips:${JSON.stringify(data.option.tips)},` : ''}

  });
  </script>`;

  hexo.extend.tag.register('body_end', () => js_text, { ends: true, async: true });
  hexo.extend.tag.register('body_end', () => user_info_js, { ends: true, async: true });
});

// 本地cdn
hexo.extend.generator.register('oh-my-live2d', () => {
  const config = hexo.config.OhMyLive2d;

  if (!(config && config.enable) || (config.CDN && config.CDN !== 'local')) return [];

  const dataObj = [];
  const errorObj = [];

  try {
    dataObj.push({
      path: `pluginsSrc/${fullPath}`,
      data: readFileSync(join(hexo.plugin_dir, fullPath))
    });
  } catch (error) {
    errorObj.push(`The file does not exist: ${fullPath}`);
  }

  if (errorObj.length > 0) {
    hexo.log.warn('Please reinstall hexo-oh-my-live2d.');
    for (const value of errorObj) {
      hexo.log.warn(value);
    }
    process.exit(-1);
  }

  return dataObj;
});
