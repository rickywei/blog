<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <a
      class="github-link"
      :class="{ active: scrollPos < 200 }"
      href="https://github.com/RickyWei"
      target="_blank"
      rel="noopener"
      @mouseover="startAnimate"
      @mouseout="stopAnimate"
    >
      <p class="nes-balloon from-right">Follow me<br />on GitHub</p>
      <i class="nes-octocat" :class="animateOctocat ? 'animate' : ''"></i>
    </a>

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
    <button
      type="button"
      class="nes-btn is-success scroll-btn"
      :class="{ active: scrollPos > 400 }"
      @click="window.scrollTo({ top: 0, behavior: 'smooth' })"
    >
      <span>&lt;</span>
    </button>
  </div>
</template>

<script>
import Home from "@theme/components/Home.vue";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import { resolveSidebarItems } from "../util";

import "nes.css/css/nes.min.css";

export default {
  name: "Layout",

  components: {
    Home,
    Page,
    Sidebar,
    Navbar,
  },

  data() {
    return {
      animateOctocat: false,
      scrollPos: 0,
      isSidebarOpen: false,
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },
  },

  mounted() {
    document.addEventListener("scroll", () => {
      this.scrollPos =
        document.documentElement.scrollTop || document.body.scrollTop;
    });

    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    startAnimate() {
      this.animateOctocat = true;
    },
    stopAnimate() {
      this.animateOctocat = false;
    },
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
  },
};
</script>


<style>
/* @import url("https://fonts.googleapis.com/css?family=Press+Start+2P"); */
/* @import "/zpix-v3.1.1.ttf"; */

@font-face {
  font-family: ZpixReviewOnline;
  src: url(https://zpix.now.sh/zpix.woff2?zpix--online);
}

* {
  font-family: ZpixReviewOnline;
  font-size: large;
  font-weight: bolder;
}

/* github link */
.github-link {
  position: fixed;
  top: 100px;
  right: -240px;
  z-index: 999;
  display: flex;
  height: 100px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
}
.github-link.active {
  right: 10px;
}
.github-link:hover {
  text-decoration: none;
}
.github-link > p.nes-balloon {
  align-self: flex-start;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  color: #333;
}
.github-link > i.nes-octocat {
  align-self: flex-end;
}

/* Scroll back to top */
.scroll-btn {
  position: fixed;
  bottom: -60px;
  right: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
}
.scroll-btn.active {
  bottom: 25px;
}
.scroll-btn > span {
  display: block;
  transform: rotateZ(90deg);
}
</style>

