import { ref } from 'vue'
import { vars } from '@consts'

const slids = ref(null)
const wrapper = ref(null)

const elem_width = ref(null)
const slider_height = ref(null)

const get_elem_width = (count) => {
  return `calc(${slids.value.offsetWidth / count.value}px - ${
    count.value - 1
  } * ${vars.distance})`
}

const get_slider_height = () => {
  const slider_height = [...wrapper.value.children].reduce(
    (acc, slide_node) => Math.max(acc, slide_node.offsetHeight),
    0
  )
  return `${slider_height}px`
}

const get_on_resize = (count) => () => {
  elem_width.value = get_elem_width(count)
  slider_height.value = get_slider_height()
}

export default (count) => {
  const on_resize = get_on_resize(count)

  return {
    slids,
    wrapper,

    elem_width,
    slider_height,

    on_resize,
  }
}
