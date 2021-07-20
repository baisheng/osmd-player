<template>
  <span style="display:none;"></span>
</template>
<script>

    const createPlayer = function () {
      return {
        audioContext: null,
        audioprocessHandler: function (event) {
        },
        stateHandler: function (type) {
        },
        start: function () {

          if (!this.audioContext) {

            var bufferSize = 8192;
            var numChannels = 1;
            var audioContext = new AudioContext();

            var gainNode = audioContext.createGain();
            gainNode.gain.value = 1;
            gainNode.connect(audioContext.destination);

            var scriptNode = audioContext.createScriptProcessor(bufferSize, 0, numChannels);

            scriptNode.onaudioprocess = function (event) {
              this.audioprocessHandler(event);
            }.bind(this);

            scriptNode.connect(gainNode);
            this.audioContext = audioContext;
            this.stateHandler('start');
          }
        },
        stop: function () {
          if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
            this.stateHandler('stop');
          }
        }
      };
    };
export default {
  props: {
    beat: { type: Number, default: 4 },
    tempo: { type: Number, default: 120 },
    gain: { type: Number, default: -40 },
    mute: { type: Boolean, default: false }
  },
  data: function() {
    return {
      player: null,
      reset: function() {}
    };
  },
  mounted: function() {

    var player = createPlayer();
    player.stateHandler = function(type) {

      if (type == 'start') {

        var freq, vol, step, lastStep = -1;
        var outputBuffer, i, bufLen, c, chData;

        var sine = function() {
          var v = 0;
          return function(n) {
            v += Math.cos(n);
            return v;
          }
        }();
        var square = function(n) {
          return Math.sin(n) < 0? -1 : 1;
        };
        var wave = square;

        var audioContext = player.audioContext;
        var sampleRate = audioContext.sampleRate;
        var t = 0;
        var dt = 1 / sampleRate;
        var gateT = 0;
        var clickGateTime = 1000 * dt;

        this.reset = function() {
          t = 0;
        };

        player.audioprocessHandler = function(event) {

          outputBuffer = event.outputBuffer;
          bufLen = outputBuffer.length;
          chData = outputBuffer.getChannelData(0);

          for (i = 0; i < bufLen; i += 1) {

            step = Math.floor(t * this.params.stepPerTime);

            if (lastStep != step) {
              freq = step % this.params.beat == 0?
                this.params.freq * 2 : this.params.freq;
              vol = this.params.vol;
              gateT = t + clickGateTime;
              lastStep = step;
            } else if (vol > 0 && t > gateT) {
              vol = 0;
            }

            chData[i] = vol * wave(2 * Math.PI * freq * t);
            t += dt;
          }

        }.bind(this);

        var _this = this;
        this.$emit('start', {
          getTimestamp: function() { return t; },
          getBeat: function() { return _this.params.beat; },
          getTempo: function() { return _this.params.tempo; }
        });

      } else if (type == 'stop') {
        this.$emit('stop');
      }
    }.bind(this);
    this.player = player;
  },
  computed: {
    params: function() {
      var beat = this.beat;
      var tempo =  this.tempo;
      var mute = this.mute;
      var freq = 440 * Math.exp(/* E note */ 7 / 12 * Math.log(2) );
      var vol = mute? 0 : Math.exp(this.gain / 20 * Math.log(10) );
      var stepPerTime = tempo / 60;
      return {
        beat: beat, tempo: tempo, freq: freq, vol: vol,
        stepPerTime: stepPerTime
      };
    }
  },
  methods: {
    start: function() {
      this.player.start();
    },
    stop: function() {
      this.player.stop();
    }
  }
}
</script>
