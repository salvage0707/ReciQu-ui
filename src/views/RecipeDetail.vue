<template>
  <div class="recipes">
    <v-row>
      <v-col md="9">
        <h2>レシピ一覧</h2>

        <v-row>
          <template v-for="recipe in recipes">
            <v-col :key="recipe.id" cols="12">
              <v-hover v-slot="{ hover }">
                <v-card 
                  :elevation="hover ? 12 : 2" 
                  @click="linkToRecipeDetail(recipe.id)"
                >
                  <v-card-actions >
                    <v-row>
                      <v-col md="5">
                        <img
                          width="100%"
                          alt="" 
                          :src="recipe.thumbnailUrl"
                        >
                      </v-col>

                      <v-col>
                        <h3>{{ recipe.title }}</h3>
                        <p>{{ recipe.videoCreatedDate }}</p>
                        <p>{{ recipe.description}}</p>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-col>
          </template>   
        </v-row>
        <div class="text-center recipes-pagenation">
          <v-pagination
            v-model="page"
            :length="4"
            circle
          ></v-pagination>
        </div>       
      </v-col>

      <v-col md="3">
        サードバー
      </v-col>
    </v-row>
    
  </div>
</template>

<script>
import recipes from '@/views/testdata/recipes.js';

export default {
  name: 'Recipes',
  data: function() {
    return ({
      recipes: recipes,
      page: 1
    })
  },
  methods: {
    linkToRecipeDetail(id) {
      this.$router.push({name: "RecipeDetail", params: { id: id}})
    }
  }
}
</script>

<style scoped>
.recipes-pagenation {
  margin-top: 30px;
}
</style>
