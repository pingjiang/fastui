<template>
<div class="image-segmentor">
  <div class="image-segmentor-list">
    <div class="image-segmentor-list-item" v-for="(item, i) in names" :key="i"
      :style="{ color: item.color, 'background-color': item.bgcolor }"
      :class="{ selected: selectedIndex === i }"
      @click="selectedIndex = i">{{ item.name }}</div>
  </div>
  <div class="image-segmentor-content">
    <div class="image-segmentor-canvas" :style="{ width: width + 'px', height: height + 'px' }">
      <img ref="image" :src="src" @load="handleImageLoad"/>
      <DrawCanvas ref="drawLayer" :width="width" :height="height" :mode="mode" :lineWidth="lineWidth" :strokeStyle="strokeStyle"></DrawCanvas>
    </div>
  </div>

  <div class="image-segmentor-toolbar">
    <select v-model="mode">
      <option value="brush">brush</option>
      <option value="eraser">eraser</option>
    </select>

    <input type="range" v-model="lineWidth"/>
  </div>
  
</div>
</template>

<script>
import { generateColors } from '../utils/segment_utils';
import DrawCanvas from './DrawCanvas.vue';

export default {
  name: 'ImageSegmentor',
  components: {
    DrawCanvas,
  },
  props: {
    src: String,
  },
  data() {
    return {
      names: generateColors(),
      selectedIndex: 0,
      mode: 'brush',
      lineWidth: 20,
      width: 800,
      height: 500,
    };
  },
  computed: {
    strokeStyle() {
      const { names, selectedIndex } = this;
      return names[selectedIndex].bgcolor;
    },
  },
  methods: {
    handleImageLoad(e) {
      this.width = e.target.naturalWidth;
      this.height = e.target.naturalHeight;
    },
  },
};
</script>

<style lang="less">
.image-segmentor {
  display: flex;
  align-self: stretch;
  width: 100%;
  height: 100vh;

  &-toolbar {
    position: fixed;
    right: 10px;
    top: 10px;
    background-color: #fff;
  }

  &-list {
    flex: 0 0 200px;
  }

  &-content {
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
  }

  &-canvas {
    position: relative;

    img,
    canvas {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  &-hidden {
    display: none;
  }
}

.image-segmentor-segment {
  display: none;

  &.active {
    display: block;
  }
}

.image-segmentor-list-item {
  &.selected {
    font-weight: bold;
  }
}
</style>
