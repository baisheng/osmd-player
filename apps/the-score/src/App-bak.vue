<template>
  <v-app id="app">

    <v-dialog
            v-model="dialog"
            width="500"
    >
<!--      <template v-slot:activator="{ on, attrs }">-->
<!--        <v-btn-->
<!--                color="red lighten-2"-->
<!--                dark-->
<!--                v-bind="attrs"-->
<!--                v-on="on"-->
<!--        >-->
<!--          Click Me-->
<!--        </v-btn>-->
<!--      </template>-->

      <v-card>
        <v-card-title class="headline grey lighten-2">
          手机客户端响应
        </v-card-title>

        <v-card-text>
          响应的数据为： {{responseData}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
          >
            我知道了
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row
            align="center"
            justify="space-around"
    >
      <v-btn
              depressed
              color="primary"
              @click="callNative"
      >
        Call native
      </v-btn>
    </v-row>
  </v-app>

</template>

<script>
// import PlaybackSidebar from "./components/PlaybackSidebar";
// import PlaybackControls from "./components/PlaybackControls.vue";
// import Score from "./components/Score";
//
// import scores from "./scores";
//
// import PlaybackEngine from "../../../dist/PlaybackEngine";

export default {
  name: "app",
  components: {
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      // pbEngine: new PlaybackEngine(),
      // pbEngineReady: false,
      // scores: scores,
      // selectedScore: null,
      // osmd: null,
      // scoreTitle: "",
      // drawer: true,
      // mounted: false
      responseData: ''
    };
  },
  computed: {},
  methods: {
    async callNative () {
      try {
        let res = await this.$bridge.callHandler({
          type: 'playMusic',
          data: {
            name: 'test js bridge'
          }
        })
        this.code = res
      } catch (error) {
        console.log('error', error)
      }
    }
  },
  mounted() {
    this.$bridge.registerHandler('startPlay', (data, callback) => {
      this.code = data
      this.responseData = data
      // this.dialog = true
      // console.log('data from native:', data)
      const responseData = { 'Javascript Says':'js 已响应!' }
      // console.log('JS responding with', responseData)
      callback(responseData)
      // callback(data)
    })
    this.$bridge.registerHandler('pausePlay', (data, callback) => {
      this.code = data
      this.responseData = data
      // this.dialog = true
      // console.log('data from native:', data)
      const responseData = { 'Javascript Says':'js 已响应!' }
      // console.log('JS responding with', responseData)
      callback(responseData)
      // callback(data)
    })
    this.$bridge.registerHandler('endPlay', (data, callback) => {
      this.code = data
      this.responseData = data
      // this.dialog = true
      // console.log('data from native:', data)
      const responseData = { 'Javascript Says':'js 已响应!' }
      // console.log('JS responding with', responseData)
      callback(responseData)
      // callback(data)
    })
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
