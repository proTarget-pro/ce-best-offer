let ErrorsUser1 = "Wrong item";
let ErrorsUser2 = "Wrong image";
let ErrorsUser3 = "Wrong price";
let linkDPD;
let ErrorsUser = [];
let arrListener = [];

let priceNull = []
let priceShopsHere = []

let dataUpdate;

let result;
let pr

function addGoogleAnalytic() {
    let script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "https://www.googletagmanager.com/gtag/js?id=UA-172539931-1";

    let scriptNew = document.createElement('script');
    scriptNew.type = "text/javascript";
    scriptNew.src = "https://www.googletagmanager.com/gtag/js?id='G-2XNNSR9V0F";

    document.getElementsByTagName('head')[0].appendChild(script);
    document.getElementsByTagName('head')[0].appendChild(scriptNew);
}

function googleAnalytic() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments)
    }
    gtag('js', new Date());
    gtag('config', 'UA-172539931-1');
}

function googleAnalyticNew() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments)
    }
    gtag('js', new Date());
    gtag('config', 'G-2XNNSR9V0F');
}

function graph() {

    let myChart = document.createElement('canvas');
    myChart.id = "myChart";
    myChart.className = "myChart";

    document.getElementById("chart-container").appendChild(myChart)
    let resp = result;
    let price_history = resp.price_history;
    if (price_history != undefined) {
        let priceGraph = [];
        if (price_history.sellers.length > 0) {
            for (value of price_history.sellers) {
                let k = [];
                let p = [];
                for (valueNew of value.data) {
                    k.push(valueNew.date)
                    p.push(valueNew.price)
                }
                priceGraph.push({ basic_color: value.basic_color, date: k, price: p, seller: value.seller })

                let thisInterval = setTimeout(() => {
                    if (document.getElementById("myChart") != null) {

                        let myChart = document.getElementById('myChart').getContext('2d');

                        var newArr = [];
                        var newDate = [];
                        let newPriceGraph = [];

                        let min = '2255-01-01';
                        let max = '1955-01-01';

                        for (let i = 0; i < priceGraph.length; i++) {
                            if (!newPriceGraph.includes(priceGraph[i].seller)) {
                                let seller = priceGraph[i].seller
                                newPriceGraph.push(seller)
                                let color = priceGraph[i].basic_color
                                let date = priceGraph[i].date;
                                let price = priceGraph[i].price;

                                let checkArrDate = [];
                                let massDatePrice = [];

                                date.forEach((item, j) => {
                                    if (item > max) {
                                        max = item
                                    }

                                    if (item < min) {
                                        min = item
                                    }

                                    if (!checkArrDate.includes(item)) {
                                        checkArrDate.push(item)
                                        massDatePrice.push({ x: item, y: price[j] })
                                    }
                                });

                                let newData = [];
                                newData.push({
                                    label: seller,
                                    data: massDatePrice,
                                    backgroundColor: color,
                                    borderWidth: 1,
                                    borderColor: color,
                                    fill: false,
                                    hoverBorderWidth: 2,
                                    hoverBorderColor: '#000'
                                })

                                newDate.push(date)
                                newArr.push(newData);
                            }

                        }
                        let newData2 = [];
                        for (value of newArr) {
                            for (key of value) {
                                newData2.push(key)
                            }
                        }
                        newDate.sort((a, b) => a.length > b.length ? 1 : -1);


                        let NewDataLabel = [];
                        for (valueData of newDate) {
                            for (test of valueData) {
                                NewDataLabel.push(test)
                            }
                        }
                        NewDataLabel.sort((a, b) => a.length > b.length ? 1 : -1);

                        let massPopChart = new Chart(myChart, {

                            type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
                            data: {
                                datasets: newData2,
                            },
                            options: {
                                hover: false,
                                maintainAspectRatio: false,
                                scales: {
                                    xAxes: [{
                                        type: 'time',
                                        distribution: 'series',
                                        time: {
                                            unit: 'week'
                                        }
                                    }]
                                },
                                layout: {
                                    padding: {
                                        left: 50,
                                        right: 0,
                                        bottom: 0,
                                        top: 0
                                    }
                                },
                                tooltips: {
                                    enabled: true
                                },
                                legend: {
                                    display: true,
                                    position: 'right',
                                    labels: {
                                        fontColor: '#000',
                                        labelsColor: 'red',
                                        fontSize: 14
                                    }
                                },
                            }
                        });
                        clearInterval(thisInterval)
                    }
                }, 500)
            }
        } else {
            document.getElementById('myChart').remove();
            document.getElementById('priceHistory').style.visibility = 'hidden'
        }
    }
}

function politClick() {
    const polcheck = document.getElementById('pol_checkbox')
    polcheck.addEventListener(
        "change",
        () => {
            if (document.getElementById('pol_checkbox').checked) {
                document.getElementById('googleButton').disabled = false
            } else {
                document.getElementById('googleButton').disabled = true
            }
        },
    );

    const GOOGLEBTNCLICK = document.getElementById('googleButton')
    GOOGLEBTNCLICK.addEventListener('click', function () {
        signin();
    });
}

function warningclick() {
    document.getElementById('warning').classList.toggle('warningActive')
    document.getElementById('modal-overlay2').style.display = 'block'

    const WARNINGMISSCLICK = document.getElementById('modal-overlay2')
    WARNINGMISSCLICK.addEventListener('click', function (e) {
        if (e.target.dataset.close) {
            document.getElementById('warningWindow').style.display = 'none'
            document.getElementById('modal-overlay2').style.display = 'none'
            document.getElementById('warning').classList.remove('warningActive')
        }
    });

    document.getElementById('warningWindow').style.display = 'flex'

    let ww = document.getElementsByClassName('checkboxWarning')

    let report;

    for (key of ww) {
        key.addEventListener('change', function () {
            if (document.querySelectorAll('input.checkboxWarning:checked').length > 0) {
                document.getElementById('warningSubmit').disabled = false
            } else {
                document.getElementById('warningSubmit').disabled = true
            }
        })
    }

    const WARNINGCANCEL = document.getElementById('warningCancel')
    WARNINGCANCEL.addEventListener('click', () => {
        document.getElementById('warningWindow').style.display = 'none'
        document.getElementById('modal-overlay2').style.display = 'none'
        document.getElementById('warning').classList.remove('warningActive')
        for (let i = 0; i < ww.length; i++) {
            document.getElementsByClassName('checkboxWarning')[i].checked = false
        }
        document.getElementById('warningSubmit').disabled = true
    })

    const WARNINGSUBMIT = document.getElementById('warningSubmit')
    WARNINGSUBMIT.addEventListener('click', () => {
        document.getElementById('warning').classList.remove('warningActive')
        document.getElementById('warningWindow').style.display = 'none'
        document.getElementById('modal-overlay2').style.display = 'none'
        document.getElementById('thanks').style.display = 'block'
        document.getElementById('warningSubmit').disabled = true

        let strTypeError = [];

        let wer = document.querySelectorAll('input.checkboxWarning:checked')
        wer.forEach(element => {
            strTypeError.push(document.getElementById('TypeErrors' + element.id.match(/\d+/gi)[0]).innerHTML)
        });

        report = JSON.stringify({ 'url': window.location.href, typeError: strTypeError })
        for (let i = 0; i < ww.length; i++) {
            document.getElementsByClassName('checkboxWarning')[i].checked = false
        }
        var warXHR = new XMLHttpRequest();
        warXHR.open("POST", 'https://search.misabel.ai/report', true);
        warXHR.setRequestHeader("Content-Type", "application/json");
        warXHR.onreadystatechange = function () {
            if (warXHR.readyState == 4 && warXHR.status == 200) {

            }
        }
        warXHR.send(report);

        setTimeout(() => {
            document.getElementById('thanks').style.display = 'none'
            document.getElementById('modal-overlay2').remove()
        }, 5000)
    })
}

