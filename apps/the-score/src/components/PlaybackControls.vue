<template>
  <div class="text-xs-center">
    <v-bottom-sheet inset style="max-width: 500px;" :persistent="true" :hide-overlay="true" :value="true">
      <v-card tile>
        <v-list class="blue lighten-5">
          <v-slider
            v-if="this.playbackEngine && this.playbackEngine.iterationSteps > 0"
            :value="this.playbackEngine.currentIterationStep"
            :min="0"
            :max="this.playbackEngine.iterationSteps"
            :step="1"
            @input="val => this.playbackEngine.jumpToStep(val)"
            class="progress-slider"
          ></v-slider>
          <v-list-item>

            <v-list-item-content>
              <v-list-item-title>{{ scoreTitle }}</v-list-item-title>
<!--              <v-list-item-sub-title></v-list-item-sub-title>-->
            </v-list-item-content>
<!--            <v-list-item-content>-->
<!--              <InstrumentControl-->
<!--                      v-for="instrument in scoreInstruments"-->
<!--                      :key="instrument.Id"-->
<!--                      :playbackEngine="playbackEngine"-->
<!--                      :instrument="instrument"-->
<!--              />-->
<!--            </v-list-item-content>-->
            <v-list-item-action :class="{ 'mr-2': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon @click="playbackEngine.play()" v-if="playbackEngine.state !== 'PLAYING'">
                <v-icon dark>play_arrow</v-icon>
              </v-btn>
              <v-btn v-else icon @click="playbackEngine.pause()">
                <v-icon dark>pause</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-action>
              <v-btn icon @click="playbackEngine.stop()">
                <v-icon dark>stop</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-action>
              <v-btn icon @click="playbackEngine.stop()">
                <v-icon dark>stop</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import InstrumentControl from "./InstrumentControl.vue";

export default {
  components: {
    InstrumentControl
  },
  props: {
    playbackEngine: Object,
    scoreTitle: String
  },
  computed: {
    scoreInstruments() {
      let visibleInstruments = []

      this.playbackEngine.scoreInstruments.forEach(item => {
        if (item.Visible === true) {
          visibleInstruments.push(item)
        }
      })
      return visibleInstruments
    },
  }
};
</script>

<style lang="scss">
.v-bottom-sheet.v-dialog.v-bottom-sheet--inset {
  max-width: 700px;
}

.v-input.progress-slider {
  margin-top: -24px;
}
</style>
