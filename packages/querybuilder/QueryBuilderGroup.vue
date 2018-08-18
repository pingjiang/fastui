<template>
<div class="fui-querybuilder-group">
  <div class="fui-querybuilder-group-header">
    <RadioGroup :size="size" :value="value.condition" type="button"
      @on-change="handleChange('condition', $event)">
      <Radio v-for="op in conditionOperators" :key="op.name" :label="op.name">{{ op.label }}</Radio>
    </RadioGroup>

    <ButtonGroup :size="size" class="fui-querybuilder-buttons">
      <Button icon="ios-add" type="primary" @click="handleAddRule">Add Rule</Button>
      <Button icon="ios-add-circle-outline" type="primary" @click="handleAddGroup">Add Group</Button>
    </ButtonGroup>
  </div>

  <div class="fui-querybuilder-rules">
    <component :is="rule.condition ? 'QueryBuilderGroup' : 'QueryBuilderRule'"
      v-for="(rule, i) in value.rules" :key="i"
      :size="size" :fields="fields" :value="rule"
      @input="handleChange('rules', $event, i)" @remove="handleRemove(i)">
    </component>
  </div>
</div>
</template>

<script>
import QueryBuilderRule from './QueryBuilderRule.vue';
import { CONDITION_OPERATORS } from './constants';

export default {
  name: 'QueryBuilderGroup',

  components: {
    QueryBuilderRule,
  },

  props: {
    size: {
      type: String,
      default: 'small',
    },
    conditionOperators: {
      type: Array,
      default: () => CONDITION_OPERATORS,
    },
    fields: Array,
    value: Object,
  },

  methods: {
    handleChange(key, value, ruleIndex) {
      const next = Object.assign({}, this.value);

      if (key === 'rules') {
        if (next.rules && next.rules[ruleIndex]) {
          next.rules = next.rules.slice(0);

          next.rules[ruleIndex] = value;
        }
      } else {
        next[key] = value;
      }

      this.$emit('input', next);
    },
    handleAdd(item) {
      const next = Object.assign({}, this.value);

      if (!next.rules) {
        next.rules = [];
      }

      next.rules.push(item);

      this.$emit('input', next);
    },
    handleAddRule() {
      this.handleAdd({
        field: null,
        operator: null,
        value: null,
      });
    },
    handleAddGroup() {
      this.handleAdd({
        condition: 'and',
        rules: [],
      });
    },
    handleRemove(i) {
      const next = Object.assign({}, this.value);

      if (next && next.rules && next.rules[i]) {
        next.rules.splice(i, 1);
      }

      this.$emit('input', next);
    },
  },
};
</script>

<style lang="less">
.fui-querybuilder {
  &-buttons {
    float: right;
  }

  &-btn-icon {
    padding: 0;

    &.error {
      color: red;
    }

    .ivu-icon {
      font-size: 14px;
      line-height: 1;
    }
  }
  &-group {
    position: relative;
    margin: 4px 0;
    border-radius: 5px;
    padding: 10px;
    padding-bottom: 6px;
    border: 1px solid #dcc896;
    background: rgba(250,240,210,.5);
  }

  &-group-header {
    margin-bottom: 10px;
    clear: right;
  }

  &-rules {
    padding-left: 15px;
  }

  &-rules > &-rule,
  &-rules > &-group {
    &::before,
    &::after {
      content: '';
      position: absolute;
      left: -10px;
      width: 10px;
      height: calc(50% + 12px);
      border-color: #ccc;
      border-style: solid;
    }

    &::before {
      top: -4px;
      border-width: 0 0 2px 2px;
    }

    &::after {
      top: 50%;
      border-width: 0 0 0 2px;
    }

    &:first-child::before {
      top: -12px;
      height: calc(50% + 12px);
    }

    &:last-child::before {
      border-radius: 0 0 0 4px;
    }

    &:last-child::after {
      display: none;
    }
  }
}
</style>
