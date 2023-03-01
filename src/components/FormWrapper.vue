<script setup lang="ts">
defineProps({
  type: {
    // two | one
    type: String,
  },
});
</script>

<template>
  <template v-if="type === 'two'">
    <div class="form-wrapper">
      <div class="h-full flex-grow-0 flex-shrink-0 basis-1/2"></div>
      <slot class="flex-grow-0 flex-shrink-0 basis-1/2"></slot>
    </div>
  </template>
  <template v-if="type === 'one'">
    <slot></slot>
  </template>
</template>

<style lang="scss">
.form-wrapper {
  width: 70vw;
  height: 80vh;
  display: flex;
  box-shadow: 0 10px 40px #1d161733;
  background-size: cover;
  background-image: url(https://sbd.sc-edu.com/image-host/cow-farming/cow-bg-image.svg);
  background-position: center;
  background-repeat: no-repeat;
  border-radius: var(--radius);
}
</style>
