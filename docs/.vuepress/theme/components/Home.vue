<template>
  <main
    class="home"
    :aria-labelledby="data.heroText !== null ? 'main-title' : null"
  >
    <header class="hero">
      <h1 v-if="data.heroText !== null" id="main-title">
        {{ "Weclome To My Blog" }}
      </h1>

      <p v-if="data.tagline !== null" class="description">
        {{ "¯\\_(ツ)_/¯" }}
      </p>

      <p v-if="data.actionText && data.actionLink" class="action">
        <NavLink class="action-button" :item="actionLink" />
      </p>
    </header>

    <div class="nes-container with-title">
      <p class="title">Language</p>
      <a href="/pages/cpp"><button class="nes-btn is-success">C/C++</button></a>
      <a href="/pages/go"><button class="nes-btn is-success">Go</button></a>
      <a href="/pages/python"
        ><button class="nes-btn is-success">Python</button></a
      >
    </div>
    <br />

    <div class="nes-container with-title">
      <p class="title">Database</p>
      <a href="/pages/mysql"
        ><button class="nes-btn is-success">MySQL</button></a
      >
      <a href="/pages/redis"
        ><button class="nes-btn is-success">Redis</button></a
      >
    </div>
    <br />

    <div class="nes-container with-title">
      <p class="title">Network</p>
      <a href="/pages/network"
        ><button class="nes-btn is-success">Network</button></a
      >
    </div>
    <br />

    <div class="nes-container with-title">
      <p class="title">Algorithm</p>
      <a href="/pages/leetcode"
        ><button class="nes-btn is-success">Leetcode</button></a
      >
    </div>
    <br />

    <div class="nes-container with-title">
      <p class="title">Operating System</p>
      <a href="/pages/linux"
        ><button class="nes-btn is-success">Linux</button></a
      >
    </div>
    <br />

    <div class="nes-container with-title">
      <p class="title">Design Pattern</p>
      <a href="/pages/24pattern"
        ><button class="nes-btn is-success">24Pattern</button></a
      >
    </div>
    <br />

    <div class="nes-container with-title">
      <p class="title">Tools</p>
      <a href="/pages/git"><button class="nes-btn is-success">Git</button></a>
      <a href="/pages/vscode"
        ><button class="nes-btn is-success">VSCode</button></a
      >
    </div>
    <br />

    <div class="nes-container with-title">
      <!-- <p class="title" text-align="center">Links</p> -->
      <p>I will also publish new content in following platform...</p>
      <ul>
        <li>
          WeChat
          <img
            src="https://raw.githubusercontent.com/RickyWei/blog/img/img/wechat.jpg"
          />
        </li>
        <li>
          Zhihu
          <a href="https://www.zhihu.com/people/caijizhuoma" target="_blank"
            >https://www.zhihu.com/people/caijizhuoma</a
          >
        </li>
        <li>
          CSDN
          <a href="https://blog.csdn.net/caijizhuoma2021" target="_blank"
            >https://blog.csdn.net/caijizhuoma2021
          </a>
        </li>
      </ul>
    </div>

    <Content class="theme-default-content custom" />

    <div v-if="data.footer" class="footer">
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";

export default {
  name: "Home",

  components: { NavLink },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText,
      };
    },
  },
};
</script>

<style lang="stylus">
.home {
  padding: $navbarHeight 2rem 0;
  max-width: $homePageWidth;
  margin: 0px auto;
  display: block;

  .hero {
    text-align: center;

    img {
      max-width: 100%;
      max-height: 256px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 2.5rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
