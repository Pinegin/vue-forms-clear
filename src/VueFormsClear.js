let component = null
module.exports = (vue, options) => {
  return {
    inserted(el, binding, vnode) {
      const clickHandler = () => {
        el.value = ''

        if (Object.keys(binding.modifiers).length !== 0) {
          binding.modifiers.input && el.dispatchEvent(new Event('input'))
          binding.modifiers.keyup && el.dispatchEvent(new Event('keyup'))
          binding.modifiers.keydown && el.dispatchEvent(new Event('keydown'))
          binding.modifiers.change && el.dispatchEvent(new Event('change'))
          binding.modifiers.paste && el.dispatchEvent(new Event('paste'))
        } else {
          el.dispatchEvent(new Event('input'))
        }

        el.dispatchEvent(new Event('clear'))
      }
      const vueComponent = options.component || {
        render(h) {
          return h('span', {
            on: { click: clickHandler },
            class: { 'v-reset-input': true },
            domProps: { innerHTML: '&#10006;' },
            style: { position: 'absolute', top: 0, right: 0 },
          })
        },
      }
      const VueFormsClear = vue.extend(vueComponent)
      const span = document.createElement('span')

      el.parentElement.style.position = 'relative'
      el.after(span)
      component = new VueFormsClear({
        propsData: {
          clickHandler,
          value: el.value,
        },
      }).$mount(span)
    },

    update(el, binding, vnode) {
      vue.set(component, 'value', el.value)
    },
  }
}
