<template>
  <nav class="nav">
    <div class="nav__title nav__box">
      Garten Tagebuch
    </div>
    <router-link
      v-for="routes in links"
      :key="routes.id"
      :to="{ path: routes.page }"
      class="nav__link nav__box"
      exact>{{ routes.text }}
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page: '/'
        },
        {
          id: 1,
          text: 'GardenMap',
          page: '/GardenMap'
        },
        {
          id: 2,
          text: 'DemoMap',
          page: '/DemoMap'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .nav {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    display: flex;
    position: fixed;
    z-index: 1000;
  }

  .nav__title {
    font-weight: bold;
    font-size: 24px;
  }

  .nav__box {
    align-items: flex-start;
    padding: 10px;
    margin: 5px;
    background-color: #63b44d;
    color: white;
    line-height: 20px;
  }

  .nav__link {
    text-decoration: none;
  }

  .nav__link:hover, .router-link-active {
    background-color: forestgreen;
  }
</style>
