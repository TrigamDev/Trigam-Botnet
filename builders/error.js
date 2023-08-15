const ut = require('../util/utilitrigam.js');
const embedConfig = require('../config/embeds.js');

module.exports = {
    buildEmbedMsg: function(error) {
        return {
            embeds: [{
                title: embedConfig.titles.error,
                color: ut.hexStrToNum(embedConfig.colors.error),
                description: `${error.description}\n${error.value}}`,
                footer: ut.randomElem(embedConfig.footers.error)
            }]
        }
    }
}