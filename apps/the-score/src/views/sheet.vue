<template>
  <div>

  <van-nav-bar
      right-text="配置"
      fixed
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

  <pdf-preview :url="pdfUrl" />
  </div>

</template>

<script>
  import pdfPreview from '../components/PdfPreview.vue'
  // import pdf from 'vue-pdf'
  // var loadingTask = pdf.createLoadingTask('/static/Happy_Birthday.pdf');
  export default {
    components: {
      pdfPreview
      // pdf
    },
    data() {
      return {
        currentPage: 0,
        pageCount: 0,
        pdfUrl: '',
        // src: loadingTask,
        // numPages: undefined,
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
      }
    },
    mounted() {
      const query = this.$route.query
      if (query.pdf) {
      this.pdfUrl = query.pdf
      // this.src.promise.then(pdf => {
      //   this.numPages = pdf.numPages
      // })
      }
    },
    watch: {
      $route: function (to, from) {
        console.log(this.$route.params)
      }
    },
    methods: {
      onMetronomeStart(intf) {
        this.playing = true
        this.intf = intf
      },
      onMetronomeStop() {
        this.playing = false
        this.intf = null
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
    }
  }
</script>