function signin() {
    chrome.runtime.sendMessage({ message: 'login' }, function (response) {
        if (response.avatarUrl == null) {
            document.getElementById('g-signout2').style.display = 'none'
            document.getElementById('g-signin2').style.display = 'block'
            document.getElementById('g-signout2-mob').style.display = 'none'
            document.getElementById('g-signin2-mob').style.display = 'block'
        } else {
            chrome.runtime.sendMessage({ message: 'login' }, function (response) {
                document.getElementById('responseImg').style.backgroundImage = `url(${response.avatarUrl})`
                document.getElementById('responseImg-mob').style.backgroundImage = `url(${response.avatarUrl})`
                document.getElementById('responseImg').style.display = 'block'
                document.getElementById('g-signout2').style.display = 'block'
                document.getElementById('g-signin2').style.display = 'none'
                document.getElementById('g-signout2-mob').style.display = 'block'
                document.getElementById('g-signin2-mob').style.display = 'none'
                oAuthWindow();
                document.getElementById('responsePictureImg').style.backgroundImage = `url(${response.avatarUrl})`
                document.getElementById('responseName').innerHTML = (response.firstName + ' ' + response.lastName)
                document.getElementById('pol_checkbox').checked = false
                document.getElementById('googleButton').disabled = true
                document.getElementById('modal-overlay4').remove()
                addGoogleAnalytic()
                googleAnalytic()
                googleAnalyticNew()
            })
        }
    });
}

function signout() {
    document.getElementById('modal-overlay').style.display = 'block'
    const SINGOUTMISSCLICK = document.getElementById('modal-overlay')

    SINGOUTMISSCLICK.addEventListener('click', function (e) {
        if (e.target.dataset.close) {
            document.getElementById('oauthWindow').style.display = 'none'
            document.getElementById('modal-overlay').style.display = 'none'
        }
    });
    document.getElementById('oauthWindow').style.display = 'flex'

    const LOGOUT = document.getElementById('oauthClosebtn')
    LOGOUT.addEventListener(
        "click",
        () => {
            chrome.runtime.sendMessage({ message: 'logout' }, function (response) {
                if (response !== null) {
                    document.getElementById('g-signout2').style.display = 'none'
                    document.getElementById('g-signin2').style.display = 'block'
                    document.getElementById('g-signout2-mob').style.display = 'none'
                    document.getElementById('g-signin2-mob').style.display = 'block'
                    document.getElementById('modal-overlay').remove();
                };
            });
        }
    )
}

function onclickVhod() {
    mainBar.style.display = (mainBar.style.display === 'none') ? 'block' : 'none';
    localStorage.setItem('hide', mainBar.style.display);
}

function addMiniPlugin() {
    document.body.insertAdjacentHTML('beforeBegin', `
    <div class="pluginMin" id="pluginMin">
    <div class="pluginArrow" id="pluginArrow"></div>
    <div class="pluginMinLogo" id="pluginMinLogo">
    <div class="offersItem" id="offersItem"></div></div>
    </div>`);
}

function oAuthWindow() {
    document.body.insertAdjacentHTML('beforeBegin', `
    <div class="modal-overlay" id="modal-overlay" data-close ="true">
    <div class="oauthWindow" id="oauthWindow">
    <div class="responsePicture" id="responsePicture"><div id="responsePictureImg"></div></div>
    <div class="responseName" id="responseName"><span class="responseEmail" id="responseEmail"></span></div>
    <div class="oauthclose" id="oauthclose"> <button class="oauthClosebtn" id="oauthClosebtn" data-close ="true">Sign out</button></div>
    </div>
    </div>
    `);
}

function signinWindow() {
    document.body.insertAdjacentHTML('beforeBegin', `
    <div class="modal-overlay4" id="modal-overlay4" data-close ="true">
        <div class="signinWindow" id="signinWindow">
            <div class="signin_check">
            <div class="userLogout">
            <div class="userProfile" id="userProfile"></div>
            </div>
                <div class="googleButton_wrapper">
                <button class="googleButton" id="googleButton" data-title="You have to accept Privacy Policy!" disabled>
                    <div class="googleIcon" id="googleIcon"></div>
                    <span>Login with Google</span>
                </button>
                </div>
                <div class="pol_check">
                <label class="pol_checkmark">
                    <input type="checkbox" class="pol_checkbox" id="pol_checkbox">
                    <span class="pol_checkfake" id="pol_checkfake"></span>
                    <span class="privatePolitic">By signing in, you agree that you have read and accept our <span><a href="https://home.misabel.ai/privacy-policy/" target="_blank">Privacy Policy</a></span>.</span>
                </label>
                </div>   
        </div>
        </div>
    </div>
    `);
}

function mobMenu() {
    document.body.insertAdjacentHTML('beforeBegin', `
    <div class="modal-overlay3" id="modal-overlay3" data-close ="true">
        <div class="mobileMenu" id="mobileMenu">
            <div class="priceHistory tooltipPlugin" id="priceHistory-mob"></div>
            <div class="likeOffers tooltipPlugin" id="likeOffers-mob"></div>
            <div class="settings tooltipPlugin" id="settings-mob"></div>
            <div class="warning" id="warning-mob">
                <div class="thanks" id="thanks-mob">Submitted, thank you</div>
            </div>
            <div class="g-signin2" id="g-signin2-mob"></div>
            <div class="g-signout2" id="g-signout2-mob"><div id="responseImg-mob"></div></div>
        </div>
    </div>
    `);
}

function warningWindow() {
    document.body.insertAdjacentHTML('beforeBegin', `
    <div class="modal-overlay2" id="modal-overlay2" data-close ="true">
    <div class="warningWindow" id="warningWindow">
      <div class="check">
        <div class="report">Report</div>
        <div class="wrapperWarningForm" id="wrapperWarningForm">
            <form onsubmit="return false" class="warningForm" id="warningForm">
            <div class="container_wrapper" id="container_wrapper">
            <div class="warningСontainer">
              <label class="checkmark">
                <input type="checkbox" class="checkboxWarning" id="checkbox1">
                <span class="checkfake"></span>
                <span class="TypeErrors" id="TypeErrors1">${ErrorsUser1}</span>
              </label>
            </div>
            <div class="warningСontainer">
              <label class="checkmark">
                <input type="checkbox" class="checkboxWarning" id="checkbox2">
                <span class="checkfake"></span>
                <span class="TypeErrors" id="TypeErrors2">${ErrorsUser2}</span>
              </label>
            </div>
            <div class="warningСontainer">
              <label class="checkmark">
                <input type="checkbox" class="checkboxWarning" id="checkbox3">
                <span class="checkfake"></span>
                <span class="TypeErrors" id="TypeErrors3">${ErrorsUser3}</span>
              </label>
            </div>
          </div>
          <div class="btnWarning">
            <button class="SubmitActive" id="warningSubmit" name="submit" disabled>Submit</button>
            <button class="Cancel" id="warningCancel">Cancel</button>
          </div>
            </form>
        </div>
      </div>
    </div>
    </div>
    `);
}

