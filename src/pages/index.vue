<script lang="ts" setup>
import { CharrueSchemaForm } from "@charrue/schema-form-next";
import InnerForm from "../components/InnerForm.vue";
import { useDesignConfig } from "../composables/useDesignConfig";
import { useSetting } from "../composables/useSetting";

const formData = useDesignConfig();

const {
  collapsed,
  codePreviewVisible,
  schema,
  visibleState,

  onCollapse,
  onOpenCodePreview,
} = useSetting(formData);

const varCssStyle = computed(() => {
  const padding: string[] = ["0px", "0px", "0px", "0px"];
  if (parseFloat(formData.value.pagePaddingX) > 0) {
    padding[1] = formData.value.pagePaddingX;
  } else {
    padding[3] = formData.value.pagePaddingX;
  }

  if (parseFloat(formData.value.pagePaddingY) > 0) {
    padding[0] = formData.value.pagePaddingY;
  } else {
    padding[2] = formData.value.pagePaddingY;
  }

  const paddingValue = `${padding.join("px ")}px`;
  const style = {
    "--pageBgColor": formData.value.pageBgColor,
    "--pageBgImage": formData.value.pageBgImage,
    "--pageJustifyCenter": formData.value.pageJustifyCenter,
    "--formRootWidth": formData.value.formRootWidth,
    "--formContainerWidth":
      formData.value.type === "one" ? "100%" : `calc(100% - ${formData.value.formLeftColumnWidth})`,
    "--formBorderRadius": "8px",
    // "--formBorderRadius": formData.value.type === "one" ? "8px" : "0 8px 8px 0",
    "--formLeftBasis": formData.value.type === "one" ? "0" : "50%",
    "--formRightBasis": formData.value.type === "one" ? "0" : "50%",
    "--formMinWidth": `${formData.value.formMinWidth}px`,
    "--formMaxWidth": `${formData.value.formMaxWidth}px`,
    "--formBgColor": formData.value.formBgColor,
    "--formBgImage": formData.value.formBgImage,
    "--formBoxShadow": formData.value.formBoxShadow,
    "--formLeftColumnWidth": formData.value.formLeftColumnWidth,
    "--pagePadding": paddingValue,
  };
  return Object.entries(style).reduce((acc, [key, value]) => {
    if (value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {} as unknown as Record<string, string>);
});
</script>

<template>
  <div
    bg="cover no-repeat"
    flex
    items-center
    w-screen
    h-screen
    class="login-page-container"
    :style="varCssStyle"
  >
    <div flex class="login-form-root">
      <div flex="grow-0 shrink-0" h-auto class="login-form__left"></div>
      <div
        flex="~ col grow-0 shrink-0"
        items-center
        justify-center
        h-auto
        box-border
        class="login-form-container"
      >
        <div flex="~ col" class="login-form__header">
          <div flex items-center>
            <span class="w-44px h-44px mr-4">
              <img class="w-full h-full" alt="logo" :src="formData.icon" />
            </span>
            <span class="text-[30px] font-bold">{{ formData.title }}</span>
          </div>
          <div w-full text="center sm" m="t-4 b-10" class="text-[#848587]">
            {{ formData.description }}
          </div>
        </div>
        <div w-full>
          <InnerForm></InnerForm>
        </div>
      </div>
    </div>
  </div>

  <el-button
    :class="[collapsed ? 'setting-icon--opened' : 'setting-icon--collapsed']"
    class="w-32px h-32px"
    circle
    @click="onCollapse"
  >
    <span class="i-mdi-unfold-less-vertical cursor-pointer" />
  </el-button>
  <div
    class="setting"
    :class="{
      'setting--collapsed': collapsed,
    }"
  >
    <div class="flex justify-end sticky top-0 pt-4 pb-2 bg-white z-3">
      <el-button class="w-32px h-32px" circle @click="onOpenCodePreview">
        <span class="i-mdi-code-braces cursor-pointer" />
      </el-button>
      <el-button class="w-32px h-32px" circle @click="onCollapse">
        <span class="i-mdi-unfold-less-vertical cursor-pointer" />
      </el-button>
    </div>

    <CharrueSchemaForm
      v-model="formData"
      :schema="schema"
      :visible-state="visibleState"
      label-position="left"
    ></CharrueSchemaForm>
  </div>

  <CodePreview v-model="codePreviewVisible"></CodePreview>
</template>

<style lang="scss">
.login-page-container {
  background-color: var(--pageBgColor);
  background-image: var(--pageBgImage);
  justify-content: var(--pageJustifyCenter);
  padding: var(--pagePadding);
}
.login-form-root {
  transition: all 0.3s;
  width: var(--formRootWidth);
  border-radius: var(--formBorderRadius);
  background-image: var(--formBgImage);
  box-shadow: var(--formBoxShadow);
}

.login-form-container {
  background-color: var(--formBgColor);
  width: var(--formContainerWidth);
  padding: 20px 30px;
  // background: rgba(255, 255, 255, 0.8);
  // backdrop-filter: saturate(50%) blur(3px);
}
.login-form__left {
  flex-basis: var(--formLeftColumnWidth);
}

.setting-icon--opened.el-button.is-circle {
  position: fixed;
  top: 20px;
  right: 20px;
  box-shadow: 0 10px 40px #1d161733;
  background-color: #fff;
  z-index: 3;
  transition: all 0.3s;
  border-radius: 50%;
}
.setting-icon--collapsed.el-button.is-circle {
  display: none;
  width: 0;
  transition: all 0.3s;
}

.setting {
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 10px 40px #1d161733;
  background-color: #fff;
  padding: 0 20px;
  z-index: 3;
  border-radius: 8px;
  overflow: auto;
  height: calc(100vh - 40px);
  transition: all 0.3s;

  &--collapsed {
    width: 0;
    display: none;
  }

  .charrue-schema-field-item {
    // border: 1px solid var(--el-border-color);
    --el-select-border-color-hover: none;
    --el-select-input-focus-border-color: none;
    .el-input__wrapper,
    .el-input__wrapper.is-focus,
    .el-textarea__inner,
    .el-input__inner {
      box-shadow: none;
    }
  }
}
</style>
