const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const Jimp = require('jimp');

const ut = require('../../util/utilitrigam.js');
const ServerSchema = require('../../database/models/serverData.js');

const errors = require('../../config/errors.js');
const errorBuilder = require('../../builders/error.js');
const placeColors = require('../../types/placeColors.js');
const serverData = require('../../database/models/serverData.js');

module.exports = {
    name: 'place',
    description: 'A collaborative pixel art canvas',
    enabled: true,
    type: ApplicationCommandType.ChatInput,
    options: [
        // Placing
        { name: 'place', description: 'Place a pixel', type: ApplicationCommandOptionType.Subcommand, options: [
            { name: 'x', description: 'The x coordinate of the pixel', type: ApplicationCommandOptionType.Integer, required: true },
            { name: 'y', description: 'The y coordinate of the pixel', type: ApplicationCommandOptionType.Integer, required: true },
            { name: 'color', description: 'The color of the pixel', type: ApplicationCommandOptionType.String, required: true, autocomplete: true },
        ]},
        // View
        { name: 'view', description: 'View the canvas', type: ApplicationCommandOptionType.Subcommand, options: [
            { name: 'grid', description: 'Display a grid over the canvas', type: ApplicationCommandOptionType.Boolean, required: false },
        ]},
        // Color list
        { name: 'colors', description: 'View the list of colors', type: ApplicationCommandOptionType.Subcommand },
        // Milestones
        { name: 'milestones', description: 'View the list of milestones', type: ApplicationCommandOptionType.Subcommand },
        
    ],

    autocomplete: async (Discord, bot, interaction, options, subcommand) => {
        const focused = interaction.options.getFocused();
        const searched = await searchColor(focused, interaction);
        if (searched && interaction) await interaction.respond(
            searched.map(col => ({ name: col.name, value: col.id }))
        );
    },

	execute: async (Discord, bot, interaction, options, subcommand) => {
        await interaction.deferReply();

        // Data
        let serverData = await ServerSchema.findOne({ serverID: interaction.guild.id });
        let config = getConfig(serverData, interaction, options);

        let pixelData = serverData.place.pixelData ? await decodePixelData(serverData.place.pixelData) : [];
        // filter duplicates
        pixelData = pixelData.filter((pixel, index, self) =>
            index === self.findIndex((t) => ( t.x === pixel.x && t.y === pixel.y ))
        );
        let troll = require('../../assets/troll.json');
        pixelData = pixelData.concat(troll);

        // Permission checks
        if (!ut.iHavePerm(interaction, 'attachFiles')) return await interaction.reply(errorBuilder.buildEmbedMsg(errors.placeNoImagePerms));

        switch (subcommand) {
            case 'view': {
                let canvas = await generateCanvas(pixelData, {
                    sizeX: config.sizeX, sizeY: config.sizeY,
                    color: config.theme.value, overlay: config.hasOverlay, upscale: config.upscale
                }, {
                    level: config.zoom.zoomLevel, x: config.zoom.zoomX, y: config.zoom.zoomY
                });
                // Render and send
                await renderAndSend(canvas, interaction);
            }; break;
            case 'place': {
                // Place pixel
                let colors = await searchColor(options.color);
                let color = colors[0];
                if (!color && interaction) return await interaction.editReply(errorBuilder.buildEmbedMsg(errors.placeInvalidColor));
                pixelData.push({ x: options.x, y: options.y, color: color.id });
                // Get canvas
                let canvas = await generateCanvas(pixelData, {
                    sizeX: config.sizeX, sizeY: config.sizeY,
                    color: config.theme.value, overlay: config.hasOverlay,  upscale: config.upscale
                });
                // Render and send
                await renderAndSend(canvas, interaction);
                // Save data
                await ServerSchema.findOneAndUpdate({ serverID: interaction.guild.id }, { 'place.pixelData': await encodePixelData(pixelData) });
            }; break;
            case 'colors': {
                 await interaction.editReply({ content: 'uhh later' });
            }; break;
            case 'milestones': {
                 await interaction.editReply({ content: 'uhh later' });
            }; break;

        }
    }
};



