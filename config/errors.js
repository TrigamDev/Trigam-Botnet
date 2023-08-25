// Error code guide:
/*
    000 - Permission error
    100 - Bot misuse
    200 - Minor error
    300 - Critical error
    400 - Can't find something
    800 - Jokes/fake-outs
*/


module.exports = {
    //
    //  PERMISSION ERRORS
    //

    // Bot is on a dev build and the user isn't whitelisted
    noBotAccess: {
        name: "No bot access",
        description: "You don't have permission to use this bot!",
        code: "NO_BOT_ACCESS",
        value: "ERR_000"
    },
    placeNoImagePerms: {
        name: "No image perms",
        description: "I don't have permission to send images in this channel!",
        code: "PLACE_NO_IMAGE_PERMS",
        value: "ERR_001"
    },

    //
    //  BOT MISUSE
    //

    placeInvalidColor: {
        name: "Invalid color",
        description: "That's not a valid color!",
        code: "PLACE_INVALID_COLOR",
        value: "ERR_100"
    },

    //
    //  MINOR ERRORS
    //

    //
    //  CRITICAL ERRORS
    //
    missingCommandName: {
        name: "Missing command name",
        description: "Command is missing a name!",
        code: "COMMAND_LOADING_MISSING_NAME",
        value: "ERR_300"
    },
    missingCommandDescription: {
        name: "Missing command description",
        description: "Command is missing a description!",
        code: "COMMAND_LOADING_MISSING_DESCRIPTION",
        value: "ERR_301"
    },
    invalidCommandPermission: {
        name: "Invalid command permission",
        description: "Command has an invalid permission!",
        code: "COMMAND_LOADING_INVALID_PERMISSION",
        value: "ERR_302"
    },
    nonexistentCommand: {
        name: "Error running command",
        description: "There was an error running this command!",
        code: "COMMAND_DOESNT_EXIST",
        value: "ERR_303"
    },

    //
    //  CAN'T FIND SOMETHING
    //
    cantGetError: {
        name: "Can't get error",
        description: "I can't find that error!",
        code: "CANT_GET_ERROR",
        value: "ERR_400"
    },
    // Can't find character/quote from /quote
    cantFindCharacter: {
        name: "Can't find character",
        description: "I can't find that character!",
        code: "CANT_FIND_CHARACTER",
        value: "ERR_401"
    },
    cantFindUser: {
        name: "Can't find user",
        description: "I can't find that user!",
        code: "CANT_FIND_USER",
        value: "ERR_402"
    },
    cantFindWebhook: {
        name: "Can't find webhook",
        description: "I can't find that webhook!",
        code: "CANT_FIND_WEBHOOK",
        value: "ERR_403"
    },

    //
    //  JOKES/FAKE-OUTS
    //
    // Fake errors for /8ball
    cantComprehendQuestion: {
        name: "Can't comprehend question",
        description: "Your question cannot be comprehended",
        code: "CANT_COMPREHEND_QUESTION",
        value: "ERR_800"
    },
    cantFindAnswer: {
        name: "Can't find answer",
        description: "Answer not found",
        code: "CANT_FIND_ANSWER",
        value: "ERR_804"
    },
    cantReadProperty: {
        name: "Can't read property",
        description: "Cannot read property 'response' of yourGodAwfulQuestion",
        code: "CANT_READ_PROPERTY",
        value: "ERR_880"
    }
}