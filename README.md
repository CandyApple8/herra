# herra
Discord bot I gave up on

It was fun working on this project but eventually I realized javascript is not for me ¯\_(ツ)_/¯<br>
I think it has a great potential if someone skilled reworks this project

It's using a custom command handler, it should be easy to modify and extend<br>
It has some unfinished code, you can get rid of it and bot will continue to function

Consider switching to an actual database and not .json, I made it json for simplicity<br>
It should work just fine tho

<h1>Verification system</h1>
You need a message where users are going to react to a specific emoji, you can change it around in source<br>
Once clicked user will receive a message with a verification link, if DMs are disabled then a channel will be created and link will be sent there<br>
If link is not clicked in 5 minutes minutes user will be kicked and channel will be deleted<br>

If clicked user will be given a "member" role and IP will be saved in data.json<br>
You can view IP and user info using the /userinfo command

<h1> Coin system </h1>
Users will receive coins by talking and playing games, it pretty simple<br>
Users can view anyones coins with /coins command, you can set someones coins with `setcoins` command, `setcoins memberID value operator`
Users earn coins by playing games using /play command

<h1> Alt detection </h1>
This also needs a bit more work but for now it can compare users IP and see if its an alt account, use /altscan to view results

use `sys.update` to build slash commands

Make sure you have .env file containing 3 keys bellow
```
token=your main token
debugToken=your second bot token (for testing)
ipApiToken=ip api token lol
```

<h3>Rlease</h3>
I made a simple program to copy all the files into the "release" folder, its easier to copy into a VPS<br>
You can compile it using GCC or VisualC, personally I use VisualC

I think the code is pretty easy to read and understand, thank you for reading :)
Feel free to use this code as you want
