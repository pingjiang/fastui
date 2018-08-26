<template>
<div class="videoplayer">
  <video class="video-js" :src="src" ref="video"></video>
</div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

const DEFAULT_EVENTS = [
  'loadeddata',
  'canplay',
  'canplaythrough',
  'play',
  'pause',
  'waiting',
  'playing',
  'ended',
  'error',
  'timeupdate',
  'ready',
  'durationchange',
];

const DEFAULTS = {
  children: [
    'controlBar',
  ],
  controlBar: {
    children: [
      'playToggle',
      'timeDivider',
      'currentTimeDisplay',
      'progressControl',
      'durationDisplay',
      'volumePanel',
      'remainingTimeDisplay',
      'customControlSpacer',
      'playbackRateMenuButton',
      'fullscreenToggle',
    ],
    durationDisplay: true,
    currentTimeDisplay: true,
  },
  techOrder: ['html5'],
  plugins: {},
};

export default {
  name: 'VideoPlayer',
  props: {
    src: String,
    currentTime: {
      type: Number,
      default: 0,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
    muted: {
      type: Boolean,
      default: false,
    },
    poster: String,
    preload: {
      type: String,
      default: 'auto', // auto, metadata, none
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    playbackRates: {
      type: Array,
      default: () => [0.5, 1, 1.5, 2],
    },
    language: {
      type: String,
      default: 'zh',
    },
  },
  data() {
    return {
      isReady: false,
    };
  },
  watch: {
    src(val) {
      console.log('src changed', val);

      if (this._player) {
        this._player.src(val);
      } else {
        console.warn('player is not ready', val);
      }
    },
    currentTime(val) {
      console.log('seek to time', val);

      if (this._player) {
        this._player.currentTime(val);
      } else {
        console.warn('player is not ready', val);
      }
    },
  },
  mounted() {
    this.initialize();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    getPlayer() {
      return this._player;
    },
    initialize() {
      if (this._player) {
        return;
      }

      const options = Object.assign({}, DEFAULTS, this.$props);

      console.log('options', options);

      this._player = videojs(this.$refs.video, options, () => this.isReady = true);
      this._player.src(options.src);
      this._player.currentTime(options.currentTime);
      
      DEFAULT_EVENTS.forEach(eventName => {
        this._player.on(eventName, e => this.$emit(eventName, e));
      });
    },
    dispose() {
      if (this._player) {
        this._player.dispose();
      }
    },
  },
};
</script>

<style lang="less">
.videoplayer {
  width: 100%;
  height: 100%;

  & > div {
    width: 100%;
    height: 100%;
  }
} 
</style>
