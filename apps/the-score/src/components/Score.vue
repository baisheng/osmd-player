<template>
  <div>
    <div class="score-progress" v-if="scoreLoading || !ready">
    </div>
    <div class="score" ref="scorediv"
         v-show="!scoreLoading" :style="{opacity: ready ? 100 : 0}"></div>
  </div>
</template>

<script>
import axios from "axios";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

export default {
  props: ["score", "ready"],
  data() {
    return {
      osmd: null,
      scoreLoading: false
    };
  },
  watch: {
    score(val, oldVal) {
      if (!val || val === oldVal) return;
      this.loadScore(val);
    },
    ready(val, oldVal) {
      if (!val || val === oldVal) return
      this.$toast.clear()
    }
  },
  async mounted() {
    this.osmd = new OpenSheetMusicDisplay(this.$refs.scorediv, {
      followCursor: true,
      autoResize: false,
      // renderSingleHorizontalStaffline: true
      // backend: "canvas"
    });
    this.$emit("osmdInit", this.osmd);
    if (this.score) this.loadScore(this.score);
    this.osmd.rules.DefaultColorCursor = '#008be8'
    // this.osmd.EngravingRules.DefaultColorCursor = '#008be8'
    // this.osmd.setOptions = {}
// remove highlight again (later):
// osmd.drawer.backend.removeNode(node)
  },
  methods: {
    async loadScore(scoreUrl) {
      this.scoreLoading = true;
      // this.osmd.rules.DefaultColorCursor = '#008be8'

      let scoreXml = await axios.get(scoreUrl);
      await this.osmd.load(scoreXml.data);

      this.osmd.rules.DefaultColorCursor = '#008be8'

      this.scoreLoading = false;
      await this.$nextTick();
      await this.osmd.render();
      if (this.scoreLoading || !this.ready) {

        // this.$toast.loading({
        //   message: '加载中...',
        //   forbidClick: true,
        //   loadingType: 'spinner',
        // });
      }
      this.$emit("scoreLoaded");
    }
  }
};
</script>

<style scoped lang="scss">
.score {
  width: 100%;
  /*-webkit-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4);*/
  /*-moz-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4);*/
  /*box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.4);*/
}

.score-progress {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
}
</style>

<style lang="scss">
.score {
  img {
    z-index: 1 !important;
  }
}
</style>
