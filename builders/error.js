const ut = require('../util/utilitrigam.js');
const embedConfig = require('../config/embeds.js');
const errors = require('../config/errors.js');

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
    },
    buildMsg: function(error) {
        return {
            content: `## ERROR\n${error.description}\n\`${error.value}\``
        }
    },

    // Getters
    getErrorByCode: function (errorCode) {
        for (let error in errors) {
            if (errors[error].code === errorCode) {
                return errors[error];
            }
        }
    }
}