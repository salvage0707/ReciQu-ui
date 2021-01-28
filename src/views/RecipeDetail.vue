<template>
  <div class="recipes">
    <v-row>
      <v-col md="9">
        <h2>{{ recipe.title }}</h2>

        <div class="mt-3">
          <Youtube 
            :videoId="recipe.videoId" 
            ref="youtube" 
            resize 
            fitParent
          ></Youtube>  
        </div>

        <!-- 概要 -->
        <div id="recipe-description" class="mt-3">
          <div class="subtitle">
            <h3>概要</h3>
          </div>
          
          <p class="pa-3">
            {{ recipe.description }}
          </p>
        </div>

        <!-- 材料 -->
        <div id="recipe-ingredients" class="mt-3">
          <div class="subtitle">
            <h3>材料</h3>
          </div>
          <v-list disabled class="ml-2">
            <template v-for="(ingredient,i) in recipe.ingredients">
            <!-- グループあり -->
              <template v-if="isCategoryIngredient(ingredient)">
                <div class="ingredints-group" :key="i">
                  <v-subheader class="text-h6 font-weight-bold">
                    {{ ingredient.name }}
                  </v-subheader>
                  <v-list-item 
                    v-for="(groupIngredient,gi) in ingredient.ingredients" 
                    :key="gi"
                    class="underline ingredient"
                  >
                    <v-list-item-content>
                      <span class="text">{{ groupIngredient.name }}</span>
                    </v-list-item-content>
                    <v-list-item-content class="text-right">
                      <span class="text-right">{{ groupIngredient.amount }}</span>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </template>
              <template v-else>
                <v-list-item :key="i" class="underline ingredient">
                    <v-list-item-content>
                      <span class="text">{{ ingredient.name }}</span>
                    </v-list-item-content>
                    <v-list-item-content class="text-right">
                      <span class="text-right">{{ ingredient.amount }}</span>
                    </v-list-item-content>
                  </v-list-item>
              </template>
            </template>
          </v-list>
        </div> 

        <!-- 手順 -->
        <div id="recipe-steps" class="mt-3">
          <div class="subtitle">
            <h3>手順</h3>
          </div>
          
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
import { Youtube } from "vue-youtube";

export default {
  name: 'RecipeDetail',
  components: {
    Youtube
  },
  data() {
    return ({
      recipe: {},
      hoge: true
    })
  },
  methods: {
    isCategoryIngredient(ingredient) {
      return ingredient.type === "GROUP";
    }
  },
  created() {
    const recipeId = this.$route.params.id;
    // TODO: API通信するようにへんこう
    this.recipe = recipes.find(e => e.id == recipeId);
  }
}
</script>

<style scoped>
.underline {
  border-bottom: solid 1px #C0C0C0;
}

.subtitle {
  border-bottom: solid 2px #C0C0C0;
  font-size: 2.125rem;
}

.ingredints-group > .ingredient {
  border-left: solid 4px #C0C0C0;
}

.ingredient {
  margin-left: 15px;
}

/* .ingredints-group > .ingredient > .text {
  margin-left: 5px;
  border-left: solid 2px #C0C0C0;
} */
</style>
