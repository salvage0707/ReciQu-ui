<template>
  <div id="recipe-description" class="mt-3">
    <div class="subtitle">
      <h3>概要</h3>
    </div>
    
    <p class="pa-3">
      <v-textarea
        :value="value"
        @input="input"
        outlined
      ></v-textarea>
    </p>
  </div>
</template>

<script>
export default {
  name: 'RecipeDescriptionForm',
  props: {
    value: String
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    },
  },
}
</script>

<style scoped>
.subtitle {
  border-bottom: solid 2px #C0C0C0;
  font-size: 2.125rem;
}
</style>
