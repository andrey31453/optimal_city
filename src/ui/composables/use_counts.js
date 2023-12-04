import { ref, computed, useSlots } from 'vue'

import { use_event_listener } from '@composables'

const visible_count = ref(null)
const elem_count = ref(null)

export default (breakpoints, app_store) => {
  const set_visible_count = () => {
    visible_count.value = breakpoints[app_store.breakpoint]
  }
  const set_elem_count = () => {
    const slot = useSlots().default()
    elem_count.value = slot[0].children.length
  }

  use_event_listener('resize', set_visible_count)
  set_elem_count()

  const has_slider = computed(() => visible_count.value < elem_count.value)

  return {
    visible_count,
    elem_count,
    has_slider,
  }
}
