<template>
<div class="control control-rectangle">
  <Input placeholder="Width" :size="size" :value="width" @on-change="handleChange('width', $event.target.value)"/>
  <Input placeholder="Height" :size="size" :value="height" @on-change="handleChange('height', $event.target.value)"/>
</div>
</template>

<script>
export default {
  name: 'Size',
  props: {
    size: {
      type: String,
      default: 'small',
    },
    value: Object,
  },
  computed: {
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
