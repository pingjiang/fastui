<template>
<div class="control control-namedpoints">
  <div class="control-namedpoints-point" v-for="point in points" :key="point.name">
    <span class="control-namedpoints-point-name">{{ point.title }}</span>
    <Input placeholder="X" :size="size" :value="point.x" @on-change="handleChange(point.name, 'x', $event.target.value)"/>
    <Input placeholder="Y" :size="size" :value="point.y" @on-change="handleChange(point.name, 'y', $event.target.value)"/>

    <i-switch :size="size"></i-switch>
  </div>
</div>
</template>

<script>
export default {
  name: 'NamedPoints',
  props: {
    size: {
      type: String,
      default: 'small',
    },
    value: Object,
    names: {
      type: Array,
      default: () => ([{
        name: 'head',
        title: '头',
      }, {
        name: 'neck',
        title: '脖子',
      }]),
    },
  },
  computed: {
    points() {
      const { value, names } = this;

      return names.map(v => ({
        ...v,
        ...(value ? value[v.name] : null),
      }));
    },
  },
  methods: {
    handleChange(name, key, value) {
      if (isNaN(value)) {
        return;
      }

      const next = Object.assign({}, this.value);
      const point = next[name];

      next[name] = Object.assign({}, point, {
        [key]: Number(value),
      });

      this.$emit('input', next);
    },
  },
};
</script>

<style lang="less">
.control-namedpoints {
  .ivu-input-wrapper {
    width: 5em;
    margin-right: 4px;
  }

  &-point {
    margin-bottom: 4px;
    display: flex;
    align-items: center;

    &-name {
      flex: 1 1 auto;
    }
  }
}
</style>
