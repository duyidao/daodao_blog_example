/**
 * 预加载图片资源
 * @params images 图片资源数组
 * @returns Promise
 */
export function preloadImages(images, max = 3) {
  const _images = [...images];
  
  function load() {
    const src= _images.shift()
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      link.onload = resolve;
      link.onerror = reject;
    })
  }

  function _load() {
    load().finally(() => {
      if (_images.length) {
        _load();
      }
    })
  }

  for (let i = 0; i < max; i++) {
    _load();
  }
}