// Generate the canvas to be displayed
async function generateCanvas(pixelData, canvasConfig, zoomConfig) {
    if (canvasConfig.overlay) {
        placeOverlay = await Jimp.read('assets/place_overlay.png');
        columns = await Jimp.read('assets/place_columns.png');
        rows = await Jimp.read('assets/place_rows.png');
        empty = await Jimp.read('assets/place_empty_tile.png');
    };

    // Create image
    if (canvasConfig.overlay) grid = new Jimp(canvasConfig.sizeX + 1, canvasConfig.sizeY + 1, canvasConfig.color);
    else grid = new Jimp(canvasConfig.sizeX, canvasConfig.sizeY, canvasConfig.color);

    // Apply user-placed pixels
    grid = await applyPixels(grid, pixelData, canvasConfig.overlay);

    // Resize
    grid = grid.resize(grid.bitmap.width * 16, grid.bitmap.height * 16, Jimp.RESIZE_NEAREST_NEIGHBOR);

    if (canvasConfig.overlay) {
        grid.composite(placeOverlay, 0, 0);
        // Composite columns and rows
        grid.composite(columns, 0, 0);
        grid.composite(rows, 0, 0);
        grid.composite(empty, 0, 0);
    }

    return grid;
};

// Apply all the user-placed pixels
async function applyPixels(canvas, pixels, overlay) {
    pixels.forEach(async pixel => {
        if (overlay) await setPixel(canvas, pixel.x, pixel.y, pixel.color);
        else await setPixel(canvas, pixel.x - 1, pixel.y - 1, pixel.color);
    });
    return canvas;
};

// Set a pixel to a specific color
async function setPixel(canvas, x, y, colorID) {
    let colors = await searchColor(colorID);
    let color = colors[0];
    if (!color) return;
    canvas.setPixelColor(color.value, x, y);
    return canvas;
};

async function renderAndSend(canvas, interaction) {
    let image = await canvas.getBufferAsync(Jimp.MIME_PNG);
    await interaction.editReply({ files: [{ attachment: image, name: 'place-grid.png' }] });
};

// Search for a color by name or ID
async function searchColor(name, interaction) {
    // Check milestones
    let servData;
    if (interaction) servData = await ServerSchema.findOne({ serverID: interaction.guild.id });
    if (servData?.place?.milestones) colorMilestone = servData.place.milestones.color;
    else colorMilestone = 0;

    // Search
    let results = Object.values(placeColors).filter(col => col.level <= colorMilestone);

    // Find directly
    let findID = results.find(col => col.id.toLowerCase() === name?.toLowerCase());
    if (findID) results = [findID];
    let findName = results.find(col => col.name.toLowerCase() === name?.toLowerCase());
    if (findName) results = [findName];

    // Find by partial match
    results = results.filter(col => {
        if (col.name.toLowerCase() === name?.toLowerCase()) return true;
        else if (col.id.toLowerCase() === name?.toLowerCase()) return true;
        else if (col.name.toLowerCase().includes(name?.toLowerCase())) return true;
        else if (col.id.toLowerCase().includes(name?.toLowerCase())) return true;
    });

    return results;
}

function getConfig(serverData, interaction, options) {
    let config = {
        sizeX: 32,
        sizeY: 32,
        hasOverlay: true,
        theme: placeColors.white,
        upscale: 16,

        zoom: {
            zoomLevel: 1,
            zoomX: 16,
            zoomY: 16
        }
    };
    // Overlay (on by default, off when viewing)
    if (options.grid !== null && options.grid !== undefined) config.hasOverlay = options.grid;
    // Theme
    if (serverData.place.darkMode) config.theme = placeColors.black;
    // Zoom
    if (options.zoom) config.zoom.zoomLevel = options.zoom;

    if (options.x) config.zoom.zoomX = options.x;
    else config.zoom.zoomX = config.sizeX / 2;

    if (options.y) config.zoom.zoomY = options.y;
    else config.zoom.zoomY = config.sizeY / 2;

    return config;
};

function encodePixelData(pixelData) {
    // Read from pixelData array and convert to string
    let pixelString = pixelData.map(pixel => {
        return `${pixel.x},${pixel.y},${pixel.color}`;
    }).join(';');
    return pixelString;
};

async function decodePixelData(pixelString) {
    let pixelData = [];
    // Decode from base64
    let pixels = pixelString.split(';');
    // Split string up into array
    pixels.forEach(async pixel => {
        let data = pixel.split(',');
        let colors = await searchColor(data[2]);
        let color = colors[0];
        if (!color) return;
        pixelData.push({
            x: Number(data[0]),
            y: Number(data[1]),
            color: color.id
        });
    });
    return pixelData;
};