import ut from "./utilitrigam";

import errors, { Error } from "../config/errors";
import { titles, footers, colors } from "../config/embeds";

export function buildErrorEmbed (error: Error, ephemeral: boolean = true) {
    return {
        embeds: [{
            title: titles.error,
            description: `${error.description}\n\`${error.value}\``,
            footer: ut.randomElement(footers.error, Date.now().toString()),
            color: colors.error
        }],
        ephemeral: ephemeral
    }
};

export function buildErrorMessage (error: Error, ephemeral: boolean = true) {
    return {
        content: `## ERROR\n${error.description}\n\`${error.value}\``,
        ephemeral: ephemeral
    }
};

// Getters
export function getErrorByCode (errorCode: string): Error {
    return Object.values(errors).find(error => error.value === errorCode) as Error;
}

export function getErrorByValue (errorValue: string): Error {
    return Object.values(errors).find(error => error.value === errorValue) as Error;
}