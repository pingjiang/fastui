<template>
<div class="control control-rectangle">
  <Input placeholder="X" :size="size" :value="x" @on-change="handleChange('x', $event.target.value)"/>
  <Input placeholder="Y" :size="size" :value="y" @on-change="handleChange('y', $event.target.value)"/>
  <Input placeholder="Width" :size="size" :value="width" @on-change="handleChange('width', $event.target.value)"/>
  <Input placeholder="Height" :size="size" :value="height" @on-change="handleChange('height', $event.target.value)"/>
</div>
</template>

<script>
export default {
  name: 'Rectangle',
  props: {
    size: {
      type: String,
      default: 'small',
    },
    value: Object,
  },
  computed: {
    x() {
      return this.value ? this.value.x : null;
    },
    y() {
      return this.value ? this.value.y : null;
    },
    width() {
      return this.value ? this.value.width : null;
    },
    height() {
      return this.value ? this.value.height : null;
    },
  },
  methods: {
    handleChange(key, value) {
      if (isNaN(value)) {
        return;
      }

      const next = Object.assign({}, this.value, {
        [key]: Number(value),
      });

      this.$emit('input', next);
    },
  },
};
</script>

<style lang="less">
.control-rectangle {
  .ivu-input-wrapper {
    width: 5em;
    margin-right: 4px;
  }
}
</style>
