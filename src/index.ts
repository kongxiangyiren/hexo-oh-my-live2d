import { readFileSync } from 'fs';
import { join } from 'path';

const fullPath = 'oh-my-live2d/dist/index.min.js';

hexo.extend.filter.register('after_generate', function () {
  // 首先获取整体的配置项名称
  const config = hexo.config.OhMyLive2d;
  // 如果配置开启
  if (!config?.enable) return;

  // 声明配置项
  const data = {
    CDN: config.CDN
      ? config.CDN === 'local'
        ? `/pluginsSrc/${fullPath}`
        : config.CDN
      : 'https://registry.npmmirror.com/oh-my-live2d/latest/files',
    option: config.option ? config.option : {}
  };

  // 脚本资源
  const js_text = `<script data-pjax src="${data.CDN}"></script>`;

  // 挂载容器脚本
  // fixed 组件是否使用固定定位
  const fixed = data.option && data.option.fixed !== undefined ? `fixed:${data.option.fixed},` : '';

  // importType 导入类型, 默认使用全量导入: 'complete'
  const importType =
    data.option && data.option.importType !== undefined
      ? `importType:${data.option.importType},`
      : '';

  // libraryUrls 自定义 Cubism SDK外部资源地址
  const libraryUrls =
    data.option && data.option.libraryUrls !== undefined
      ? `libraryUrls:${JSON.stringify(data.option.libraryUrls)},`
      : '';

  // models 定制模型配置, 类型是模型配置对象组成的数组, 默认值是空数组, 请至少配置一个有效的模型配置
  const models =
    data.option && data.option.models !== undefined
      ? `models:${JSON.stringify(data.option.models)},`
      : '';

  // parentElement 为组件提供一个父元素，如果未指定则默认挂载到 body 中
  const parentElement =
    data.option && data.option.parentElement !== undefined
      ? `parentElement:${data.option.parentElement},`
      : '';

  // sayHello 是否在初始化阶段打印项目信息
  const sayHello =
    data.option && data.option.sayHello !== undefined ? `sayHello:${data.option.sayHello},` : '';

  // tips 自定义提示框样式和内容
  const tips =
    data.option && data.option.tips !== undefined
      ? `tips:${JSON.stringify(data.option.tips)},`
      : '';

  // transitionTime 组件入场和离开的过渡动画时长,单位ms
  const transitionTime =
    data.option && data.option.transitionTime !== undefined
      ? `transitionTime:${data.option.transitionTime},`
      : '';

  // 汇总拼接
  const user_info_js =
    '<script>OML2D.loadOml2d({' +
    fixed +
    importType +
    libraryUrls +
    models +
    parentElement +
    sayHello +
    tips +
    transitionTime +
    '});</script>';

  // @ts-expect-error
  hexo.extend.injector.register('body_end', js_text, 'default');
  // @ts-expect-error
  hexo.extend.injector.register('body_end', user_info_js, 'default');
});

// 本地cdn
hexo.extend.generator.register('oh-my-live2d', () => {
  const config = hexo.config.OhMyLive2d;

  if (!config?.enable || (config.CDN && config.CDN !== 'local')) return [];

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
