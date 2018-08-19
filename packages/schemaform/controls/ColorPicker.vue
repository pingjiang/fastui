<template>
<Poptip trigger="click">
  <div class="control control-colorpicker">
    <div class="control-colorpicker-dot" :style="{ 'background-color': colorValue }"></div>
    <Input placeholder="#ffffff" :size="size" :value="value" @on-change="handleChange($event.target.value)"/>
  </div>
  
  <ChromePicker slot="content" :value="colorValue" @input="handleChange($event.hex)"></ChromePicker>
</Poptip>
</template>

<script>
import { Chrome } from 'vue-color';

export default {
  name: 'ColorPicker',
  components: {
    ChromePicker: Chrome,
  },
  props: {
    size: {
      type: String,
      default: 'small',
    },
    value: String,
  },
  computed: {
    colorValue() {
      return this.value && /^#[0-9a-f]{6}$/i.test(this.value) ? this.value : '#ffffff';
    },
  },
  methods: {
    handleChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="less">
.control-colorpicker {
  display: flex;
  align-items: center;

  &-dot {
    flex: 0 0 auto;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .ivu-input-wrapper {
    flex: 1 1 auto;
  }
}
</style>
