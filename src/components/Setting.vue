<script setup lang="ts">
import {
  CharrueSchemaForm,
  createSchemaPipeline,
  createInputSchema,
  createSelectSchema,
  createInputNumberSchema,
  createColorPickerSchema,
} from "@charrue/schema-form-next";
import { useVModel } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Object,
  },
});
const emit = defineEmits(["update:modelValue"]);

const innerValue = useVModel(props, "modelValue", emit);

const schema = createSchemaPipeline(
  createInputSchema("icon", "图标"),
  createInputSchema("title", "页面标题"),
  createInputSchema("description", "页面副标题"),
  createSelectSchema("type", "页面风格", {
    enums: [
      {
        label: "One",
        value: "one",
      },
      {
        label: "Two",
        value: "two",
      },
    ],
  }),
  createSelectSchema("pageJustifyCenter", "对齐方式", {
    enums: [
      {
        label: "居中",
        value: "center",
      },
      {
        label: "左对齐",
        value: "flex-start",
      },
      {
        label: "右对齐",
        value: "flex-end",
      },
    ],
  }),
  createInputNumberSchema("formWidth", "表单默认宽度"),
  createInputNumberSchema("formMinWidth", "表单最小宽度"),
  createInputNumberSchema("formMaxWidth", "表单最大宽度"),
  createInputNumberSchema("pagePaddingX", "水平偏移量"),
  createInputNumberSchema("pagePaddingY", "垂直偏移量"),
  createSelectSchema("pageBgImage", "页面背景图", {
    enums: [
      {
        label: "无",
        value: "none",
      },
      {
        label: "预设1",
        value: "url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')",
      },
    ],
  }),
  createColorPickerSchema("pageBgColor", "页面背景色", {
    uiProps: {
      showAlpha: true,
      predefine: ["#fff"],
    },
  }),
  createColorPickerSchema("formBgColor", "表单背景色", {
    uiProps: {
      showAlpha: true,
      predefine: ["#fff", "#f0f2f5"],
    },
  }),
  createSelectSchema("formBoxShadow", "表单阴影", {
    enums: [
      {
        label: "无",
        value: "none",
      },
      {
        label: "预设1",
        value: "0px 10px 40px rgb(29 22 23 / 20%)",
      },
    ],
  }),
);
</script>
<template>
  <div class="setting">
    <CharrueSchemaForm v-model:model-value="innerValue" :schema="schema"></CharrueSchemaForm>
  </div>
</template>

<style lang="scss">
.setting {
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 10px 40px #1d161733;
  background-color: #fff;
  padding: 20px;
  z-index: 3;
  border-radius: 8px;
  overflow: auto;
  height: calc(100vh - 40px);

  .charrue-schema-field-item {
    border-bottom: 1px solid var(--el-border-color);
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
