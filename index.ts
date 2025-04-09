import { readdir } from "fs/promises"
import { ShardingManager } from "discord.js"
import { join } from "path"

const botFolder = join(__dirname, "./bots")
const botFiles = (await readdir(botFolder)).filter(
	(botFile) => botFile != "bot.ts"
)

for (const botFile of botFiles) {
	const manager = new ShardingManager(`${botFolder}/${botFile}`, {
		token: getTokenFromFile(botFile)
	})

	manager.on("shardCreate", (shard) =>
		shard.on("ready", () => {
			shard.send({ type: "ready", data: { shardId: shard.id } })
		})
	)

	manager.spawn()
}


function getTokenFromFile(botFile: string): string {
	const id = botFile.replace('.ts', '').toUpperCase()
	return process.env[`TOKEN_${id}`] as string
}