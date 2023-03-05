import type { CreateSchemaTemplateType, FormSchemaDef } from "@charrue/schema-form-next";
import { registerWidget } from "@charrue/schema-form-next";
import FalseOrUnitField from "../components/FalseOrUnitField.vue";
import FalseOrStringField from "../components/FalseOrStringField.vue";
import ObjectField from "../components/ObjectField.vue";

registerWidget("FalseOrUnit", FalseOrUnitField);
registerWidget("FalseOrString", FalseOrStringField);
registerWidget("ObjectField", ObjectField);

export const createFalseOrUnitSchema: CreateSchemaTemplateType = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "FalseOrUnit",
    uiProps,
  };
};

export const createFalseOrStringSchema: CreateSchemaTemplateType = (prop, label, config = {}) => {
  const uiProps = config["ui-props"] || config.uiProps || {};

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "string",
    uiWidget: "FalseOrString",
    uiProps,
  };
};

interface ObjectUiProps {
  fields: FormSchemaDef[];
  label: string;
}

export const createObjectSchema: CreateSchemaTemplateType<ObjectUiProps> = (
  prop,
  label,
  config = {},
) => {
  const uiProps = (config["ui-props"] || config.uiProps || {}) as ObjectUiProps;

  return {
    ...(config || {}),
    title: label,
    prop,
    type: "object",
    uiWidget: "ObjectField",
    uiProps,
    unpack: true,
  };
};
