<template>
<div class="fui-valuebuilder">
  <Select :size="size" v-if="field.control === 'select'" :value="value" @on-change="handleChange">
    <Option :value="option.value" v-for="option in getOptions(field)" :key="option.value">{{ option.title }}</Option>
  </Select>
  <DatePicker :size="size" v-else-if="field.control === 'date'" :value="value" @on-change="handleChange"></DatePicker>
  <i-switch :size="size" v-else-if="field.control === 'boolean'" :value="value" @on-change="handleChange"></i-switch>
  <Input :size="size" v-else :value="value" @on-change="handleChange($event.target.value)"></Input>
</div>
</template>

<script>
// TODO(pj) support custom component type
export default {
  name: 'ValueBuilder',
  props: {
    size: String,
    field: Object,
    value: [String, Number, Date, Boolean, Object],
  },

  methods: {
    getOptions(field) {
      if (field.controlOptions && field.controlOptions.options) {
        return field.controlOptions.options;
      }

      return [];
    },
    handleChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>
