// Error code guide:
// 000: User lacking perms
// 100: Bot lacking perms


module.exports = {
    noBotAccess: {
        name: "No Bot Access",
        description: "You don't have permission to use this bot!",
        code: "NO_BOT_ACCESS",
        value: "ERR_000"
    },
    testError: {
        name: "Test Error",
        description: "test!!!!!!!",
        code: "TEST_ERROR",
        value: "ERR_001"
    }
}