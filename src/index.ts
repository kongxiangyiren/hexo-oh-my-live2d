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
    option: config.option ? config.option : {},
    then: config.then ? config.then : () => {}
  };

  // 脚本资源
  const js_text = `<script data-pjax src="${data.CDN}"></script>`;
  // 用户自定义配置
  const JsList: string[] = [];
  for (const key in data.option) {
    if (Object.prototype.hasOwnProperty.call(data.option, key)) {
      const element = data.option[key];
      // parentElement 不要转换成字符串
      if (key === 'parentElement') {
        JsList.push(`parentElement:${element}`);
      } else if (key === 'menus') {
        const menusList: string[] = [];
        for (const menusKey in element) {
          if (Object.prototype.hasOwnProperty.call(element, menusKey)) {
            const menusElement = element[menusKey];
            if (menusKey === 'items') {
              // 判断是不是数组
              if (Array.isArray(menusElement)) {
                //  判断有没有onClick
                if (menusElement.some(item => item.onClick)) {
                  const itemsList: string[] = [];
                  for (const item of menusElement) {
                    const itemList: string[] = [];
                    for (const itemKey in item) {
                      if (Object.prototype.hasOwnProperty.call(item, itemKey)) {
                        const itemElement = item[itemKey];
                        if (itemKey === 'onClick') {
                          itemList.push(`${itemKey}:${itemElement}`);
                        } else {
                          itemList.push(`${itemKey}:${JSON.stringify(itemElement)}`);
                        }
                      }
                    }
                    itemsList.push(`{${itemList.join(',')}}`);
                  }
                  menusList.push(`items:[${itemsList.join(',')}]`);
                } else {
                  menusList.push(`items:${JSON.stringify(menusElement)}`);
                }
              } else {
                menusList.push(`items:${menusElement}`);
              }
            } else {
              menusList.push(`${menusKey}:${JSON.stringify(menusElement)}`);
            }
          }
        }
        JsList.push(`${key}:{${menusList.join(',')}}`);
      } else if (key === 'tips') {
        const tipsList: string[] = [];
        for (const tipsKey in element) {
          if (Object.prototype.hasOwnProperty.call(element, tipsKey)) {
            const tipsElement = element[tipsKey];
            if (tipsKey === 'idleTips') {
              const idleTipsList: string[] = [];
              for (const idleTipsKey in tipsElement) {
                if (Object.prototype.hasOwnProperty.call(tipsElement, idleTipsKey)) {
                  const idleTipsElement = tipsElement[idleTipsKey];
                  if (idleTipsKey === 'wordTheDay') {
                    idleTipsList.push(`wordTheDay:${idleTipsElement}`);
                  } else if (idleTipsKey === 'message') {
                    // 判断是不是数组
                    if (Array.isArray(idleTipsElement)) {
                      idleTipsList.push(`message:${JSON.stringify(idleTipsElement)}`);
                    } else {
                      idleTipsList.push(`message:${idleTipsElement}`);
                    }
                  } else {
                    idleTipsList.push(`${idleTipsKey}:${JSON.stringify(idleTipsElement)}`);
                  }
                }
              }
              tipsList.push(`idleTips:{${idleTipsList.join(',')}}`);
            } else {
              tipsList.push(`${tipsKey}: ${JSON.stringify(tipsElement)}`);
            }
          }
        }
        JsList.push(`${key}:{${tipsList.join(',')}}`);
      } else {
        JsList.push(`${key}:${JSON.stringify(element)}`);
      }
    }
  }

  // 用户自定义配置
  const user_info_js =
    '<script>OML2D.loadOml2d({' + JsList.join(',') + '}).then(' + data.then + ');</script>';

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
