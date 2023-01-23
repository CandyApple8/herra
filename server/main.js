const { EmbedBuilder, messageLink } = require("@discordjs/builders");
const { Colors } = require("discord.js");
const express = require("express");
const https = require("https");
const app = express();
const fs = require("fs");
const main = require("../main");
const bodyParser = require('body-parser');

app.listen(6661);

//app.listen(6661);

app.set("views", __dirname + "/views");
app.set("view-engine", "ejs");
app.set("trust proxy", true);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.urlencoded({ extended: true }));


app.get("/test", (req, res) =>
{
    res.render("test.ejs");
});

exports.vpending = new Set();

app.get("/", (req, res) => 
{
    if (req.query.id == undefined) return res.render("home.ejs", {"client": main.client});
    const userid = req.query.id;
    if (main.getuser(req.query.id) == undefined) return res.render("error.ejs", { errorMessage: "Can't find that user" });
    if (!exports.vpending.has(userid)) return res.render("error.ejs", { errorMessage: "Verification failed" });

    var ip = req.header('x-forwarded-for') || req.socket.remoteAddress;

    console.log("User registered with ip: " + ip.split(":").pop().toString());

    var user = main.client.users.cache.get(userid);
    //good to test if verification message channel exists
    user.send("Verification complete, you can now access the server :)\nSay hi in <#1019671761584926743>!").catch(err =>
    {
        //delete message channel if it exists
        main.client.channels.cache.find(r => r.name == user.id)?.delete().catch(err =>
        {
            //just ignore
        });
    });

    fs.mkdirSync(`${__dirname}/../users/${userid}`, { recursive: true });

    fs.writeFileSync(`${__dirname}/../users/${userid}/data.json`, JSON.stringify({
        "coins": 500,
        "ip": ip,
        "roles": []
    }, null, 4));

    const completeEmbed = new EmbedBuilder()
        .setTitle("Welcome! " + user.username)
        .setDescription("You received `500` coins as a welcome gift, enjoy the server :)\nCheck out <#1036763752625868800> for details!\nHave fun!")
        .addFields(
            { name: "Coins", value: "Earn coins by talking, playing games and interacting with the community!\nUse `/coins @user` to view coin balance" },
            { name: "Games", value: "Play games and earn coins by using `/play` command" },
            { name: "Colors", value: "You can buy colors here: <#1058130742439317635>" },
            { name: "Inventory", value: "View your inventory with `/inventory`, equip items with `/eqiup item_number False/True`" }
        )
        .setThumbnail(user.displayAvatarURL())
        .setColor(Colors.DarkVividPink)

    main.client.guilds.cache.first().members.cache.get(userid).roles.add(main.client.guilds.cache.first().roles.cache.get("1021464581866000525"));
    main.client.guilds.cache.first().channels.cache.get("1019671761584926743").send({ content: `<@${userid}>`, embeds: [completeEmbed] })

    exports.vpending.delete(userid)
    res.render("verified.ejs", { "user": user });
});

app.get("/home", (req, res) =>
{
    res.render("home.ejs", {client: main.client});
});

app.get("/privacy", (req, res) =>
{
    res.render("privacy.ejs");
});

app.get("/callback", (req, res) => 
{

});

app.get("/register", (req, res) =>
{
    res.render("")
});

app.get("/dashboard", (req, res) =>
{
    res.render("dashboard.ejs", {"client": main.client});
});

app.post('/data', (req, res) =>
{
    //main.client.channels.cache.get("1019671761584926743").send("Dashboard data: "+req.body.data);
    res.send({ message: "Dashboard is still under development, function unavailable" });
});