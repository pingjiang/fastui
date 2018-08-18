import QueryBuilderGroup from './QueryBuilderGroup.vue';

export function install(Vue) {
  Vue.component(QueryBuilderGroup.name, QueryBuilderGroup);
  Vue.component('QueryBuilder', QueryBuilderGroup);
}

export default QueryBuilderGroup;
