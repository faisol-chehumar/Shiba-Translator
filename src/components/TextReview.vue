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
            <button class="ui black button" @click="autoTranslateAll">Auto Translate All</button>
            <button class="ui black button" @click="autoTranslate">Auto Translate</button>
            <button class="ui black button" @click="reset">Reset</button>
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
        <div class="column" sytle="height: 36rem">
          <div class="eight wide column" style="padding: 2rem; overflow-y: scroll; height: 36rem">
            <p id="en-content" class="eng" v-for="textEn in descEn" @click="getDataHilight">{{ textEn }}</p>
          </div>
        </div>
        <!-- End English text preview -->
        <div class="column" sytle="height: 36rem">
          <div class="eight wide right floated column" style="padding: 2rem; overflow-y: scroll; height: 36rem">
            <p class="th" v-for="textTh in descTh" @click="getDataHilight">{{ textTh }}</p>
          </div>
        </div>
        <!-- End Thai text preview -->
      </div>
    </div>
    <div class="ui vertical stripe segment" style="background: #322c48; padding: 2rem 0; position: fixed; bottom: 0; width: 100%">
      <div class="row">
        <div class="twenty wide column">
          <div class="ui input" style="width: 470px">
            <input type="text" placeholder="EN Word" v-model="wordEn">  
          </div>
          <div class="ui input" style="width: 470px">
            <input id="th-input" type="text" placeholder="TH Word" v-model="wordTh">
          </div>
          <button class="ui blue button" @click="translate">Search and Replace</button>
          <button class="ui yellow button" @click="onePageReplace">One page replace</button>
          <button class="ui button green" @click="specialTranslate">Replace</button>
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

if(user.toLowerCase() === 'chai-office') {
  configUser = {
    apiKey: "AIzaSyAXsI7kc0gAdnb7aGIOmL76Akgd8rOVKL8",
    authDomain: "chai-office.firebaseapp.com",
    databaseURL: "https://chai-office.firebaseio.com",
    projectId: "chai-office",
    storageBucket: "chai-office.appspot.com",
    messagingSenderId: "186542880891"
  }
}