function createWarningСontainer() {
    ErrorsUser.forEach(element => {
        let warningСontainer = document.createElement('div');
        warningСontainer.className = "warningСontainer";

        let checkmark = document.createElement('label');
        checkmark.className = "checkmark";

        let checkboxWarning = document.createElement('input');
        checkboxWarning.type = "checkbox"
        checkboxWarning.className = "checkboxWarning";

        let checkfake = document.createElement('span');
        checkfake.className = "checkfake";

        let TypeErrors = document.createElement('span');
        TypeErrors.className = "TypeErrors";
        TypeErrors.innerHTML = ErrorsUser[element]

        checkmark.appendChild(checkboxWarning);
        checkmark.appendChild(checkfake);
        checkmark.appendChild(TypeErrors);
        warningСontainer.appendChild(checkmark);
        document.getElementById('mainBar').appendChild(warningСontainer);

        return warningСontainer
    });
}

function subscribeBlock() {
    document.getElementById('pluginArrow').style.background = `url('https://home.misabel.ai/shops/plugin/image/arrowLeftActive.svg')`;
    document.getElementById('pluginArrow').style.backgroundRepeat = 'no-repeat';
    document.getElementById('pluginArrow').style.backgroundPosition = 'center';

    function arrowAnimate() {
        let start = Date.now();
        let timer = setInterval(function () {
            let timePassed = Date.now() - start;
            pluginArrow.style.right = timePassed / 50 + 'px';
            if (timePassed > 250) {
                pluginArrow.style.right = 0;
                clearInterval(timer)
            };
        }, 10);
    }

    setTimeout(() => {
        count = 0;
        intervalId = setInterval(() => {
            count++;
            if (count == 3) {
                clearInterval(intervalId);
            }
            arrowAnimate();
        }, 1000);
    }, 2000);

    setInterval(() => {
        count = 0;
        intervalId = setInterval(() => {
            count++;
            if (count == 3) {
                clearInterval(intervalId);
            }
            arrowAnimate();
        }, 1000);
    }, 17000)

}

function addSellerToBar(value, index, array) {
    if (value.external_url !== null) {
        let logoShop1 = value.external_url.split('.com/')
        let logoShop2 = logoShop1[0].split('//www.')
        logoShop = logoShop2[1]
    } else {
        logoShop = ''
    }

    if (value.price == 999999) {
        value.price = 'N/A'
    }

    let sellerLink = document.createElement('a');
    sellerLink.href = value.external_url;
    sellerLink.target = "_blank";
    sellerLink.className = "sellerLink";

    let seller = document.createElement('div');
    seller.className = "sellerName";

    let imageWrapper = document.createElement('div');
    imageWrapper.className = "imageWrapper";

    let image = document.createElement('img');
    image.src = `https://home.misabel.ai/shops/plugin/image/logoShop/${logoShop}.svg`;
    image.className = "logo";

    let price = document.createElement('p');
    price.textContent = `$${value.price}`;
    price.className = "price";


    imageWrapper.appendChild(image);
    seller.appendChild(imageWrapper);
    seller.appendChild(price);
    sellerLink.appendChild(seller);
    document.getElementById("topOffers").appendChild(sellerLink);
}

function addSellerToInnerBar(value, index, array) {

    if (value.price == 999999) {
        value.price = 'N/A'
    }

    if (value.external_url !== null) {
        let logoShop1 = value.external_url.split('.com/')
        let logoShop2 = logoShop1[0].split('//www.')
        logoShop = logoShop2[1]
    } else {
        logoShop = ''
    }

    let sellerLink = document.createElement('a');
    sellerLink.href = value.external_url;
    sellerLink.target = "_blank";
    sellerLink.className = "sellerLink";

    let seller = document.createElement('div');
    seller.className = "sellerName";

    let imageWrapper = document.createElement('div');
    imageWrapper.className = "imageWrapper";

    let image = document.createElement('img');
    image.src = `https://home.misabel.ai/shops/plugin/image/logoShop/${logoShop}.svg`;
    image.className = "logo";

    let price = document.createElement('p');
    price.textContent = `$${value.price}`;
    price.className = "price";

    imageWrapper.appendChild(image);
    seller.appendChild(imageWrapper);
    seller.appendChild(price);
    sellerLink.appendChild(seller);
    document.getElementById("innerContent").appendChild(sellerLink);
}

function ancorSite() {
    let messageAncorLink = document.createElement('a');
    messageAncorLink.href = linkDPD || 'https://search.misabel.ai/';
    messageAncorLink.target = "_blank";
    messageAncorLink.className = "messageAncorLink";
    messageAncorLink.text = "site";
    document.getElementById("messageNotFound").appendChild(messageAncorLink);
}

function ancorLink() {
    let messageAncorLink = document.createElement('a');
    messageAncorLink.href = linkDPD || 'https://search.misabel.ai/';
    messageAncorLink.target = "_blank";
    messageAncorLink.className = "messageAncorLink";
    messageAncorLink.text = "link";
    document.getElementById("messageNotFound").appendChild(messageAncorLink);
}

function ancorHere() {
    let messageAncorLink = document.createElement('a');
    messageAncorLink.href = linkDPD || 'https://search.misabel.ai/';
    messageAncorLink.target = "_blank";
    messageAncorLink.className = "messageAncorLink";
    messageAncorLink.text = "here";
    document.getElementById("messageNotFound").appendChild(messageAncorLink);
}

function arrUndefind() {
    let messageAncorLink = document.createElement('a');
    messageAncorLink.href = 'https://search.misabel.ai/';
    messageAncorLink.target = "_blank";
    messageAncorLink.className = "messageAncorLink";
    messageAncorLink.text = "search.misabel";
    document.getElementById("messageNotFound").appendChild(messageAncorLink);
}

