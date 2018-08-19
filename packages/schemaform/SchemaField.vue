<template>
<div class="fui-schemafield">
  <div class="fui-schemafield-label" @click="hide = !hide">
    <span>{{ field.title || field.key }}</span>

    <div class="fui-schemafield-buttons">
      <Button v-if="field.type === 'array'" :size="size" icon="ios-add" type="text" @click.stop.prevent="addChild"></Button>
    </div>
  </div>
  <div class="fui-schemafield-value" v-show="!hide">
    <SchemaForm v-if="field.type === 'object'"
      :size="size" :title="field.title || field.key"
      :schema="field.properties"
      :value="value"
      @remove="handleRemove"
      @input="handleChange($event)"></SchemaForm>
    <div class="fui-schemafield-list" v-else-if="field.type === 'array'">
      <div class="fui-schemafield-listitem" v-for="(item, j) in (value || [])" :key="j">
        <div class="fui-schemafield-listitem-header">
          <span>#{{ j }}</span>
          <div class="fui-schemafield-listitem-buttons">
            <Button :size="size" icon="ios-close" type="text" class="error" @click.stop.prevent="handleRemove(j)"></Button>
          </div>
        </div>
        
        <component :is="Array.isArray(field.items) ? 'SchemaForm' : 'SchemaField'"
          :size="size" :title="'[' + j + ']'"
          :schema="field.items"
          :field="{ title: '[' + j + ']', type: field.items }"
          :value="getValue(j)"
          @input="handleChange($event, j)"></component>
      </div>
    </div>
    <FieldValue v-else
      :size="size" :field="field" :value="value"
      @input="handleChange($event)"></FieldValue>
  </div>
</div>
</template>

<script>
import cloneDeep from 'lodash/fp/cloneDeep';
import FieldValue from './FieldValue.vue';

function generateChild(items, refs) {
  if (refs && refs[0] != null) {
    return cloneDeep(refs[0]);
  }

  if (Array.isArray(items)) {
    const ret = {};

    items.forEach(item => ret[item.key] = null);

    return ret;
  }

  return '';
}

// TODO(pj) support custom component type
export default {
  name: 'SchemaField',
  components: {
    FieldValue,
  },
  props: {
    size: String,
    field: Object,
    value: [String, Number, Date, Boolean, Object, Array],
  },

  data() {
    return {
      hide: false,
    };
  },

  methods: {
    getValue(arrayIndex) {
      return this.value && arrayIndex != null && arrayIndex > -1 ? this.value[arrayIndex] : null;
    },
    handleChange(value, arrayIndex) {
      console.log('change value', value, arrayIndex);
      let next = value;

      if (next != null && arrayIndex != null && arrayIndex > -1) {
        next = this.value;
        next = next.slice(0);
        next[arrayIndex] = value;
      }

      this.changeValue(next);
    },
    handleRemove(arrayIndex) {
      if (this.value == null) {
        return;
      }

      if (arrayIndex != null && arrayIndex > -1) {
        const next = this.value.slice(0);
        next.splice(arrayIndex, 1);
        this.changeValue(next);
      } else {
        this.$emit('remove');
      }
    },
    changeValue(next) {
      this.$emit('input', next);
    },
    addChild() {
      const next = this.value.slice(0);
      next.push(generateChild(this.field.items, this.value));
      this.changeValue(next);
    },
  },
};
</script>

<style lang="less">
.fui-schemafield {
  &-label {
    display: flex;
    align-items: center;
    padding: 4px;
    background-color: #eee;
    span {
      flex: 1;
      font-weight: bold;
    }
  }

  &-buttons {
    .ivu-btn {
      padding: 0;
      font-size: 18px;
      line-height: 1;

      & > .ivu-icon {
        line-height: 1;
      }
    }
  }

  &-value {
    padding: 4px 0;
  }

  &-listitem {
    &-header {
      display: flex;
      align-items: center;
      padding: 4px;
      margin-bottom: 4px;
      margin-left: 5px;
      background-color: #f0f0f0;

      & > span {
        flex: 1 1 auto;
      }
    }

    &-header &-buttons {
      .ivu-btn {
        padding: 0;
        font-size: 18px;
        line-height: 1;

        & > .ivu-icon {
          line-height: 1;
        }
      }
    }
  }
}
</style>
