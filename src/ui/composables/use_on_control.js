import { ref } from 'vue'

const active_elem = ref(0)

const get_is_visible = (visible_count) => (elem_index) => {
  if (active_elem.value > elem_index) return false
  if (active_elem.value + +visible_count.value <= elem_index) return false

  return true
}

const get_on_cntrl_elem = (visible_count) => (elem_index) => {
  active_elem.value = elem_index
}

export default ({ visible_count, elem_count }) => {
  const is_visible = get_is_visible(visible_count)
  const on_cntrl_elem = get_on_cntrl_elem(visible_count)

  return {
    is_visible,
    on_cntrl_elem,
  }
}
