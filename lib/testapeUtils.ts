const SERVER_ADDRESS = 'http://127.0.0.1:13433'

export const sendCustomEvent = async (type: string, info: string) => {
    const data = {
        class: 'CustomEvent',
        type,
        info,
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }
    try {
        const response = await fetch(SERVER_ADDRESS, requestOptions)
        return response
    } catch (error) {
        return error
    }
}
