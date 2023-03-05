import {
  createSchemaPipeline,
  createSelectSchema,
  createRadioSchema,
  // createColorPickerSchema,
} from "@charrue/schema-form-next";
import type { Ref } from "vue";
import {
  createFalseOrUnitSchema,
  createFalseOrStringSchema,
  createObjectSchema,
} from "../utils/form";

const schema = createSchemaPipeline(
  createFalseOrStringSchema("icon", "图标", {
    uiProps: {
      defaultValue: "",
    },
  }),
  createFalseOrStringSchema("title", "页面标题", {
    uiProps: {
      defaultValue: "",
    },
  }),
  createFalseOrStringSchema("description", "页面副标题"),
  createRadioSchema("type", "页面风格", {
    uiProps: {
      isButton: true,
    },
    enums: [
      {
        label: "单列布局",
        value: "one",
      },
      {
        label: "双列布局",
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

  createObjectSchema("page", "", {
    formProps: {
      labelWidth: "0",
    },
    uiProps: {
      label: "页面设置",
      fields: [
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
        // createColorPickerSchema("pageBgColor", "页面背景色", {
        //   uiProps: {
        //     showAlpha: true,
        //     predefine: ["#fff"],
        //   },
        // }),
        createFalseOrUnitSchema("pagePaddingX", "水平偏移量", {
          uiProps: {
            defaultValue: "",
          },
        }),
        createFalseOrUnitSchema("pagePaddingY", "垂直偏移量", {
          uiProps: {
            defaultValue: "",
          },
        }),
      ],
    },
  }),
  createObjectSchema("form", "", {
    formProps: {
      labelWidth: "0",
    },
    uiProps: {
      label: "表单设置",
      fields: [
        createFalseOrUnitSchema("formRootWidth", "表单默认宽度", {
          uiProps: {
            defaultValue: "360px",
          },
        }),
        createSelectSchema("formBgImage", "表单背景图", {
          enums: [
            {
              label: "none",
              value: "none",
            },
            {
              label: "预设1",
              value: "url(https://sbd.sc-edu.com/image-host/cow-farming/cow-bg-image.svg)",
            },
          ],
        }),
        // createColorPickerSchema("formBgColor", "表单背景色", {
        //   uiProps: {
        //     showAlpha: true,
        //     predefine: ["#fff", "#f0f2f5"],
        //   },
        // }),
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
      ],
    },
  }),
  createObjectSchema("twoColumnStyle", "", {
    formProps: {
      labelWidth: "0",
    },
    uiProps: {
      label: "两栏布局设置",
      fields: [
        createFalseOrUnitSchema("formLeftColumnWidth", "两栏宽度", {
          uiProps: {
            defaultValue: "50%",
          },
        }),
        createFalseOrUnitSchema("formRightColumnWidth", "两栏间距", {
          uiProps: {
            defaultValue: "50%",
          },
        }),
      ],
    },
  }),
);

export const useSetting = <T extends Record<string, any>>(formData: Ref<T>) => {
  const collapsed = ref(false);
  const onCollapse = () => {
    collapsed.value = !collapsed.value;
  };

  const codePreviewVisible = ref(false);
  const onOpenCodePreview = () => {
    codePreviewVisible.value = true;
  };

  const visibleState = computed(() => {
    return {
      twoColumnStyle: formData.value?.type === "two",
    };
  });

  return {
    collapsed,
    codePreviewVisible,
    schema,
    visibleState,

    onCollapse,
    onOpenCodePreview,
  };
};
