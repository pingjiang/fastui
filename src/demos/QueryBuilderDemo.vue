<template>
<div class="demo">
  <QueryBuilder :fields="fields" v-model="model"></QueryBuilder>

  <code>
    <pre>{{ exporter.stringify(model) }}</pre>
  </code>
</div>
</template>

<script>
const fields = [
  { name: 'firstName', title: 'First Name', type: 'string' },
  { name: 'lastName', title: 'Last Name', type: 'string' },
  {
    name: 'age',
    title: 'Age',
    type: 'number',
    control: 'select',
    controlOptions: { options: [20, 21].map(v => ({ value: v, title: v })) },
  },
  {
    name: 'address',
    title: 'Address',
    control: 'address',
    controlOptions: { dataSource: '' },
  },
  { name: 'phone', title: 'Phone', validator: 'phone' },
  { name: 'email', title: 'Email', validator: 'email' },
  {
    name: 'birthday',
    title: 'Birthday',
    type: 'date',
    controlOptions: { format: 'YYYY/MM/DD' },
  },
  { name: 'isDev', title: 'Is a Developer?', value: false },
];

const exporter = {
  stringify(query) {
    if (!query.condition) {
      return `( ${query.field} ${query.operator} '${query.value}' )`;
    }

    const next = query.rules && query.rules.length ?
      query.rules.map(v => exporter.stringify(v)) : [];

    return [
      '(',
      query.condition,
      ...next,
      ')',
    ].join(' ');
  },
};

export default {
  data() {
    return {
      exporter,
      fields,
      model: {
        condition: 'and',
        rules: [
          {
            field: 'firstName',
            operator: 'equal',
            value: 'fda',
          },
          {
            condition: 'and',
            rules: [
              {
                field: 'lastName',
                operator: 'equal',
                value: 'fdafda',
              },
              {
                condition: 'and',
                rules: [
                  {
                    field: 'birthday',
                    operator: 'equal',
                    value: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
};
</script>