function clickElementPlugin() {
    const hidePlugin = document.getElementById("hidePlugin");
    hidePlugin.addEventListener(
        "click",
        () => {
            onclickVhod();
            document.getElementById('mainBar').style.transform = `translateX(100%)`;
            document.getElementById('mainBar').style.transition = `transform .2s ease-in`
            document.getElementById('pluginMin').style.transform = `translateX(0)`;
            if (document.getElementById('floating-atc-equity') != null) {
            }
            if (document.getElementById('hf-header') != null) {
                document.getElementById('hf-header').style.top = '0px'
                document.getElementById('hf-header').style.position = 'inherit'
            }
            setTimeout(() => {
                document.getElementById('mainBar').style.display = 'none';
                document.getElementById('pluginMin').style.display = 'flex';
            }, 500)
        },
        false
    );
    const visibilityPlug = document.getElementById("pluginMin");
    visibilityPlug.addEventListener(
        "click",
        () => {
            onclickVhod();
            document.getElementById('mainBar').style.transform = `translateX(0)`;
            document.getElementById('pluginMin').style.transform = `translateX(100%)`;
            document.getElementById('pluginMin').style.transition = `transform .2s ease-in`
            if (document.getElementById('hf-header') != null) {
                document.getElementById('hf-header').style.top = '65px'
                document.getElementById('hf-header').style.position = 'fixed'
            }
            setTimeout(() => {
                document.getElementById('mainBar').style.display = 'flex';
                document.getElementById('pluginMin').style.display = 'none';
            }, 500)
        },
        false
    );

    const warning = document.getElementById("warning");
    warning.addEventListener(
        "click",
        () => {
            warningWindow();
            document.getElementById('warning').classList.toggle('warningActive')

            document.getElementById('modal-overlay2').style.display = 'block'
            warningclick();
        },
        false
    );

    const SIGNIN = document.getElementById('g-signin2');
    SIGNIN.addEventListener(
        "click",
        () => {
            signinWindow();
            document.getElementById('modal-overlay4').style.display = 'block'
            document.getElementById('signinWindow').style.display = 'flex'

            const SIGNINMISSCLICK = document.getElementById('modal-overlay4')

            SIGNINMISSCLICK.addEventListener('click', function (e) {
                if (e.target.dataset.close) {
                    document.getElementById('signinWindow').style.display = 'none'
                    document.getElementById('modal-overlay4').style.display = 'none'
                    document.getElementById('pol_checkbox').checked = false
                    document.getElementById('googleButton').disabled = true
                    document.getElementById('modal-overlay4').remove()
                }
            });
            politClick()
        },
        false
    );

    const SIGNOUT = document.getElementById('g-signout2');
    SIGNOUT.addEventListener(
        "click",
        () => {
            signout();
        },
        false
    );
    const showAllClick = document.getElementById("showAllWrapper");
    const priceHistoryClick = document.getElementById("priceHistory");
    const showAllPhone = document.getElementById("wrapperPhone");
    const hideAllPhone = document.getElementById("wrapperPhoneUp");

    showAllClick.addEventListener(
        "click",
        () => {
            document.getElementById('canvasBar').classList.remove('activePlugin');
            document.getElementById('innerBar').classList.toggle('activePlugin');
            document.getElementById('showAll').classList.toggle('showAllActive');
            document.getElementById('priceHistory').classList.remove('priceHistoryActive');
        },
        false
    );
    priceHistoryClick.addEventListener(
        "click",
        () => {
            document.getElementById('showAll').classList.remove('showAllActive');
            document.getElementById('innerBar').classList.remove('activePlugin');
            document.getElementById('canvasBar').classList.toggle('activePlugin');
            document.getElementById('priceHistory').classList.toggle('priceHistoryActive');
        }
    );

    showAllPhone.addEventListener(
        "click",
        () => {
            document.getElementById('canvasBar').classList.remove('activePlugin');
            document.getElementById('innerBar').classList.toggle('activePlugin');
            document.getElementById('phoneArrow').style.display = 'none';
            document.getElementById('wrapperPhoneUp').style.display = 'flex';
            document.getElementById('innerWrapper').style.top = '65px'
        },
        false
    );
    hideAllPhone.addEventListener(
        "click",
        () => {
            document.getElementById('canvasBar').classList.remove('activePlugin');
            document.getElementById('innerBar').classList.toggle('activePlugin');
            document.getElementById('phoneArrow').style.display = 'flex';
            document.getElementById('wrapperPhoneUp').style.display = 'none';
        },
        false
    );
    const MOBILEMENU = document.getElementById('mobileBurger');
    MOBILEMENU.addEventListener(
        "click",
        () => {
            document.getElementById('modal-overlay3').style.display = 'block'
            document.getElementById('mobileMenu').style.display = 'flex'

            const MOBMENUMISSCLICK = document.getElementById('modal-overlay3')

            MOBMENUMISSCLICK.addEventListener('click', function (e) {
                if (e.target.dataset.close) {
                    document.getElementById('mobileMenu').style.display = 'none'
                    document.getElementById('modal-overlay3').style.display = 'none'
                }
            });

            const priceHistoryClick = document.getElementById("priceHistory-mob");
            priceHistoryClick.addEventListener(
                "click",
                () => {
                    document.getElementById('showAll').classList.remove('showAllActive');
                    document.getElementById('innerBar').classList.remove('activePlugin');
                    document.getElementById('canvasBar').classList.toggle('activePlugin');
                    document.getElementById('priceHistory').classList.toggle('priceHistoryActive');
                    document.getElementById('phoneArrow').style.display = 'block';
                    document.getElementById('innerWrapper').style.top = '72px'
                },
                false
            );

            const warning = document.getElementById("warning-mob");
            warning.addEventListener(
                "click",
                () => {
                    warningWindow();
                    warningclick();
                },
                false
            );
            const SIGNIN = document.getElementById('g-signin2-mob');
            SIGNIN.addEventListener(
                "click",
                () => {
                    signinWindow();
                    document.getElementById('modal-overlay4').style.display = 'block'
                    document.getElementById('signinWindow').style.display = 'flex'

                    const SIGNINMISSCLICK = document.getElementById('modal-overlay4')

                    SIGNINMISSCLICK.addEventListener('click', function (e) {
                        if (e.target.dataset.close) {
                            document.getElementById('signinWindow').style.display = 'none'
                            document.getElementById('modal-overlay4').style.display = 'none'
                        }
                    });
                    politClick()
                },
                true
            );
            const SIGNOUT = document.getElementById('g-signout2-mob');
            SIGNOUT.addEventListener(
                "click",
                () => {
                    signout();
                },
                false
            );
        },
        false
    );
}

