// This is called to display the snackbar notification

showSnackbar = function() {
    var snackbarText = Session.get("snackbarText");
    var snackbarNotification = document.getElementById("snackbar")
    document.getElementById('snackbar').innerHTML = snackbarText;
    snackbarNotification.className = "show";
    setTimeout(function() {
        snackbarNotification.className = snackbarNotification.className.replace("show", "");
    }, 5000);
}
