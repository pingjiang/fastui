<template>
<div class="demo">
  <Row :gutter="10">
    <Col :span="20">
      <code>
        <pre>{{ JSON.stringify(model, null, '  ') }}</pre>
      </code>
    </Col>
    <Col :span="4">
      <SchemaForm title="tags" :schema="schema" v-model="model" class="fill-height"></SchemaForm>
    </Col>
  </Row>
</div>
</template>

<script>
const schema = [
  {
    key: 'background',
    title: '全局属性',
    type: 'object',
    properties: [
      {
        key: 'color',
        type: 'string',
        control: 'ColorPicker',
        title: '颜色',
      },
      {
        key: 'size',
        type: 'value',
        control: 'Size',
        title: '大小',
      },
    ],
  },
  {
    key: 'objects',
    title: '对象',
    type: 'array',
    items: [
      {
        key: 'location',
        type: 'value',
        control: 'Rectangle',
        title: '位置',
      },
      {
        key: 'keypoints',
        type: 'value',
        control: 'NamedPoints',
        title: '关键点',
      },
    ],
  },
];

const model = {
  background: {
    color: '#ff0000',
    size: {
      width: 1,
      height: 2,
    },
  },
  objects: [
    {
      location: { x: 10, y: 10, width: 100, height: 100 },
      keypoints: {
        head: { x: 10, y: 10, show: true },
        neck: { x: 10, y: 20, show: true },
      },
    },
  ],
};

export default {
  data() {
    return {
      schema, // : s1,
      model, // : m1,
    };
  },
};
</script>

<style lang="less">
.demo {
  height: 100vh;
}

.fill-height {
  height: 100%;
  max-height: 100vh;
  overflow: auto;
}
</style>
