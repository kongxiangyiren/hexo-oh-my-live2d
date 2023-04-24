'use strict';
const urlFor = require('hexo-util').url_for.bind(hexo);
const { readFileSync } = require('fs');
const { join } = require('path');

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
        : urlFor(config.CDN)
      : 'https://npm.elemecdn.com/oh-my-live2d/dist/index.min.js',
    option: config.option ? config.option : undefined
  };

  //脚本资源
  let js_text = `<script data-pjax src="${data.CDN}"></script>`;
  //挂载容器脚本
  var user_info_js = `<script>
OML2D.loadOhMyLive2D({
  ${
    data.option.source !== undefined
      ? `source:${JSON.stringify(data.option.source)},`
      : ''
  }
  ${
    data.option.mobileShow !== undefined
      ? `mobileShow:${JSON.stringify(data.option.mobileShow)},`
      : ''
  }
  ${
    data.option.sayHello !== undefined
      ? `sayHello:${JSON.stringify(data.option.sayHello)},`
      : ''
  }
  ${
    data.option.transitionTime !== undefined
      ? `transitionTime:${JSON.stringify(data.option.transitionTime)},`
      : ''
  }
  ${
    data.option.models !== undefined
      ? `models:${JSON.stringify(data.option.models)},`
      : ''
  }
  tips:{
    ${
      data.option.tips.style !== undefined
        ? `style:${JSON.stringify(data.option.tips.style)},`
        : ''
    }
    ${
      data.option.tips.welcomeTips !== undefined
        ? `welcomeTips:${JSON.stringify(data.option.tips.welcomeTips)},`
        : ''
    }
    ${
      data.option.tips.copyTips !== undefined
        ? `copyTips:${JSON.stringify(data.option.tips.copyTips)},`
        : ''
    }
    idleTips:{
      ${
        data.option.tips.idleTips.message !== undefined
          ? `message:${JSON.stringify(data.option.tips.idleTips.message)},`
          : ''
      }
      ${
        data.option.tips.idleTips.persistTime !== undefined
          ? `persistTime:${JSON.stringify(
              data.option.tips.idleTips.persistTime
            )},`
          : ''
      }
      ${
        data.option.tips.idleTips.interval !== undefined
          ? `interval:${JSON.stringify(data.option.tips.idleTips.interval)},`
          : ''
      }
      ${
        data.option.tips.idleTips.priority !== undefined
          ? `priority:${JSON.stringify(data.option.tips.idleTips.priority)},`
          : ''
      }
      ${
        data.option.tips.idleTips.remote !== undefined
          ? `remote:${data.option.tips.idleTips.remote},`
          : ''
      }
    }
  }
  });
  </script>`;

  hexo.extend.injector.register('body_end', js_text, 'default');

  hexo.extend.injector.register('body_end', user_info_js, 'default');
});

// 本地cdn
hexo.extend.generator.register('oh-my-live2d', () => {
  const config = hexo.config.OhMyLive2d;

  if (!(config && config.enable) || (config.CDN && config.CDN !== 'local'))
    return;

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
