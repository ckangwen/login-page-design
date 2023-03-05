import { utoa, atou } from "../utils/index";

const defaultValue = {
  icon: "https://preview.pro.ant.design/logo.svg",
  title: "Ant Design",
  description: "Ant Design is the most influential web design specification in Xihu district",
  type: "one",
  pageJustifyCenter: "center",
  pageBgImage: "none",
  pageBgColor: "#fff",
  formRootWidth: "360px",
  formMinWidth: "",
  formMaxWidth: "",
  formLeftWidth: "",
  formBgColor: "#fff",
  formBgImage: "none",
  formBoxShadow: "none",
  pagePaddingX: "",
  pagePaddingY: "",

  formLeftColumnWidth: "",
  formLeftBgImage: "none",
  formLeftBgColor: "inherit",
  formRightBgImage: "none",
  formRightBgColor: "inherit",
  formHeight: "auto",
};

type DesignConfig = typeof defaultValue;

export const useDesignConfig = () => {
  const queryValue = new URLSearchParams(window.location.search).get("config");
  // 表单左侧图片URL
  const designConfig = ref<DesignConfig>({
    ...defaultValue,
    ...(queryValue ? JSON.parse(atou(queryValue)) : {}),
  });

  watch(
    () => designConfig.value.pageJustifyCenter,
    () => {
      designConfig.value.pagePaddingX = "0px";
      designConfig.value.pagePaddingY = "0px";
    },
  );

  watch(
    () => designConfig.value.type,
    () => {
      if (designConfig.value.type === "one") {
        designConfig.value.formRootWidth = "360px";
        designConfig.value.formLeftColumnWidth = "";
        designConfig.value.formBgImage = "";
      }
      if (designConfig.value.type === "two") {
        designConfig.value.formRootWidth = "800px";
        designConfig.value.formLeftColumnWidth = "50%";
        designConfig.value.formBgImage =
          "url(https://sbd.sc-edu.com/image-host/cow-farming/cow-bg-image.svg)";
      }
    },
  );

  watchEffect(() => {
    const query = new URLSearchParams({ config: utoa(JSON.stringify(designConfig.value)) });
    const url = new URL(window.location.href);
    url.search = query.toString();
    window.history.replaceState(null, "", url.toString());
  });

  return designConfig;
};
