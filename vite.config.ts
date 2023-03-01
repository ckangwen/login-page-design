import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unocss from "unocss/vite";
import vueComponents from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import autoImport from "unplugin-auto-import/vite";
import Pages from "vite-plugin-pages";
import {
  presetAttributify,
  presetTypography,
  presetUno,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Pages(),
    vueComponents({
      resolvers: [ElementPlusResolver()],
      dirs: ["src/components"],
      extensions: ["vue", "tsx"],
    }),
    autoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: ["vue", "@vueuse/core"],
    }),
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetTypography(),
        presetIcons({
          scale: 1.5,
        }),
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()],
    }),
  ],
});
