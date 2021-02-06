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
        ></v-text-field>

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
        <RecipeDescriptionForm v-model="description"></RecipeDescriptionForm>

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
                <v-list-item-icon>
                  <v-btn
                    class="mx-2"
                    dark
                    color="red"
                    small
                    @click="removeIngredient(ingredients, i)"
                  >
                    <v-icon dark>
                      mdi-minus
                    </v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
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
            </v-list-item>
          </v-list>
        </div> 

        <!-- 手順 -->
        <div id="recipe-steps" class="mt-3">
          <div class="subtitle">
            <h3>手順</h3>
          </div>
          
          <v-list class="ml-2">
            <v-list-item class="step" v-for="(step, i) in steps" :key="i">
              <v-list-item-content>
                <v-row>
                  <v-col cols="2">
                    <div class="text-center order-box font-weight-bold text-h6">
                      {{ i+1 }}
                    </div>
                    <div class="text-center mt-2">
                      <span>
                        <v-text-field>
                          {{ step.start_minutes }}
                        </v-text-field>:{{ step.start_seconds }}</span> 〜 <span>{{ step.end_minutes }}:{{ step.end_seconds }}</span>
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
import RecipeDescriptionForm from '@/components/recipe/RecipeDescriptionForm';
import { Youtube, getIdFromUrl } from "vue-youtube";

export default {
  name: 'RecipeNew',
  components: {
    RecipeDescriptionForm,
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
      steps: [],
    })
  },
  methods: {
    changeYoutubeURL(input) {
      this.videoId = getIdFromUrl(input);
    },
    // 材料関連
    addIngredient() {
      const newIngredient = {
        name: "",
        amount: ""
      }
      this.ingredients.push(newIngredient);
    },
    removeIngredient(target, index) {
      this.ingredients.splice(index,1);
    },
    // 手順関連
    addStep() {
      const newStep = {
        start_minutes: "",
        start_seconds: "",
        end_minutes: "",
        end_seconds: "",
        description: ""
      }
      this.steps.push(newStep);
    },
  },
  created() {
    // 材料追加の初期表示(4行)
    this.addIngredient();
    this.addIngredient();
    this.addIngredient();
    this.addIngredient();

    // 手順追加の初期表示(1行)
    this.addStep();
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
