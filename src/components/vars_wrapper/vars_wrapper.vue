<script setup>
import { ref } from 'vue'
import { vars } from '@consts'
import { use_vars } from '@composables'

const vars_wrapper = ref(null)
use_vars(vars_wrapper, vars)
</script>

<template>
  <div
    ref="vars_wrapper"
    class="vars_wrapper"
  >
    <slot />
  </div>
</template>
