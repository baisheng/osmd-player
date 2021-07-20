<template>
  <div>
    <van-nav-bar
            right-text="配置"
            @click-left="onClickLeft"
            @click-right="onClickRight"
            fixed
            :border="false"
            style="background: transparent"
    >
      <template #right>
        <metronome-view :intf="intf" />
        <metronome
                ref="metronome"
                :gain="gain"
                :tempo="tempo"
                :beat="beat"
                :mute="mute"
                :pause="pause"
                @start="onMetronomeStart"
                @stop="onMetronomeStop"
        />
      </template>
    </van-nav-bar>

    <div class="music-score">
      <Score
              v-if="mounted"
              @osmdInit="osmdInit"
              @scoreLoaded="scoreLoaded"
              :score="selectedScore"
              :ready="pbEngineReady"
      />
<!--      <PlaybackControls :playbackEngine="pbEngine" :scoreTitle="scoreTitle" />-->
    </div>

<play-button
            :mode="onMusicMode ? 'music' : 'voice'"
            :playbackEngine="pbEngine"
            :ready="pbEngineReady"
    />
    <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed">

      <div class="van-tabbar-item van-tabbar-item--active" @click="toggleMetronome">

        <div class="van-tabbar-item__icon" v-if="onMetronome">
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
              <path d="M11.45 9.73202L11.7 9.72202C11.897 9.52802 12.123 9.38402 12.36 9.26802L11.414 5.72302L13.776 2.81502C13.8174 2.76407 13.8483 2.70547 13.867 2.64256C13.8857 2.57966 13.8919 2.51368 13.8851 2.4484C13.8783 2.38313 13.8587 2.31982 13.8275 2.2621C13.7963 2.20439 13.7539 2.15339 13.703 2.11202C13.652 2.07066 13.5934 2.03973 13.5305 2.02101C13.4676 2.00229 13.4017 1.99615 13.3364 2.00293C13.2711 2.00971 13.2078 2.02928 13.1501 2.06052C13.0924 2.09176 13.0414 2.13407 13 2.18502L11.096 4.52902L10.016 0.481023C9.97611 0.345894 9.89482 0.22669 9.78358 0.140215C9.67235 0.05374 9.53678 0.00435566 9.39599 -0.000976562H4.37999C4.23974 0.00623943 4.10507 0.0563297 3.9942 0.142528C3.88332 0.228726 3.80157 0.346878 3.75999 0.481023L0.0169917 14.517C-0.0550083 14.787 0.110992 14.999 0.386992 14.999H1.88699V15.499C1.88699 15.767 2.11399 15.999 2.39299 15.999H3.38299C3.67299 15.999 3.88799 15.775 3.88799 15.499V15H7.04599C7.11299 14.643 7.26599 14.304 7.48799 14H1.18999L1.98999 11H7.06999C7.16799 10.54 7.39299 10.095 7.74999 9.72502C7.99559 9.48377 8.28837 9.29585 8.60999 9.17302L10.635 6.68302L11.449 9.73302L11.45 9.73202ZM6.64999 10H2.25699L4.65699 1.00002H9.11999L10.317 5.48802L6.64999 10ZM6.39299 3.00002H7.38299C7.67299 3.00002 7.88799 2.77602 7.88799 2.50002C7.88799 2.23202 7.66199 2.00002 7.38399 2.00002H6.39399C6.32764 1.99855 6.26168 2.01042 6.20001 2.03495C6.13835 2.05948 6.08225 2.09616 6.03504 2.1428C5.98784 2.18945 5.95049 2.24511 5.92523 2.30648C5.89997 2.36784 5.88731 2.43366 5.88799 2.50002C5.88799 2.76802 6.11399 3.00002 6.39299 3.00002ZM6.39299 5.00002H7.38299C7.67299 5.00002 7.88799 4.77602 7.88799 4.50002C7.88799 4.23202 7.66199 4.00002 7.38399 4.00002H6.39399C6.32764 3.99855 6.26168 4.01042 6.20001 4.03495C6.13835 4.05948 6.08225 4.09616 6.03504 4.1428C5.98784 4.18945 5.95049 4.24511 5.92523 4.30648C5.89997 4.36784 5.88731 4.43366 5.88799 4.50002C5.88799 4.76802 6.11399 5.00002 6.39299 5.00002ZM7.38299 6.00002H6.39299C6.32677 5.99882 6.26097 6.01089 6.19948 6.03553C6.138 6.06017 6.08207 6.09687 6.035 6.14348C5.98793 6.19008 5.95067 6.24564 5.92542 6.30688C5.90017 6.36811 5.88745 6.43379 5.88799 6.50002C5.88799 6.76802 6.11399 7.00002 6.39199 7.00002H7.38199C7.44834 7.0015 7.51431 6.98962 7.57597 6.9651C7.63763 6.94057 7.69374 6.90389 7.74094 6.85725C7.78815 6.8106 7.82549 6.75494 7.85075 6.69357C7.87601 6.6322 7.88868 6.56638 7.88799 6.50002C7.88799 6.23202 7.66199 6.00002 7.38299 6.00002ZM12.207 13.5L13.853 11.854C13.8995 11.8076 13.9364 11.7525 13.9616 11.6918C13.9867 11.6311 13.9997 11.5661 13.9998 11.5004C13.9998 11.4347 13.9869 11.3696 13.9618 11.3089C13.9367 11.2482 13.8999 11.193 13.8535 11.1465C13.8071 11.1 13.7519 11.0631 13.6913 11.038C13.6306 11.0128 13.5655 10.9998 13.4998 10.9997C13.4341 10.9997 13.3691 11.0126 13.3084 11.0377C13.2477 11.0628 13.1925 11.0996 13.146 11.146L11.5 12.793L9.85299 11.146C9.7591 11.0523 9.63182 10.9997 9.49914 10.9997C9.36646 10.9998 9.23925 11.0526 9.14549 11.1465C9.05174 11.2404 8.99912 11.3677 8.99921 11.5004C8.99931 11.6331 9.0521 11.7603 9.14599 11.854L10.793 13.5L9.14599 15.146C9.0995 15.1924 9.06261 15.2476 9.03743 15.3082C9.01225 15.3689 8.99926 15.434 8.99921 15.4997C8.99912 15.6324 9.05174 15.7596 9.14549 15.8535C9.23925 15.9474 9.36646 16.0002 9.49914 16.0003C9.63182 16.0004 9.7591 15.9478 9.85299 15.854L11.5 14.207L13.146 15.854C13.2399 15.9478 13.3672 16.0004 13.4998 16.0003C13.6325 16.0002 13.7597 15.9474 13.8535 15.8535C13.9472 15.7596 13.9999 15.6324 13.9998 15.4997C13.9997 15.367 13.9469 15.2398 13.853 15.146L12.207 13.5ZM5.37999 12C5.31433 11.9999 5.24929 12.0127 5.18857 12.0377C5.12786 12.0627 5.07267 12.0994 5.02615 12.1458C4.93219 12.2393 4.87926 12.3664 4.87899 12.499C4.87886 12.5647 4.89166 12.6297 4.91667 12.6904C4.94168 12.7512 4.97839 12.8063 5.02473 12.8529C5.07107 12.8994 5.12611 12.9363 5.18673 12.9616C5.24734 12.9868 5.31233 12.9999 5.37799 13H7.48999C7.27122 12.7033 7.12095 12.3618 7.04999 12H5.37999Z"
                    fill="#5BAE9A"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="14" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>

        </div>

        <div class="van-tabbar-item__icon" v-else>
          <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
              <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.704 2.11202C13.653 2.07053 13.5943 2.0395 13.5313 2.02071C13.4683 2.00193 13.4022 1.99574 13.3369 2.00253C13.2715 2.00931 13.2081 2.02891 13.1502 2.06023C13.0924 2.09155 13.0414 2.13395 13 2.18502L11.096 4.52902L10.016 0.479023C9.97536 0.344497 9.89381 0.225978 9.78269 0.13995C9.67157 0.0539219 9.53641 0.00466263 9.39599 -0.000976562H4.37999C4.24002 0.00623707 4.10561 0.0560875 3.99479 0.141886C3.88397 0.227684 3.80204 0.345325 3.75999 0.479023L0.0169917 14.515C-0.0550083 14.785 0.110992 14.997 0.386992 14.997H1.88699V15.497C1.88699 15.764 2.11399 15.997 2.39299 15.997H3.38299C3.67299 15.997 3.88799 15.772 3.88799 15.497V15H9.88799V15.5C9.88799 15.768 10.114 16 10.393 16H11.383C11.673 16 11.888 15.776 11.888 15.5V15H13.39C13.668 15 13.83 14.784 13.76 14.518L11.414 5.72302L13.776 2.81502C13.8596 2.71222 13.899 2.58044 13.8855 2.44862C13.872 2.31681 13.8067 2.19575 13.704 2.11202ZM11.52 10H7.93999L10.635 6.68202L11.52 10ZM1.18999 14L1.98999 11H11.787L12.587 14H1.18999ZM4.65699 1.00002H9.11999L10.317 5.48802L6.64999 10H2.25699L4.65699 1.00002ZM8.39699 12H5.37999C5.24738 12 5.12021 12.0527 5.02644 12.1465C4.93267 12.2402 4.87999 12.3674 4.87999 12.5C4.87999 12.6326 4.93267 12.7598 5.02644 12.8536C5.12021 12.9473 5.24738 13 5.37999 13H8.39799C8.67299 13 8.88799 12.776 8.88799 12.5C8.88802 12.3691 8.83671 12.2434 8.7451 12.15C8.65348 12.0565 8.52886 12.0026 8.39799 12H8.39699ZM6.39299 3.00002H7.38299C7.67299 3.00002 7.88799 2.77602 7.88799 2.50002C7.88799 2.23202 7.66199 2.00002 7.38399 2.00002H6.39399C6.32764 1.99855 6.26168 2.01042 6.20001 2.03495C6.13835 2.05948 6.08225 2.09616 6.03504 2.1428C5.98784 2.18945 5.95049 2.24511 5.92523 2.30648C5.89997 2.36784 5.88731 2.43366 5.88799 2.50002C5.88799 2.76802 6.11399 3.00002 6.39299 3.00002ZM6.39299 5.00002H7.38299C7.67299 5.00002 7.88799 4.77602 7.88799 4.50002C7.88799 4.23202 7.66199 4.00002 7.38399 4.00002H6.39399C6.32764 3.99855 6.26168 4.01042 6.20001 4.03495C6.13835 4.05948 6.08225 4.09616 6.03504 4.1428C5.98784 4.18945 5.95049 4.24511 5.92523 4.30648C5.89997 4.36784 5.88731 4.43366 5.88799 4.50002C5.88799 4.76802 6.11399 5.00002 6.39299 5.00002ZM7.38299 6.00002H6.39299C6.32673 5.99868 6.26087 6.01066 6.19932 6.03525C6.13777 6.05984 6.08179 6.09654 6.03469 6.14317C5.9876 6.1898 5.95034 6.24541 5.92514 6.30671C5.89994 6.36801 5.88731 6.43375 5.88799 6.50002C5.88799 6.76802 6.11399 7.00002 6.39199 7.00002H7.38199C7.44834 7.0015 7.51431 6.98962 7.57597 6.9651C7.63763 6.94057 7.69374 6.90389 7.74094 6.85725C7.78815 6.8106 7.82549 6.75494 7.85075 6.69357C7.87601 6.6322 7.88868 6.56638 7.88799 6.50002C7.88799 6.23202 7.66199 6.00002 7.38299 6.00002Z"
                    fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="14" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>


        </div>
        <div class="van-tabbar-item__text" :style="{color: onMetronome? '#5BAE9A': '#000'}">节拍器</div>
      </div>
      <div class="van-tabbar-item van-tabbar-item--active"
           @click="toggleMode">
        <div class="van-tabbar-item__icon">
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8744 0.142233C13.7846 0.0704385 13.6769 0.0524899 13.5692 0.0704386L4.95385 1.86531C4.79231 1.90121 4.66667 2.0448 4.66667 2.22428V9.54736C4.18205 9.0089 3.48205 8.68582 2.69231 8.68582C1.20256 8.68582 0 9.88839 0 11.3781C0 12.8679 1.20256 14.0704 2.69231 14.0704C4.18205 14.0704 5.38462 12.8679 5.38462 11.3781V5.00634L13.2821 3.35505V7.73454C12.7974 7.19608 12.0795 6.873 11.3077 6.873C9.81795 6.873 8.61538 8.07557 8.61538 9.56531C8.61538 11.0551 9.81795 12.2576 11.3077 12.2576C12.7974 12.2576 14 11.0551 14 9.56531V0.411464C14 0.303772 13.9462 0.19608 13.8744 0.142233ZM2.69231 13.3345C1.59744 13.3345 0.717949 12.4551 0.717949 11.3602C0.717949 10.2653 1.59744 9.38582 2.69231 9.38582C3.78718 9.38582 4.66667 10.2653 4.66667 11.3602C4.66667 12.4551 3.78718 13.3345 2.69231 13.3345ZM11.3077 11.5397C10.2128 11.5397 9.33333 10.6602 9.33333 9.56531C9.33333 8.47044 10.2128 7.59095 11.3077 7.59095C12.4026 7.59095 13.2821 8.47044 13.2821 9.56531C13.2821 10.6602 12.4026 11.5397 11.3077 11.5397ZM13.2821 2.6371L5.38462 4.28839V2.51146L13.2821 0.860182V2.6371Z"
                  :fill="onMusicMode ? '#000' : '#5BAE9A'"/>
          </svg>


          <!--          <i class="van-icon van-icon-home-o"></i>-->
        </div>
        <div class="van-tabbar-item__text"
             :style="{color: onMusicMode? '#000': '#5BAE9A'}">
          <span v-if="onMusicMode">欣赏模式</span>
          <span v-else>评分模式</span>
        </div>
      </div>
    </div>
