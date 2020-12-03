let user_signed_in = false;
const CLIENT_ID = encodeURIComponent('62677881005-70vvpdrov3h5and1mfcv7nutmkl2rgs4.apps.googleusercontent.com')
const RESPONSE_TYPE = encodeURIComponent('id_token')
const REDIRECT_URL = encodeURIComponent('https://kpehiaooohhkilaejeojmoaohfhmpnom.chromiumapp.org')
const STATE = encodeURIComponent('jfkls3n')
const SCOPE = encodeURIComponent('profile')
const PROMPT = encodeURIComponent('consent')

function create_oauth2_url() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    let url =
        `https://accounts.google.com/o/oauth2/v2/auth
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URL}
&state=${STATE}
&scope=${SCOPE}
&prompt=${PROMPT}
&nonce=${nonce}
    `;
    return url;
}

function is_user_signed_in() {
    return user_signed_in
}

var profileName;
var profile = {}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.message === "login") {
            if (is_user_signed_in()) {
                sendResponse(profile)
            } else {
                chrome.identity.launchWebAuthFlow({
                    url: create_oauth2_url(),
                    interactive: true
                }, function (redirect_url) {
                    if (chrome.runtime.lastError) {
                        console.log("Whoops.. ");
                    } else {
                        let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
            
                        const requestURL = 'https://search.misabel.ai/api/auth/google'
            
                        let formData = new FormData();
                        formData.append('id_token', id_token)
            
                        var request = new XMLHttpRequest();
                        request.open("POST", requestURL, true);
                        request.withCredentials = true;
                        request.send(formData);
            
                        function setCookie(name, value, options = {}) {
            
                            options = {
                                path: '/'
                            };
            
                            if (options.expires instanceof Date) {
                                options.expires = options.expires.toUTCString();
                            }
            
                            let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
                            for (let optionKey in options) {
                                updatedCookie += "; " + optionKey;
                                let optionValue = options[optionKey];
                                if (optionValue !== true) {
                                    updatedCookie += "=" + optionValue;
                                }
                            }
                            chrome.cookies.set = updatedCookie;
                        }
            
                        function getCookies(domain, callback) {
                            chrome.cookies.getAll({ "url": domain }, function (cookie) {
                                if (callback) {
                                    callback(cookie);
                                }
                            });
                        }
            
                        setTimeout(() =>{
                            getCookies('https://search.misabel.ai/', (id) => {
                                let xhrNew = new XMLHttpRequest();
                                xhrNew.open('GET', 'https://search.misabel.ai/api/user');
                                xhrNew.onreadystatechange = function () {
                                    if (xhrNew.readyState === 4 && xhrNew.status === 200) {
                                        setCookie(id);
                                        let resp = JSON.parse(xhrNew.responseText);
                                        if (resp.avatarUrl == null) {
                                            user_signed_in = false;
                                        } else {
                                            profile = resp
                                            user_signed_in = true;
                                            sendResponse(resp);
                                        }
                                    }
                                }
                                xhrNew.send();
                            })
                        },3000)
                    }
                });
                return true;
            }
        } else if (request.message === 'logout') {
            let logout = new XMLHttpRequest();
            logout.open("POST", 'https://search.misabel.ai/api/logout', true)
            logout.withCredentials = true;
            logout.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                }
            }
            logout.send({});

            user_signed_in = false;
            profile = {}
            sendResponse(profile);

            return true;

        } else if (request.message === 'isUserSignedIn') {
            var xhrNew2 = new XMLHttpRequest();
            xhrNew2.open('GET', 'https://search.misabel.ai/api/user', true);
            xhrNew2.onreadystatechange = function () {
                if (xhrNew2.readyState === 4 && xhrNew2.status === 200) {
                    let resp = JSON.parse(xhrNew2.responseText);
                    profile = resp
                    sendResponse(resp);
                }
            }
            xhrNew2.send();
            return true;

        } else if (request.message === 'SorryPriceNotFound') {
            let SorryPriceNotFound = []
            var client = new XMLHttpRequest();
            client.open('GET', 'https://home.misabel.ai/shops/plugin/lang/en/not_found_message.txt');
            client.setRequestHeader('Cache-Control', 'no-cache');
            client.onreadystatechange = function () {
                if (client.readyState === 4 && client.status === 200) {
                    SorryPriceNotFound.push(client.responseText)
                    sendResponse(SorryPriceNotFound);
                }
            }
            client.send();
            return true;
        }
    });
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'TypeErrorsUser') {
            let TypeErrorsUser = []
            var typeError = new XMLHttpRequest();
            typeError.open('GET', 'https://home.misabel.ai/shops/plugin/lang/en/type_error.txt');
            typeError.setRequestHeader('Cache-Control', 'no-cache')
            typeError.onreadystatechange = function () {
                if (typeError.readyState === 4 && typeError.status === 200) {
                    TypeErrorsUser.push(typeError.responseText)
                    sendResponse(TypeErrorsUser)
                }
            }
            typeError.send()
            return true
        }
    }
)
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.url != null) {
            let getData = new XMLHttpRequest()
            getData.open("POST", "https://search.misabel.ai/api/compare", true);
            getData.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            getData.setRequestHeader('Cache-Control', 'no-cache')
            getData.withCredentials = true;
            if(request.variationsSize == undefined && request.variationsColor == undefined){
                getData.send(JSON.stringify({ "url": request.url, "id":request.id}));
            } else if(request.variationsSize != undefined && request.variationsColor != undefined){
                getData.send(JSON.stringify({ "url": request.url, "id":request.id, "variations": [request.variationsColor, request.variationsSize]}));
            } else if(request.variationsSize != undefined){
                getData.send(JSON.stringify({ "url": request.url, "id":request.id, "variations": request.variationsSize}))
            } else if(request.variationsColor != undefined){
                getData.send(JSON.stringify({ "url": request.url, "id":request.id, "variations": request.variationsColor}))
            }
            getData.onreadystatechange = function () {
                if (getData.readyState === 4 && getData.status === 200) {
                    let resp = JSON.parse(getData.responseText);
                    sendResponse(resp);
                } else if(getData.readyState === 4 && getData.status === 429) {
                    console.log('429 Error!!!')
                    let resp = JSON.parse(getData.responseText)
                    sendResponse(resp)
                    if(resp.resolution === 'login'){
                        chrome.identity.launchWebAuthFlow({
                            url: create_oauth2_url(),
                            interactive: true
                        }, function (redirect_url) {
                            if (chrome.runtime.lastError) {
                                console.log("Whoops.. ");
                            } else {
                                let id_token = redirect_url.substring(redirect_url.indexOf('id_token=') + 9);
                    
                                const requestURL = 'https://search.misabel.ai/api/auth/google'
                    
                                let formData = new FormData();
                                formData.append('id_token', id_token)
                    
                                var request = new XMLHttpRequest();
                                request.open("POST", requestURL, true);
                                request.withCredentials = true;
                                request.send(formData);
                    
                                function setCookie(name, value, options = {}) {
                    
                                    options = {
                                        path: '/'
                                    };
                    
                                    if (options.expires instanceof Date) {
                                        options.expires = options.expires.toUTCString();
                                    }
                    
                                    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
                                    for (let optionKey in options) {
                                        updatedCookie += "; " + optionKey;
                                        let optionValue = options[optionKey];
                                        if (optionValue !== true) {
                                            updatedCookie += "=" + optionValue;
                                        }
                                    }
                                    chrome.cookies.set = updatedCookie;
                                }
                    
                                function getCookies(domain, callback) {
                                    chrome.cookies.getAll({ "url": domain }, function (cookie) {
                                        if (callback) {
                                            callback(cookie);
                                        }
                                    });
                                }
                    
                                setTimeout(() =>{
                                    getCookies('https://search.misabel.ai/', (id) => {
                                        let xhrNew = new XMLHttpRequest();
                                        xhrNew.open('GET', 'https://search.misabel.ai/api/user');
                                        xhrNew.onreadystatechange = function () {
                                            if (xhrNew.readyState === 4 && xhrNew.status === 200) {
                                                setCookie(id);
                                                let resp = JSON.parse(xhrNew.responseText);
                                                if (resp.avatarUrl == null) {
                                                    user_signed_in = false;
                                                } else {
                                                    profile = resp
                                                    user_signed_in = true;
                                                    sendResponse(resp);
                                                }
                                            }
                                        }
                                        xhrNew.send();
                                    })
                                },3000)
                            }
                        });
                    }
                    return true;
                }
            }
        }
        return true
    });
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'eventListener') {
            let eventListener = [];
            let XHReventListener = new XMLHttpRequest()
            XHReventListener.open('GET', 'https://home.misabel.ai/shops/plugin/lang/en/EventListener.txt');
            XHReventListener.setRequestHeader('Cache-Control', 'no-cache')
            XHReventListener.onreadystatechange = function () {
                if (XHReventListener.readyState === 4 && XHReventListener.status === 200) {
                    eventListener.push(XHReventListener.responseText)
                    sendResponse(eventListener)
                }
            }
            XHReventListener.send();
            return true
        }
    }
)
