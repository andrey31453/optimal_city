import { onMounted } from 'vue'

export default (target, vars) => {
  const set_var = (vars_key) => {
    target.value.style.setProperty(`--${vars_key}`, vars[vars_key])
  }

  const set_vars = () => {
    Object.keys(vars).forEach(set_var)
  }

  onMounted(set_vars)
}
