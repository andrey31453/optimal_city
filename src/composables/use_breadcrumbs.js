import { keys } from '@consts'

const get_prefix = (breadcrumb) => {
  return `css_${breadcrumb}`
}

const get_breadcrumb = ({ acc, props, breadcrumb, breadcrumbs_idx }) => {
  if (!breadcrumbs_idx) return props[breadcrumb]

  if (props[breadcrumb]) return props[breadcrumb]

  const pre_breadcrumb = keys.breadcrumbs[breadcrumbs_idx - 1]
  return acc[get_prefix(pre_breadcrumb)]
}

export default (props) => {
  return keys.breadcrumbs.reduce((acc, breadcrumb, breadcrumbs_idx) => {
    acc[get_prefix(breadcrumb)] = get_breadcrumb({
      acc,
      props,
      breadcrumb,
      breadcrumbs_idx,
    })

    return acc
  }, {})
}
