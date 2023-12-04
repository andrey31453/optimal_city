import { use_app_store } from '@store'
import { vars } from '@consts'

const { breakpoints } = vars

const get_window_breakpoint = (width) => {
  return Object.keys(breakpoints).reduce((acc, breakpoint_key) => {
    if (width > breakpoints[breakpoint_key]) {
      acc = breakpoint_key
    }

    return acc
  }, null)
}

const set_breakpoint = ({ el, app_store, window_breakpoint }) => {
  if (app_store.breakpoint === window_breakpoint) return void 0

  app_store.breakpoint = window_breakpoint
  el.dataset.breakpoint = window_breakpoint
}

const on_resize = ({ el, app_store }) => {
  const width = document.documentElement.clientWidth
  const window_breakpoint = get_window_breakpoint(width)

  set_breakpoint({ el, app_store, window_breakpoint })
}

export default {
  mounted: (el) => {
    const app_store = use_app_store()

    window.addEventListener('resize', () => on_resize({ el, app_store }))
    on_resize({ el, app_store })
  },
}
