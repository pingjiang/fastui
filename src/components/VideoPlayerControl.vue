<template>
  <div class="videoplayer-control">
    <Button type="text" :disabled="value === 0" icon="ios-skip-backward-outline" @click="seekTo(0)"></Button>
    <Button type="text" :disabled="value === 0" icon="ios-rewind-outline" @click="seekTo(value - fps)"></Button>
    <span class="videoplayer-control-value">{{ Math.round(value / fps) }} / {{ Math.round(duration / fps) }}</span>
    <Button type="text" :disabled="value === duration" icon="ios-fastforward-outline" @click="seekTo(value + fps)"></Button>
    <Button type="text" :disabled="value === duration" icon="ios-skip-forward-outline" @click="seekTo(duration)"></Button>

    <Rate :show-text="true" :count="10" v-model="rate" />
  </div>
</template>

<script>
export default {
  name: 'VideoPlayerControl',
  props: {
    duration: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    fps: {
      type: Number,
      default: 1/24,
    },
  },
  data() {
    return {
      rate: 3,
    };
  },
  methods: {
    seekTo(pos) {
      const { value, duration } = this;
      let next = pos;

      if (next < 0) {
        next = 0;
      } else if (next > duration) {
        next = duration;
      }

      if (next !== value) {
        this.$emit('input', next);
      }
    },
  },
};
</script>

<style lang="less">
.videoplayer-control {
  text-align: center;
  font-size: 30px;

  .ivu-rate {
    font-size: 30px;
  }

  .ivu-btn {
    padding: 0;
    margin-left: 10px;
    margin-right: 10px;

    .ivu-icon {
      font-size: 30px;
    }
  }
}
</style>
