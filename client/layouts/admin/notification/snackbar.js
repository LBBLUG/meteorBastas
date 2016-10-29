// This is called to display the snackbar notification

showSnackbar = function() {
    var snackbarText = Session.get("snackbarText");
    var notificationColor = Session.get("snackbarColor");
    var snackbarNotification = document.getElementById("snackbar");
    snackbarNotification.innerHTML = snackbarText;
    snackbarNotification.style.backgroundColor = notificationColor;
    snackbarNotification.className = "show";
    setTimeout(function() {
        snackbarNotification.className = snackbarNotification.className.replace("show", "");
    }, 5000);
}
