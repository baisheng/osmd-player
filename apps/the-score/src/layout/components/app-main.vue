<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!--      <keep-alive :include="cachedViews">-->
      <!--      <keep-alive>-->
      <router-view :key="key"/>
      <!--      </keep-alive>-->
    </transition>
  </section>
</template>
<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        // return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      },
    },
  }
</script>
