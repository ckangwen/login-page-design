<script lang="ts" setup>
import type { PropType } from "vue";
import { useEnableInput } from "../composables/useEnableInput";
import UnitField from "./UnitField.vue";
import type { FormSchemaDef } from "@charrue/schema-form-next";

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
  },
  schema: {
    type: Object as PropType<FormSchemaDef<{ defaultValue?: string }>>,
  },
});

console.log(props, "FalsyUnit props");

const emit = defineEmits(["update:modelValue"]);

const [boolValue, strValue] = useEnableInput(
  props,
  "modelValue",
  emit,
  props.schema?.uiProps?.defaultValue || "",
);
</script>
<template>
  <div class="false-or-unit-field">
    <el-switch v-model="boolValue"></el-switch>
    <UnitField
      v-model="strValue"
      size="small"
      :style="boolValue ? {} : { display: 'none' }"
    ></UnitField>
  </div>
</template>

<style lang="scss">
.false-or-unit-field {
  display: flex;
  align-items: center;

  > .el-switch {
    margin-right: 10px;
  }

  > .el-input {
    border-bottom: 1px solid #ccc;
  }
}
</style>
