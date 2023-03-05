export const useEnableInput = <P extends object, K extends keyof P, Name extends string>(
  props: P,
  key: K,
  emit: (name: Name, ...args: any[]) => void,
  defaultValue?: P[K],
) => {
  console.log("useEnableInput", props, key, defaultValue);
  const boolValue = ref(false);
  const strValue = ref<any | undefined>(undefined);
  const value = computed(() => {
    return boolValue.value ? strValue.value : "";
  });
  watch(boolValue, (val, prevVal) => {
    if (prevVal === false && val === true && defaultValue !== undefined) {
      strValue.value = defaultValue;
    }
  });

  watch(
    () => props[key!],
    (val) => {
      boolValue.value = !!val;
      strValue.value = val;
    },
    { immediate: true },
  );

  watch(value, (val) => {
    emit?.(`update:${key.toString()}` as Name, val);
  });

  return [boolValue, strValue];
};
