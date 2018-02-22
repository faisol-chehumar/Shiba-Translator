<template>
  <div>
    <div class="logo" style="height: 100px; background-image: linear-gradient(to right, #2f1f48, #2d1632, #241120, #180911, #000000); color: #fff; z-index: 1006; padding-bottom: 1rem; position: fixed; top: 0; width: 100%">
      <div>
        <div style="float: left">
          <img src="../assets/shiba-translator.png" width="100rem" alt="Shiba Translator App">
          <h1>{{ appName + veresion }}</h1>
          <div style="display: inline-block; margin-left: 1.5rem; top: -3.5rem; position: relative">
            <button class="ui red button" @click="start">Start</button>
            <button class="ui green button" @click="load">Load</button>
            <button class="ui gray button" @click="undo">Undo</button>
          </div>
        </div>
        <div style="position: absolute; right: 12rem; top: 0">
          <img v-bind:src="sticker" width="175rem" height="100rem" alt="Shiba Translator App">
        </div>
        <div class="" style="position: absolute; top: 2.5rem; right: 2rem">
          <div class="ui input" style="width: 5rem; height: 2rem; background-color: #eee">
            <input id="jump-desc" type="text" v-model="descPos" style="text-align: center" @click="jumpDesc">
          </div>
          <h3 style="display: inline"> / {{ descLength }}</h3>
        </div>
      </div>
    </div> 
    <!-- End header -->
    <div class="ui vertically divided grid">
      <div class="middle alignedthree column row" style="height: 590px; margin-top: 8rem;">
        <div class="column">
          <div class="div" style="width: 500px; transform: translate(0); margin-top: 2rem; background-color: #fff; position: fixed; top: 5.2rem">
            <iframe v-bind:src="descUrl" title="iframe example 1" width="500" height="571">
              <p>Your browser does not support iframes.</p>
            </iframe>
          </div>
        </div>
        <!-- End Preview content -->
        <div class="column">
          <div class="eight wide column" style="padding: 2rem">
            <p id="en-content" class="eng" v-for="textEn in descEn" @click="getDataHilight">{{ textEn }}</p>
          </div>
        </div>
        <!-- End English text preview -->
        <div class="column">
          <div class="eight wide right floated column" style="padding: 2rem">
            <p class="th" v-for="textTh in descTh" @click="getDataHilight">{{ textTh }}</p>
          </div>
        </div>
        <!-- End Thai text preview -->
      </div>
    </div>
    <div class="ui vertical stripe segment" style="background: #322c48; padding: 2rem 0; position: fixed; bottom: 0; width: 100%">
      <div class="row">
        <div class="twenty wide column">
          <div class="ui input" style="width: 500px">
            <input type="text" placeholder="EN Word" v-model="wordEn">  
          </div>
          <div class="ui input" style="width: 500px">
            <input id="th-input" type="text" placeholder="TH Word" v-model="wordTh">
          </div>
          <button class="ui blue button" @click="translate">Search and Replace</button>
          <button class="ui button" @click="prevDesc">Prev</button>
          <button class="ui button" @click="nextDesc">Next</button>
        </div>
      </div>
    </div>
    <!-- Footer block -->
  </div>
</template>

<script>
var user = prompt("Halooo!! Please Enter Your name.")
var configUser = ''
if(user.toLowerCase() === 'test') {
  configUser = {
    apiKey: "AIzaSyAnQd3kIaap9PwMV5M5nSBvmnu7SO7pLS0",
    authDomain: "shiba-translator.firebaseapp.com",
    databaseURL: "https://shiba-translator.firebaseio.com",
    projectId: "shiba-translator",
    storageBucket: "shiba-translator.appspot.com",
    messagingSenderId: "130395626012"
  }
}
if(user.toLowerCase() === 'arm') {
  configUser = {
    apiKey: "AIzaSyAilnfkpZ2lf6Yl86HveAj9RT3E9CG91Vc",
    authDomain: "arm-translation.firebaseapp.com",
    databaseURL: "https://arm-translation.firebaseio.com",
    projectId: "arm-translation",
    storageBucket: "arm-translation.appspot.com",
    messagingSenderId: "494144728490"
  }
}
if(user.toLowerCase() === 'chai') {
  configUser = {
    apiKey: "AIzaSyDIrJNoNCJ5TRb1DjkLrKdAO-qUhPVfhuQ",
    authDomain: "chai-translation.firebaseapp.com",
    databaseURL: "https://chai-translation.firebaseio.com",
    projectId: "chai-translation",
    storageBucket: "chai-translation.appspot.com",
    messagingSenderId: "903538595751"
  }
}
if(user.toLowerCase() === 'aong') {
  configUser = {
    apiKey: "AIzaSyCgvy6hGPf6FLIVvUQB4Mc7EMQIxmZBjKA",
    authDomain: "aong-translation.firebaseapp.com",
    databaseURL: "https://aong-translation.firebaseio.com",
    projectId: "aong-translation",
    storageBucket: "aong-translation.appspot.com",
    messagingSenderId: "902026764830"
  }
}

