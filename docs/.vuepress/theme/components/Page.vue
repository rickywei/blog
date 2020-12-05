<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" style="font-family: consolas" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"],
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.theme-default-content {
  .page {
    padding-bottom: 2rem;
    display: block;
  }

  h2 {
    font-family: consolas;
    font-size: large;
    font-weight: bold;
  }

  h3 {
    font-family: consolas;
    font-size: initial;
    font-weight: bold;
  }

  p {
    font-family: consolas;
    font-size: initial;
    font-weight: initial;
  }

  li {
    font-family: consolas;
    font-size: initial;
    font-weight: initial;
  }

  a {
    font-family: consolas;
    font-size: initial;
    font-weight: initial;
  }

  thead tr th td {
    font-family: consolas;
    font-size: initial;
    font-weight: initial;
  }

  mjx-container {
    font-family: consolas;
    font-size: initial;
    font-weight: initial;
  }
}
</style>
