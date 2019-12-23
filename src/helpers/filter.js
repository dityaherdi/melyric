import Vue from 'vue'

Vue.prototype.$filter = Vue.options.filter

Vue.filter('yearOnly', (dateString) => {
  if (dateString != '') {
    return dateString.split('-')[0]
  }
})