<script lang="ts" setup>
import FormWrapper from "../components/FormWrapper.vue";
import InnerForm from "../components/InnerForm.vue";
import Setting from "../components/Setting.vue";
import { usePrevious } from "../composables/usePrevious";
// 表单左侧图片URL
const formData = ref({
  icon: "https://preview.pro.ant.design/logo.svg",
  title: "Ant Design",
  description: "Ant Design is the most influential web design specification in Xihu district",
  type: "one",
  pageJustifyCenter: "center",
  pageBgImage: "none",
  pageBgColor: "#fff",
  formWidth: 360,
  formMinWidth: 320,
  formMaxWidth: 400,
  formBgColor: "#fff",
  formBgImage: "none",
  formBoxShadow: "none",
  pagePaddingX: 0,
  pagePaddingY: 0,

  formLeftBgImage: "none",
  formLeftBgColor: "inherit",
  formRightBgImage: "none",
  formRightBgColor: "inherit",
  formHeight: "auto",
});

const prevJustifyCenter = usePrevious(formData.value.pageJustifyCenter);
const varCssStyle = computed(() => {
  let padding = [0, 0, 0, 0];
  if (formData.value.pagePaddingX > 0) {
    padding[1] = formData.value.pagePaddingX;
  } else {
    padding[3] = formData.value.pagePaddingX;
  }

  if (formData.value.pagePaddingY > 0) {
    padding[0] = formData.value.pagePaddingY;
  } else {
    padding[2] = formData.value.pagePaddingY;
  }

  console.log("prevJustifyCenter", prevJustifyCenter.value, padding, formData.value);
  if (prevJustifyCenter.value && prevJustifyCenter.value !== formData.value.pageJustifyCenter) {
    padding = [0, 0, 0, 0];
  }

  const paddingValue = `${padding.join("px ")}px`;
  return {
    "--pageBgColor": formData.value.pageBgColor,
    "--pageBgImage": formData.value.pageBgImage,
    "--pageJustifyCenter": formData.value.pageJustifyCenter,
    "--formWidth": `${formData.value.formWidth}px`,
    "--formMinWidth": `${formData.value.formMinWidth}px`,
    "--formMaxWidth": `${formData.value.formMaxWidth}px`,
    "--formBgColor": formData.value.formBgColor,
    "--formBoxShadow": formData.value.formBoxShadow,
    "--pagePadding": paddingValue,
  };
});
</script>

<template>
  <div class="login-page--normal flex items-center w-screen h-screen" :style="varCssStyle">
    <FormWrapper :type="formData.type">
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
    </FormWrapper>
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
