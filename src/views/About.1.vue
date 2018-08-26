<template>
  <div class="about">
    <select v-model="video">
      <option value="/videos/oceans.mp4">/videos/oceans.mp4</option>
      <option value="/videos/anan.mp4">/videos/anan.mp4</option>
    </select>

    <div class="mark-container">
      <VideoPlayer ref="player" poster="/videos/oceans.png" :currentTime="currentTime" :src="video" @durationchange="handleDurationChange" @timeupdate="handleUpdate"></VideoPlayer>
    </div>

    <VideoPlayerControl :duration="duration" v-model="currentTime"></VideoPlayerControl>
  </div>
</template>

<script>
import VideoPlayer from '../components/VideoPlayer.vue';
import VideoPlayerControl from '../components/VideoPlayerControl.vue';

export default {
  components: {
    VideoPlayer,
    VideoPlayerControl,
  },
  data() {
    return {
      video: '/videos/anan.mp4',
      duration: 0,
      currentTime: 0,
    };
  },
  methods: {
    handleDurationChange() {
      this.duration = this.$refs.player.getPlayer().duration();
    },
    handleUpdate() {
      this.currentTime = this.$refs.player.getPlayer().currentTime();
    },
  },
};
</script>

<style lang="less">
.mark-container {
  width: 80%;
  height: calc(100vh - 150px);
  margin: 10px auto;
}
</style>
