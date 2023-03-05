<script lang="ts" setup>
import { useEnableInput } from "../composables/useEnableInput";

const props = defineProps({
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const [boolValue, strValue] = useEnableInput(props, "modelValue", emit);
</script>
<template>
  <div class="false-or-string-field">
    <el-switch v-model="boolValue"></el-switch>
    <el-input
      v-model="strValue"
      size="small"
      :style="boolValue ? {} : { display: 'none' }"
    ></el-input>
  </div>
</template>

<style lang="scss">
.false-or-string-field {
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
