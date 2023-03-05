<script lang="ts" setup>
import { ref, watch } from "vue";
import type { PropType } from "vue";
import { CharrueSchemaField } from "@charrue/schema-form-next";
import type { FormSchemaDef } from "@charrue/schema-form-next";

interface UiProps {
  fields: FormSchemaDef[];
  label: string;
}

const props = defineProps({
  modelValue: {
    type: Object,
  },
  schema: {
    type: Object as PropType<FormSchemaDef<UiProps>>,
  },
});

const emit = defineEmits(["update:modelValue"]);

const label = computed(() => {
  return props.schema?.uiProps?.label || "";
});
const fields = computed(() => {
  return props.schema?.uiProps?.fields || [];
});
const formData = ref<Record<string, string>>({});
watch(
  formData,
  (val) => {
    emit("update:modelValue", val);
  },
  { deep: true },
);

const collapsed = ref(false);
const onToggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>

<template>
  <div class="object-field">
    <div class="object-field__header" @click="onToggleCollapsed">
      <span>{{ label }}</span>
      <span
        :style="{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'all .3s' }"
      >
        <svg
          class="object-field-arrow-icon"
          t="1677825139291"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1766"
          width="200"
          height="200"
        >
          <path
            d="M512 640L202.666667 292.266667c-14.933333-17.066667-42.66666701-19.2-59.733334-4.266667-17.066667 14.933333-19.2 42.66666701-4.266666 59.733333l341.333333 384c8.533333 10.666667 19.2 14.933333 32 14.93333399s23.466667-4.266667 32-14.93333399l341.333333-384c6.4-8.533333 10.666667-19.2 10.666667-27.733333 0-12.8-4.266667-23.466667-14.933333-32-17.066667-14.933333-44.8-14.933333-59.733334 4.266667L512 640z"
            p-id="1767"
            fill="#8f9bb3"
          ></path>
        </svg>
      </span>
    </div>
    <el-collapse-transition>
      <div v-show="!collapsed" class="array-field__body">
        <CharrueSchemaField
          v-for="(item, index) in fields"
          :key="index"
          v-model="formData[item.prop!]"
          :schema="item"
        ></CharrueSchemaField>
      </div>
    </el-collapse-transition>
  </div>
</template>

<style lang="scss">
.object-field {
  width: 100%;
  &__header {
    background: rgba(31, 56, 88, 0.06);
    border-top: 1px solid rgba(31, 56, 88, 0.1);
    border-bottom: 1px solid rgba(31, 56, 88, 0.1);
    padding: 0 12px;
    user-select: none;
    cursor: pointer;
    font-weight: 500;
    height: 32px;
    word-break: break-all;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__body {
    padding: 12px;
  }

  &-arrow-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
