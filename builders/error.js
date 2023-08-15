const ut = require('../util/utilitrigam.js');
const embedConfig = require('../config/embeds.js');

module.exports = {
    buildEmbedMsg: function(error) {
        return {
            embeds: [{
                title: embedConfig.titles.error,
                color: embedConfig.colors.error,
                description: `${error.description}\n\`${error.value}\``,
                footer: { text: ut.randomElem(embedConfig.footers.error) }
            }]
        }
    }
}