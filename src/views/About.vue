<template>
  <div class="about">
    <ImageSegmentor src="/images/test.png"></ImageSegmentor>
  </div>
</template>

<script>
import ImageSegmentor from '../components/ImageSegmentor.vue';

export default {
  components: {
    ImageSegmentor,
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
