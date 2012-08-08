var config = {
    omnibox_keyword: "session_load"
};

/**********************************
 * Set up context menu action for saving page data.
 */
chrome.contextMenus.create({
    title: "Copy Session to Clipboard",
});

/**********************************
 * copyToClipboard(text)
 *
 * Given text, copy it to the clipboard using document.execCommand.
 * This executes through the background page, since Chrome does not give
 * clipboard access otherwise (see http://goo.gl/KlQi7)
 */
var copyToClipboard = function(text) {
    var backgroundPage = chrome.extension.getBackgroundPage();

    var clipboard = backgroundPage.document.getElementById("clipboard");
    clipboard.value = text;
    clipboard.select();

    backgroundPage.document.execCommand("Copy");
};

/**********************************
 * Handler for clicking on the context menu item.
 * When clicked, should generate the cookie data and insert it into the
 * user's clipboard to send to a friend or otherwise.
 */
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    //exportCookies(info.pageUrl, { success: copyToClipboard });
    console.log("Clicked!");
    console.log(info.pageUrl);

    // Get cookies!
    var cookie_data = getAllCookies(info.pageUrl, function(cookie_data) {
        // Action name plus data
        copyToClipboard(
            config.omnibox_keyword + " " + JSON.stringify(cookie_data)
        );
    });
});

/**********************************
 * Event handler for when someone runs our omnibox command. This should load
 * all cookies passed in for the given domain.
 */
chrome.omnibox.onInputEntered.addListener(function(text) {
    try {
        var data = JSON.parse(text);
        var url = loadCookies(data);
        location.href = url;
    }
    catch (exception) {
        alert("Invalid session data string! Error: " + exception.toString());
    }
});

/**********************************
 * updateOmniboxSuggestion(text)
 *
 * Given the text currently entered in the omnibox, generate a useful text
 * suggestion for the user that fits the form:
 *      "Load cookies and website at [url]"
 */
var updateOmniboxSuggestion = function(text) {
    var description = "Load cookies and website";
    if (text) {
        try {
            var cookie_data = JSON.parse(text);
            if (cookie_data && cookie_data.url) {
                description = "Load cookies and website at <url>"
                    + cookie_data.url + "</url>";
            }
        } catch (e) {
            // Parsing errors aren't really an issue. Don't worry.
        }
    }
    chrome.omnibox.setDefaultSuggestion({description:description});
};

updateOmniboxSuggestion();
chrome.omnibox.onInputStarted.addListener(updateOmniboxSuggestion);
chrome.omnibox.onInputChanged.addListener(updateOmniboxSuggestion);

