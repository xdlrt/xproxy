const redirectToMatchingRule = (details) => {
  console.log(details);
  return {};
};

window.onBeforeRequestCallback = (details) => redirectToMatchingRule(details);