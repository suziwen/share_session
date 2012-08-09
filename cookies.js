
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
 * page's domain. Returned as an object with the following properties:
 *  url: url of the current tab
 *  cookies: array of Cookie objects
 */
var getAllCookies = function(page_url, success_handler) {
    return chrome.cookies.getAll({
        url: page_url
    }, function(cookie_array) {
        var cookie_data = {
            url: page_url,
            cookies: _.map(cookie_array, function(cookie) {
                return _.pick(cookie,
                    [
                        'name', 'domain', 'value', 'path', 'secure',
                        'httpOnly', 'expirationDate'
                    ]
                );
            }),
        };
        success_handler(cookie_data);
    });
};

/**********************************
 * loadCookies(cookies)
 *
 * Given an object full of cookies in the following format:
 *
 *  url: URL to apply all these cookies to
 *  cookies: array of Cookie objects
 *
 * sets the cookies for this URL as specified.
 */
var loadCookies = function(data) {
    // Set each cookie. Note that there is one URL given for all cookies.
    for (var i in data.cookies) {
        // Chrome API is picky about excessive fields in the object we pass in
        var cookie = _.pick(
            data.cookies[i],
            [
                'name', 'domain', 'value', 'path', 'secure', 'httpOnly',
                'expirationDate'
            ]
        );

        cookie.url = data.url;
        chrome.cookies.set(cookie);
    }
    return data.url;
};

