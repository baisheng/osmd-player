<template>
  <v-app id="app">
<!--    <v-navigation-drawer v-model="drawer" app>-->
<!--      <v-list>-->
<!--        <v-list-tile>-->
<!--          <v-list-tile-title class="title">-->
<!--            Playback settings-->
<!--          </v-list-tile-title>-->
<!--        </v-list-tile>-->
<!--        <PlaybackSidebar :playbackEngine="pbEngine" v-if="pbEngineReady" />-->
<!--      </v-list>-->
<!--    </v-navigation-drawer>-->
<!--    <v-toolbar app>-->
<!--      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>-->
<!--    </v-toolbar>-->
    <v-content shadow-outline>
      <v-container fluid shadow-outline>
<!--        <v-select :items="scores" label="Select Score" @change="scoreChanged" />-->
        <Score
          v-if="mounted"
          @osmdInit="osmdInit"
          @scoreLoaded="scoreLoaded"
          :score="selectedScore"
          :ready="pbEngineReady"
        />
      </v-container>
      <PlaybackControls :playbackEngine="pbEngine" :scoreTitle="scoreTitle" />
    </v-content>
  </v-app>
</template>

<script>
import PlaybackSidebar from "./components/PlaybackSidebar";
import PlaybackControls from "./components/PlaybackControls.vue";
import Score from "./components/Score";

import scores from "./scores";

import PlaybackEngine from "../../../dist/PlaybackEngine";

export default {
  name: "app",
  components: {
    osmd: null,
    Score,
    PlaybackSidebar,
    PlaybackControls
  },
  data() {
    return {
      pbEngine: new PlaybackEngine(),
      pbEngineReady: false,
      scores: scores,
      selectedScore: null,
      osmd: null,
      scoreTitle: "",
      drawer: true,
      mounted: false
    };
  },
  computed: {},
  methods: {
    osmdInit(osmd) {
      console.log("OSMD init");
      this.osmd = osmd;
      // this.selectedScore = "/Winter.musicxml"
      this.selectedScore = "https://opensheetmusicdisplay.github.io/demo/sheets/MuzioClementi_SonatinaOpus36No3_Part1.xml";
    },
    async scoreLoaded() {
      console.log("Score loaded");
      if (this.osmd.sheet.title) this.scoreTitle = this.osmd.sheet.title.text;
      await this.pbEngine.loadScore(this.osmd);
      console.log("pbEngine ready");
      this.pbEngineReady = true;
    },
    scoreChanged(scoreUrl) {
      if (this.pbEngine.state === "PLAYING") this.pbEngine.stop();
      this.selectedScore = scoreUrl;
      this.pbEngineReady = false;
    }
  },
  mounted() {
    // 播放
    // this.$bridge.registerHandler('playHandler', (data, callback) => {
    //   this.code = data
    //   this.responseData = data
    //   this.dialog = true
      // console.log('data from native:', data)
      // const responseData = { 'Javascript Says':'Right back atcha!' }
      // console.log('JS responding with', responseData)
      // callback(this.responseData)
      // callback(data)
    // })
    setTimeout(() => {
      // This extra delay before rendering the score component seems to help occasional issues where the
      // OSMD cursor img element gets detached from the DOM and doesn't show unless
      // you refresh the page. A less pretty workaround until root cause is determined
      this.mounted = true;
    }, 200)
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
