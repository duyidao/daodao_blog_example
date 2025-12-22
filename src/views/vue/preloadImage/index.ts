/**
 * 预加载图片资源
 * @params images 图片资源数组
 * @returns Promise
 */
export function preloadImages(images) {
  return new Promise((resolve, reject) => {
    images.forEach((image) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = image;
      document.head.appendChild(link);
    });
    images.onload = resolve;
    images.onerror = reject;
  })
}