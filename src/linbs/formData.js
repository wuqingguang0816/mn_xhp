export let form = (msg) => {
    let data = new FormData();
    for (let key in msg) {
        data.append(key, msg[key]);
    }
    return data;
}