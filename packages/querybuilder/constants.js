export const TYPES = ['string', 'number', 'boolean', 'date'];

export const OPERATORS = [
  {
    key: 'equal',
    title: '=',
  },
  {
    key: 'not_equal',
    title: '!=',
  },
  {
    key: 'is_null',
    title: 'is_null',
  },
  {
    key: 'is_not_null',
    title: 'is_not_null',
  },
  {
    key: 'less',
    title: '<',
    applyTo: ['number', 'date'],
  },
  {
    key: 'less_or_equal',
    title: '<=',
    applyTo: ['number', 'date'],
  },
  {
    key: 'greater',
    title: '>',
    applyTo: ['number', 'date'],
  },
  {
    key: 'greater_or_equal',
    title: '>=',
    applyTo: ['number', 'date'],
  },
  {
    key: 'between',
    title: 'between',
    applyTo: ['number', 'date'],
  },
  {
    key: 'not_between',
    title: 'not_between',
    applyTo: ['number', 'date'],
  },
  {
    key: 'in',
    title: 'in',
    applyTo: ['string'],
  },
  {
    key: 'not_in',
    title: 'not_in',
    applyTo: ['string'],
  },
  {
    key: 'contains',
    title: 'contains',
    applyTo: ['string'],
  },
  {
    key: 'not_contains',
    title: 'not_contains',
    applyTo: ['string'],
  },
  {
    key: 'begins_with',
    title: 'begins_with',
    applyTo: ['string'],
  },
  {
    key: 'not_begins_with',
    title: 'not_begins_with',
    applyTo: ['string'],
  },
  {
    key: 'ends_with',
    title: 'ends_with',
    applyTo: ['string'],
  },
  {
    key: 'not_ends_with',
    title: 'not_ends_with',
    applyTo: ['string'],
  },
  {
    key: 'is_empty',
    title: 'is_empty',
    applyTo: ['string'],
  },
  {
    key: 'is_not_empty',
    title: 'is_not_empty',
    applyTo: ['string'],
  },
];

export function getOperators(type) {
  return OPERATORS.filter(v => !v.applyTo || v.applyTo.includes(type));
}

export const CONDITION_OPERATORS = [
  { name: 'and', label: 'AND' },
  { name: 'or', label: 'OR' },
  { name: 'not', label: 'NOT' },
];
