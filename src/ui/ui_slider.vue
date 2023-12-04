<script setup>
import { ref } from 'vue'

import { vars } from '@consts'
import {
  use_on_resize,
  use_on_control,
  use_counts,
  use_mouse_drag,
} from './composables'
import { use_breakpoint_props } from '@composables'
import { use_app_store } from '@store'

const props = defineProps({
  xs: {
    type: String,
    default: vars.cols,
  },

  sm: {
    type: String,
  },

  md: {
    type: String,
  },

  lg: {
    type: String,
  },

  xl: {
    type: String,
  },

  xxl: {
    type: String,
  },

  gap: {
    type: String,
    default: '1',
  },
})

const breakpoints = use_breakpoint_props(props)
const app_store = use_app_store()

const { visible_count, elem_count, has_slider } = use_counts(
  breakpoints,
  app_store
)

const {
  slids,
  wrapper,

  elem_width,
  slider_height,

  on_resize,
} = use_on_resize(visible_count)

const {
  left,
  is_drag,

  on_drag_start,
  on_drag,
  on_drag_end,
} = use_mouse_drag()

const { is_visible, on_cntrl_elem } = use_on_control({
  visible_count,
  elem_count,
})

//

import { vBreakpoint, vResize } from '@directives'
</script>

<template>
  <div class="ui_slider">
    <!-- slids -->
    <div
      ref="slids"
      :class="[
        'ui_slider__slids',
        'slids',
        {
          '--draggable': is_drag,
        },
      ]"
      v-resize:init="on_resize"
      @mousedown="on_drag_start"
      @mousemove="on_drag"
      @mouseup="on_drag_end"
      @touchstart="on_drag_start"
      @touchmove="on_drag"
      @touchend="on_drag_end"
      @mouseleave="on_drag_end"
    >
      <div
        class="slids__wrapper"
        ref="wrapper"
      >
        <slot />
      </div>
    </div>
    <!-- /slids -->

    <!-- cntrls -->
    <template v-if="has_slider">
      <div :class="['ui_slider__cntrls', 'cntrls']">
        <template
          v-for="(elem, elem_idx) in 4"
          :key="elem_idx"
        >
          <div
            :class="[
              'cntrls__elem',
              {
                '--visible': is_visible(elem_idx),
              },
            ]"
            @click="on_cntrl_elem(elem_idx)"
          />
        </template>
      </div>
    </template>
    <!-- /cntrls -->
  </div>
</template>

<style lang="scss" scoped>
@use '@styles/utils';
@use '@styles/vars';

.ui_slider {
  @include utils.f(1, 'col');
}

// slids
.slids {
  position: relative;
  width: 100%;
  height: v-bind(slider_height);
  overflow: hidden;
  user-select: none;

  // cursor
  cursor: grab;
  &.--draggable {
    cursor: grabbing;
  }

  // wrapper
  &__wrapper {
    @include utils.f(v-bind(gap), 'nw,as');

    position: absolute;

    left: v-bind(left);
    top: 0;

    // slots
    & > :deep(*) {
      width: v-bind(elem_width);
    }
  }
}

// cntrls
.cntrls {
  @include utils.f(1, 'nw,c');

  // elem
  &__elem {
    width: calc(2 * vars.$d);
    height: calc(2 * vars.$d);

    border: 2px solid vars.$ac;
    cursor: pointer;

    &.--visible {
      @include utils.before(2);

      &::before {
        background-color: vars.$dc;
      }
    }
  }
}
</style>
