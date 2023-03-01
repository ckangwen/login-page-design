/* eslint-disable no-redeclare */
import type { Ref } from "vue";
import { readonly, shallowRef, watch } from "vue";
import type { MaybeComputedRef } from "@vueuse/core";
import { resolveRef } from "@vueuse/core";

export function usePrevious<T>(value: MaybeComputedRef<T>): Readonly<Ref<T | undefined>>;
export function usePrevious<T>(value: MaybeComputedRef<T>, initialValue: T): Readonly<Ref<T>>;
export function usePrevious<T>(value: MaybeComputedRef<T>, initialValue?: T) {
  const previous = shallowRef<T | undefined>(initialValue);

  watch(
    resolveRef(value),
    (_, oldValue) => {
      previous.value = oldValue;
    },
    { flush: "sync" },
  );

  return readonly(previous);
}
