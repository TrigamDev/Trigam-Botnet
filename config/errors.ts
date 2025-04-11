/*
	Error code guide:
	-----------------
	000 - User permission error
	100 - Bot permission error
	200 - Bot misuse
	300 - Critical error
	400 - Can't find something
	800 - Jokes/fake-outs
*/

export default {
	//
	//	User Permission Errors - 000
	//
	noBotAccess: {
		name: "No Bot Access",
		description: "You don't have permission to use this bot!",
		code: "NO_BOT_ACCESS",
		id: "ERR_000"
	} as Error,
	commandDisabled: {
		name: "Command Disabled",
		description: "This command is disabled!",
		code: "COMMAND_DISABLED",
		id: "ERR_001"
	} as Error,
	devOnlyCommand: {
		name: "Developer-Only Command",
		description: "This command is only for developers!",
		code: "DEV_ONLY_COMMAND",
		id: "ERR_002"
	} as Error,

	//
	//	Bot Permission Errors - 100
	//
	noWebhookPerms: {
		name: "No Webhook Permissions",
		description: "I don't have permission to manage webhooks!",
		code: "NO_WEBHOOK_PERMS",
		id: "ERR_100"
	} as Error,

	//
	//	Bot Misuse Errors - 200
	//
	notInVc: {
		name: "Not in Voice Channel",
		description: "You're not in a voice channel!",
		code: "NOT_IN_VC",
		id: "ERR_200"
	} as Error,
	notSharingVc: {
		name: "Not Sharing Voice Channel",
		description: "You're not in the same voice channel as me!",
		code: "NOT_SHARING_VC",
		id: "ERR_201"
	} as Error,
	cantUseInDM: {
		name: "Can't Use in DM",
		description: "This command cannot be used in DMs!",
		code: "CANT_USE_IN_DM",
		id: "ERR_202"
	} as Error,
	channelAlreadyConnected: {
		name: "Channel Already Connected",
		description: "This channel is already in that connection!",
		code: "CHANNEL_ALREADY_CONNECTED",
		id: "ERR_203"
	} as Error,
	connectionIdExists: {
		name: "Connection ID Already Exists",
		description: "A connection with that ID already exists!",
		code: "CONNECTION_ID_ALREADY_EXISTS",
		id: "ERR_204"
	} as Error,

	//
	//	Critical Errors - 300
	//
	missingCommandName: {
		name: "Missing Command Name",
		description: "Command is missing a name!",
		code: "COMMAND_LOADING_MISSING_NAME",
		id: "ERR_300"
	} as Error,
	missingCommandDescription: {
		name: "Missing Command Description",
		description: "Command is missing a description!",
		code: "COMMAND_LOADING_MISSING_DESCRIPTION",
		id: "ERR_301"
	} as Error,
	nonExistentCommand: {
		name: "Non-Existent Command",
		description: "Command does not exist!",
		code: "COMMAND_NON_EXISTENT",
		id: "ERR_302"
	} as Error,
	couldntRunCommand: {
		name: "Error Running Command",
		description: "There was an error running that command!",
		code: "COMMAND_ERROR_RUNNING",
		id: "ERR_303"
	} as Error,

	//
	//	"Not Found" Errors - 400
	//
	cantFindError: {
		name: "Can't Find Error",
		description: "I can't find that error!",
		code: "CANT_FIND_ERROR",
		id: "ERR_400"
	} as Error,
	cantFindCharacter: {
		name: "Can't Find Character",
		description: "I can't find that character!",
		code: "CANT_FIND_CHARACTER",
		id: "ERR_401"
	} as Error,
	cantFindUser: {
		name: "Can't Find User",
		description: "I can't find that user!",
		code: "CANT_FIND_USER",
		id: "ERR_402"
	} as Error,
	cantFindWebhook: {
		name: "Can't Find Webhook",
		description: "I can't find that webhook!",
		code: "CANT_FIND_WEBHOOK",
		id: "ERR_403"
	} as Error,
	noMusicResults: {
		name: "No Results",
		description: "I couldn't find any search results!",
		code: "NO_MUSIC_RESULTS",
		id: "ERR_404"
	} as Error,
	noQuery: {
		name: "No Query",
		description: "No query was provided!",
		code: "NO_QUERY",
		id: "ERR_405"
	} as Error,

	//
	//	Joke/Fake-out Errors - 800
	//
	cantComprehendQuestion: {
		name: "Can't Comprehend Question",
		description: "Your question cannot be comprehended.",
		code: "CANT_COMPREHEND_QUESTION",
		id: "ERR_800"
	} as Error,
	cantFindAnswer: {
		name: "Can't Find Answer",
		description: "Answer not found.",
		code: "CANT_FIND_ANSWER",
		id: "ERR_801"
	} as Error,
	cantReadProperty: {
		name: "Can't Read Property",
		description: "Cannot read property 'response' of yourGodAwfulQuestion",
		code: "CANT_READ_PROPERTY",
		id: "ERR_802"
	} as Error
}

export interface Error {
	name: string
	description: string
	code: string
	id: string
}
