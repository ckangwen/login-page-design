<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

import { highlightCode } from "../utils/shiki";
import { prettierFormat } from "../utils/prettier";

const code = ref("");
const raw = `
<template>
  <div class="login-page--normal flex items-center w-screen h-screen" :style="varCssStyle">
      <div class="flex flex-col items-center justify-center h-auto box-border login-container">
        <div class="flex h-44px login-wrapper">
          <span class="w-44px h-44px mr-4">
            <img class="w-full h-full" alt="logo" :src="formData.icon" />
          </span>
          <span class="text-[30px] font-bold">{{ formData.title }}</span>
        </div>
        <div class="text-center mt-4 mb-10 text-sm text-[#848587]">
          {{ formData.description }}
        </div>
        <div class="w-full">
          <InnerForm></InnerForm>
        </div>
      </div>
  </div>

  <div class="setting">
    <Setting v-model="formData"></Setting>
  </div>
</template>

<style lang="scss">
.login-page--center {
  .login-wrapper {
    @apply: items-center justify-center;
  }
}
.login-page--bg {
  --bg-color: #f0f2f5;
  --bg-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
}

.login-page--normal {
  background-color: var(--pageBgColor);
  background-image: var(--pageBgImage);
  justify-content: var(--pageJustifyCenter);
  padding: var(--pagePadding);
  background-size: cover;
  background-repeat: no-repeat;
}

.login-container {
  background-color: var(--formBgColor);
  width: var(--formWidth);
  min-width: var(--formMinWidth);
  max-width: var(--formMaxWidth);
  box-shadow: var(--formBoxShadow);

  border-radius: 8px;
  padding: 20px 30px;
  // background: rgba(255, 255, 255, 0.8);
  // backdrop-filter: saturate(50%) blur(3px);
}
</style>
`;

const init = async () => {
  code.value = await highlightCode(await prettierFormat(raw));
};

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});
const emit = defineEmits(["update:modelValue"]);
const innerVisible = useVModel(props, "modelValue", emit);

init();
</script>

<template>
  <el-dialog v-model="innerVisible" class="code-preview-dialog" width="80vw">
    <template #header>
      <div>
        <div flex items-center>
          <span inline-block w-14px h-14px rounded-full mr-2 bg="#ff5f57"></span>
          <span inline-block w-14px h-14px rounded-full mr-2 bg="#febc2e"></span>
          <span inline-block w-14px h-14px rounded-full bg="#28c840"></span>

          <div
            flex
            items-center
            ml-4
            h-30px
            rounded-lg
            px-3
            style="background-color: rgba(255, 255, 255, 0.1)"
          >
            <svg
              w-20px
              h-20px
              t="1677681699182"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2709"
              width="200"
              height="200"
            >
              <path
                d="M615.6 123.6h165.5L512 589.7 242.9 123.6H63.5L512 900.4l448.5-776.9z"
                fill="#41B883"
                p-id="2710"
              ></path>
              <path
                d="M781.1 123.6H615.6L512 303 408.4 123.6H242.9L512 589.7z"
                fill="#34495E"
                p-id="2711"
              ></path>
            </svg>
            <span text-sm ml-1 text="#d48372">Login.vue</span>
          </div>
        </div>
      </div>
    </template>
    <div w-full h-full rounded>
      <div rounded v-html="code"></div>
    </div>
  </el-dialog>
</template>

<style lang="scss">
.code-preview-dialog.el-dialog {
  --el-dialog-border-radius: 8px;
  background-color: #121212;

  .el-dialog__body {
    padding-top: 8px;

    .shiki {
      border-radius: 8px;
    }
  }
}
</style>
