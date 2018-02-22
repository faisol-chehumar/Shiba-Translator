<template>
  <div>
    <div class="logo" style="height: 100px; height: 100px;background: #322c48;color: #fff;z-index: 1006;padding-bottom: 1rem">
      <img src="../assets/shiba-translator.png" width="100rem" alt="Shiba Translator App">
      <h1>{{ appName + veresion }}</h1>
      <div class="" style="display: inline-block; margin-left: 1.5rem; top: -3.5rem; position: relative">
        <button class="ui primary button" @click="init">Start</button>
        <button class="ui red button" @click="clear">Clear</button>
      </div>
      <div class="" style="position: absolute; top: 2.5rem; right: 2rem">
        <h3 style="display: inline">{{ descPos + 1 }} /</h3>
        <h3 style="display: inline">{{ descLength }}</h3>
      </div>
    </div>

    <div class="ui vertical" style="margin-top: 1rem">
      <div class="ui middle aligned stackable grid container">
        <div class="row" style="height: 590px; padding: 3rem">
          <div class="eight wide column">
            <p class="eng" v-for="textEn in descEn">{{ textEn }}</p>
          </div>
          <div class="eight wide right floated column">
            <p class="th" v-for="textTh in descTh">{{ textTh }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="ui vertical stripe segment" style="background: #322c48; padding: 2rem 0;">
      <div class="row">
        <div class="twenty wide column">
          <div class="ui input" style="width: 500px">
            <input type="text" placeholder="EN Word" v-model="wordEn">  
          </div>
          <div class="ui input" style="width: 500px">
            <input type="text" placeholder="TH Word" v-model="wordTh">
          </div>
          <button class="ui green button" @click="translate">Search and Replace</button>
          <button class="ui button" @click="prevDesc">Prev</button>
          <button class="ui button" @click="nextDesc">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Data from '../assets/data.json';
export default {
  name: 'CsvPreview',
  data () {
    return {
      appName: 'Shiba Translator',
      veresion: ' 0.0.1',
      descJson: '',
      descPos: 0,
      descLength: 0,
      descEn: '',
      descTh: '',
      wordEn: '',
      wordTh: ''
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>

</style>
