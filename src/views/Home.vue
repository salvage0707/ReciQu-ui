<template>
  <div class="home">
    <router-link to="/recipes?channel=hoge">レシピ一覧</router-link>
    <router-link to="/recipes/new">レシピ作成</router-link>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
