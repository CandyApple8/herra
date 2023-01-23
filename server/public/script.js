$("#dataToSend").keypress(function (event)
{
    if (event.which == 13)
    {
        alert("OK")
    }
});


function sendData(data)
{
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/data');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = () =>
    {
        if (xhr.status === 200)
        {
            const response = JSON.parse(xhr.responseText);
            showNotification(response.message);
        }
    };
    $("#dataToSend").val('');
    xhr.send(`data=${data}`);
}

function showNotification(text)
{
    var notification = document.getElementById("notification");
    notification.style.display = "block";
    document.getElementById("notifText").innerText = text;

    setTimeout(function ()
    {
        notification.style.display = "none";
    }, 4000);
}

function loadUsers()
{
    
}