import { Fun } from "@botnet/bots/fun"
import { Util } from "@botnet/bots/util"
import { Moderation } from "@botnet/bots/mod"
import { Games } from "@botnet/bots/games"
import { Portal } from "@botnet/bots/portal"
import { Music } from "@botnet/bots/music"
import { CustomCommands } from "@botnet/bots/cc"
import type { Bot } from "@botnet/bots/bot"

const bots: Bot[] = [
	Fun,
	Util,
	Moderation,
	Games,
	Portal,
	Music,
	CustomCommands
]
for (const bot of bots) {
	bot.login()
}