// import Data from '../assets/data.json';
import Firebase from 'firebase'

// Integrate with Firebase service with Account
// let configUser = {
//     apiKey: "AIzaSyAnQd3kIaap9PwMV5M5nSBvmnu7SO7pLS0",
//     authDomain: "shiba-translator.firebaseapp.com",
//     databaseURL: "https://shiba-translator.firebaseio.com",
//     projectId: "shiba-translator",
//     storageBucket: "shiba-translator.appspot.com",
//     messagingSenderId: "130395626012"
//   }
// let configUser = {
// apiKey: "AIzaSyAilnfkpZ2lf6Yl86HveAj9RT3E9CG91Vc",
//     authDomain: "arm-translation.firebaseapp.com",
//     databaseURL: "https://arm-translation.firebaseio.com",
//     projectId: "arm-translation",
//     storageBucket: "arm-translation.appspot.com",
//     messagingSenderId: "494144728490"
// }
// Initialize Firebase service
let app = Firebase.initializeApp(configUser, 'appUser')
let db = app.database()
let descList = db.ref()
// let dataPos = 1
// let test = db.ref(d)
// 
// Integrate with Firebase serviec
let configDict = {
  apiKey: "AIzaSyACUpSJp7yDhrmokhODy1VuMpBkH_lNWGw",
  authDomain: "dictionary-7db9d.firebaseapp.com",
  databaseURL: "https://dictionary-7db9d.firebaseio.com",
  projectId: "dictionary-7db9d",
  storageBucket: "dictionary-7db9d.appspot.com",
  messagingSenderId: "34224389132"
};
// Initialize Firebase service
let appDict = Firebase.initializeApp(configDict, 'appDict')
let dbDict = appDict.database()
// let dictList = dbDict.ref()


export default {
  name: 'TextReview',
  data () {
    return {
      appName: 'Shiba Translator',
      veresion: ' 0.0.5',
      descPos: 0,
      descLength: 0,
      descEn: '',
      descTh: '',
      wordEn: '',
      wordTh: '',
      descDict: '',
      dictRef: [],
      descUrl: '',
      sticker: '',
      translatedHistory: []
    }
  },
  firebase() {
    return {
      descJson: descList,
      dictRef: dbDict.ref()
    }
  },
  watch: {
    dictRef: {
      deep: true,
      handler(newArray) {
        this.test()
        // console.log( 'Change detected...' )
      } 
    }
  },
  methods: {
    undo() {
      // let history = [Object.assign([], this.translatedHistory)]
      // let historyPos = this.translatedHistory.length
      // console.log(this.translatedHistory.length)
      // พรุ่งนี้มาทำต่อ Undo 2 step
      for(let i = 0; i < this.translatedHistory[0].length; i++) {
        // save(pos, word)
        let dataKey = Object.keys(this.translatedHistory[0][i])
        let dataValue = Object.values(this.translatedHistory[0][i])
        let key = parseInt(dataKey[0])
        let value = dataValue[0]
        this.save(key, value)
      }
      this.translatedHistory.pop()
      // console.log(this.translatedHistory)
      this.getPreview()
    },
    test() {
      this.dictInit()
      let dictData = this.dictRef.length
      let keyword = this.dictRef
      // console.log(dictData)
      for (let i = dictData - 1; i >= 0; i--) {
        this.setDict(keyword[i]['.key'], keyword[i]['.value'])
      }
    },
    // Get JSON data from firebase database
    getData() {
      this.descLength = this.descJson.length 
      for (var i = 0; i <= this.descLength - 1; i++) {
        // this.descJson[i].Translated = this.descJson[i].English
        this.save(i, this.descJson[i].English)
      }
    },
    getLoad() {
      this.descLength = this.descJson.length 
      for (var i = 0; i <= this.descLength - 1; i++) {
        this.descJson[i].Translated = this.descJson[i].Translated
      }
    },
    save(pos, word) {
      let dataPos = '/' + pos
      db.ref(dataPos).update({"Translated": word})
    },
    getStickerUrl(id) {
      this.sticker = 'https://media.giphy.com/media/' + id + '/giphy.gif'
      // console.log(this.sticker)
    },
    getStickerId() {
      // console.log('hello')
      let xhr = $.get("https://api.giphy.com/v1/gifs/random?api_key=RvnijNZUe3lkqjvnM6prPvNWSrbJAdAT&tag=&rating=R");
      var sticker_id = ''
      var stickerUrl = this.getStickerUrl
      // console.log(stickerUrl('test'))
      xhr.done(function(data, xxx) { 
        sticker_id = data.data.id
        stickerUrl(sticker_id)
      })
    },
    getPreview() {
      this.descEn = this.getEnDesc()
      this.descTh = this.getThDesc()
      this.descUrl = this.getUrl()

      this.getStickerId()
      // console.log(this.sticker)
    },
    getUrl() {
      // this.descUrl = 'https://thai.webike.net/products/' + this.descJson[this.descPos].Syouhin_Sys_Code
      return 'https://thai.webike.net/products/' + this.descJson[this.descPos].Syouhin_Sys_Code + '.html'
    },
    getEnDesc() {
      let brExp = /<br\s*\/?>/i;
      return this.descJson[this.descPos].English.split(/<br\s*[\/]?>/gi)
    },
    getThDesc() {
      return this.descJson[this.descPos].Translated.split(/<br\s*[\/]?>/gi)
    },
    dictInit() {
      this.descDict = new HashTable(1000)
    },
    setDict(word, translate) {
      this.descDict.insert(word, translate)
    },
    // Remove all special charater
    removeSpecialChar(str) {
      return str.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, "")
    },
    translate() {
      let re = ''
      let translatedList = []
      let wordEn = this.removeSpecialChar(this.wordEn)

      if(wordEn !== '') {
        re = new RegExp(wordEn, 'g')
      } else {
        return
      }

      for(let i = this.descJson.length - 1; i >= 0; i--) {
        if(this.descJson[i].Translated.match(wordEn)) {
          translatedList.push({[i]: this.descJson[i].Translated})
          let newStr = this.descJson[i].Translated.replace(re, this.wordTh)
          this.descJson[i].Translated = newStr
          this.save(i, this.descJson[i].Translated)
        }
      }

      // Keep only latest keyword change
      // console.log('Enter')
      console.log(translatedList)
      this.translatedHistory.pop()
      this.translatedHistory.push(translatedList)
      // console.log('Translate History' + this.translatedHistory)

      this.updateTranslate()
      let wordlength = wordEn.split(' ').length
      if(wordlength <= 3) {
        dbDict.ref(wordEn).set(this.wordTh)  
      }
      // this.wordEn = ''
      this.wordTh = ''
    },
    updateTranslate() {
      this.getPreview()
    },
    // Page management function
    nextDesc() {
      let descPos = parseInt(this.descPos)
      if (descPos < this.descLength - 1) {
        this.descPos = descPos + 1
        this.getPreview()
      } else {
        return
      }
    },
    prevDesc() {
      if(this.descPos > 0) {
        this.descPos -= 1
        this.getPreview()
      } else {
        this.descPos = 0
      }
    },
    jumpDesc() {
      let preview = this.getPreview
      if(this.descPos > 0) {
        this.descPos -= 1
      } else {
        this.descPos = 0
      }
      
      $('#jump-desc')
      .keypress(function(e) {
        if(e.which == 13) {
          preview();
        }
      });
    },
    // Hilight text then auto fill word to input
    getDataHilight() {
      let translate = this.translate
      this.wordTh = ''
      var text = ''
      if (window.getSelection) {
        text = window.getSelection().toString()
      } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text
      }
      this.wordEn = text

      var foo = false
      $('#th-input').focus().unbind('keydown')
      .on('keydown', function(e) {
        if(e.which == 13 & !foo) {
          e.preventDefault()
          e.stopPropagation()
          console.log('Enter')
          translate()
          foo = true;
        }
      })
    },
    // Start application process
    start() {
      if (confirm('Are you sure you want to start from begining?')) {
        // Save it!
        this.getData()
        this.getPreview()
      }
    },
    load() {
      this.getLoad()
      this.getPreview()
    }
  }
}