if(user.toLowerCase() === 'arm-office') {
  configUser = {
    apiKey: "AIzaSyAlRFJcV_9xjFUB9cNMcFXi9jpDFceCN3A",
    authDomain: "arm-office.firebaseapp.com",
    databaseURL: "https://arm-office.firebaseio.com",
    projectId: "arm-office",
    storageBucket: "arm-office.appspot.com",
    messagingSenderId: "285503624679"
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
      veresion: ' 1.0.0',
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
        this.initDict()

        // for(let i = this.descJson.length - 1; i >= 0; i--) {
        //     let text = this.descJson[i].Translated
        //     let translateText = this.processTranslate(text)
        //     console.log(translateText)
        //     this.save(i, translateText)
        // }
        // this.getPreview()
      }
        // this.descDict.get('Special สี')
        // console.log( 'Change detected...' )
    }
  },
  methods: {
    reset() {
      let translatedList = []
      translatedList.push({[this.descPos]: this.descJson[this.descPos].Translated})
      let newText = this.descJson[this.descPos].English
      this.save(this.descPos, newText)

      // Translated History Handle
      this.translatedHistory.pop()
      this.translatedHistory.push(translatedList)

      this.getPreview()      
    },
    processTranslate(text) {
      let dictionary = this.descDict
      // console.log('dictionary: ' + dictionary)
      let textList = getTextList(text)
      // console.log('textList: ' + textList)
      let translateTextList = textList.map((textInLine) => {
        // console.log('textInLine: ' + textInLine)
        return translateByLine(textInLine, dictionary)
      })
      // console.log('translateTextList: ' + translateTextList)
      let postText = setPostText(translateTextList)
      // console.log(postText)
      return postText
    },
    autoTranslateAll() {
      let isSure = prompt("Heyyy!! Are you sure? (Y/N))")
      if(isSure === 'Y') {
        let translatedList = []
        for(let i = this.descJson.length - 1; i >= 0; i--) {
            let text = this.descJson[i].Translated
            translatedList.push({[i]: text})
            let translateText = this.processTranslate(text)
            // console.log(translateText)
            this.save(i, translateText)
        }

        // Translated History Handle
        this.translatedHistory.pop()
        this.translatedHistory.push(translatedList)

        this.getPreview()
      }
    },
    autoTranslate() {
      let text = this.descJson[this.descPos].English
      // console.log('Auto translate: ' + text)
      let translateText = this.processTranslate(text)
      console.log('Translate text: ' + translateText)
      // console.log(translateText)
      this.save(this.descPos, translateText)
      this.getPreview()

      let translatedList = []
      translatedList.push({[this.descPos]: text})

      // Translated History Handle
      this.translatedHistory.pop()
      this.translatedHistory.push(translatedList)

      // this.save(this.descPos, newText)
      this.updateTranslate()
    },
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
    initDict() {
      // this.dictTable()
      // let dictData = this.dictRef.length
      // let keyword = this.dictRef
      // console.log('dictionary length: ' + dictData)
      // for (let i = dictData - 1; i >= 0; i--) {
      //   this.setDict(keyword[i]['.key'], keyword[i]['.value'])
      // }
      this.dictTable()
      let dictData = this.dictRef.length
      let keyword = this.dictRef
      // console.log('dictionary length: ' + dictData)
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
      // console.log(this.descDict)
      // console.log(this.descDict.get('Special สี'))

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
    dictTable() {
      // this.descDict = new HashTable(1000)
      this.descDict = {}
    },
    setDict(word, translate) {
      this.descDict[word] = translate
    },
    // Remove all special charater
    removeSpecialChar(str) {
      return str.replace(/[~!@#$^*()_|=?;:<>\{\}\[\]\\]/gi, "")
    },
    setDictData(wordEn, wordTh) {
      let wordLength = wordEn.split(' ').length
      let engValidator = /^[a-zA-Z \.\!\?]*$/.test(wordEn)
      // Accept word only less than 3 word and only contain English alphabet
      // console.log('Set dict: ' + wordEn)
      // console.log(engValidator)
      if(wordLength <= 3 && engValidator === true ) {
        dbDict.ref(wordEn.toLowerCase()).set(wordTh)  
      }
    },
    onePageReplace() {
      let translatedList = []
      let wordEn = this.wordEn
      let wordTh = this.wordTh
      translatedList.push({[this.descPos]: this.descJson[this.descPos].Translated})
      let newText = this.descJson[this.descPos].Translated.replace(wordEn, wordTh)

      // Translated History Handle
      this.translatedHistory.pop()
      this.translatedHistory.push(translatedList)

      this.save(this.descPos, newText)
      this.setDictData(wordEn, wordTh)
      this.updateTranslate()
    },
    translate() {
      let re = ''
      let translatedList = []
      let wordEn = this.removeSpecialChar(this.wordEn)
      // console.log('Remove special character' + wordEn)

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

      // console.log('translate')
      // Translated History Handle
      this.translatedHistory.pop()
      this.translatedHistory.push(translatedList)

      this.updateTranslate()
      this.setDictData(wordEn, this.wordTh)
      // this.wordTh = ''
    },
    specialTranslate() {
      let translatedList = []

      for(let i = this.descJson.length - 1; i >= 0; i--) {
        translatedList.push({[i]: this.descJson[i].Translated})
        // console.log(this.wordEn)
        // console.log(this.wordTh)
        let newStr = this.descJson[i].Translated.replace(this.wordEn, this.wordTh)
        // console.log('work')
        this.descJson[i].Translated = newStr
        this.save(i, this.descJson[i].Translated)
      }

      // console.log('translate')
      // Translated History Handle
      this.translatedHistory.pop()
      this.translatedHistory.push(translatedList)

      this.updateTranslate()
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
        // console.log(text)
      } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text
        // console.log(text)
      }
      this.wordEn = text
      // let nextPage = this.nextDesc()
      // let prevPage = this.prevDesc()
      // console.log(this.nextDesc())
      var foo = false
      $('#th-input').focus().unbind('keydown')
      .on('keydown', function(e) {
        if(e.which == 13 & !foo) {
          e.preventDefault()
          e.stopPropagation()
          // console.log('Enter')
          translate()
          foo = true;
        }
      })


      // $(document).keydown(function(e, nextPage, prevPage) {
      //   console.log(nextPage)
      //   e.preventDefault() 
      //   switch(e.which) {
      //     case 37:
      //       // Left Key Pressed
      //       prevPage()
      //       break
      //     case 39:
      //       // Right Key Pressed
      //       nextPage()
      //       break
      //     default:
      //       return
      //   }
      // })

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

// Make capitalize to frist character of each line
String.prototype.capitalize = function() {
  // console.log('hello')
  return this.charAt(0).toUpperCase() + this.slice(1);
}

// Seperate text by <br>
function removeBr(text) {
  return text.split(/<br\s*[\/]?>/gi)
}

// Join array list with <br>
function joinBr(text) {
  return text.join('<br>')
}

// Make normalize text
function getTextList(text) {
  let textList = removeBr(text)
  let normalTextList = textList.map((text) => {
    return text.toLowerCase()
  }) 
  return normalTextList
}

// Make normalize text to post-process text
function setPostText(textList) {
  // console.log(textList)
  let postText = textList.map((text) => {
    return text.capitalize()
  })

  // console.log(postText)
  
  return postText.join('<br>')
}

// Translate word from dictionary
function translate(word, dictionary) {
  // return (dictionary[word] !== undefined) ? dictionary[word] : word 
  // console.log('word: ' + word)
  word = word.replace(/((\s*\S+)*)\s*/, "$1")
  // console.log('test: ' + word)
  let format = /[`~!@#$%^*()_|+=?;:<>\{\}\[\]\\]/
  let lastStrPos = word.length - 1
  let validWord = word
  let firstStr = ''
  let lastStr = ''
  let str = ''
  // console.log(firstStr)
  // console.log('validWord: ' + validWord)
  if(format.test(word[0])) {
    validWord = validWord.substr(1)
    firstStr = word[0]
  }
  if(format.test(word[lastStrPos])) {
    validWord = validWord.slice(0, -1)
    lastStr = word[lastStrPos]
  }
  
  // console.log(lastStrPos)
  // console.log(word[lastStrPos])
  // console.log(word)
  // console.log(firstStr)
  str = dictionary[validWord] !== undefined ? firstStr + dictionary[validWord] + lastStr : undefined
  // console.log(dictionary[validWord])
  // let xStr = firstStr + dictionary[validWord] + lastStr
  // console.log(xStr)
  // console.log(lastStr)
  // console.log('-----------')
  
  // console.log(format.test(word[0]))
  // if()
  // word.replace(/[`~!@#$%^*()_|+=?;:<>\{\}\[\]\\]/gi, "")
  return str
}

function getBlockWord(wordInLine, wordLength, wordPos) {
  let word = []
  for(let i = 0; i < wordLength; i++) {
    word.push(wordInLine[wordPos + i])
  }
  return word.join(' ')
}


function getBlockWordLength(textInline) {
  return (textInline.length < 3) ? textInline.length : 3 
}

function translateBlock(blockLength, textLineByArray, dictionary) {
  let textPos = 0
  let translateBlock = []
  let textLineByArraySize = textLineByArray.length
  // console.log('textLineByArraySize: ' + textLineByArraySize)
  // console.log('---------------')
  if(textLineByArraySize <  blockLength) {
    translateBlock = textLineByArray
  } else {
    for(let j = 0; j <= textLineByArraySize - 1; j++) {
      let word = getBlockWord(textLineByArray, blockLength, textPos)
      // console.log('word: ' + word)
      let translatedWord = translate(word, dictionary)
      // console.log('translatedWord: ' + translatedWord)
      if(translatedWord !== undefined) {
        // console.log('translatedWord: ' + translatedWord)
        translateBlock.push(translatedWord)
        j += (blockLength - 1)
        textPos += blockLength
      } else {
        // console.log('textLineByArray[j]: ' + textLineByArray[j])
        translateBlock.push(textLineByArray[j])
        textPos++
      }
    }
  }

  // console.log(translateBlock)
  return translateBlock
}

function translateByLine(textLine, dictionary) {
  // console.log('textline: ' + textLine)
  let textLineByArray = textLine.split(' ')
  // console.log('textLineByArray: ' + textLineByArray)
  let blockLength = getBlockWordLength(textLineByArray)
  // console.log('blockLength: ' + blockLength)
  let translateLine = []
  
  // Need refactory here seperate case with block length condition
  let stepOne = translateBlock(3, textLineByArray, dictionary)
  // console.log('stepOne: ' + stepOne)
  let stepTwo = translateBlock(2, stepOne, dictionary)
  // console.log('stepTwo: ' + stepTwo)
  let stepThree = translateBlock(1, stepTwo, dictionary)
  // console.log('stepThree: ' + stepThree)

  return stepThree.join(' ')
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>
 .logo h1{
    display: inline-block;
    position: relative;
    top: -3rem;
 }

p:lang(th) { 
  color: Blue;
  font-weight: 800;
}
</style>