function getData(id) {
    let p = new Promise((resolve, reject) => {
        let newColor
        if (document.getElementsByClassName('nav-StoreLogo-link')[0] != null) {
            newColor = document.getElementsByClassName('is-checked')[0].childNodes[0].innerText
        }
        if (document.getElementsByClassName('VariationButton__StyledButtonWrapper-sc-1hf3dzx-0').length > 0) {
            newColor = document.getElementsByClassName('Button__ButtonWithStyles-y45r97-0 SwatchButton-sc-18yljzc-0 cTTKkK KBJVt')[0].childNodes[0].alt
        }
        chrome.runtime.sendMessage({ "url": window.location.href, "variationsColor": newColor, "id": id }, function (response) {
            result = response;
            let resp = response;
            resolve(response)
            let mainBar = document.getElementById('mainBar');

            let checkStatus = new Promise(function (resolve, reject) {

                var thisInterval = setTimeout(() => {

                    if (document.getElementById('wrapperPhone') !== null) {
                        clickElementPlugin()
                        resolve()
                    }
                    clearInterval(thisInterval)
                }, 500)
            });
            checkStatus.then(() => {

                var sellers = resp.sellers;
                let text = document.getElementById("message");
                let textNotFound = document.getElementById("messageNotFound");

                textNotFound.textContent = "At, the moment, this is the best offer!"

                linkDPD = resp.pdp

                // let randPriceNull = Math.floor(Math.random() * priceNull.length);
                // let randPriceShopsHere = Math.floor(Math.random() * priceShopsHere.length);
                var link = document.getElementById('link')
                link.href = resp.pdp;
                if (resp.resolution != 'login') {
                    if (resp.resolution != 'premium') {
                        if (sellers != undefined) {
                            let offers = [];
                            let offersNull = [];
                            for (value of sellers) {
                                for (key of value.offers) {
                                    offers.push({ label: value.label.toLowerCase(), price: key.price, external_url: key.external_url })
                                }
                            }
                            if (offers != undefined) {
                                let offersPrise = []
                                offers = offers.filter(item => item.label != resp.seller.toLowerCase());
    
                                for (value of offers) {
                                    if (value.price !== null) {
                                        offersPrise.push(value)
                                    }
                                    if (value.price == null) {
                                        value.price = 999999;
                                    }
                                }
    
                                offers.sort((a, b) => a.price > b.price ? 1 : -1);
                                if (offers.length > 0) {
                                    function offersItem() {
                                        document.getElementById('offersItem').innerHTML = offersPrise.length;
                                        document.getElementById('offersItem').style.display = 'flex';
                                    }
                                    offersItem();
                                    subscribeBlock();
                                    offers.slice().forEach(addSellerToBar);
                                    offers.slice().forEach(addSellerToInnerBar);
                                    if (offers.length > 4) {
                                        document.getElementById('showAllWrapper').style.display = 'flex'
                                    }
                                    if (offers.length == 4) {
                                        document.getElementById('showAllWrapper').classList.add('arr4')
                                    }
                                    if (offers.length == 3) {
                                        document.getElementById('showAllWrapper').classList.add('arr3')
                                    }
    
                                    offersNull = offers.filter(item => item.price != "N/A")
                                    if (offersNull.length = 0) {
                                        document.getElementById('messageNotFound').style.display = 'block'
                                        document.getElementById('topMenuWrapper').style.display = 'flex'
                                        document.getElementById('LogoWrapper').style.width = '85%'
                                        document.getElementById('logoText').style.display = 'none';
                                        // if (priceNull[randPriceNull].match(/.here./)) {
                                        //     let ancorPrice = priceNull[randPriceNull].split(/.here./)
                                        //     textNotFound.textContent = ancorPrice[0];
                                        //     ancorHere()
                                        // } else if (priceNull[randPriceNull].match(/.link./)) {
                                        //     let ancorLinkText  = priceNull[randPriceNull].split(/.link./)
                                        //     textNotFound.textContent = ancorLinkText[0];
                                        //     ancorLink()
                                        // }
                                        textNotFound.textContent = priceShopsHere[0];
                                        document.getElementById('containerPreload').classList.add('loadingBlock');
                                    } else {
                                        text.textContent = "Best offers:";
                                        document.getElementById('messageNotFound').style.display = 'none';
                                        document.getElementById('offers').style.display = 'flex';
                                        document.getElementById('containerPreload').style.display = 'none';
                                        document.getElementById('LogoWrapper').style.width = '100%';
                                        document.getElementById('logoBlockImg').classList.add('logoBlockImgActive');
                                        document.getElementById('logoText').style.width = '50%';
                                        document.getElementById('logoText').style.display = 'flex';
                                        document.getElementById('topMenuWrapper').style.display = 'flex';
                                        document.getElementById('phoneArrow').style.display = 'block'
                                        document.getElementById('loadingWrap').style.display = 'none'
                                        document.getElementById('priceHistory').style.display = 'block'
                                    }
                                } else {
                                    textNotFound.textContent = priceShopsHere[0];
                                    document.getElementById('messageNotFound').style.display = 'block'
                                    document.getElementById('topMenuWrapper').style.display = 'flex'
                                    document.getElementById('LogoWrapper').style.width = '85%'
                                    document.getElementById('loadingWrap').style.display = 'flex'
                                    document.getElementById('loadingWrap').style.width = '100%'
                                    document.getElementById('logoText').style.display = 'none'
                                    // if (priceShopsHere[randPriceShopsHere].match(/.site./)) {
                                    //     let ancor = priceShopsHere[randPriceShopsHere].split(/.site./)
                                    //     textNotFound.textContent = ancor[0];
                                    //     ancorSite()
                                    // } else {
                                    //     textNotFound.textContent = priceShopsHere[randPriceShopsHere];
                                    // }
                                    document.getElementById('containerPreload').style.display = 'none'
                                    document.getElementById('priceHistory').style.display = 'block';
                                }
                            }
                            else {
                                textNotFound.textContent = priceShopsHere[0];
                                document.getElementById('messageNotFound').style.display = 'none'
                                document.getElementById('containerPreload').classList.add('loadingBlock')
                                document.getElementById('topMenuWrapper').style.display = 'flex'
                                document.getElementById('priceHistory').style.display = 'none'
                            }
    
                        } else {
                            textNotFound.textContent = priceShopsHere[0];
                            // arrUndefind()
                            document.getElementById('messageNotFound').style.display = 'block'
                            document.getElementById('topMenuWrapper').style.display = 'flex'
                            document.getElementById('containerPreload').style.display = 'none'
                            document.getElementById('priceHistory').style.display = 'none'
                            document.getElementById('offers').style.display = 'none'
                        }
                    } else {
                        textNotFound.textContent = resp.message;
                        document.getElementById('loadingWrap').style.width = '100%'
                        document.getElementById('offers').style.display = 'none'
                        document.getElementById('messageNotFound').style.display = 'block'
                        document.getElementById('topMenuWrapper').style.display = 'flex'
                        document.getElementById('containerPreload').style.display = 'none'
                        document.getElementById('priceHistory').style.display = 'none'
                    }
                } else {
                    textNotFound.textContent = resp.message;
                    document.getElementById('loadingWrap').style.width = '100%'
                    document.getElementById('offers').style.display = 'none'
                    document.getElementById('messageNotFound').style.display = 'block'
                    document.getElementById('topMenuWrapper').style.display = 'flex'
                    document.getElementById('containerPreload').style.display = 'none'
                    document.getElementById('priceHistory').style.display = 'none'
                }
            })
        })
    })
    p.then((result) => {
        graph()
    })
}

