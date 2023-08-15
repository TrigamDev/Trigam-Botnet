// Error code guide:
/*
    000 - Permission error
    100 - Bot misuse
    200 - Minor error
    300 - Critical error
    400 - Can't find something
*/


module.exports = {
    //
    //  PERMISSION ERRORS
    //

    // Bot is on a dev build and the user isn't whitelisted
    noBotAccess: {
        name: "No Bot Access",
        description: "You don't have permission to use this bot!",
        code: "NO_BOT_ACCESS",
        value: "ERR_000"
    },

    //
    //  BOT MISUSE
    //

    //
    //  MINOR ERRORS
    //

    //
    //  CRITICAL ERRORS
    //
    missingCommandName: {
        name: "Missing Command Name",
        description: "Command is missing a name!",
        code: "COMMAND_LOADING_MISSING_NAME",
        value: "ERR_300"
    },
    missingCommandDescription: {
        name: "Missing Command Description",
        description: "Command is missing a description!",
        code: "COMMAND_LOADING_MISSING_DESCRIPTION",
        value: "ERR_301"
    },
    invalidCommandPermission: {
        name: "Invalid Command Permission",
        description: "Command has an invalid permission!",
        code: "COMMAND_LOADING_INVALID_PERMISSION",
        value: "ERR_302"
    },
    nonexistentCommand: {
        name: "Error Running Command",
        description: "There was an error running this command!",
        code: "COMMAND_DOESNT_EXIST",
        value: "ERR_303"
    },

    //
    //  CAN'T FIND SOMETHING
    //
    cantGetError: {
        name: "Can't Get Error",
        description: "I can't find that error!",
        code: "CANT_GET_ERROR",
        value: "ERR_400"
    }
}