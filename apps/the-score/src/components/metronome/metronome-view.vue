<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       width="78" height="32" viewBox="0 0 220 90" style="overflow: hidden; background-color: white">
    <clipPath id="dspFrm">
      <rect fill="#000" stroke="none" x="2" y="2" width="216" height="86"></rect>
    </clipPath>
    <rect fill="#33BBA0" stroke="none" opacity="0.2" x="0" y="0" width="220" height="90" rx="8" ry="8"></rect>
    <g clip-path="url(#dspFrm)">
      <circle ref="lPoint" fill="#33BBA0" stroke="none" :opacity="lOp" :cx="pHGap" :cy="pVGap" :r="pRadius"></circle>
      <circle ref="rPoint" fill="#33BBA0" stroke="none" :opacity="rOp" :cx="220 - pHGap" :cy="pVGap"
              :r="pRadius"></circle>
      <g v-for="(bar, index) in bars" :transform="bar.tran" :key="index">
        <path ref="barArr" fill="#33BBA0" stroke="none" :opacity="bar.op"
              d="M-0.5 -18L-5 -84L0 -88L5 -84L0.5 -18Z"></path>
      </g>
      <circle ref="barAx" fill="#33BBA0" stroke="none" :opacity="cOp" cx="110" cy="90" r="12"></circle>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    intf: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      pHGap: 24, pVGap: 22, pRadius: 18,
      active: false, cOp: '0', lOp: '0', rOp: '0', bars: []
    }
  },
  mounted() {
    var activeOpacity = '1';
    var defaultOpacity = '0.02';

    this.cOp = this.lOp = this.rOp = defaultOpacity;

    var bars = [];
    !function() {
      var l = 5;
      for (var i = -l; i <= l; i += 1) {
        bars.push({
          n: i,
          tran: 'translate(110 95) rotate(' +
            ( (i + Math.sin(i * 0.06) ) * 8.5) + ')',
          op: defaultOpacity
        });
      }
    }();
    this.bars = bars;

    var beat, tempo;

    var frmT0 = 0, lastTs = 0, t, ts;
    var tranT, i, op;
    var cOp, lOp, rOp;
    var intf, bi0, bi1;
    var _barsLen = bars.length;
    var _2barsLen = _barsLen * 2;

    var onframe = function(frmT) {

      if (this.intf) {

        intf = this.intf;
        ts = intf.getTimestamp();
        beat = intf.getBeat();
        tempo = intf.getTempo();

        if (lastTs != ts) {
          frmT0 = frmT;
          lastTs = ts;
        }

        t =  ts + (frmT - frmT0) / 1000;
        tranT = (t * tempo / 120 + 0.75) % 1;

        cOp = activeOpacity;
        if (tranT < 0.5) {
          lOp = activeOpacity;
          rOp = defaultOpacity;
        } else {
          lOp = defaultOpacity;
          rOp = activeOpacity;
        }

        if (this.cOp !== cOp) this.cOp = cOp;
        if (this.lOp !== lOp) this.lOp = lOp;
        if (this.rOp !== rOp) this.rOp = rOp;

        bi0 = Math.floor(tranT * _2barsLen);
        bi1 = (bi0 + _2barsLen - 1) % _2barsLen;
        bi0 = bi0 >= _barsLen? _2barsLen - 1  - bi0 : bi0;
        bi1 = bi1 >= _barsLen? _2barsLen - 1  - bi1 : bi1;

        for (i = 0; i < _barsLen; i += 1) {
          op = (i == bi0 || i == bi1)? activeOpacity : defaultOpacity;
          if (bars[i].op !== op) {
            bars[i].op = op;
          };
        }

      } else {
        this.cOp = this.lOp = this.rOp = defaultOpacity;
        for (i = 0; i < bars.length; i += 1) {
          bars[i].op = defaultOpacity;
        }
      }

      if (this.active) {
        window.requestAnimationFrame(onframe);
      }
    }.bind(this);

    this.active = true;
    window.requestAnimationFrame(onframe);
  },
  beforeDestroy: function() {
    this.active = false;
  }
}
</script>

<style>
  .ghforkme {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  HEADER {
    margin-bottom: 0.5rem;
  }

  FOOTER {
    text-align: right;
  }

  LABEL, BUTTON {
    font-size: 1.2rem;
    margin: 0.2rem;
    white-space: nowrap;
  }

  .play-button {
    width: 8rem;
  }

  [v-cloak] {
    display: none;
  }
</style>
