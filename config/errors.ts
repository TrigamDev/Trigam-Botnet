// Error code guide:
/*
    000 - Permission error
    100 - Bot misuse
    200 - Minor error
    300 - Critical error
    400 - Can't find something
    800 - Jokes/fake-outs
*/

export default {
    //
    //  PERMISSION ERRORS - 000
    //

    noBotAccess: {
        name: "No Bot Access",
        description: "You don't have permission to use this bot!",
        code: "NO_BOT_ACCESS",
        value: "ERR_000"
    } as Error,

    commandDisabled: {
        name: "Command Disabled",
        description: "This command is disabled!",
        code: "COMMAND_DISABLED",
        value: "ERR_001"
    } as Error,

    noWebhookPerms: {
        name: "No Webhook Permissions",
        description: "I don't have permission to manage webhooks!",
        code: "NO_WEBHOOK_PERMISSIONS",
        value: "ERR_002"
    } as Error,


    //
    //  BOT MISUSE - 100
    //

    notInVc: {
        name: "Not In VC",
        description: "You're not in a voice channel!",
        code: "NOT_IN_VC",
        value: "ERR_100"
    } as Error,

    notSharingVc: {
        name: "Not Sharing VC",
        description: "You're not in my voice channel!",
        code: "NOT_SHARING_VC",
        value: "ERR_101"
    } as Error,

    cantUseInDM: {
        name: "Can't Use In DM",
        description: "This command cannot be used in DMs!",
        code: "CANT_USE_IN_DM",
        value: "ERR_102"
    } as Error,


    //
    //  MINOR ERRORS - 200
    //


    //
    //  CRITICAL ERRORS - 300
    //

    missingCommandName: {
        name: "Missing Command Name",
        description: "Command is missing a name!",
        code: "COMMAND_LOADING_MISSING_NAME",
        value: "ERR_300"
    } as Error,

    missingCommandDescription: {
        name: "Missing Command Description",
        description: "Command is missing a description!",
        code: "COMMAND_LOADING_MISSING_DESCRIPTION",
        value: "ERR_301"
    } as Error,

    invalidCommandPermission: {
        name: "Invalid Command Permission",
        description: "Command has an invalid permission!",
        code: "COMMAND_LOADING_INVALID_PERMISSION",
        value: "ERR_302"
    } as Error,

    nonExistentCommand: {
        name: "Non-Existent Command",
        description: "Command does not exist!",
        code: "COMMAND_NON_EXISTENT",
        value: "ERR_303"
    } as Error,

    couldntRunCommand: {
        name: "Error Running Command",
        description: "There was an error running that command!",
        code: "COMMAND_ERROR_RUNNING",
        value: "ERR_304"
    } as Error,


    //
    //  MISSING ERRORS - 400
    //

    cantFindError: {
        name: "Can't Find Error",
        description: "I can't find that error!",
        code: "CANT_FIND_ERROR",
        value: "ERR_400"
    } as Error,

    cantFindCharacter: {
        name: "Can't Find Character",
        description: "I can't find that character!",
        code: "CANT_FIND_CHARACTER",
        value: "ERR_401"
    } as Error,

    cantFindUser: {
        name: "Can't Find User",
        description: "I can't find that user!",
        code: "CANT_FIND_USER",
        value: "ERR_402"
    } as Error,
    
    cantFindWebhook: {
        name: "Can't Find Webhook",
        description: "I can't find that webhook!",
        code: "CANT_FIND_WEBHOOK",
        value: "ERR_403"
    } as Error,

    noMusicResults: {
        name: "No Results",
        description: "I couldn't find any search results!",
        code: "NO_MUSIC_RESULTS",
        value: "ERR_404"
    } as Error,


    //
    //  JOKES/FAKE-OUTS - 800
    //

    cantComprehendQuestion: {
        name: "Can't Comprehend Question",
        description: "Your question cannot be comprehended.",
        code: "CANT_COMPREHEND_QUESTION",
        value: "ERR_800"
    } as Error,

    cantFindAnswer: {
        name: "Can't Find Answer",
        description: "Answer not found.",
        code: "CANT_FIND_ANSWER",
        value: "ERR_801"
    } as Error,
    
    cantReadProperty: {
        name: "Can't Read Property",
        description: "Cannot read property 'response' of yourGodAwfulQuestion",
        code: "CANT_READ_PROPERTY",
        value: "ERR_802"
    }
}

export interface Error {
    name: string;
    description: string;
    code: string;
    value: string;
};