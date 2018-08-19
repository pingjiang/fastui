<template>
<div class="fui-schemaform">
  <div class="fui-schemaform-fields" v-if="schema && schema.length">
    <SchemaField v-for="(field, i) in schema" :key="i" :field="field"
      :size="size" :value="getValue(field)"
      @remove="handleRemove(field)"
      @input="handleFieldChange(field.key, $event)"></SchemaField>
  </div>
</div>
</template>

<script>
import SchemaField from './SchemaField.vue';

export default {
  name: 'SchemaForm',
  components: {
    SchemaField,
  },
  props: {
    size: {
      type: String,
      default: 'small',
    },
    // keypathPrefix: {
    //   type: String,
    //   default: '',
    // },
    arrayIndex: {
      type: Number,
      default: -1,
    },
    title: String,
    schema: Array,
    value: [Object, Array],
  },
  methods: {
    // getKeypathPrefix(field, arrayIndex) {
    //   const next = `${this.keypathPrefix}.${field.key}`;

    //   if (arrayIndex != null && arrayIndex > -1) {
    //     return `${next}[${arrayIndex}]`;
    //   }

    //   return next;
    // },
    getValue(field, arrayIndex) {
      if (!this.value) {
        return null;
      }

      const next = this.value[field.key];

      if (next != null && arrayIndex != null && arrayIndex > -1) {
        return next[arrayIndex];
      }

      return next;
    },
    handleFieldChange(key, value) {
      console.log('change', key, value);
      const next = Object.assign({}, this.value, {
        [key]: value,
      });

      this.$emit('input', next);
    },
    handleRemove(field) {
      if (this.value) {
        const next = Object.assign({}, this.value);
        delete next[field.key];
        this.$emit('input', next);
      }
    },
  },
};
</script>

<style lang="less">
.fui-schemaform {
  &-fields {
    margin-left: 10px;
  }
}
</style>
