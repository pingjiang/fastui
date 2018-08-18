<template>
<div class="fui-querybuilder-rule">
  <Select :size="size" class="fui-querybuilder-rule-field" :value="value.field" @on-change="handleChange('field', $event)">
    <Option :value="field.name" v-for="field in fields" :key="field.name">{{ field.title }}</Option>
  </Select>

  <Select :size="size" class="fui-querybuilder-rule-operator" :value="value.operator" @on-change="handleChange('operator', $event)">
    <Option :value="op.key" v-for="op in operators" :key="op.key">{{ op.title }}</Option>
  </Select>

  <ValueBuilder :size="size" class="fui-querybuilder-rule-value" :field="field" :value="value.value" @input="handleChange('value', $event)"></ValueBuilder>

  <Button :size="size" type="text" icon="ios-close" class="fui-querybuilder-btn-icon error" @click="handleRemove"></Button>
</div>
</template>

<script>
import ValueBuilder from './ValueBuilder.vue';
import { getOperators } from './constants';

export default {
  name: 'QueryBuilderRule',
  components: {
    ValueBuilder,
  },
  props: {
    size: String,
    fields: Array,
    value: Object,
  },
  computed: {
    field() {
      const fieldName = this.value.field;
      return this.fields.find(v => v.name === fieldName) || {
        type: 'string',
      };
    },
    operators() {
      const { type, operators } = this.field;
      return operators || getOperators(type);
    },
  },
  methods: {
    handleChange(key, value) {
      const next = Object.assign(this.value, {
        [key]: value,
      });

      this.$emit('input', next);
    },
    handleRemove() {
      this.$emit('remove');
    },
  },
};
</script>

<style lang="less">
.fui-querybuilder-rule {
  display: flex;
  position: relative;
  margin: 4px 0;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid #eee;
  background: rgba(255,255,255,.9);

  &-field,
  &-operator {
    flex: 0 0 200px;
    margin-right: 10px;
  }

  &-value {
    flex: 1;
    margin-right: 10px;
  }
}
</style>
