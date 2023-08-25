const serverSchema = require('./models/serverData.js');

module.exports = async function handleServerData(interaction) {
    let serverData = await serverSchema.findOne({ serverID: interaction.guild.id });

    if (!serverData) {
        new serverSchema({
            serverID: interaction.guild.id,
            serverName: interaction.guild.name,
        }).save();
    }
    // Apply version changes
    if (serverData.dataVersion < serverSchema.schema.obj.dataVersion.default) {


        serverData.dataVersion = serverSchema.schema.obj.dataVersion.default;
        serverData.save();
    }
}