function HashTable(size) {
  this.buckets = Array(size)
  this.numBuckets = this.buckets.length
}

// constructor for hash node
function HashNode(key, value, next) {
  this.key = key
  this.value = value
  this.next = next || null
}

// The hash function takes in a key and return a bucket number which will be used as our index for the key
HashTable.prototype.hash = function(key) {
  let total = 0
  for(let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i)
  }
  let bucket = total % this.numBuckets
  return bucket
}

// When inserting or updating a node we are running the key through our hashing function and then checking for
// collisons - if there is a collisons, we traverse the bucket's chain and find the last node and insert at that
// position
HashTable.prototype.insert = function(key, value) {
  let index = this.hash(key)
  if(!this.buckets[index]) {
    this.buckets[index] = new HashNode(key, value)
  } else if(this.buckets[index].key === key) {
    this.buckets[index].value = value
  } else {
    let currentNode = this.buckets[index]
    while(currentNode.next) {
      if(currentNode.next.key === key) {
        current.next.value = value
        return
      }
      currentNode = currentNode.next
    }
    currentNode.next = new HashNode(key, value)
  }
}

// search for particular node by key Namespace
HashTable.prototype.get = function(key) {
  let index = this.hash(key)
  if(!this.buckets[index]) return null
  let currentNode = this.buckets[index]
  while(currentNode) {
    if(currentNode.key === key) return currentNode.value
    currentNode = currentNode.next
  }
}

// iterates through all buckets, and checks for chain in each bucket - return array of all hash nodes
HashTable.prototype.retriveAll = function() {
  let allNode = []
  for(let i = 0; i<this.numBuckets; i++) {
    let currentNode = this.buckets[i]
    while(currentNode) {
      allNode.push(currentNode)
      currentNode = currentNode.next
    }
  }
  return allNodes
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>
 .logo h1{
    display: inline-block;
    position: relative;
    top: -3rem;
 }
</style>
