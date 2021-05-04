var osmosis = require("osmosis");
osmosis.get('https://www.google.co.in/search?q=analytics')
    .find('#botstuff')
    .set({ 'related': ['.card-section .brs_col p a'] })
    .data(function (data) {
    console.log(data);
});
