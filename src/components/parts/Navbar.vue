<template>
  <!-- NAV -->
    <div class="uk-position-top" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
        <div class="uk-container uk-container-small">
            <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar data-uk-navbar>
                <div class="uk-navbar-left">
                    <div class="uk-navbar-item">
                        <a class="uk-logo" href=""><img src="img/cover-logo.svg" alt="Logo"></a>
                    </div>
                </div>
                <div class="uk-navbar-right">
                    <ul class="uk-navbar-nav">
                        <li class="uk-active uk-visible@m"><a href="" data-uk-icon="home"></a></li>
                        <li class="uk-visible@s"><a href="">Features</a></li>
                        <li class="uk-visible@s"><a href="">Security</a></li>
                        <li class="uk-visible@s"><a href="">Testimonials</a></li>
                        <li><a class="uk-navbar-toggle" data-uk-navbar-toggle-icon href="javascript:void(0)" @click="showDrawer"></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    <!-- /NAV -->
</template>

<script>
import Event from './../../helpers/event'

export default {
  name: 'AppNavbar',
  methods: {
    showDrawer: function () {
        Event.$emit('show:drawer')
    }
  }
}
</script>

<style scoped lang="less">

</style>
