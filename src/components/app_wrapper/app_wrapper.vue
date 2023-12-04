<script setup>
import { use_app_store } from '@store'

const app_store = use_app_store()

//

import { ui_wrapper } from '@ui'
import { vUseBreakpoint } from '@directives'
</script>

<template>
  <ui_wrapper
    v-use-breakpoint
    class="app_wrapper"
    gap="2"
  >
    <template v-if="app_store.breakpoint">
      <slot />
    </template>
  </ui_wrapper>
</template>

<style lang="scss" scoped>
@use '@styles/utils';

.app_wrapper {
  @include utils.font();

  min-height: 100vh;
}
</style>
