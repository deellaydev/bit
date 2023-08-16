const { propertyOrdering, selectorOrdering } = require("stylelint-semantic-groups");

module.exports = {
  extends: "stylelint-config-standard-scss",
  plugins: ["stylelint-order"],
  rules: {
    "selector-class-pattern": null,
    "declaration-empty-line-before": null,
    "order/order": selectorOrdering,
    "order/properties-order": propertyOrdering,
  },
};
