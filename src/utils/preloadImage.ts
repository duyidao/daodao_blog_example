import fastGlob from "fast-glob";
import type { HtmlTagDescriptor } from "vite";

interface PreloadImageOptions {
  // 预加载图片的路径
  dir: string;
  attrs?: {
    rel: "preload" | "prefetch";
  };
}

export function PreloadImage(options: PreloadImageOptions) {
  return {
    name: "vite-plugin-preload-image",
    transformIndexHtml(html: string, ctx: any) {
      const { dir, attrs = {} } = options;
      const files = fastGlob.sync(dir, {
        cwd: ctx?.server?.config?.publicDir,
      });
      return files.map((file) => {
        return {
          tag: "link",
          attrs: {
            rel: "prefetch",
            href: ctx?.server?.config?.base + file,
            as: "image",
            ...attrs,
          },
        };
      });
    },
  };
}
