/***************************
 * cookies.js
 *
 * Functions for dealing with Chrome's Cookie API.
 *
 * getAllCookies and loadCookies should essentially be inverses of one another,
 * such that loadCookies(getAllCookies(url)) should have no effect and
 * obj == getAllCookies(loadCookies(obj)).
 */

/**********************************
 * getAllCookies(URL, success_handler)
 *
 * Given a URL, use Chrome's Cookie API to return all the cookies for the
 * page's domain. Returned as a TODO.
 */
var getAllCookies = function(page_url, success_handler) {
    return chrome.cookies.getAll({
        url: page_url
    }, function(cookie_array) {
        var cookie_data = { url: page_url, cookies: cookie_array };
        success_handler(cookie_data);
    });
};

/**********************************
 * loadCookies(cookies)
 *
 * Given a TODO, set cookies for this domain as specified in the given object.
 */
var loadCookies = function(cookies) {
    var url = "derp";
    return url;
};

