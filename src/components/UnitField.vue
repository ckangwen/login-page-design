<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const numValue = ref<number | undefined>(undefined);
const unitValue = ref("px");
const value = computed(() => {
  return numValue.value ? numValue.value + unitValue.value : "";
});

watch(value, (val) => {
  emit("update:modelValue", val);
});

const units = ["px", "%"];

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const num = parseFloat(val);
      if (!Number.isNaN(num)) {
        numValue.value = num;
        unitValue.value = val.toString().replace(num.toString(), "") || "px";
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="unit-field">
    <el-input-number v-model="numValue" size="small" :controls="false"></el-input-number>
    <el-select v-model="unitValue" popper-class="unit-field-popper" size="small">
      <el-option v-for="item in units" :key="item" :label="item" :value="item"> </el-option>
    </el-select>
  </div>
</template>

<style lang="scss">
.unit-field {
  display: inline-flex;
  border-bottom: 1px solid #ccc;
  .el-input__wrapper,
  .el-input__wrapper.is-focus,
  .el-textarea__inner,
  .el-input__inner {
    box-shadow: none;
    --el-select-border-color-hover: none;
    --el-select-input-focus-border-color: none;
  }

  > .el-select {
    width: 50px !important;
  }

  .el-input__wrapper:hover {
    box-shadow: none;
  }

  .el-select__icon {
    margin-left: 0;
  }
  > .el-input-number--small.is-without-controls {
    width: 70px;
    .el-input__wrapper {
      padding-right: 0;
      padding-left: 8px;
      input {
        text-align: left;
      }
    }
  }
}

.unit-field-popper {
  .el-select-dropdown__item {
    height: 30px;
    line-height: 30px;
  }
}
</style>