<!--    <van-tabbar v-model="active">-->
<!--      <van-tabbar-item icon="home-o">节拍器</van-tabbar-item>-->
<!--&lt;!&ndash;      <van-tabbar-item icon="search">评分模式</van-tabbar-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>&ndash;&gt;-->
<!--      <van-tabbar-item icon="music">评分模式</van-tabbar-item>-->
<!--    </van-tabbar>-->
  </div>
<!--  <v-app id="app">-->
<!--        <v-navigation-drawer v-model="drawer" app>-->
<!--          <v-list>-->
<!--            <v-list-item>-->
<!--              <v-list-item-title class="title">-->
<!--                Playback settings-->
<!--              </v-list-item-title>-->
<!--            </v-list-item>-->
<!--            <PlaybackSidebar :playbackEngine="pbEngine" v-if="pbEngineReady" />-->
<!--          </v-list>-->
<!--        </v-navigation-drawer>-->
<!--        <v-toolbar app>-->
<!--          <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>-->
<!--        </v-toolbar>-->
<!--    <v-content shadow-outline>-->
<!--      <v-container fluid shadow-outline>-->
<!--&lt;!&ndash;                <v-select :items="scores" label="Select Score" @change="scoreChanged" />&ndash;&gt;-->
<!--        <Score-->
<!--                v-if="mounted"-->
<!--                @osmdInit="osmdInit"-->
<!--                @scoreLoaded="scoreLoaded"-->
<!--                :score="selectedScore"-->
<!--                :ready="pbEngineReady"-->
<!--        />-->
<!--      </v-container>-->
<!--      <PlaybackControls :playbackEngine="pbEngine" :scoreTitle="scoreTitle" />-->
<!--    </v-content>-->
<!--  </v-app>-->
</template>

