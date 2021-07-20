<template>
  <div style="display: flex; justify-content: center; align-items: center; width: 100%; " class="fab fab--fixed" v-if="ready">
    <div style=" background: #fff; width: 40px; height: 40px; border-radius: 100%">
      <van-icon name="/voice.svg" size="37" v-if="isGameMode && !isPlaying" @click="handlePlayGame" />
      <van-icon name="play-circle" size="40" v-if="isMusicMode && !isPlaying" color="#5BAE9A" @click="handlePlayMusic" />
      <van-icon name="pause-circle" size="40" color="#5BAE9A" @click="handlePause" v-if="isPlaying"/>
    </div>
<!--    <div style=" background: #fff; width: 40px; height: 40px; border-radius: 100%; margin-left: 10px;">-->
<!--      <van-icon name="stop-circle" size="40" color="#5BAE9A" @click="handleStop" v-if="isPlaying"/>-->
<!--      <van-icon name="stop-circle" size="40" color="#CCC" v-else />-->
<!--    </div>-->

  </div>
</template>
<script>
import { EventBus } from '../plugins/event-bus.js';

export default {
  props: {
    mode: {
      type: String,
      default: 'music'
    },
    playbackEngine: Object,
    scoreTitle: String,
    ready: false,
  },
  data() {
    return {
      isPlaying: false,
      // isPause: false
    }
  },
  computed: {
    isGameMode() {
      return this.mode !== 'music';
    },
    isMusicMode() {
      return this.mode === 'music';
    }
  },
  watch: {
    mode: {
      handler(val) {
        console.log(val)
        if (val) {
          this.changeMode(val)
        }
      }
    }
  },
  mounted() {
    EventBus.$on('start-play', () => {
      this.handlePlayMusic()
    })
    EventBus.$on('pause-play', () => {
      this.handlePause()
    })

    EventBus.$on('stop-play', () => {
      this.handleStop()
    })
  },
  methods: {
    changeMode(mode) {
      this.$emit('stop')
      this.isPlaying = false
      this.playbackEngine.pause()
      this.playbackEngine.stop()
    },
    handlePlayGame() {
      this.isPlaying = true
      this.$emit('playing')
      this.playbackEngine.play()
    },
    handlePlayMusic() {
      this.isPlaying = true
      this.$emit('playing')
      this.playbackEngine.play()
    },
    handlePause() {
      this.isPlaying = false
      this.playbackEngine.pause()
      // playbackEngine.state !== 'PLAYING'
    },
    handleStop() {
      this.playbackEngine.stop()
    }
  }
}
</script>
<style>
  .fab {
    z-index: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: content-box;
    width: 100%;
    height: 50px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .fab--fixed {
    position: fixed;
    bottom: 50px;
    left: 0
  }
</style>
