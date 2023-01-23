exports.main = (err, client) =>
{
    console.log(err)
    client.channels.cache.get("1057773207819665468").send("Client error detected\n" + err.toString())
}