<script>
  import { Tabbar, TabbarItem } from 'vant';
  import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
  import { DropdownMenu, DropdownItem } from 'vant';
  import { Button } from 'vant';
  import {MetronomeView, Metronome} from '../components/metronome'
  import PlayButton from "../components/PlayButton";
  import PlaybackSidebar from "../components/PlaybackSidebar";
  // import PlaybackControls from "../components/PlaybackControls.vue";
  import Score from "../components/Score";

  import scores from "../scores";

  import PlaybackEngine from "../../../../dist/PlaybackEngine";
  import { EventBus } from '../plugins/event-bus.js';
  // import { PlaybackState } from "../../../../src/PlaybackEngine";

  const PlaybackState = {
    INIT: "INIT",
    PLAYING: "PLAYING",
    STOPPED: "STOPPED",
    PAUSED: "PAUSED",
    FINISHED: "FINISHED"
  }

  export default {
    name: "app",
    components: {
      PlayButton,
      Metronome,
      MetronomeView,
      osmd: null,
      Score,
      // PlaybackSidebar,
      // PlaybackControls,
      VanButton: Button,
      VanTabbar: Tabbar,
      VanTabbarItem: TabbarItem,
    },
    data() {
      return {
        sheetScore: '',
        active: 0,
        pbEngine: new PlaybackEngine(),
        pbEngineReady: false,
        scores: scores,
        selectedScore: null,
        osmd: null,
        scoreTitle: "",
        drawer: true,
        mounted: false,
        onMusicMode: true,
        onMetronome: false,
        onGameMode: false,

        metronomeShow: false,
        beat: 4,
        gain: -30,
        tempo: 120,
        mute: false,
        pause: false,
        playing: false,
        intf: null
      };
    },
    watch: {
      'pbEngine.state': (val) => {
        // console.log(val)
        // if (val === 'FINISHED') {
        //   EventBus.$emit('on-finished')
        // }
        if (val === PlaybackState.STOPPED) {
          EventBus.$emit(PlaybackState.STOPPED)
        }
      }
    },
    methods: {
      initBridge() {
        this.$bridge.registerHandler('startPlay', (data, callback) => {
          this.code = data
          this.responseData = data
          const responseData = { 'Javascript Says':'js 已响应!' }
          this.pbEngine.play()
          callback(responseData)
        })
        this.$bridge.registerHandler('pausePlay', (data, callback) => {
          this.code = data
          this.responseData = data
          const responseData = { 'Javascript Says':'js 已响应!' }
          this.pbEngine.pause()
          callback(responseData)
        })
        this.$bridge.registerHandler('endPlay', (data, callback) => {
          this.code = data
          this.responseData = data
          const responseData = { 'Javascript Says':'js 已响应!' }
          this.pbEngine.stop()
          callback(responseData)
        })

        this.$bridge.registerHandler('endRecord', (data, callback) => {
          this.code = data
          this.responseData = data
          const responseData = { 'Javascript Says':'js 已响应!' }
          const metronome = this.$refs.metronome;
          metronome.stop()
          this.onMetronome = false
          callback(responseData)
        })
      },
      async callNativeChangeModel(model) {
        try {
          let res = await this.$bridge.callHandler({
            type: 'changeModel',
            data: {
              model,
            }
          })
          this.code = res
        } catch (error) {
          console.log('error', error)
        }
      },
      async callNativeEndPlay() {
        try {
          let res = await this.$bridge.callHandler({
            type: 'endPlay',
          })
          this.code = res
        } catch (error) {
          console.log('error', error)
        }
      },
      async callNativeFinishPlay() {
        try {
          let res = await this.$bridge.callHandler({
            type: 'loadFinish',
          })
          this.code = res
        } catch (error) {
          console.log('error', error)
        }
      },
      async toggleMode() {
        console.log('模式切换')
        this.onMusicMode = !this.onMusicMode
        const model = this.onMusicMode ? 1 : 2
        // 1，切换模式  changeModel  需要参数“model”  1是欣赏模式；2是评分模式
        await this.callNativeChangeModel(model)
        this.pbEngine.pause()
        this.pbEngine.stop()
      },
      handlePause() {
        this.playing = false
        this.pbEngine.pause()
      },
      handlePlayGame() {
        this.playing = true
        this.pbEngine.play()
      },
      handlePlayMusic() {
        this.playing = true
        this.pbEngine.play()
      },
      handleStop() {
        this.pbEngine.stop()
      },
      onMetronomeStart(intf) {
        this.playing = true
        this.intf = intf
      },
      onMetronomeStop() {
        this.playing = false
        this.intf = null
      },
      onClickLeft() {
        // Toast('返回');
      },
      onClickRight() {
        // Toast('按钮');
      },
      toggleMetronome() {
        // this.onMetronome = !this.onMetronome
        const metronome = this.$refs.metronome;
        if (!this.onMetronome) {
          metronome.start()
          this.onMetronome = true
        } else {
          metronome.stop()
          this.onMetronome = false
        }
      },
      osmdInit(osmd) {
        console.log("OSMD init");
        this.osmd = osmd;
        this.selectedScore = this.sheetScore
      },
      async scoreLoaded() {
        // console.log("Score loaded");
        if (this.osmd.sheet.title) this.scoreTitle = this.osmd.sheet.title.text;
        await this.pbEngine.loadScore(this.osmd);
        this.pbEngineReady = true;
        // 加载完成
        await this.callNativeFinishPlay()
      },
      scoreChanged(scoreUrl) {
        if (this.pbEngine.state === "PLAYING") this.pbEngine.stop();
        this.selectedScore = scoreUrl;
        this.pbEngineReady = false;
      },
    },
    computed: {
      isGamePlaying() {
        return this.onGameMode && this.playing
      },
      isMusicPlaying() {
        return !this.onGameMode && this.playing
      }
    },
    mounted() {
      const query = this.$route.query
      if (query.score) {
        this.sheetScore = query.score
      }
      // 停止时调用原生触发
      EventBus.$on(PlaybackState.STOPPED, () => {
        // this.callNativeFinishPlay()
        this.callNativeEndPlay()
      })
      this.initBridge()
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
  .van-nav-bar .van-icon {
    color: #000;
  }
</style>