var xhr = new XMLHttpRequest()
xhr.open('GET', chrome.extension.getURL(`content.html`), true);
xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return
    if (this.status !== 200) return

    let oldURL = window.location.href;
    let currentURL = window.location.href;

    function getLocition() {
        let thisInterval6 = setInterval(() => {
            setTimeout(() => {
                currentURL = window.location.href
                if (currentURL !== oldURL) {
                    oldURL = currentURL;
                    getDataNew(currentURL);
                    if (document.getElementById('myChart') != null) {
                        document.getElementById('myChart').remove()
                    }
                    document.getElementById('topOffers').innerHTML = '';
                    document.getElementById('innerContent').innerHTML = '';
                    document.getElementById('messageNotFound').innerHTML = '';
                    document.getElementById('showAllWrapper').style.display = 'none'
                    document.getElementById('loadingWrap').style.display = 'flex';
                    document.getElementById('containerPreload').style.display = 'flex';
                    clearInterval(thisInterval6)
                } else if (currentURL == oldURL) {
                    clearInterval(thisInterval6)
                }
            }, 1000)

        }, 1000)
    }

    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', getLocition);
    } else {
        document.querySelectorAll('body').forEach(body => {
            body.addEventListener('click', () => {
                getLocition()
            });
        });
    }
    window.onpopstate = function () {
        getLocition()
    }

    document.body.insertAdjacentHTML('beforeBegin', this.responseText)
    document.getElementById('containerPreload').style.display = 'flex'

    window.addEventListener('scroll', function () {
        if (pageYOffset > 100) {
            document.getElementById('mainBar').style.position = 'fixed'
            if (document.getElementById('hf-header') != null) {
                document.getElementById('hf-header').style.top = '65px'
            }
        } else {
            document.getElementById('mainBar').style.position = 'sticky'
        }
        if (document.getElementById('header-region') != null) {
            if (document.getElementById('mainBar').style.display != 'none' && document.getElementById('floating-atc-equity') != null && pageYOffset > 887) {
                document.getElementById('floating-atc-equity').style.top = '65px'
            }
        }
    });

    chrome.runtime.sendMessage({ message: 'SorryPriceNotFound' }, function (response) {
        let test1 = response[0].split('#2')
        let test2 = test1[0].split('#1  //If the parameter contains price = null and the price of the store where we are')
        let test3 = test2[1].split(/\n/)

        for (value of test3) {
            if (value != '') {
                priceNull.push(value)
            }
        }

        let test4 = test1[1].split('//If the product is only the price of the store we are on:')
        let test5 = test4[1].split('#end')
        let test6 = test5[0].split(/\n/)

        for (value of test6) {
            if (value != '') {
                priceShopsHere.push(value)
            }
        }
    })

    chrome.runtime.sendMessage({ message: 'eventListener' }, function (response) {
        let eventListener1 = response[0].split(/\n/);
        eventListener1.forEach(element => {
            if (!element.match(/\#/)) {
                arrListener.push(element)
            }
        });

        let oldURL = window.location.href;
        let currentURL = window.location.href;

        let color = ''
        let newColor

        let size = ''
        let newSize

        // function kohls() {
        //     let old = document.getElementsByClassName('product_boss_tmpl')[0].id
        //     let newnew = document.getElementsByClassName('product_boss_tmpl')[0].id
        //     document.querySelectorAll('a[class="color-swatch"]').forEach(a => {
        //         a.addEventListener('click', () => {
        //             let thisInterval5 = setInterval(() => {
        //                 newnew = document.getElementsByClassName('product_boss_tmpl')[0].id
        //                 if (old != newnew) {
        //                     old = newnew;
        //                     newColor = document.querySelector('.pdp-product-swatch.active').childNodes[1].dataset.skucolor
        //                     if (document.getElementById('myChart') != null) {
        //                         document.getElementById('myChart').remove()
        //                     }
        //                     getDataNew(currentURL, newColor, newSize)
        //                     kohls()
        //                     document.getElementById('topOffers').innerHTML = '';
        //                     document.getElementById('innerContent').innerHTML = '';
        //                     document.getElementById('messageNotFound').innerHTML = '';
        //                     document.getElementById('showAllWrapper').style.display = 'none'
        //                     document.getElementById('loadingWrap').style.display = 'flex';
        //                     document.getElementById('containerPreload').style.display = 'flex';
        //                     clearInterval(thisInterval5)
        //                 }
        //             }, 1000)
        //         });
        //     });
        // }

        // if (document.getElementById('product-specifications') !== null) {

        //     setTimeout(() => {
        //         kohls()
        //     }, 3000)

        // }

        for (let i = 0; i < arrListener.length; i++) {
            if (document.getElementsByClassName(arrListener[i]).length > 0) {
                let rrr = document.getElementsByClassName(arrListener[i])
                for (let j = 0; j < rrr.length; j++) {
                    rrr[j].addEventListener(
                        "click",
                        () => {
                            if (document.getElementsByClassName('VariationButton__StyledButtonWrapper-sc-1hf3dzx-0').length > 0) {
                                newColor = rrr[j].childNodes[0].firstChild.alt
                                if (document.getElementsByClassName('Button__ButtonWithStyles-y45r97-0 StyledButton__VariationButton-qhksha-0 fVCKBw bWBzvh') != null) {
                                    let rty = document.getElementsByClassName('Button__ButtonWithStyles-y45r97-0 StyledButton__VariationButton-qhksha-0 fVCKBw jcCSHs')
                                    for (let s = 0; s < rty.length; s++) {
                                        newSize = rty[s].childNodes[0].data
                                    }
                                }
                            } else if (document.getElementsByClassName('_1gnkU _3aM_-').length > 0) {
                                if (document.getElementsByClassName('_3-u9M') != null) {
                                    setTimeout(() => {
                                        newColor = document.getElementsByClassName('_3-u9M CK8Uj')[0].attributes[2].nodeValue
                                        if (document.getElementsByClassName('_2-kKt') != null) {
                                            let rtr = document.getElementsByClassName('_2CqxF')
                                            for (let w = 0; w < rtr.length; w++) {
                                                if (rtr[w] = document.getElementsByClassName('gwoO1 _3YR5_ kkuXk')[1]) {
                                                    newSize = document.getElementsByClassName('gwoO1 _3YR5_ kkuXk')[1].innerHTML
                                                }
                                            }
                                        }
                                    }, 1000)
                                }
                            } else if (document.getElementsByClassName('op-column op-top order-panel-mobile').length > 0) {

                                newColor = document.getElementsByClassName('color-swatch selected')[0].childNodes[1].ariaLabel

                                if (document.getElementsByClassName('swatch-itm static selected').length > 0) {
                                    newSize = document.getElementsByClassName('swatch-itm static selected')[0].innerText
                                }

                            } else if (document.getElementById('sku_sizes') != null) {
                                let rrt = document.getElementsByName('sku_sizes')
                                for (let i = 0; i < rrt.length; i++) {
                                    setTimeout(() => {
                                        if (rrt[i].checked == true) {
                                            newSize = rrt[i].value
                                        }
                                    }, 1000)
                                }
                            }

                            let thisInterval2 = setInterval(() => {
                                setTimeout(() => {
                                    currentURL = window.location.href
                                }, 1000)

                                if (currentURL != oldURL) {
                                    oldURL = currentURL;
                                    pr.then((id) => {
                                        getDataNew(currentURL, id);
                                    })
                                    if (document.getElementById('myChart') != null) {
                                        document.getElementById('myChart').remove()
                                    }
                                    document.getElementById('topOffers').innerHTML = '';
                                    document.getElementById('innerContent').innerHTML = '';
                                    document.getElementById('messageNotFound').innerHTML = '';
                                    document.getElementById('showAllWrapper').style.display = 'none'
                                    document.getElementById('loadingWrap').style.display = 'flex';
                                    document.getElementById('containerPreload').style.display = 'flex';
                                    clearInterval(thisInterval2)
                                }
                                else if (color != newColor || size != newSize) {
                                    color = newColor
                                    size = newSize
                                    pr.then((id) => {
                                        getDataNew(currentURL, newColor, newSize, id)
                                    })
                                    if (document.getElementById('myChart') != null) {
                                        document.getElementById('myChart').remove()
                                    }
                                    document.getElementById('topOffers').innerHTML = ''
                                    document.getElementById('innerContent').innerHTML = ''
                                    document.getElementById('messageNotFound').innerHTML = ''
                                    document.getElementById('showAllWrapper').style.display = 'none'
                                    document.getElementById('loadingWrap').style.display = 'flex'
                                    document.getElementById('containerPreload').style.display = 'flex'
                                    clearInterval(thisInterval2)
                                }
                            }, 1000)
                        },
                        false
                    );
                }
            }
        }
    })

    chrome.runtime.sendMessage({ message: 'TypeErrorsUser' }, function (response) {
        let test1 = response[0].split(/\n/)
        let qwe = []
        for (value of test1) {
            if (value.match(/\#/)) {
                qwe.push(value)
            }
        }
        let qwer = []
        qwe.forEach(element => {
            qwer.push(element.split(/\#\d\s/)[1])
        });

        ErrorsUser = [qwer.length]

        for (let i = 0; i < qwer.length; i++) {
            ErrorsUser[i] = qwer[i]
        }

        ErrorsUser1 = qwer[0]
        ErrorsUser2 = qwer[1]
        ErrorsUser3 = qwer[2]

        if (qwer[0] != undefined) {
            ErrorsUser3 = qwer[0]
        }

        if (qwer[1] != undefined) {
            ErrorsUser3 = qwer[1]
        }

        if (qwer[2] != undefined) {
            ErrorsUser3 = qwer[2]
        }
    })
    mobMenu()
    chrome.runtime.sendMessage({ message: 'isUserSignedIn' }, function (response) {
        if (response.avatarUrl != undefined || response.avatarUrl != null) {
            document.getElementById('g-signin2').style.display = 'none'
            document.getElementById('g-signout2').style.display = 'block'
            document.getElementById('g-signin2-mob').style.display = 'none'
            document.getElementById('g-signout2-mob').style.display = 'block'
            document.getElementById('responseImg').style.backgroundImage = `url(${response.avatarUrl})`;
            document.getElementById('responseImg-mob').style.backgroundImage = `url(${response.avatarUrl})`;
            document.getElementById('responseImg').style.display = 'block'
            oAuthWindow();
            document.getElementById('responsePictureImg').style.backgroundImage = `url(${response.avatarUrl})`;
            document.getElementById('responseName').innerHTML = (response.firstName + ' ' + response.lastName)
            addGoogleAnalytic()
            googleAnalytic()
            googleAnalyticNew()
        } else {
            document.getElementById('g-signin2').style.display = 'block'
            document.getElementById('g-signout2').style.display = 'none'
            document.getElementById('g-signin2-mob').style.display = 'block'
            document.getElementById('g-signout2-mob').style.display = 'none'
        }
    })

    document.addEventListener('readystatechange', () => {
        if (document.readyState == 'complete') {
            if(document.querySelectorAll('script[type="application/ld+json"]').length > 0){
                console.log(document.querySelectorAll('script[type="application/ld+json"]') );
                pr = new Promise(function (resolve, reject){
                    let script = document.querySelectorAll('script[type="application/ld+json"]')
                    script.forEach(element => {
                        let id = {}
                        let ttrt = JSON.parse(element.childNodes[0].data)
                        console.log(ttrt);
                        let a = Array.isArray(ttrt)
                        switch (a) {
                        case true:
                            ttrt.forEach(element => {
                                if (element['@type'] == "Product" && element['@context'] == "http://schema.org") {
                                    id = { '@context': element['@context'], "@type": element['@type'], "name": element.name, "image": [element.image] }
                                } else if(element['@type'] == "Product" && element['@context'] == "https://schema.org"){
                                    id = { '@context': element['@context'], "@type": element['@type'], "name": element.name, "image": [element.image] }
                                }
                            });
                            resolve(id)
                            console.log('true');
                            break;
                        case false:
                            if(ttrt['@type'] !== "Product" && ttrt['@context'] !== "http://schema.org"){
                                id = {}
                                console.log('6');
                            }
                            else if (ttrt['@type'] == "Product" && ttrt['@context'] == "http://schema.org") {
                                id = { '@context': ttrt['@context'], "@type": ttrt['@type'], "name": ttrt.name, "image": [ttrt.image] }
                                console.log('1');
                            } else if (ttrt['@graph'] != null) {
                                keys = Object.keys(ttrt)
                                for (var i = 0, l = keys.length; i < l; i++) {
                                    let ffg = ttrt[keys[i]]
                                    for (value of ffg) {
                                        if (value['@type'] == "Product" && value['@context'] == "http://schema.org") {
                                            id = { '@context': value['@context'], "@type": value['@type'], "name": value.name, "image": [value.image] }
                                        }
                                    }
                                }
                                console.log('2');

                            } else if(ttrt['@context'] == "https://schema.org" && ttrt["@type"] == "Product"){
                                id = { '@context': ttrt['@context'], "@type": ttrt['@type'], "name": ttrt.name, "image": [ttrt.image] }
                                console.log('3');

                            } else if(ttrt['@type'] == "Product" && ttrt['@context'] == "https://schema.org/"){
                                id = { '@context': ttrt['@context'], "@type": ttrt['@type'], "name": ttrt.name, "image": [ttrt.image] }
                                console.log('4');

                            } else if(ttrt['@context'] == "http://schema.org/" && ttrt['@type'] == "Product"){
                                id = { '@context': ttrt['@context'], "@type": ttrt['@type'], "name": ttrt.name, "image": [ttrt.image] }
                                console.log('5');
                                resolve(id) 
                            } else{
                                id = {}
                                resolve(id) 
                            }

                            if(id['@context'] !== undefined){
                                resolve(id) 
                            }                         
                            break; 
                        }
                    });

                })
                pr.then((id) => {
                    console.log(id);
                    if(id.name != null){
                        getData(id)
                    } else{
                        getData()
                    }
                })
            } else {
                getData()
            }

            addMiniPlugin()

            if (localStorage.getItem('hide') === null) {
                document.getElementById('mainBar').style.display = 'flex'
                document.getElementById('pluginMin').style.display = 'none'
            }

            if (localStorage.getItem('hide') == 'block') {
                if (document.getElementById('hf-header') != null) {
                    document.getElementById('hf-header').style.top = '65px'
                    document.getElementById('hf-header').style.position = 'fixed'
                }
                document.getElementById('mainBar').style.display = 'flex'
                document.getElementById('pluginMin').style.display = 'none'
            }

            if (localStorage.getItem('hide') == 'none') {
                if (document.getElementById('hf-header') != null) {
                    document.getElementById('hf-header').style.top = '0px'
                    document.getElementById('hf-header').style.position = 'inherit'
                }
                document.getElementById('mainBar').style.display = 'none'
                document.getElementById('pluginMin').style.display = 'flex'
            }
        }
    });
};
xhr.send();

function getDataNew(currentURL, newColor, newSize, id) {
    if (document.getElementsByClassName('nav-StoreLogo-link')[0] != null) {
        newColor = document.getElementsByClassName('is-checked')[0].childNodes[0].innerText
    } else if (document.getElementsByClassName('VariationButton__StyledButtonWrapper-sc-1hf3dzx-0').length > 0) {
        newColor = document.getElementsByClassName('Button__ButtonWithStyles-y45r97-0 SwatchButton-sc-18yljzc-0 cTTKkK KBJVt')[0].childNodes[0].alt
    }
    let promise = new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage({ "url": currentURL, "variationsColor": newColor, "variationsSize": newSize, "id": id }, function (response) {
            result = response;
            resolve(result)
            let resp = response;
            let sellers = resp.sellers;
            let text = document.getElementById("message");
            let textNotFound = document.getElementById("messageNotFound");

            linkDPD = resp.pdp
            // let randPriceNull = Math.floor(Math.random() * priceNull.length);
            // let randPriceShopsHere = Math.floor(Math.random() * priceShopsHere.length);
            var link = document.getElementById('link')
            link.href = resp.pdp;
            if (resp.resolution != 'login') {
                if (resp.resolution != 'premium') {
                    if (sellers != undefined) {
                        let offers = [];
                        let offersNull = [];
                        for (value of sellers) {
                            for (key of value.offers) {
                                offers.push({ label: value.label.toLowerCase(), price: key.price, external_url: key.external_url })
                            }
                        }
                        if (offers != undefined) {
                            let offersPrise = []
                            offers = offers.filter(item => item.label != resp.seller.toLowerCase());

                            for (value of offers) {
                                if (value.price !== null) {
                                    offersPrise.push(value)
                                }
                                if (value.price == null) {
                                    value.price = 999999;
                                }
                            }

                            offers.sort((a, b) => a.price > b.price ? 1 : -1);
                            if (offers.length > 0) {
                                function offersItem() {
                                    document.getElementById('offersItem').innerHTML = offersPrise.length;
                                    document.getElementById('offersItem').style.display = 'flex';
                                }
                                offersItem();
                                subscribeBlock();
                                offers.slice().forEach(addSellerToBar);
                                offers.slice().forEach(addSellerToInnerBar);
                                if (offers.length > 4) {
                                    document.getElementById('showAllWrapper').style.display = 'flex'
                                }
                                if (offers.length == 4) {
                                    document.getElementById('showAllWrapper').classList.add('arr4')
                                }
                                if (offers.length == 3) {
                                    document.getElementById('showAllWrapper').classList.add('arr3')
                                }

                                offersNull = offers.filter(item => item.price != "N/A")
                                if (offersNull.length = 0) {
                                    document.getElementById('messageNotFound').style.display = 'block'
                                    document.getElementById('topMenuWrapper').style.display = 'flex'
                                    document.getElementById('LogoWrapper').style.width = '85%'
                                    document.getElementById('logoText').style.display = 'none';
                                    // if (priceNull[randPriceNull].match(/.here./)) {
                                    //     let ancorPrice = priceNull[randPriceNull].split(/.here./)
                                    //     textNotFound.textContent = ancorPrice[0];
                                    //     ancorHere()
                                    // } else if (priceNull[randPriceNull].match(/.link./)) {
                                    //     let ancorLinkText  = priceNull[randPriceNull].split(/.link./)
                                    //     textNotFound.textContent = ancorLinkText[0];
                                    //     ancorLink()
                                    // }
                                    textNotFound.textContent = priceShopsHere[0];
                                    document.getElementById('containerPreload').classList.add('loadingBlock');
                                } else {
                                    text.textContent = "Best offers:";
                                    document.getElementById('messageNotFound').style.display = 'none';
                                    document.getElementById('offers').style.display = 'flex';
                                    document.getElementById('containerPreload').style.display = 'none';
                                    document.getElementById('LogoWrapper').style.width = '100%';
                                    document.getElementById('logoBlockImg').classList.add('logoBlockImgActive');
                                    document.getElementById('logoText').style.width = '50%';
                                    document.getElementById('logoText').style.display = 'flex';
                                    document.getElementById('topMenuWrapper').style.display = 'flex';
                                    document.getElementById('phoneArrow').style.display = 'block'
                                    document.getElementById('loadingWrap').style.display = 'none'
                                    document.getElementById('priceHistory').style.display = 'block'
                                }
                            } else {
                                textNotFound.textContent = priceShopsHere[0];
                                document.getElementById('messageNotFound').style.display = 'block'
                                document.getElementById('topMenuWrapper').style.display = 'flex'
                                document.getElementById('LogoWrapper').style.width = '85%'
                                document.getElementById('loadingWrap').style.display = 'flex'
                                document.getElementById('loadingWrap').style.width = '100%'
                                document.getElementById('logoText').style.display = 'none'
                                // if (priceShopsHere[randPriceShopsHere].match(/.site./)) {
                                //     let ancor = priceShopsHere[randPriceShopsHere].split(/.site./)
                                //     textNotFound.textContent = ancor[0];
                                //     ancorSite()
                                // } else {
                                //     textNotFound.textContent = priceShopsHere[randPriceShopsHere];
                                // }
                                document.getElementById('containerPreload').style.display = 'none'
                                document.getElementById('priceHistory').style.display = 'block';
                            }
                        }
                        else {
                            textNotFound.textContent = priceShopsHere[0];
                            document.getElementById('messageNotFound').style.display = 'none'
                            document.getElementById('containerPreload').classList.add('loadingBlock')
                            document.getElementById('topMenuWrapper').style.display = 'flex'
                            document.getElementById('priceHistory').style.display = 'none'
                        }

                    } else {
                        textNotFound.textContent = priceShopsHere[0];
                        // arrUndefind()
                        document.getElementById('messageNotFound').style.display = 'block'
                        document.getElementById('topMenuWrapper').style.display = 'flex'
                        document.getElementById('containerPreload').style.display = 'none'
                        document.getElementById('priceHistory').style.display = 'none'
                        document.getElementById('offers').style.display = 'none'
                    }
                } else {
                    textNotFound.textContent = resp.message;
                    document.getElementById('loadingWrap').style.width = '100%'
                    document.getElementById('offers').style.display = 'none'
                    document.getElementById('messageNotFound').style.display = 'block'
                    document.getElementById('topMenuWrapper').style.display = 'flex'
                    document.getElementById('containerPreload').style.display = 'none'
                    document.getElementById('priceHistory').style.display = 'none'
                }
            } else {
                textNotFound.textContent = resp.message;
                document.getElementById('loadingWrap').style.width = '100%'
                document.getElementById('offers').style.display = 'none'
                document.getElementById('messageNotFound').style.display = 'block'
                document.getElementById('topMenuWrapper').style.display = 'flex'
                document.getElementById('containerPreload').style.display = 'none'
                document.getElementById('priceHistory').style.display = 'none'
            }
        })
    })
    promise.then((result) => {
        graph();
    })
}