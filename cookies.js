chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("Action clicked!");
});

chrome.contextMenus.create({
        title: "Copy Session Data to Clipboard",
        id:     "share_session_cm"
    }, function(acd) {
    console.log("whoa");
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log("Clicked!");
    console.log(info.pageUrl);

    // Get cookies!
});

/*
$(function() {
    $('form').submit(function(){ return false; });
    $('#url_text').click(function(){ $(this).select(); });
    $('#export_btn').click(function() {
        var cookie_url = "http://session.qxlp.net/?";

        $('#url_text')
            .val(cookie_url)
            .focus()
            .select();
    });
});

document.execCommand('copy')
*/
