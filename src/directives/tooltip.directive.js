import M from 'materialize-css'

export default {
  created (el, binding) {
    M.Tooltip.init(el, { html: binding.value })
  },
  unmounted (el) {
    const tooltip = M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
