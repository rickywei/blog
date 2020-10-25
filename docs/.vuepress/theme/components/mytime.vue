<template>
  <div class="demo-them light">
    <timeline timeline-theme="lightblue">
      <timeline-title>2018</timeline-title>
      <timeline-item bg-color="#9dd8e0" font-color="#e166ab"
        >Welcome to the new year!</timeline-item
      >
      <timeline-item bg-color="#e6b6b0" :hollow="true"
        >My first 100 stars on Github 🎉</timeline-item
      >
      <timeline-item bg-color="#b0e6d1">keep going</timeline-item>
      <timeline-title bg-color="#f2d7e1">2017</timeline-title>
      <timeline-item bg-color="#b0e6d1" icon-size="small"
        >icon small size</timeline-item
      >
      <timeline-item bg-color="#b0e6d1" icon-size="medium"
        >icon medium size</timeline-item
      >
      <timeline-item bg-color="#b0e6d1" icon-size="large"
        >icon large size</timeline-item
      >
      <timeline-item>
        <img
          src="https://user-images.githubusercontent.com/12069729/36057805-80cfc3d2-0e4e-11e8-8851-6fda091ff389.png"
          class="icon-heart"
          slot="others"
        />
        <p>I wrote <a href="https://github.com/luyilin/Aoba">Aoba</a></p>
        <p class="append">
          A tool to create a lovely resume just with a config file.
        </p>
      </timeline-item>
      <timeline-item line-color="#a6ade4">
        <p>And <a href="https://github.com/luyilin/Maltose">Maltose</a></p>
        <p class="append">
          A cute emoticon and emoji keyboard which can generate random emoticon
          or emoji and no xss.
        </p>
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from "vue-cute-timeline";

export default {
  name: "mytime",

  components: {
    Timeline,
    TimelineItem,
    TimelineTitle,
  },
};
</script>