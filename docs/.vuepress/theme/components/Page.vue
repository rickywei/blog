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
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

  .page {
    padding-bottom: 2rem;
    display: block;
  }
}
</style>
