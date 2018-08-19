<template>
<div class="fui-fieldvalue">
  <Select :size="size" v-if="field && field.control === 'select'" :value="value" @on-change="handleChange">
    <Option :value="option.value" v-for="option in getOptions(field)" :key="option.value">{{ option.title }}</Option>
  </Select>
  <DatePicker :size="size" v-else-if="field && field.control === 'date'" :value="value" @on-change="handleChange"></DatePicker>
  <i-switch :size="size" v-else-if="field && field.control === 'boolean'" :value="value" @on-change="handleChange"></i-switch>
  <component :is="field.control" :size="size" v-else-if="field && isSupportedControl(field.control)" :value="value" @input="handleChange"></component>
  <Input :size="size" v-else :value="strValue" @on-change="handleChange($event.target.value)"></Input>
</div>
</template>

<script>
import Rectangle from './controls/Rectangle.vue';
import NamedPoints from './controls/NamedPoints.vue';
import Size from './controls/Size.vue';
import ColorPicker from './controls/ColorPicker.vue';

const SUPPORTED_CONTROLS = [Rectangle.name, NamedPoints.name, Size.name, ColorPicker.name];

// TODO(pj) support custom component type
export default {
  name: 'FieldValue',
  components: {
    Rectangle,
    NamedPoints,
    Size,
    ColorPicker,
  },
  props: {
    size: String,
    field: Object,
    value: [String, Number, Date, Boolean, Object, Array],
  },

  computed: {
    strValue() {
      const value = this.value;
      return value != null && typeof value !== 'string' ? JSON.stringify(value) : value;
    },
  },

  methods: {
    isSupportedControl(control) {
      return control && SUPPORTED_CONTROLS.includes(control);
    },
    getOptions(field) {
      if (field && field.controlOptions && field.controlOptions.options) {
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
