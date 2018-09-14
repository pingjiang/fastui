<template>
  <div class="home">
    <div class="toolbar">
      Scale:
      <input type="range" min="1" max="20" v-model="scale"/>
      Color:
      <input type="color" v-model="color"/>

      <RadioGroup v-model="mode">
        <Radio label="brush">Brush</Radio>
        <Radio label="eraser">Eraser</Radio>
      </RadioGroup>
    </div>
    <div class="container">
      <PixelCanvas width="200" height="200" :scale="scale" :color="color"/>
    </div>
  </div>
</template>

<script>
import PixelCanvas from '../components/PixelCanvas.vue';

export default {
  components: {
    PixelCanvas,
  },
  data() {
    return {
      scale: 1,
      color: 'red',
      mode: 'brush',
    };
  },
};
</script>

<style lang="less">
.home {
  .container {
    width: 200px;
    height: 200px;
    border: 1px solid #ddd;
    overflow: auto;
  }
}
</style>
