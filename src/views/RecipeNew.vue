<template>
  <div class="recipes">
    <v-row>
      <v-col md="9">
        <h2 class="mb-3">レシピ登録</h2>

        <v-text-field
          label="Youtube URL(任意)"
          outlined
          hide-details="auto"
          class="mb-3"
          @change="changeYoutubeURL"
        ></v-text-field>

        <v-text-field
          v-model="videoId"
          label="Video ID(必須)"
          hide-details="auto"
          class="mb-3"
          outlined
        >
          <template v-slot:append-outer>
            
          </template>
        </v-text-field>
        <v-btn
          elevation="2"
          class="mb-3"
        >
          Youtubeのデータで入力補完
        </v-btn>

        <v-text-field
          v-model="title"
          label="タイトル(必須)"
          class="mb-3"
          hide-details="auto"
          outlined
        ></v-text-field>

        <div v-if="!!videoId">
          <Youtube 
            :videoId="videoId" 
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
            <v-textarea
              v-model="description"
              outlined
            ></v-textarea>
          </p>
        </div>

        <!-- 材料 -->
        <div id="recipe-ingredients" class="mt-3">
          <div class="subtitle">
            <h3>材料</h3>
          </div>
          <v-list class="ml-2">
            <v-list-item class="ingredient">
              <v-list-item-content>
                材料名
              </v-list-item-content>
              <v-list-item-content class="ingredient-amount">
                分量
              </v-list-item-content>
            </v-list-item>

            <template v-for="(ingredient,i) in ingredients">
              <!-- グループあり -->
              <template v-if="hasChildIngredient(ingredient)">
                <div class="ingredints-group" :key="i">
                  <v-subheader class="text-h6 font-weight-bold">
                    <v-text-field 
                      v-model="ingredient.name"
                      hide-details="auto"
                      placeholder="グループ名"
                      outlined
                      dense
                    ></v-text-field>
                  </v-subheader>
                  <v-list-item 
                    v-for="(groupIngredient,gi) in ingredient.ingredients" 
                    :key="gi"
                    class="ingredient"
                  >
                    <v-list-item-content>
                      <v-text-field 
                        v-model="groupIngredient.name"
                        hide-details="auto"
                        dense
                      ></v-text-field>
                    </v-list-item-content>
                    <v-list-item-content class="ingredient-amount">
                      <v-text-field
                        v-model="groupIngredient.amount"
                        dense
                        hide-details="auto"
                      ></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-btn
                      class="mx-2"
                      dark
                      color="indigo"
                      @click="addIngredient(ingredient.ingredients)"
                    >
                      グループに材料を追加
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-list-item>
                </div>
              </template>
              <!-- グループなし -->
              <template v-else>
                <v-list-item  :key="i" class="ingredient">
                  <v-list-item-content>
                    <v-text-field 
                      v-model="ingredient.name"
                      hide-details="auto"
                      dense
                    ></v-text-field>
                  </v-list-item-content>
                  <v-list-item-content class="ingredient-amount">
                    <v-text-field
                      v-model="ingredient.amount"
                      dense
                      hide-details="auto"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </template>
            <v-list-item>
              <v-btn
                class="mx-2"
                dark
                color="indigo"
                @click="addIngredient(ingredients)"
              >
                材料を追加
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                dark
                color="indigo"
                @click="addIngredientGroup()"
              >
                材料グループを追加
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </div> 

        <!-- 手順 -->
        <div id="recipe-steps" class="mt-3">
          <div class="subtitle">
            <h3>手順</h3>
          </div>
          
          <v-list disabled class="ml-2">
            <v-list-item class="step" v-for="(step, i) in recipe.steps" :key="i">
              <v-list-item-content>
                <v-row>
                  <v-col cols="2">
                    <div class="text-center order-box font-weight-bold text-h6">
                      {{ i+1 }}
                    </div>
                    <div class="text-center mt-2">
                      <span>{{ step.start_minutes }}:{{ step.start_seconds }}</span> 〜 <span>{{ step.end_minutes }}:{{ step.end_seconds }}</span>
                    </div> 
                  </v-col>
                  <v-col cols="10">
                    <p>
                      {{ step.description }}
                    </p>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
import { Youtube, getIdFromUrl } from "vue-youtube";

export default {
  name: 'RecipeNew',
  components: {
    Youtube
  },
  data() {
    return ({
      recipe: {},
      youtubeUrl: "",
      videoId: "",
      title: "",
      description: "",
      releaseStatus: null,
      servings: 1,
      ingredients: [],
    })
  },
  methods: {
    changeYoutubeURL(input) {
      this.videoId = getIdFromUrl(input);
    },
    addIngredient(target) {
      const newIngredient = {
        name: "",
        amount: ""
      }
      target.push(newIngredient);
    },
    addIngredientGroup() {
      const newIngredient = {
        name: "",
        amount: "",
        ingredients: []
      }
      this.addIngredient(newIngredient.ingredients);
      this.ingredients.push(newIngredient);
    },
    // TODO 削除
    hasChildIngredient(ingredient) {
      return !!ingredient.ingredients;
    },
  },
  created() {
    const recipeId = 2;
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

.ingredient, .step {
  margin-left: 15px;
}

.ingredient-amount {
  margin-left: 10px;
}

.step  .order-box {
  border: solid 4px #FFCC99;
}

</style>
