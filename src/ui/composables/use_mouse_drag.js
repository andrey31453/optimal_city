import { ref } from 'vue'

const left = ref(null)
const is_drag = ref(false)

let drag = {
  left: 0,
  start_left: 0,
  screen_x: 0,
  start_screen_x: 0,
}

const set_left = () => {
  left.value = `${drag.left}px`
}
set_left()

const set_drag_left = (screenX) => {
  drag.left = drag.start_left + screenX - drag.start_screen_x
}

const get_screen_x = (e) => {
  return e.screenX || e.touches[0].screenX
}

const set_init_drag = (current_left, current_screen_x) => {
  is_drag.value = true

  drag = {
    left: current_left,
    start_left: current_left,
    screen_x: current_screen_x,
    start_screen_x: current_screen_x,
  }
}

const on_drag_start = (e) => {
  if (is_drag.value) return void 0

  const current_left = drag.left
  const current_screen_x = get_screen_x(e)
  set_init_drag(current_left, current_screen_x)
}

const on_drag = (e) => {
  if (!is_drag.value) return void 0

  const screenX = get_screen_x(e)
  set_drag_left(screenX)
  set_left()
}

const on_drag_end = () => {
  is_drag.value = false
}

export default () => {
  return {
    left,
    is_drag,

    on_drag_start,
    on_drag,
    on_drag_end,
  }
}
