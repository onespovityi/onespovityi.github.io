/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  rules: {
    // Классы CSS Modules пишем в camelCase: styles.nodeAccent.
    'selector-class-pattern': ['^[a-z][a-zA-Z0-9]*$', { message: (name) => `Класс «${name}» должен быть в camelCase` }],
    'keyframes-name-pattern': '^[a-z][a-zA-Z0-9-]*$',
    'import-notation': 'string',
  },
}
