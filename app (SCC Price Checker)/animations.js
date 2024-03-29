function getSearch() {
    // change the following line for real data when available
    availableStocks = {
        "Adobe Inc": "ADBE",
        "Alphabet Inc Class A": "GOOGL",
        "Amazon.com, Inc.": "AMZN",
        "American Airlines Group Inc": "AAL",
        "Apple Inc.": "AAPL",
        "Autodesk, Inc.": "ADSK",
        "Facebook, Inc. Common Stock": "FB",
        "Microsoft Corporation": "MSFT",
        "Tesla Inc": "TSLA"
    };
    availableCurrencyMaster = {
        "Canadian Dollar": "CAD",
        "Chinese Yuan": "CNY",
        "Euro": "EUR",
        "Indian Rupee": "INR",
        "Japanese Yen": "JPY",
        "Pound Sterling": "GBP",
        "Singapore Dollar": "SGD",
        "United States Dollar": "USD"
    };
    availableCryptocurrencyMaster = {
        "Bitcoin": "BTC",
        "Ethereum": "ETH"
    };
    availableCurrency = {};
    availableCryptocurrency = {};
    for (item in availableCurrencyMaster) {
        if (availableCurrencyMaster[item] != currentCurrency) {
            availableCurrency[item] = availableCurrencyMaster[item];
        };
    };
    for (item in availableCryptocurrencyMaster) {
        if (availableCryptocurrencyMaster[item] != currentCurrency) {
            availableCryptocurrency[item] = availableCryptocurrencyMaster[item];
        };
    };

    currentPrice = 987.65;
    currentTrend = 2; // 0 for down, 1 for neutral, 2 for up
    // End of to-change
    // vars of list. Part 1 is any inititals matching. Part 2 is if the key is cointained in any part of the string. Part 2 shows after Part 1.
    var availableStocksList = [];
    var availableStocksListPart2 = [];
    var availableCurrencyList = [];
    var availableCurrencyListPart2 = [];
    var availableCryptocurrencyList = [];
    var availableCryptocurrencyListPart2 = [];
    searchKey = $("#searchBar").val();
    // loops through all the 3 types and search for any matching keys
    for (var stockName in availableStocks) {
        if (searchKey.toUpperCase() == stockName.substr(0, searchKey.length).toUpperCase() || searchKey.toUpperCase() == availableStocks[stockName].substr(0, searchKey.length).toUpperCase()) {
            availableStocksList.push([stockName, availableStocks[stockName]]);
        } else if ((stockName.toUpperCase()).includes(searchKey.toUpperCase()) || (availableStocks[stockName].toUpperCase()).includes(searchKey.toUpperCase())) {
            availableStocksListPart2.push([stockName, availableStocks[stockName]]);
        };
    };
    for (var curName in availableCurrency) {
        if (searchKey.toUpperCase() == curName.substr(0, searchKey.length).toUpperCase() || searchKey.toUpperCase() == availableCurrency[curName].substr(0, searchKey.length).toUpperCase()) {
            availableCurrencyList.push([curName, availableCurrency[curName]]);
        } else if ((curName.toUpperCase()).includes(searchKey.toUpperCase()) || (availableCurrency[curName].toUpperCase()).includes(searchKey.toUpperCase())) {
            availableCurrencyListPart2.push([curName, availableCurrency[curName]]);
        };
    };
    for (var coinName in availableCryptocurrency) {
        if (searchKey.toUpperCase() == coinName.substr(0, searchKey.length).toUpperCase() || searchKey.toUpperCase() == availableCryptocurrency[coinName].substr(0, searchKey.length).toUpperCase()) {
            availableCryptocurrencyList.push([coinName, availableCryptocurrency[coinName]]);
        } else if ((coinName.toUpperCase()).includes(searchKey.toUpperCase()) || (availableCryptocurrency[coinName].toUpperCase()).includes(searchKey.toUpperCase())) {
            availableCryptocurrencyListPart2.push([coinName, availableCryptocurrency[coinName]]);
        };
    };
    // combining the two lists
    availableStocksList = [...availableStocksList, ...availableStocksListPart2];
    availableCurrencyList = [...availableCurrencyList, ...availableCurrencyListPart2];
    availableCryptocurrencyList = [...availableCryptocurrencyList, ...availableCryptocurrencyListPart2];
    return [availableStocksList, availableCurrencyList, availableCryptocurrencyList];
};  

function switchContent(clickedID) {
    var contents = ["#stocks", "#currency", "#cryptocurrency"];
    if (clickedID != searchContent) {
        $(contents[clickedID]).animate({
            color: "#FBFBFF"
        }, 50);
        $(contents[searchContent]).animate({
            color: "#787878"
        }, 50);
        searchContent = clickedID;
        searchBarSearch(clickedID, 1);
    };
};

function hoverContent(hoverID) {
    var contents = ["#stocks", "#currency", "#cryptocurrency"]
    if (hoverID != searchContent) {
        $(contents[hoverID]).animate({
            color: "#FBFBFF"
        }, 50);
    };
};

function unhoverContent(hoverID) {
    var contents = ["#stocks", "#currency", "#cryptocurrency"]
    if (hoverID != searchContent) {
        $(contents[hoverID]).animate({
            color: "#787878"
        }, 50);
    };
};

function searchBarSearchEnd() {
    setTimeout(function() {
        $(".dropdownElementIcon").animate({
            "backgroundColor": iconColours[searchContent]
        }, 0);
    }, 150);
    setTimeout(function() {
        if (noResults == 0) {
            $(".dropdownElementMaster").hover(function() {
                $(this).stop().animate({
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                }, 100);
            }, function() {
                $(this).stop().animate({
                    backgroundColor: "transparent"
                }, 100);
            });
            $(".dropdownElementMaster").css({
                "cursor": "hand"
            });
            $(".dropdownElementMaster").click(function() {
                if (itemPriceClick == 0) {
                    dropdownElementMasterClicked($(this), 0);
                };
                itemPriceClick = 0;
            })
        } else {
            $(".dropdownElementMaster").css({
                "cursor": "default"
            });
        };
    }, 150);
};

function searchBarSearch(clickedID, type) { // type is just used to bypass same search check
    if ($("#searchBar").val() != previousSearch || type == 1) { // checking for if the search is the same (e.g. pressing control button)
        setTimeout(function() {
            $(".dropdownElementMaster").remove();
        }, 50);
        if ($("#searchBar").val() != "") { // checking for non-empty value
            // $("#searchIcon").hide();
            var displayableList = getSearch(); // search for appropriate items
            var displayableListLengths = [-1, -1, -1]; // lengths of each list in displayableList
            var multiplier = 0; // how much should the search bar drop down by
            var lengthsSum = 0;
            displayableListLengths[searchContent] = displayableList[searchContent].length;
            if (displayableListLengths[searchContent] != 0) {
                multiplier += (displayableListLengths[searchContent]);
            };
            if (multiplier >= 9) { // maximum drop of 450px, total 500px
                multiplier = 9;
            } else if (multiplier == 0) { // for "No Search Results"
                multiplier = 1;
            };
            $("#searchBar").animate({ // dropdown animation
                height: (multiplier * 50 + 52).toString() + "px",
                paddingBottom: (multiplier * 50 + 7).toString() + "px"
            },  0);
            $("#options").animate({ // available options master div
                height: (multiplier * 50).toString() + "px",
                marginTop: (multiplier * - 50 - 2).toString() + "px"
            }, 0);
            $("#searchDivider").animate({ // show the divider between searchbar and options
                opacity: "1"
            }, 50);
            $("#topAssetsBody, #topAssets, #topAssetsDivider0").animate({
                marginTop: $(window).height(),
                opacity: 0
            }, 250);
            window.AssetName = {}
            setTimeout(function() {
                for (var i = 0; i < 3; i++) {
                    lengthsSum += displayableListLengths[i];
                };
                if (lengthsSum != -2) {
                    for (var i = 0; i < displayableListLengths[searchContent]; i++) {
                        // console.log(displayableList[searchContent][i][1], searchContent + 1, currentCurrency, apiKeys[i % 12], i, displayableList, searchContent);
                        // console.log(apiKeyToUse);
                        // var apiKeyToUse = getApiKeyIndex();
                        // CurrentAssetPrice(displayableList[searchContent][i][1], searchContent + 1, currentCurrency, apiKeyToUse, i, displayableList, searchContent, 1, -1);
                        
                        // currentPrice = Math.round(Math.random() * 10000)/100;
                        // currentTrend = Math.round(Math.random() * 2);
                        
                        currentPrice = "Fetch Price";
                        currentTrend = 1;

                        $(".dropdownAppender").append(
                            "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                            + "<div class = 'dropdownElementIcon' id = 'itemIcon'></div>"
                            + "<div class = 'dropdownElement' id = 'itemShortName'>" + displayableList[searchContent][i][1] + "</div>" 
                            + "<div class = 'dropdownElement' id = 'itemLongName'>" + displayableList[searchContent][i][0] + "</div>" 
                            + "<div class = 'dropdownElement' id = 'itemPrice" + i.toString() + "' style = 'width: 125px; text-align: center; margin-top: -12.5px; padding-top: 12.5px;'>" + currentPrice + "</div>"
                            + "</div>"
                        );
                        if (currentTrend == 2) {
                            $("#itemPrice" + i.toString()).animate({
                                color: "#32a852"
                            }, 0);
                        } else if (currentTrend == 0) {
                            $("#itemPrice" + i.toString()).animate({
                                color: "#a83232"
                            }, 0);
                        } else {
                            $("#itemPrice" + i.toString()).animate({
                                color: "#FFFFFF"
                            }, 0);
                        };
                        $("#itemPrice" + i).click(function() {
                            itemPriceClick = 1;
                            if ($(this).siblings("#itemShortName").html() == "BTC" || $(this).siblings("#itemShortName").html() == "ETH") {
                                var currencyType = 3;
                            } else if (supportedCurrencies.includes($(this).siblings("#itemShortName").html())) {
                                var currencyType = 2;
                            } else {
                                var currencyType = 1;
                            };
                            // console.log($(this).siblings("#itemShortName").html(), currencyType, currentCurrency, getApiKeyIndex(), -1, -1, -1, 0, $(this));
                            CurrentAssetPrice($(this).siblings("#itemShortName").html(), currencyType, currentCurrency, getApiKeyIndex(), -1, -1, -1, 0, $(this));
                        });
                        $("#itemPrice" + i).css({
                            borderRadius: "25px"
                        });
                        $("#itemPrice" + i).hover(function() {
                            $(this).animate({
                                backgroundColor: "rgba(255, 255, 255, 0.1)"
                            }, 200);
                        }, function() {
                            $(this).animate({
                                backgroundColor: "transparent"
                            }, 200);
                        });
                    };
                    noResults = 0
                } else {
                    $(".dropdownAppender").append(
                        "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                        + "<div class = 'dropdownElement' id = 'noResultsFoundText'>No Results Found</div>"
                        + "</div>"
                        );
                    noResults = 1
                };
                searchBarSearchEnd();
            }, 75);
        } else {
            // $("#searchIcon").show();
            $("#searchBar").animate({ // collapse animation
                height: "50px",
                paddingBottom: "7px"
            }, 100);
            $("#searchDivider").animate({ // available options master div
                opacity: "0"
            }, 50);
            $("#options").animate({ // hides the divider between searchbar and options
                height: "0px",
                marginTop: "0px"
            }, 100);
            $("#topAssetsBody").animate({
                marginTop: $(window).height() * 0.45,
                opacity: 1
            }, 400);
            $("#topAssets").animate({
                marginTop: $(window).height() * 0.36,
                opacity: 1
            }, 400);
            $("#topAssetsDivider0").animate({
                marginTop: $(window).height() * 0.41,
                opacity: 1
            }, 400);
        };
    };
    previousSearch = $("#searchBar").val();
};

function dropdownElementMasterClicked(thisElement, dropdownOrTop) {
    if (dropdownOrTop == 0) {
        currentOverlayAsset = thisElement.find("#itemShortName").html();
        showAssetOverlay(thisElement.find("#itemShortName").html(), thisElement.find("#itemLongName").html());
    } else {
        currentOverlayAsset = thisElement.find(".topAssetsShortName").html();
        showAssetOverlay(thisElement.find(".topAssetsShortName").html(), thisElement.find(".topAssetsLongName").html());
    };
    assetOverlayEnabled = 1;
    setTimeout(function() {
        if (searchContent == 1 || searchContentTopAsset == 1) {
            $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                stroke: "#20BF55"
            });
            $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                fill: "url(#MyGradient2)"
            });
        } else if (searchContent == 2 || searchContentTopAsset == 2) {
            $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                stroke: "#eaee00"
            });
            $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                fill: "url(#MyGradient3)"
            });
        } else {
            $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                stroke: "#01BAEF"
            });
            $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                fill: "url(#MyGradient1)"
            });
        };
        $("#assetOverlayCostPrice").val(currentCurrency + window.chartValues[window.chartValues.length - 1]);
        $("#assetOverlayAssetPrice").html(currentCurrency + window.chartValues[window.chartValues.length - 1]);
        if (searchContentTopAsset != searchContent) {
            if (searchContent > searchContentTopAsset) {
                var tempSearchContent = searchContent;
            } else {
                var tempSearchContent = searchContentTopAsset
            };
        } else {
            var tempSearchContent = searchContent
        };
        $("#assetOverlayRangeCalculatorLabel").css({
            color: iconColours[tempSearchContent]
        });
        costCalculatorCalculate();
        profitCalculatorCalculate();
    }, 150);
};

function searchBarHighlight() {
    $("#searchBar").css({
        border: "2px solid #757575",
        boxShadow: "#757575 0px 0px 8px 0px"
    }, 200);
};

function searchBarUnHighlight() {
    $("#searchBar").css({
        border: "1px solid rgb(180, 180, 180)",
        boxShadow: "none"
    }, 200);
};

function searchCurrency1Click() {
    if (currencyChangeClicked == 0) {
        $("#searchCurrency").animate({
            height: "350px",
            backgroundColor: "#333333",
            borderRadius: "10px"
        }, 250);
        // $(".searchCurrencyList").show(300);
        $(".searchCurrencyList").animate({
            opacity: "1",
        }, 250);
        $(".searchCurrencyList").css({
            cursor: "pointer"
        });
        currencyChangeClicked = 1;
    } else {
        $("#searchCurrency").animate({
            height: "35px",
            backgroundColor: "#121212",
            borderRadius: "12.5px"
        }, 250);
        $(".searchCurrencyList").animate({
            opacity: "0"
        }, 10);
        $(".searchCurrencyList").css({
            cursor: "default"
        });
        $("#searchCurrencyList1").css({
            cursor: "pointer"
        });
        $("#searchCurrencyList1").stop().animate({
            opacity: "1"
        }, 0);
        currencyChangeClicked = 0;
    };
};

function hideAssetOverlay() {
    $("#assetOverlayFilter").animate({
        marginTop: (-8 - ($(window).height() * 3)).toString() + "px"
    }, 400);
    $("#searchBarDiv").animate({
        zIndex: 2
    }, 400);
    $("#assetOverlay").animate({
        marginTop: ($(window).height() * -1).toString() + "px"
    }, 400);
    assetOverlayEnabled = 0;
    currentOverlayAsset = "";
    searchContentTopAsset = 0;
};

function showAssetOverlayPart2(shortAssetName) {
    if (shortAssetName == "BTC" || shortAssetName == "ETH") {
        var type = 3;
    } else if (supportedCurrencies.includes(shortAssetName)) {
        type = 2;
    } else {
        type = 1;
    };
    if (type == 1) {
        randomOrNot = 0;
        GraphPrice(shortAssetName, type, currentCurrency, assetOverlayRange - 1, "4RWXX1WJ5GKA7FQ2", searchContent, searchContentTopAsset, currentCurrency);
    } else {
        randomOrNot = 1;
        // globalling
        window.searchContent = searchContent;
        window.searchContentTopAsset = searchContentTopAsset;
        window.currentCurrency = currentCurrency;
        // Replace following lines of code when real data is available
        window.chartValues = []
        for (var index = 0; index < 200; index++) {
            window.chartValues.push(Math.round(Math.random() * Math.random() * Math.random() * 1 * 100) / 100);
        };
        window.chartData = {
            labels: [],
            series: [window.chartValues]
        };
        // End of replacement
        window.chartDataOptions = {
            width: $(window).width() * 0.2 + 900,
            height: $(window).height() * 0.4 + 100,
            showPoint: false,   
            axisY: {showLabel: false, showGrid: false},
            showArea: true,
            chartPadding: {
                top: $(window).height() * 0.1,
                right: 0,
                bottom: 0,
                left: $(window).width() * 0.05
            },
        };
        window.assetChart = new Chartist.Line(".ct-chart", window.chartData, window.chartDataOptions);
        setTimeout(function() {
            $(".ct-chart-line").css({
                width: "calc(20vw + 1000px)"
            });
            mouseMove();
        }, 150);
        setTimeout(function() {
            if (window.searchContent == 1 || window.searchContentTopAsset == 1) {
                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                    stroke: "#20BF55"
                });
                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                    fill: "url(#MyGradient2)"
                });
            } else if (window.searchContent == 2 || window.searchContentTopAsset == 2) {
                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                    stroke: "#eaee00"
                });
                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                    fill: "url(#MyGradient3)"
                });
            } else {
                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                    stroke: "#01BAEF"
                });
                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                    fill: "url(#MyGradient1)"
                });
            };
            $("#assetOverlayCostPrice").val(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
            $("#assetOverlayAssetPrice").html(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
        }, 0);
    };
};

function showAssetOverlay(shortAssetName, longAssetName) {
    $("#assetOverlayFilter").animate({
        marginTop: "-8px"
    }, 400);
    $("#searchBarDiv").animate({
        zIndex: -2
    }, 0);
    $("#assetOverlay").animate({
        marginTop: ($(window).height() * 0.4 - 300).toString() + "px"
    }, 400);
    assetOverlayEnabled = 1;
    $("#assetOverlayAssetName").html(shortAssetName + " | " + longAssetName);
    showAssetOverlayPart2(shortAssetName);
};

function costCalculatorCalculate() {
    if (isNaN($("#assetOverlayCostQuantity").val()) == false && $("#assetOverlayCostQuantity").val().length > 0) {
        $("#assetOverlayCostQuantityLabel3").html("Total Cost - " + currentCurrency + parseFloat($("#assetOverlayCostQuantity").val()) * window.chartValues[window.chartValues.length - 1]);
    } else {
        $("#assetOverlayCostQuantityLabel3").html("");
    };
};

function profitCalculatorCalculate() {
    if (isNaN($("#assetOverlayProfitQuantity").val()) == false && $("#assetOverlayProfitQuantity").val().length > 0 && isNaN($("#assetOverlayProfitCost").val()) == false && $("#assetOverlayProfitCost").val().length > 0 && $("#assetOverlayProfitCurrency").val().length == 3 && $("#assetOverlayProfitDate").val().length == 10 && $("#assetOverlayProfitDate").val().split("/").join("").length == 8 && supportedCurrencies.includes($("#assetOverlayProfitCurrency").val().toUpperCase())) {
        var valueChange = Math.round((parseFloat(parseFloat($("#assetOverlayProfitQuantity").val()) * window.chartValues[window.chartValues.length - 1]) - parseFloat(parseFloat($("#assetOverlayProfitQuantity").val()) * $("#assetOverlayProfitCost").val())) * 100) / 100
        var percentageChange = Math.round((valueChange / $("#assetOverlayProfitQuantity").val()) / window.chartValues[window.chartValues.length - 1] * 10000) / 100;
        if (currentCurrency == $("#assetOverlayProfitCurrency").val().toUpperCase()) {
            if (valueChange > 0) {
                $("#assetOverlayProfitQuantityLabel5").html("Profit +" + currentCurrency + valueChange + " (+" + percentageChange + "%)");
                $("#assetOverlayProfitQuantityLabel5").stop().animate({
                    color: iconColours[1]
                }, 100);
            } else if (valueChange < 0) {
                $("#assetOverlayProfitQuantityLabel5").html("Profit -" + currentCurrency + Math.abs(valueChange) + " (" + percentageChange + "%)");
                $("#assetOverlayProfitQuantityLabel5").stop().animate({
                    color: "red"
                }, 100);
            } else {
                $("#assetOverlayProfitQuantityLabel5").html("Profit " + currentCurrency + "0 (0%)");
                $("#assetOverlayProfitQuantityLabel5").stop().animate({
                    color: "#757575"
                }, 100);
            };
        } else {
            var dateWritten = $("#assetOverlayProfitDate").val().split("/");
            dateWritten = dateWritten[2] + "-" + dateWritten[1] + "-" + dateWritten[0]
            // console.log(dateWritten);
            if (currentCurrency == "BTC" || currentCurrency == "ETH") {
                var type = 3;
            } else {
                type = 2;
            };
            getExchangeRate(dateWritten, $("#assetOverlayProfitCurrency").val(), currentCurrency, type, getApiKeyIndex(), valueChange, percentageChange, currentCurrency);
            // get forex exchange rate once available & change the following lines of code
            var exchangeRate = 1
            // end of change
            // var finalLocalValueChange = Math.round((parseFloat(parseFloat($("#assetOverlayProfitQuantity").val()) * window.chartValues[window.chartValues.length - 1]) - parseFloat($("#assetOverlayProfitQuantity").val()) * exchangeRate * $("#assetOverlayProfitCost").val()) * 100) / 100
            // var percentageChangeLocal = Math.round((finalLocalValueChange / $("#assetOverlayProfitQuantity").val()) / window.chartValues[window.chartValues.length - 1] * 10000) / 100;
            // if (valueChange > 0) {
            //     $("#assetOverlayProfitQuantityLabel5").html("Profit +" + currentCurrency + valueChange + " (+" + percentageChange + "%) / +" + $("#assetOverlayProfitCurrency").val().toUpperCase() + finalLocalValueChange + " (+" + percentageChangeLocal + "%)");
            //     $("#assetOverlayProfitQuantityLabel5").stop().animate({
            //         color: iconColours[1]
            //     }, 100);
            // } else if (valueChange < 0) {
            //     $("#assetOverlayProfitQuantityLabel5").html("Profit -" + currentCurrency + Math.abs(valueChange) + " (" + percentageChange + "%) / -" + $("#assetOverlayProfitCurrency").val().toUpperCase() + Math.abs(finalLocalValueChange) + " (" + percentageChangeLocal + "%)");
            //     $("#assetOverlayProfitQuantityLabel5").stop().animate({
            //         color: "red"
            //     }, 100);
            // } else {
            //     $("#assetOverlayProfitQuantityLabel5").html("Profit " + currentCurrency + "0 (0%) / " + $("#assetOverlayProfitCurrency").val().toUpperCase() + "0 (0%)");
            //     $("#assetOverlayProfitQuantityLabel5").stop().animate({
            //         color: "#757575"
            //     }, 100);
            // };

        };
    } else {
        $("#assetOverlayProfitQuantityLabel5").html("");
    };
};

// Global Variables
var searchContent = 0; // 0 for stocks, 1 for currency, 2 for crypto
var searchContentTopAsset = 0; // 0 for stocks, 1 for currency, 2 for crypto
var previousSearch = ""; // to disable refresh if there is no change
var searchBarFocused = false;
var currencyChangeClicked = 0; // index of supportedCurrencies
var supportedCurrencies = ["USD", "SGD", "EUR", "JPY", "CNY", "GBP", "CAD", "INR", "BTC", "ETH"];
var currentCurrency = "USD";
var assetOverlayEnabled = false;
var assetOverlayRange = 5; // default as DAY
var assetOverlayRangeCalculator = 2; // default as COST
var assetOverlayRangeOptions = {
    "HOUR": 1, 
    "DAY": 2, 
    "WEEK": 3, 
    "MONTH": 4, 
    "YEAR": 5, 
    "ALL": 6
};
window.assetChart;
window.chartData;
window.chartDataOptions;
var currentOverlayAsset; // what is being showed
var iconColours = ["#01BAEF", "#20BF55", "#eaee00"];
var apiKeys = ["LL9OYIHQJD5XMNE1", "JF7Z9QHP1U2JD76S", "TVFNWRYCJ1S8ZIU6", "4RWXX1WJ5GKA7FQ2", "F70TY6F2A0VSNQSG", "GRLI8I9OM49REPHF", "BR15F1IL8U7DA6YF", "9UATAN950FMHV839", "IN9RN77V4QB1SEQZ", "EXYSUMI564KT2RTT", "Y3314J35NB35A3KB", "QX5E2BW31O2KWQBI", "2FD1MUZPUS37BW19", "SSH7H4CRQYF83GBC", "J611ZW8X7UARIF5B", "Q9Q1V765H036J5AJ", "HJSDLRBBL3BEAC38", "NIEXXV2W7T4XAKSM", "0WFT025L3S3F98EP", "QB13EO7ISS1KQWEM", "9YSF29J5YQKRBUKE", "M38XUX9TC3HP3PWO", "451N79J8ZHNQY8F5", "QT534D7MKXVKF94T"]
var apiKeyIndex = Math.round(Math.random * 24) - 1;
var topAssetsPriceClick = 0;
itemPriceClick = 0;
var randomOrNot = 0;

function mainCode() {
    if (searchContent == 0) {
        $("#stocks").animate({
            color: "#FBFBFF"
        }, 0);
    };  
    // event handler for typing
    $("#searchBar").keyup(function() {
        searchBarSearch(searchContent, 0);
    });
    // event handlers for changing content searched
    $("#stocks").click(function() {
        switchContent(0);
    });
    $("#currency").click(function() {
        switchContent(1);
    });
    $("#cryptocurrency").click(function() {
        switchContent(2);
    });
    $("#stocks").hover(function() {
        hoverContent(0);
    }, function() {
        unhoverContent(0);
    });
    $("#currency").hover(function() {
        hoverContent(1);
    }, function() {
        unhoverContent(1);
    });
    $("#cryptocurrency").hover(function() {
        hoverContent(2);
    }, function() {
        unhoverContent(2);
    });
    $("#searchBar").hover(function() {
        searchBarHighlight();
    }, function() {
        if (searchBarFocused == false) {
            searchBarUnHighlight();
        };
    });
    $("#searchBar").focus(function() {
        searchBarHighlight();
        searchBarFocused = true;
    });
    $("#searchBar").blur(function() {
        if ($("#searchBar").val() == "") {
            searchBarUnHighlight();
            searchBarFocused = false;
        };
    });
    $("#searchCurrencyList1").click(function() {
        searchCurrency1Click();
    });
    $("#searchCurrencyList1").hover(function() {
        $("#searchCurrency").animate({
            backgroundColor: "#333333"
        }, 150);
    }, function() {
        if (currencyChangeClicked == 0) {
            $("#searchCurrency").animate({
                height: "35px",
                backgroundColor: "#121212"
            }, 150);
        };
    });
    $(".searchCurrencyList").hover(function() {
        if ($(this).attr("id") != "searchCurrencyList1") {
            $(this).animate({
                color: "#FBFBFF",
                backgroundColor: "#333333"
            }, 75);
        };
    }, function() {
        if ($(this).attr("id") != "searchCurrencyList1") {
            $(this).animate({
                color: "#787878",
                backgroundColor: "#121212"
            }, 75);
        };
    });
    $(".searchCurrencyList").click(function() {
        if ($(this).attr("id") != "searchCurrencyList1" && currencyChangeClicked == 1) {
            if (currentOverlayAsset == $(this).html()) {
                return;
            };
            var clickedCurrency = $(this).html();
            var supportedCurrenciesTemp = [clickedCurrency];
            for (var itemIndex = 0; itemIndex < supportedCurrencies.length; itemIndex++) {
                if (supportedCurrencies[itemIndex] != clickedCurrency) {
                    supportedCurrenciesTemp.push(supportedCurrencies[itemIndex]);
                };
            };
            $(".searchCurrencyList").remove();
            for (var i = 0; i < supportedCurrencies.length; i++) {
                if (i != supportedCurrencies.length - 1) {
                    $(".searchCurrency").append("<div class = 'searchCurrencyList' id = 'searchCurrencyList" + (i + 1).toString() + "'>" + supportedCurrenciesTemp[i] + "</div>");
                } else {
                    $(".searchCurrency").append("<div class = 'searchCurrencyList' id = 'searchCurrencyList-1'>" + supportedCurrenciesTemp[i] + "</div>");
                };
            };
            searchCurrency1Click();
            currentCurrency = supportedCurrenciesTemp[0];
            if (typeof window.chartValues !== 'undefined') {
                $("#assetOverlayCostPrice").val(currentCurrency + window.chartValues[window.chartValues.length - 1]);
            };
            $(".topAssetsPrice").html("Fetch Price");
            $(".topAssetsPrice").animate({
                "color": "#FFFFFF"
            }, 200);
            searchBarSearch(searchContent, 1);
            showAssetOverlayPart2($("#assetOverlayAssetName").html().split(" ")[0]);
            mainCode();
        } else if ($(this).attr("id") != "searchCurrencyList1" && assetOverlayEnabled == 1) {
            hideAssetOverlay();
            assetOverlayEnabled = 0;
        };
    });
    $("#assetOverlayFilter, #backButton").click(function() {
        hideAssetOverlay();
    });
    $(".assetOverlayRangeOptions").click(function() {
        if (assetOverlayRangeOptions[$(this).html()] != assetOverlayRange) {
            $("#assetOverlayRangeOptions" + assetOverlayRange).css({
                fontWeight: "normal",
                color: "#B4B4B4"
            });
            // console.log($(this).parent().siblings("#assetOverlayAssetName").html().split(" ")[0]);
            assetOverlayRange = assetOverlayRangeOptions[$(this).html()];
            showAssetOverlayPart2($(this).parent().siblings("#assetOverlayAssetName").html().split(" ")[0]);
            $(this).css({
                fontWeight: "bold",
                color: "#FBFBFF"
            });
        };
    });
    $("#assetOverlayRangeCalculatorOptions1, #assetOverlayRangeCalculatorOptions2").click(function() {
        if ($(this).attr("id").substr($(this).attr("id").length - 1, 1) != assetOverlayRangeCalculator) {
            $("#assetOverlayRangeCalculatorOptions" + assetOverlayRangeCalculator).css({
                fontWeight: "normal",
                color: "#B4B4B4"
            });
            if (assetOverlayRangeCalculator == 2) {
                assetOverlayRangeCalculator--;
                $(".assetOverlayCost").animate({
                    opacity: "0",
                    zIndex: "2"
                }, 200);
                setTimeout(function() {
                    $(".assetOverlayProfit").animate({
                        opacity: "1",
                        zIndex: "5"
                    }, 200);
                }, 100);
            } else {
                assetOverlayRangeCalculator++;
                $(".assetOverlayProfit").animate({
                    opacity: "0",
                    zIndex: "2"
                }, 200);
                setTimeout(function() {
                    $(".assetOverlayCost").animate({
                        opacity: "1",
                        zIndex: "5"
                    }, 200);
                }, 100);
            };
            $("#assetOverlayRangeCalculatorOptions" + assetOverlayRangeCalculator).css({
                fontWeight: "bold",
                color: "#FBFBFF"
            });
        };
    })
    $(window).resize(function() {
        setTimeout(function() {
            window.chartDataOptions = {
                width: $(window).width() * 0.2 + 900,
                height: $(window).height() * 0.4 + 100,
                showPoint: false,   
                axisY: {showLabel: false, showGrid: false},
                showArea: true,
                chartPadding: {
                    top: $(window).height() * 0.1,
                    right: 0,
                    bottom: 0,
                    left: $(window).width() * 0.05
                },
            };
            if (typeof window.chartValues !== 'undefined') {
                window.assetChart.update(window.chartData, window.chartDataOptions);
            };
            if (searchContent == 1 || searchContentTopAsset == 1) {
                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                    stroke: "#20BF55"
                });
                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                    fill: "url(#MyGradient2)"
                });
            } else if (searchContent == 2 || searchContentTopAsset == 2) {
                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                    stroke: "#eaee00"
                });
                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                    fill: "url(#MyGradient3)"
                });
            } else {
                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                    stroke: "#01BAEF"
                });
                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                    fill: "url(#MyGradient1)"
                });
            };
            mouseMove();
        }, 0);
    });
    $("#assetOverlayCostQuantity").keyup(function() {
        costCalculatorCalculate();
    });
    $("#assetOverlayProfitQuantity, #assetOverlayProfitCost, #assetOverlayProfitCurrency, #assetOverlayProfitDate").keyup(function() {
        profitCalculatorCalculate();
    });
    $(".topAssetsAsset1, .topAssetsAsset2, .topAssetsAsset3").click(function() {
        if ($(this).find(".topAssetsShortName").html() != currentCurrency && topAssetsPriceClick == 0) {
            searchContentTopAsset = $(this).attr("class").substr($(this).attr("class").length - 1, 1) - 1;
            dropdownElementMasterClicked($(this), 1);
            topAssetsPriceClick = 0;
        };
    });
    $(".topAssetsPrice").click(function() {
        topAssetsPriceClick = 1;
        $(this).css({
            backgroundColor: "transparent"
        });
        var shortName = $(this).siblings(".topAssetsShortName").html();
        // var longName = $(this).siblings(".topAssetsLongName").html();
        var type = parseInt($(this).siblings()[0]["attributes"]["class"]["value"].substr($(this).siblings()[0]["attributes"]["class"]["value"].length - 1, 1));
        CurrentAssetPrice(shortName, type, currentCurrency, getApiKeyIndex(), -1, -1, -1, 0, $(this));
        // console.log(shortName, longName, type)
    });
    $(".topAssetsPrice").hover(function() {
        if ($(this).html() == "Fetch Price") {
            $(this).css({
                backgroundColor: "rgba(255, 255, 255, 0.1)"
            });
        };
    }, function() {
        $(this).css({
            backgroundColor: "transparent"
        });
    });
};

function mouseMove() {
    $(window).mousemove(function() {
        if (assetOverlayEnabled) {
            var xCoords = event.pageX - (0.4 * $(window).width() - 492);
            var yCoords = event.pageY;
            if ($("svg").find("line")[0]["x1"]["baseVal"]["value"] <= xCoords && $("svg").find("line")[$("svg").find("line").length - 1]["x1"]["baseVal"]["value"] >= xCoords) {
                if ($("svg").find("line").offset().top <= yCoords && $("svg").find("line")[0]["y2"]["baseVal"]["value"] - $("svg").find("line")[0]["y1"]["baseVal"]["value"] + $("svg").find("line").offset().top >= yCoords) {
                    var dictOfLines = $("svg").find("line");
                    var lineX;
                    var closestIndex = 0
                    var maxDiff = (dictOfLines[1]["x1"]["baseVal"]["value"] - dictOfLines[0]["x1"]["baseVal"]["value"]) / 2
                    for (var i = 0; i < dictOfLines.length; i++) {
                        lineX = dictOfLines[i]["x1"]["baseVal"]["value"];
                        if (lineX + maxDiff > xCoords && lineX - maxDiff < xCoords) {
                            closestIndex = i;
                            break
                        };
                    };
                    if (searchContentTopAsset != searchContent) {
                        if (searchContent > searchContentTopAsset) {
                            var tempSearchContent = searchContent;
                        } else {
                            var tempSearchContent = searchContentTopAsset
                        };
                    } else {
                        var tempSearchContent = searchContent
                    };
                    $("#chartHighlighter").css({
                        backgroundColor: iconColours[tempSearchContent],
                        marginLeft: lineX,
                        opacity: 0.25,
                        marginTop: $("svg").find("line")[0]["y1"]["baseVal"]["value"], 
                        height: $("svg").find("line")[0]["y2"]["baseVal"]["value"] - $("svg").find("line")[0]["y1"]["baseVal"]["value"]
                    });
                    $("#chartHighlighterPrice").css({
                        color: iconColours[tempSearchContent],
                        marginLeft: lineX - 100,
                        marginTop: $("svg").find("line")[0]["y2"]["baseVal"]["value"] + 10
                    });
                    // console.log(closestIndex, window.DateOutput);
                    if (randomOrNot == 1) {
                        $("#chartHighlighterPrice").html(currentCurrency + window.chartValues[closestIndex]);
                    } else {
                        $("#chartHighlighterPrice").html(currentCurrency + window.chartValues[closestIndex] + " (" + window.DateOutput[window.DateOutput.length - closestIndex - 1] + ")");
                    };
                };
            };
        };
    });
};

window.AssetName = {};
function CurrentAssetPrice(AssetName, Type, BaseCurrency, apiKey, i, displayableList, searchContent, homeOrSearch, currentObject) {
    // console.log(apiKey);
    if (currentObject == -1) {
        // window.AssetName[AssetName] = i;
        // window.displayableList = displayableList;
        // window.searchContent = searchContent;
    } else {
        window.editableObject = currentObject;
    };
    window.homeOrSearch = homeOrSearch;
    window.baseCurrency = BaseCurrency;
    // Ask for the type of Asset
    if (Type == 1) {
        var link = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+AssetName+"&apikey="+apiKey
    } else if (Type == 2) {
        var link = "https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol="+BaseCurrency+"&to_symbol="+AssetName+"&interval=60min&outputsize=FULL&apikey="+apiKey
    } else if (Type == 3) {
        var link = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol="+AssetName+"&market="+BaseCurrency+"&apikey="+apiKey
    };
    // Process of retrieving data + Main function inside
    window.mainasset = AssetName;
    function retrieve(url, i, displayableList, searchContent){
        // Main function: Use 'data' variable to obtain JSON data
        jQuery.when(
            data = $.getJSON(url, function(json) {}).done(function(data) {  
                // console.log(data);
                if (Type == 1 && BaseCurrency == "USD") {
                    var price = data["Global Quote"]["05. price"];
                    var change = 0;
                    if (data["Global Quote"]["09. change"] >= 0) {
                        change = 1;
                    } else{
                        change = 0;
                    }
                    window.output = [Math.round(price * 100000) / 100000, change]; // **************OUTPUT**************** NOTE: change(1 => Positive change, 0=> Negative change)
                    if (currentObject == -1) {
                        // $(".dropdownAppender").append(
                        //     "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                        //     + "<div class = 'dropdownElementIcon' id = 'itemIcon'></div>"
                        //     + "<div class = 'dropdownElement' id = 'itemShortName'>" + window.displayableList[window.searchContent][window.AssetName[data["Global Quote"]["01. symbol"]]][1] + "</div>" 
                        //     + "<div class = 'dropdownElement' id = 'itemLongName'>" + window.displayableList[window.searchContent][window.AssetName[data["Global Quote"]["01. symbol"]]][0] + "</div>" 
                        //     + "<div class = 'dropdownElement' id = 'itemPrice" + i.toString() + "' style = 'width: 125px; text-align: center;'>" + "$" + Math.round(window.output[0] * 100) / 100 + "</div>"
                        //     + "</div>"
                        // );
                        // if (window.output[1] == 2) {
                        //     $("#itemPrice" + window.AssetName[data["Global Quote"]["01. symbol"]].toString()).animate({
                        //         color: "#32a852"
                        //     }, 0);
                        // } else if (window.output[1] == 0) {
                        //     $("#itemPrice" + window.AssetName[data["Global Quote"]["01. symbol"]].toString()).animate({
                        //         color: "#a83232"
                        //     }, 0);
                        // } else {
                        //     $("#itemPrice" + window.AssetName[data["Global Quote"]["01. symbol"]].toString()).animate({
                        //         color: "#ffffff"
                        //     }, 0);
                        // };
                        // searchBarSearchEnd();
                    } else {
                        window.editableObject.html(window.baseCurrency + window.output[0]);
                        if (window.output[1] == 2) {
                            window.editableObject.animate({
                                color: "#32a852"
                            }, 0);
                        } else if (window.output[1] == 0) {
                            window.editableObject.animate({
                                color: "#a83232"
                            }, 0);
                        } else {
                            window.editableObject.animate({
                                color: "#ffffff"
                            }, 0);
                        };
                    };
                    //console.log(output);
                } else if (Type == 1 && BaseCurrency != "USD" ) {
                    window.raw = data["Global Quote"]["05. price"];
                    window.api = apiKey;
                    window.currency = BaseCurrency;
                    var change = 0;
                    if (data["Global Quote"]["09. change"] >= 0) {
                        change = 1;
                    } else{
                        change = 0;
                    }
                    window.effective_change = change;
                    jQuery.when(
                        data1 = $.getJSON("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency="+currency+"&apikey="+api, function(json) {}).done(function(data1) {
                            var effective_price;
                            effective_price = raw*data1["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
                            window.output = [Math.round(effective_price * 100000) / 100000, effective_change]; // **************OUTPUT**************** NOTE: effective_change(1 => Positive change, 0=> Negative change)
                            if (currentObject == -1) {
                                // $(".dropdownAppender").append(
                                //     "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                                //     + "<div class = 'dropdownElementIcon' id = 'itemIcon'></div>"
                                //     + "<div class = 'dropdownElement' id = 'itemShortName'>" + window.displayableList[window.searchContent][window.AssetName[data1["Meta Data"]["3. To Symbol"]]][1] + "</div>" 
                                //     + "<div class = 'dropdownElement' id = 'itemLongName'>" + window.displayableList[window.searchContent][window.AssetName[data1["Meta Data"]["3. To Symbol"]]][0] + "</div>" 
                                //     + "<div class = 'dropdownElement' id = 'itemPrice" + i.toString() + "' style = 'width: 125px; text-align: center;'>" + "$" + Math.round(window.output[0] * 100) / 100 + "</div>"
                                //     + "</div>"
                                // );
                                // if (window.output[1] == 2) {
                                //     $("#itemPrice" + window.AssetName[data1["Meta Data"]["3. To Symbol"]].toString()).animate({
                                //         color: "#32a852"
                                //     }, 0);
                                // } else if (window.output[1] == 0) {
                                //     $("#itemPrice" + window.AssetName[data1["Meta Data"]["3. To Symbol"]].toString()).animate({
                                //         color: "#a83232"
                                //     }, 0);
                                // } else {
                                //     $("#itemPrice" + window.AssetName[data1["Meta Data"]["3. To Symbol"]].toString()).animate({
                                //         color: "#ffffff"
                                //     }, 0);
                                // };
                                // searchBarSearchEnd();
                            } else {
                                window.editableObject.html(window.baseCurrency + window.output[0]);
                                if (window.output[1] == 2) {
                                    window.editableObject.animate({
                                        color: "#32a852"
                                    }, 0);
                                } else if (window.output[1] == 0) {
                                    window.editableObject.animate({
                                        color: "#a83232"
                                    }, 0);
                                } else {
                                    window.editableObject.animate({
                                        color: "#ffffff"
                                    }, 0);
                                };
                            };
                            //console.log(output);
                        })
                    );
                } 
                if (Type == 2 && (false == ['BTC','ETH'].includes(BaseCurrency))) {
                    var d = new Date();
                    var prevTime;
                    var nowTime;
                    if (d.getUTCHours()<10) {
                        var hour = "0"+(d.getUTCHours()).toString();
                    } else{
                        var hour = d.getUTCHours().toString();
                    };
                    // nowTime = d.getUTCFullYear().toString()+ "-01-"+ d.getUTCDate().toString()+" "+hour+":00:00"; 
                    // nowTime = data["Meta Data"]["4. Last Refreshed"];
                    // prevTime = d.getUTCFullYear().toString()+ "-01-"+ d.getUTCDate().toString()+" 00:00:00";
                    indexHere = 0;
                    for (i in data["Time Series FX (60min)"]) {
                        if (indexHere == 2) {
                            break
                        };
                        if (indexHere == 0) {
                            nowTime = i
                        };
                        if (indexHere == 1) {
                            prevTime = i
                        };
                        indexHere++;
                    };
                    // console.log(data);
                    var rate = data["Time Series FX (60min)"][nowTime]["1. open"];
                    var change;
                    if (rate <= data["Time Series FX (60min)"][prevTime]["1. open"]) {
                        change = 1;
                    } else{
                        change = 0;
                    }
                    // console.log(window.displayableList, window.AssetName)
                    // console.log(window.searchContent)
                    // console.log(window.displayableList[window.searchContent])
                    // console.log(window.displayableList[window.searchContent][window.AssetName[data["Meta Data"]["3. To Symbol"]]])
                    // console.log(data["Meta Data"]["3. To Symbol"])
                    window.output = [Math.round(Math.pow(rate,-1) * 100000) / 100000, change]; // **************OUTPUT**************** NOTE: change(1 => Positive change, 0=> Negative change)
                    if (currentObject == -1) {
                        // $(".dropdownAppender").append(
                        //     "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                        //     + "<div class = 'dropdownElementIcon' id = 'itemIcon'></div>"
                        //     + "<div class = 'dropdownElement' id = 'itemShortName'>" + window.displayableList[window.searchContent][window.AssetName[data["Meta Data"]["3. To Symbol"]]][1] + "</div>" 
                        //     + "<div class = 'dropdownElement' id = 'itemLongName'>" + window.displayableList[window.searchContent][window.AssetName[data["Meta Data"]["3. To Symbol"]]][0] + "</div>" 
                        //     + "<div class = 'dropdownElement' id = 'itemPrice" + i.toString() + "' style = 'width: 125px; text-align: center;'>" + "$" + Math.round(window.output[0] * 100) / 100 + "</div>"
                        //     + "</div>"
                        // );
                        // if (window.output[1] == 2) {
                        //     $("#itemPrice" + window.AssetName[data["Meta Data"]["3. To Symbol"]].toString()).animate({
                        //         color: "#32a852"
                        //     }, 0);
                        // } else if (window.output[1] == 0) {
                        //     $("#itemPrice" + window.AssetName[data["Meta Data"]["3. To Symbol"]].toString()).animate({
                        //         color: "#a83232"
                        //     }, 0);
                        // } else {
                        //     $("#itemPrice" + window.AssetName[data["Meta Data"]["3. To Symbol"]].toString()).animate({
                        //         color: "#ffffff"
                        //     }, 0);
                        // };
                        // searchBarSearchEnd();
                    } else {
                        window.editableObject.html(window.baseCurrency + window.output[0]);
                        if (window.output[1] == 2) {
                            window.editableObject.animate({
                                color: "#32a852"
                            }, 0);
                        } else if (window.output[1] == 0) {
                            window.editableObject.animate({
                                color: "#a83232"
                            }, 0);
                        } else {
                            window.editableObject.animate({
                                color: "#ffffff"
                            }, 0);
                        };
                    };
                    //console.log(output);
                } else if (Type == 2 && ['BTC','ETH'].includes(BaseCurrency)){
                    window.api = apiKey;
                    window.currency = BaseCurrency;
                    jQuery.when(
                        data1 = $.getJSON("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol="+currency+"&market="+mainasset+"&apikey="+api, function(json) {}).done(function(data1) {
                            var d = new Date();
                            var nowTime = d.getUTCFullYear().toString()+ "-01-"+ (d.getUTCDate()-1).toString();
                            window.pricez = data1["Time Series (Digital Currency Daily)"][nowTime]["4a. close ("+mainasset+")"];
                            jQuery.when(
                                data2 = $.getJSON("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency="+currency+"&to_currency="+mainasset+"&apikey="+api, function(json) {}).done(function(data2) {
                                    var pricey = data2["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
                                    var change;
                                    if (pricey <= pricez){
                                        change = 1;
                                    } else{
                                        change = 0;
                                    };
                                    window.output = [Math.round(Math.pow(pricey,-1) * 100000) / 100000, change]; //**************OUTPUT**************** NOTE: change(1 => Positive change, 0=> Negative change)
                                    if (currentObject == -1) {
                                        // $(".dropdownAppender").append(
                                        //     "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                                        //     + "<div class = 'dropdownElementIcon' id = 'itemIcon'></div>"
                                        //     + "<div class = 'dropdownElement' id = 'itemShortName'>" + window.displayableList[window.searchContent][window.AssetName[data2["Meta Data"]["3. To Symbol"]]][1] + "</div>" 
                                        //     + "<div class = 'dropdownElement' id = 'itemLongName'>" + window.displayableList[window.searchContent][window.AssetName[data2["Meta Data"]["3. To Symbol"]]][0] + "</div>" 
                                        //     + "<div class = 'dropdownElement' id = 'itemPrice" + i.toString() + "' style = 'width: 125px; text-align: center;'>" + "$" + Math.round(window.output[0] * 100) / 100 + "</div>"
                                        //     + "</div>"
                                        // );
                                        // if (window.output[1] == 2) {
                                        //     $("#itemPrice" + window.AssetName[data2["Meta Data"]["3. To Symbol"]].toString()).animate({
                                        //         color: "#32a852"
                                        //     }, 0);
                                        // } else if (window.output[1] == 0) {
                                        //     $("#itemPrice" + window.AssetName[data2["Meta Data"]["3. To Symbol"]].toString()).animate({
                                        //         color: "#a83232"
                                        //     }, 0);
                                        // } else {
                                        //     $("#itemPrice" + window.AssetName[data2["Meta Data"]["3. To Symbol"]].toString()).animate({
                                        //         color: "#ffffff"
                                        //     }, 0);
                                        // };
                                        // searchBarSearchEnd();
                                    } else {
                                        window.editableObject.html(window.baseCurrency + window.output[0]);
                                        if (window.output[1] == 2) {
                                            window.editableObject.animate({
                                                color: "#32a852"
                                            }, 0);
                                        } else if (window.output[1] == 0) {
                                            window.editableObject.animate({
                                                color: "#a83232"
                                            }, 0);
                                        } else {
                                            window.editableObject.animate({
                                                color: "#ffffff"
                                            }, 0);
                                        };
                                    };
                                    //console.log(output);
                                })
                            );
                        })
                    );
                }
                if (Type == 3) {
                    window.api = apiKey;
                    window.currency = BaseCurrency;
                    jQuery.when(
                        data5 = $.getJSON("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol="+mainasset+"&market="+currency+"&apikey="+api, function(json) {}).done(function(data5) {
                            var d = new Date();
                            var nowTime = d.getUTCFullYear().toString()+ "-01-"+ (d.getUTCDate()-1).toString();
                            window.priceLast = data5["Time Series (Digital Currency Daily)"][nowTime]["4a. close ("+currency+")"];
                            jQuery.when(
                                data6 = $.getJSON("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency="+mainasset+"&to_currency="+currency+"&apikey="+api, function(json) {}).done(function(data6) {
                                    // console.log(data6)
                                    // console.log(window.displayableList, window.AssetName)
                                    // console.log(window.searchContent)
                                    // console.log(window.displayableList[window.searchContent])
                                    // console.log(window.displayableList[window.searchContent][window.AssetName[data["Meta Data"]["3. To Symbol"]]])
                                    // console.log(data["Meta Data"]["3. To Symbol"])
                                    var priceNow = data6["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
                                    var change;
                                    if (priceNow >= priceLast){
                                        change = 1;
                                    } else {
                                        change = 0;
                                    };
                                    window.output = [Math.round(priceNow * 100000) / 100000, change]; //**************OUTPUT**************** NOTE: change(1 => Positive change, 0=> Negative change)
                                    if (currentObject == -1) {
                                        // $(".dropdownAppender").append(
                                        //     "<div class = 'dropdownElementMaster' id = 'dropdownElementMaster'>"
                                        //     + "<div class = 'dropdownElementIcon' id = 'itemIcon'></div>"
                                        //     + "<div class = 'dropdownElement' id = 'itemShortName'>" + window.displayableList[window.searchContent][window.AssetName[data6["Realtime Currency Exchange Rate"]["1. From_Currency Code"]]][1] + "</div>" 
                                        //     + "<div class = 'dropdownElement' id = 'itemLongName'>" + window.displayableList[window.searchContent][window.AssetName[data6["Realtime Currency Exchange Rate"]["1. From_Currency Code"]]][0] + "</div>" 
                                        //     + "<div class = 'dropdownElement' id = 'itemPrice" + i.toString() + "' style = 'width: 125px; text-align: center;'>" + "$" + Math.round(window.output[0] * 100) / 100 + "</div>"
                                        //     + "</div>"
                                        // );
                                        // if (window.output[1] == 2) {
                                        //     $("#itemPrice" + window.AssetName[data6["Realtime Currency Exchange Rate"]["1. From_Currency Code"]].toString()).animate({
                                        //         color: "#32a852"
                                        //     }, 0);
                                        // } else if (window.output[1] == 0) {
                                        //     $("#itemPrice" + window.AssetName[data6["Realtime Currency Exchange Rate"]["1. From_Currency Code"]].toString()).animate({
                                        //         color: "#a83232"
                                        //     }, 0);
                                        // } else {
                                        //     $("#itemPrice" + window.AssetName[data6["Realtime Currency Exchange Rate"]["1. From_Currency Code"]].toString()).animate({
                                        //         color: "#ffffff"
                                        //     }, 0);
                                        // };
                                        // searchBarSearchEnd();
                                    } else {
                                        window.editableObject.html(window.baseCurrency + window.output[0]);
                                        if (window.output[1] == 2) {
                                            window.editableObject.animate({
                                                color: "#32a852"
                                            }, 0);
                                        } else if (window.output[1] == 0) {
                                            window.editableObject.animate({
                                                color: "#a83232"
                                            }, 0);
                                        } else {
                                            window.editableObject.animate({
                                                color: "#ffffff"
                                            }, 0);
                                        };
                                    };
                                    //console.log(output);
                                })
                            );
                        })
                    );
                }
            })
        );
    };
    // console.log(i, displayableList, searchContent);
    var y = retrieve(link, i, displayableList, searchContent);
}

function getExchangeRate(time, asset, baseCurrency, type, apiKey, valueChange, percentageChange, currentCurrency) { // asset is purchase currency, basecurrency is selected currency on top right, type is type of selected
    window.time = time;
    window.baseCurrency = baseCurrency;
    window.asset = asset;
    window.chartValues = chartValues
    window.valueChange = valueChange;
    window.percentageChange = percentageChange;
    window.currentCurrency = currentCurrency;
    if (type == 2) {
        // console.log("b");
        if (asset.toUpperCase() != "BTC" && asset.toUpperCase() != "ETH") {
            // console.log("cs");
            jQuery.when(
                json = $.getJSON("https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" + asset.toUpperCase() + "&to_symbol=" + baseCurrency.toUpperCase() + "&outputsize=full&apikey=" + apiKey, function(json) {}).done(function(json) {
                    var errorCaught = 0;
                    try {
                        window.exchangeRateData = json["Time Series FX (Daily)"][window.time]["4. close"];
                    } catch (TypeError) {
                        errorCaught = 1;
                        return;
                    }
                    // OUTPUT HERE
                    // console.log(window.exchangeRateData);
                    var finalLocalValueChange = Math.round($("#assetOverlayProfitQuantity").val() * (window.chartValues[window.chartValues.length - 1] / window.exchangeRateData - $("#assetOverlayProfitCost").val()) * 100) / 100
                    var percentageChangeLocal = Math.round(((window.chartValues[window.chartValues.length - 1] / window.exchangeRateData - $("#assetOverlayProfitCost").val()) / $("#assetOverlayProfitCost").val()) * 10000) / 100;
                    window.valueChange = Math.round(($("#assetOverlayProfitQuantity").val() * (window.chartValues[window.chartValues.length - 1] - $("#assetOverlayProfitCost").val() * window.exchangeRateData)) * 100) / 100
                    if (window.valueChange > 0) {
                        $("#assetOverlayProfitQuantityLabel5").html("Profit +" + window.currentCurrency + window.valueChange + " (+" + window.percentageChange + "%) / +" + $("#assetOverlayProfitCurrency").val().toUpperCase() + finalLocalValueChange + " (+" + percentageChangeLocal + "%)");
                        $("#assetOverlayProfitQuantityLabel5").stop().animate({
                            color: iconColours[1]
                        }, 100);
                    } else if (window.valueChange < 0) {
                        $("#assetOverlayProfitQuantityLabel5").html("Profit -" + window.currentCurrency + Math.abs(window.valueChange) + " (" + window.percentageChange + "%) / -" + $("#assetOverlayProfitCurrency").val().toUpperCase() + Math.abs(finalLocalValueChange) + " (" + percentageChangeLocal + "%)");
                        $("#assetOverlayProfitQuantityLabel5").stop().animate({
                            color: "red"
                        }, 100);
                    } else {
                        $("#assetOverlayProfitQuantityLabel5").html("Profit " + window.currentCurrency + "0 (0%) / " + $("#assetOverlayProfitCurrency").val().toUpperCase() + "0 (0%)");
                        $("#assetOverlayProfitQuantityLabel5").stop().animate({
                            color: "#757575"
                        }, 100);
                    };
            }));
        } else {
            // console.log("a");
            jQuery.when(
                json = $.getJSON("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + asset.toUpperCase() + "&market=" + baseCurrency.toUpperCase() + "&outputsize=full&apikey=" + apiKey, function(json) {}).done(function(json) {
                    var errorCaught = 0;
                    // console.log(json);
                    try {
                        window.exchangeRateData = json["Time Series (Digital Currency Daily)"][window.time]["4a. close (" + window.baseCurrency + ")"];
                    } catch (TypeError) {
                        errorCaught = 1;
                        return;
                    }
                    // OUTPUT HERE
                    // console.log(window.exchangeRateData);
                    var finalLocalValueChange = Math.round($("#assetOverlayProfitQuantity").val() * (window.chartValues[window.chartValues.length - 1] / window.exchangeRateData - $("#assetOverlayProfitCost").val()) * 100) / 100
                    var percentageChangeLocal = Math.round(((window.chartValues[window.chartValues.length - 1] / window.exchangeRateData - $("#assetOverlayProfitCost").val()) / $("#assetOverlayProfitCost").val()) * 10000) / 100;
                    window.valueChange = Math.round(($("#assetOverlayProfitQuantity").val() * (window.chartValues[window.chartValues.length - 1] - $("#assetOverlayProfitCost").val() * window.exchangeRateData)) * 100) / 100
                    if (window.valueChange > 0) {
                        $("#assetOverlayProfitQuantityLabel5").html("Profit +" + window.currentCurrency + window.valueChange + " (+" + window.percentageChange + "%) / +" + $("#assetOverlayProfitCurrency").val().toUpperCase() + finalLocalValueChange + " (+" + percentageChangeLocal + "%)");
                        $("#assetOverlayProfitQuantityLabel5").stop().animate({
                            color: iconColours[1]
                        }, 100);
                    } else if (window.valueChange < 0) {
                        $("#assetOverlayProfitQuantityLabel5").html("Profit -" + window.currentCurrency + Math.abs(window.valueChange) + " (" + window.percentageChange + "%) / -" + $("#assetOverlayProfitCurrency").val().toUpperCase() + Math.abs(finalLocalValueChange) + " (" + percentageChangeLocal + "%)");
                        $("#assetOverlayProfitQuantityLabel5").stop().animate({
                            color: "red"
                        }, 100);
                    } else {
                        $("#assetOverlayProfitQuantityLabel5").html("Profit " + window.currentCurrency + "0 (0%) / " + $("#assetOverlayProfitCurrency").val().toUpperCase() + "0 (0%)");
                        $("#assetOverlayProfitQuantityLabel5").stop().animate({
                            color: "#757575"
                        }, 100);
                    };
            }));
        };
    } else {
        // console.log("d");
        x = asset;
        asset = baseCurrency;
        baseCurrency = x;
        if (baseCurrency.toUpperCase() != "BTC" && baseCurrency.toUpperCase() != "ETH") {
            // console.log("a");
            jQuery.when(
                json = $.getJSON("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=" + asset.toUpperCase() + "&market=" + baseCurrency.toUpperCase() + "&outputsize=full&apikey=" + apiKey, function(json) {}).done(function(json) {
                    var errorCaught = 0;
                    // console.log(json);
                    try {
                        window.exchangeRateData = Math.round(10000 / parseFloat(json["Time Series (Digital Currency Daily)"][window.time]["4a. close (" + window.asset + ")"])) / 10000;
                    } catch (TypeError) {
                        errorCaught = 1;
                        return;
                    }
                    // OUTPUT HERE
                    // console.log(window.exchangeRateData);
                    var finalLocalValueChange = Math.round($("#assetOverlayProfitQuantity").val() * (window.chartValues[window.chartValues.length - 1] / window.exchangeRateData - $("#assetOverlayProfitCost").val()) * 100) / 100
                    var percentageChangeLocal = Math.round(((window.chartValues[window.chartValues.length - 1] / window.exchangeRateData - $("#assetOverlayProfitCost").val()) / $("#assetOverlayProfitCost").val()) * 10000) / 100;
                    window.valueChange = Math.round(($("#assetOverlayProfitQuantity").val() * (window.chartValues[window.chartValues.length - 1] - $("#assetOverlayProfitCost").val() * window.exchangeRateData)) * 100) / 100
                    if (window.valueChange > 0) {
                        $("#assetOverlayProfitQuantityLabel5").html("Profit +" + window.currentCurrency + window.valueChange + " (+" + window.percentageChange + "%) / +" + $("#assetOverlayProfitCurrency").val().toUpperCase() + finalLocalValueChange + " (+" + percentageChangeLocal + "%)");
                        $("#assetOverlayProfitQuantityLabel5").stop().animate({
                            color: iconColours[1]
                        }, 100);
                    } else if (window.valueChange < 0) {
                        $("#assetOverlayProfitQuantityLabel5").html("Profit -" + window.currentCurrency + Math.abs(window.valueChange) + " (" + window.percentageChange + "%) / -" + $("#assetOverlayProfitCurrency").val().toUpperCase() + Math.abs(finalLocalValueChange) + " (" + percentageChangeLocal + "%)");
                        $("#assetOverlayProfitQuantityLabel5").stop().animate({
                            color: "red"
                        }, 100);
                    } else {
                        $("#assetOverlayProfitQuantityLabel5").html("Profit " + window.currentCurrency + "0 (0%) / " + $("#assetOverlayProfitCurrency").val().toUpperCase() + "0 (0%)");
                        $("#assetOverlayProfitQuantityLabel5").stop().animate({
                            color: "#757575"
                        }, 100);
                    };
            }));
        } else {
            return;
        };
    };
};

function GraphPrice(AssetName, Type, BaseCurrency, range, apiKey, searchContent, searchContentTopAsset, currentCurrency) {
    // console.log(AssetName, Type, BaseCurrency, range, apiKey, searchContent, searchContentTopAsset, currentCurrency);
    window.searchContent = searchContent;
    window.searchContentTopAsset = searchContentTopAsset;
    window.currentCurrency = currentCurrency;
    window.chartValues = [];
    function epochtoUNIX(epoch){
        return(new Date(epoch * 1000).toISOString().replace('T', ' ').replace('.000Z', ''))
    };
    function UNIXtoepoch(unix){
        return(new Date(unix.replace(' ', 'T') + '.000Z').getTime())
    };
    window.asset = AssetName; window.Currency = BaseCurrency; window.Range = range; window.API = apiKey;
    window.PriceOutput = [];
    window.DateOutput = [];
    window.nowDate = new Date();
    window.EpochTime = 0; 
    window.StartEpochTime = 0;
    window.TimeStamp = 0;
    if(Range == 0){TimeStamp=60;} else if (Range == 1) {StartEpochTime = EpochTime - 86400;TimeStamp=300;} else if (Range == 2) {StartEpochTime = EpochTime - 604800;TimeStamp=86400;} else if (Range == 3) {StartEpochTime = EpochTime - 2592000;TimeStamp=86400;} else if (Range == 4) {StartEpochTime = EpochTime - 31536000;TimeStamp=86400;};        
    // console.log(Range);
    if (Range == 0 || Range == 1){
        // console.log("1");
        if (Type == 1 && Currency == "USD"){
            jQuery.when(
                data = $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+asset+"&interval="+String(TimeStamp/60)+"min&apikey="+API, function(json) {}).done(function(data) {
                    EpochTime = (UNIXtoepoch(data["Meta Data"]["3. Last Refreshed"]))/1000;
                    if (Range == 0) {
                        StartEpochTime = EpochTime - 3600;
                    } else {
                        StartEpochTime = EpochTime - 86400;
                    }
                    while ((EpochTime != StartEpochTime)&&((Range == 1 && epochtoUNIX(EpochTime)|| (Range == 0)) != "2020-01-17 09:35:00")){ // GO TO OJAS AND CHECK **********************************************OMG
                        DateOutput.push(epochtoUNIX(EpochTime));
                        PriceOutput.push(Math.round(data["Time Series ("+String(TimeStamp/60)+"min)"][epochtoUNIX(EpochTime)]["1. open"] * 100) / 100);
                        EpochTime = EpochTime - TimeStamp;
                        var output = [PriceOutput,DateOutput]; ////**************OUTPUT**************** [This is fuckery at a whole new level]
                        window.chartValues = [...PriceOutput]
                        // console.log(window.chartValues)
                        window.chartData = {
                            labels: [],
                            series: [window.chartValues]
                        };
                        // End of replacement
                        window.chartDataOptions = {
                            width: $(window).width() * 0.2 + 900,
                            height: $(window).height() * 0.4 + 100,
                            showPoint: false,   
                            axisY: {showLabel: false, showGrid: false},
                            showArea: true,
                            chartPadding: {
                                top: $(window).height() * 0.1,
                                right: 0,
                                bottom: 0,
                                left: $(window).width() * 0.05
                            },
                        };
                        window.assetChart = new Chartist.Line(".ct-chart", window.chartData, window.chartDataOptions);
                        setTimeout(function() {
                            $(".ct-chart-line").css({
                                width: "calc(20vw + 1000px)"
                            });
                            mouseMove();
                        }, 150);
                        setTimeout(function() {
                            if (window.searchContent == 1 || window.searchContentTopAsset == 1) {
                                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                    stroke: "#20BF55"
                                });
                                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                    fill: "url(#MyGradient2)"
                                });
                            } else if (window.searchContent == 2 || window.searchContentTopAsset == 2) {
                                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                    stroke: "#eaee00"
                                });
                                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                    fill: "url(#MyGradient3)"
                                });
                            } else {
                                $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                    stroke: "#01BAEF"
                                });
                                $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                    fill: "url(#MyGradient1)"
                                });
                            };
                            $("#assetOverlayCostPrice").val(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                            $("#assetOverlayAssetPrice").html(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                        }, 0);
                        // console.log("end")
                    }
                    //console.log(output);
                })
            );
        } else if (Type == 1 && (false == ['BTC','ETH'].includes(Currency)) && Currency != "USD"){
            jQuery.when(
                data = $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+asset+"&interval="+String(TimeStamp/60)+"min&apikey="+API, function(json) {}).done(function(data) {
                    EpochTime = (UNIXtoepoch(data["Meta Data"]["3. Last Refreshed"]))/1000;
                    if (Range == 0) {
                        StartEpochTime = EpochTime - 3600;
                    } else {
                        StartEpochTime = EpochTime - 86400;
                    };
                    while ((EpochTime != StartEpochTime)&&((Range == 1 && epochtoUNIX(EpochTime)|| (Range == 0)) != "2020-01-17 09:35:00")){ // GO TO OJAS AND CHECK **********************************************OMG
                        DateOutput.push(epochtoUNIX(EpochTime));
                        PriceOutput.push(data["Time Series ("+String(TimeStamp/60)+"min)"][epochtoUNIX(EpochTime)]["1. open"]);
                        EpochTime = EpochTime - TimeStamp;
                    };
                    jQuery.when(
                        data1 = $.getJSON("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency="+Currency+"&apikey="+API, function(json) {}).done(function(data1) {
                            var a = PriceOutput.map(function(x) { return Math.round(x * data1["Realtime Currency Exchange Rate"]["5. Exchange Rate"] * 100) / 100; });
                            var output = [a,DateOutput]; ////**************OUTPUT**************** [This is fuckery at a whole new level]
                            // console.log(output);
                            window.chartValues = [...a]
                            window.chartData = {
                                labels: [],
                                series: [window.chartValues]
                            };
                            // End of replacement
                            window.chartDataOptions = {
                                width: $(window).width() * 0.2 + 900,
                                height: $(window).height() * 0.4 + 100,
                                showPoint: false,   
                                axisY: {showLabel: false, showGrid: false},
                                showArea: true,
                                chartPadding: {
                                    top: $(window).height() * 0.1,
                                    right: 0,
                                    bottom: 0,
                                    left: $(window).width() * 0.05
                                },
                            };
                            window.assetChart = new Chartist.Line(".ct-chart", window.chartData, window.chartDataOptions);
                            setTimeout(function() {
                                $(".ct-chart-line").css({
                                    width: "calc(20vw + 1000px)"
                                });
                                mouseMove();
                            }, 150);
                            setTimeout(function() {
                                if (window.searchContent == 1 || window.searchContentTopAsset == 1) {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#20BF55"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient2)"
                                    });
                                } else if (window.searchContent == 2 || window.searchContentTopAsset == 2) {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#eaee00"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient3)"
                                    });
                                } else {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#01BAEF"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient1)"
                                    });
                                };
                                $("#assetOverlayCostPrice").val(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                                $("#assetOverlayAssetPrice").html(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                            }, 0);
                        })
                    );
                })
            );
        } else if (Type == 1 && ['BTC','ETH'].includes(Currency)){
            jQuery.when(
                data = $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="+asset+"&interval="+String(TimeStamp/60)+"min&apikey="+API, function(json) {}).done(function(data) {
                    EpochTime = (UNIXtoepoch(data["Meta Data"]["3. Last Refreshed"]))/1000;
                    if (Range == 0) {
                        StartEpochTime = EpochTime - 3600;
                    } else {
                        StartEpochTime = EpochTime - 86400;
                    };
                    while ((EpochTime != StartEpochTime)&&((Range == 1 && epochtoUNIX(EpochTime)|| (Range == 0)) != "2020-01-17 09:35:00")){ // GO TO OJAS AND CHECK **********************************************OMG
                        DateOutput.push(epochtoUNIX(EpochTime));
                        PriceOutput.push(data["Time Series ("+String(TimeStamp/60)+"min)"][epochtoUNIX(EpochTime)]["1. open"]);
                        EpochTime = EpochTime - TimeStamp;
                    };
                    if (Range == 0) {
                        EpochTime = StartEpochTime + 3600;
                    } else {
                        EpochTime = StartEpochTime + 86400;
                    };
                    window.choice = ""
                    if (Currency == "BTC") {choice = "bitcoin";} else {choice = "ethereum";};
                    x = epochtoUNIX(StartEpochTime).slice(0, 10).split("-")
                    window.datey = String(x[2]+"-"+x[1]+"-"+x[0]);
                    jQuery.when(
                        data1 = $.getJSON("https://api.coingecko.com/api/v3/coins/bitcoin/history?date="+datey, function(json) {}).done(function(data1) {
                            count = 0;
                            while (StartEpochTime != EpochTime){
                                PriceOutput[count] = Math.round(PriceOutput[count]/(data1["market_data"]["current_price"]["usd"]) * 100) / 100;
                                StartEpochTime = StartEpochTime + TimeStamp;
                                count = count + 1;
                            }
                            
                            var output = [PriceOutput, DateOutput]; ////**************OUTPUT**************** [This is fuckery at a whole new level]
                            //console.log(output);
                            window.chartValues = [...PriceOutput]
                            window.chartData = {
                                labels: [],
                                series: [window.chartValues]
                            };
                            // End of replacement
                            window.chartDataOptions = {
                                width: $(window).width() * 0.2 + 900,
                                height: $(window).height() * 0.4 + 100,
                                showPoint: false,   
                                axisY: {showLabel: false, showGrid: false},
                                showArea: true,
                                chartPadding: {
                                    top: $(window).height() * 0.1,
                                    right: 0,
                                    bottom: 0,
                                    left: $(window).width() * 0.05
                                },
                            };
                            window.assetChart = new Chartist.Line(".ct-chart", window.chartData, window.chartDataOptions);
                            setTimeout(function() {
                                $(".ct-chart-line").css({
                                    width: "calc(20vw + 1000px)"
                                });
                                mouseMove();
                            }, 150);
                            setTimeout(function() {
                                if (window.searchContent == 1 || window.searchContentTopAsset == 1) {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#20BF55"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient2)"
                                    });
                                } else if (window.searchContent == 2 || window.searchContentTopAsset == 2) {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#eaee00"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient3)"
                                    });
                                } else {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#01BAEF"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient1)"
                                    });
                                };
                                $("#assetOverlayCostPrice").val(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                                $("#assetOverlayAssetPrice").html(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                            }, 0);
                        
                        }) 
                    );
                })
            );
        } 
    } else if(Range == 2 || Range == 3 || Range==4){
        if (Type == 1 && Currency == "USD"){
            jQuery.when(
                data5 = $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+asset+"&outputsize=full&apikey="+API, function(json) {}).done(function(data5) {
                    EpochTime = (UNIXtoepoch(String(data5["Meta Data"]["3. Last Refreshed"])+" 00:00:00"))/1000;
                    dateyy = epochtoUNIX(StartEpochTime);
                    if(Range == 0){TimeStamp=60;} else if (Range == 1) {StartEpochTime = EpochTime - 86400;TimeStamp=300;} else if (Range == 2) {StartEpochTime = EpochTime - 604800;TimeStamp=86400;} else if (Range == 3) {StartEpochTime = EpochTime - 2592000;TimeStamp=86400;} else if (Range == 4) {StartEpochTime = EpochTime - 31536000;TimeStamp=86400;};        
                    for (i in data5["Time Series (Daily)"]){
                        // console.log(i, epochtoUNIX(StartEpochTime));
                        if (String(i) == String(epochtoUNIX(StartEpochTime)).substr(0, 10)){
                            break;
                        };
                        DateOutput.push(i);
                        PriceOutput.push(Math.round(data5["Time Series (Daily)"][i]["4. close"] * 100) / 100);
                    // console.log(PriceOutput);
                    // PriceOutput.reverse();
                    // DateOutput.reverse();
                    var newPriceOutput = [];
                    // for (i in PriceOutput) {
                    //     newPriceOutput.push(PriceOutput[PriceOutput.length - i - 1]);
                    // };
                    // PriceOutput = newPriceOutput;
                    // console.log(PriceOutput);
                    // console.log(newPriceOutput);
                    var output = [PriceOutput, DateOutput]; ////**************OUTPUT**************** [This is fuckery at a whole new level]
                    window.chartValues = [...PriceOutput]
                    window.chartData = {
                        labels: [],
                        series: [window.chartValues.reverse()]
                    };
                    // End of replacement
                    window.chartDataOptions = {
                        width: $(window).width() * 0.2 + 900,
                        height: $(window).height() * 0.4 + 100,
                        showPoint: false,   
                        axisY: {showLabel: false, showGrid: false},
                        showArea: true,
                        chartPadding: {
                            top: $(window).height() * 0.1,
                            right: 0,
                            bottom: 0,
                            left: $(window).width() * 0.05
                        },
                    };
                    window.assetChart = new Chartist.Line(".ct-chart", window.chartData, window.chartDataOptions);
                    setTimeout(function() {
                        $(".ct-chart-line").css({
                            width: "calc(20vw + 1000px)"
                        });
                        mouseMove();
                    }, 150);
                    setTimeout(function() {
                        if (window.searchContent == 1 || window.searchContentTopAsset == 1) {
                            $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                stroke: "#20BF55"
                            });
                            $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                fill: "url(#MyGradient2)"
                            });
                        } else if (window.searchContent == 2 || window.searchContentTopAsset == 2) {
                            $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                stroke: "#eaee00"
                            });
                            $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                fill: "url(#MyGradient3)"
                            });
                        } else {
                            $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                stroke: "#01BAEF"
                            });
                            $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                fill: "url(#MyGradient1)"
                            });
                        };
                        $("#assetOverlayCostPrice").val(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                        $("#assetOverlayAssetPrice").html(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                    }, 0);
                    //console.log(output);
                        
                    };
                })
            ); 
        } else if (Type == 1 && Currency != "USD" && (false == ['BTC','ETH'].includes(Currency))){
            jQuery.when(
                data5 = $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+asset+"&outputsize=full&apikey="+API, function(json) {}).done(function(data5) {
                    EpochTime = (UNIXtoepoch(String(data5["Meta Data"]["3. Last Refreshed"])+" 00:00:00"))/1000;
                    dateyy = epochtoUNIX(StartEpochTime);
                    if(Range == 0){TimeStamp=60;} else if (Range == 1) {StartEpochTime = EpochTime - 86400;TimeStamp=300;} else if (Range == 2) {StartEpochTime = EpochTime - 604800;TimeStamp=86400;} else if (Range == 3) {StartEpochTime = EpochTime - 2592000;TimeStamp=86400;} else if (Range == 4) {StartEpochTime = EpochTime - 31536000;TimeStamp=86400;};        
                    for (i in data5["Time Series (Daily)"]){
                        if (String(i) == String(epochtoUNIX(StartEpochTime)).substr(0, 10)){
                            break;
                        };
                        DateOutput.push(i);
                        PriceOutput.push(data5["Time Series (Daily)"][i]["4. close"]);
                    };
                    window.DateOutput = DateOutput;
                    window.PriceOutput = PriceOutput;
                    // console.log(DateOutput);
                    // console.log(PriceOutput);
                    jQuery.when(
                        data6 = $.getJSON("https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol="+Currency+"&outputsize=full&apikey="+API, function(json) {}).done(function(data6) {
                            EpochTime = (UNIXtoepoch(String(data6["Meta Data"]["5. Last Refreshed"]).substr(0, 10)+" 00:00:00"))/1000;
                            dateyy = epochtoUNIX(StartEpochTime);
                            if(Range == 0){TimeStamp=60;} else if (Range == 1) {StartEpochTime = EpochTime - 86400;TimeStamp=300;} else if (Range == 2) {StartEpochTime = EpochTime - 604800;TimeStamp=86400;} else if (Range == 3) {StartEpochTime = EpochTime - 2592000;TimeStamp=86400;} else if (Range == 4) {StartEpochTime = EpochTime - 31536000;TimeStamp=86400;};        
                            var date = []; var price = []; var final = [];
                            for (i in data6["Time Series FX (Daily)"]){
                                // console.log(i);
                                if (String(i) == String(epochtoUNIX(StartEpochTime)).substr(0, 10)){
                                    break;
                                };
                                date.push(i);
                                price.push(Math.round(data6["Time Series FX (Daily)"][i]["4. close"] * 100) / 100);
                            }
                            // console.log(date); 
                            // console.log(price);
                            var index = 0;
                            var index2 = 0;
                            var newDate = [];
                            for (i in date) {
                                // console.log(date[i], window.DateOutput[index])
                                if (window.DateOutput[index] == date[i]) {
                                    window.PriceOutput[index] = Math.round(price[index2] * window.PriceOutput[index] * 100) / 100;
                                    newDate.push(date[index2]);
                                    index++;
                                };
                                index2++;
                            };
                            window.PriceOutput.reverse();
                            window.DateOutput.reverse();
                            window.DateOutput = newDate.reverse();
                            // console.log(window.DateOutput);
                            // console.log(window.PriceOutput); 
                            var output = [window.PriceOutput, newDate.reverse()]; ////**************OUTPUT**************** [This is fuckery at a whole new level]
                            window.chartValues = [...window.PriceOutput]
                            window.chartData = {
                                labels: [],
                                series: [window.chartValues]
                            };
                            // End of replacement
                            window.chartDataOptions = {
                                width: $(window).width() * 0.2 + 900,
                                height: $(window).height() * 0.4 + 100,
                                showPoint: false,   
                                axisY: {showLabel: false, showGrid: false},
                                showArea: true,
                                chartPadding: {
                                    top: $(window).height() * 0.1,
                                    right: 0,
                                    bottom: 0,
                                    left: $(window).width() * 0.05
                                },
                            };
                            window.assetChart = new Chartist.Line(".ct-chart", window.chartData, window.chartDataOptions);
                            setTimeout(function() {
                                $(".ct-chart-line").css({
                                    width: "calc(20vw + 1000px)"
                                });
                                mouseMove();
                            }, 150);
                            setTimeout(function() {
                                if (window.searchContent == 1 || window.searchContentTopAsset == 1) {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#20BF55"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient2)"
                                    });
                                } else if (window.searchContent == 2 || window.searchContentTopAsset == 2) {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#eaee00"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient3)"
                                    });
                                } else {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#01BAEF"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient1)"
                                    });
                                };
                                $("#assetOverlayCostPrice").val(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                                $("#assetOverlayAssetPrice").html(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                            }, 0);

                        })
                        
                    );

                })
            );
        } else {
            jQuery.when(
                data5 = $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+asset+"&outputsize=full&apikey="+API, function(json) {}).done(function(data5) {
                    EpochTime = (UNIXtoepoch(String(data5["Meta Data"]["3. Last Refreshed"])+" 00:00:00"))/1000;
                    dateyy = epochtoUNIX(StartEpochTime);
                    if(Range == 0){TimeStamp=60;} else if (Range == 1) {StartEpochTime = EpochTime - 86400;TimeStamp=300;} else if (Range == 2) {StartEpochTime = EpochTime - 604800;TimeStamp=86400;} else if (Range == 3) {StartEpochTime = EpochTime - 2592000;TimeStamp=86400;} else if (Range == 4) {StartEpochTime = EpochTime - 31536000;TimeStamp=86400;};        
                    for (i in data5["Time Series (Daily)"]){
                        if (String(i) == String(epochtoUNIX(StartEpochTime)).substr(0, 10)){
                            break;
                        };
                        DateOutput.push(i);
                        PriceOutput.push(data5["Time Series (Daily)"][i]["4. close"]);
                    };
                    window.DateOutput = DateOutput;
                    window.PriceOutput = PriceOutput;
                    //console.log(DateOutput);
                    //console.log(PriceOutput);
                    jQuery.when(
                        data7 = $.getJSON("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol="+Currency+"&market=USD&apikey="+API, function(json) {}).done(function(data7) {
                            EpochTime = (UNIXtoepoch(String(data7["Meta Data"]["6. Last Refreshed"]).substr(0, 10)+" 00:00:00"))/1000;
                            dateyy = epochtoUNIX(StartEpochTime);
                            var date = []; var price = []; var final = [];
                            for (i in data7["Time Series (Digital Currency Daily)"]){
                                // console.log(i);
                                if (String(i) == String(epochtoUNIX(StartEpochTime)).substr(0, 10)){
                                    break;
                                };
                                date.push(i);
                                price.push(Math.round(data7["Time Series (Digital Currency Daily)"][i]["4b. close (USD)"] * 100) / 100);
                            }
                            //console.log(date); 
                            //console.log(price);
                            var index = 0;
                            var index2 = 0;
                            var newDate = [];
                            for (i in date) {
                                // console.log(date[i], window.DateOutput[index])
                                if (window.DateOutput[index] == date[i]) {
                                    window.PriceOutput[index] = Math.round(window.PriceOutput[index] / price[index2] * 100) / 100;
                                    newDate.push(date[index2]);
                                    index++;
                                };
                                index2++;
                            };
                            window.DateOutput = newDate.reverse();
                            var output = [window.PriceOutput, newDate.reverse()]; ////**************OUTPUT**************** [This is fuckery at a whole new level]
                            window.chartValues = [...window.PriceOutput]
                            window.chartData = {
                                labels: [],
                                series: [window.chartValues]
                            };
                            // End of replacement
                            window.chartDataOptions = {
                                width: $(window).width() * 0.2 + 900,
                                height: $(window).height() * 0.4 + 100,
                                showPoint: false,   
                                axisY: {showLabel: false, showGrid: false},
                                showArea: true,
                                chartPadding: {
                                    top: $(window).height() * 0.1,
                                    right: 0,
                                    bottom: 0,
                                    left: $(window).width() * 0.05
                                },
                            };
                            window.assetChart = new Chartist.Line(".ct-chart", window.chartData, window.chartDataOptions);
                            setTimeout(function() {
                                $(".ct-chart-line").css({
                                    width: "calc(20vw + 1000px)"
                                });
                                mouseMove();
                            }, 150);
                            setTimeout(function() {
                                if (window.searchContent == 1 || window.searchContentTopAsset == 1) {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#20BF55"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient2)"
                                    });
                                } else if (window.searchContent == 2 || window.searchContentTopAsset == 2) {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#eaee00"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient3)"
                                    });
                                } else {
                                    $(".ct-series-a .ct-line, .ct-series-a .ct-point").css({
                                        stroke: "#01BAEF"
                                    });
                                    $(".ct-series-a .ct-area, .ct-series-b .ct-area").css({
                                        fill: "url(#MyGradient1)"
                                    });
                                };
                                $("#assetOverlayCostPrice").val(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                                $("#assetOverlayAssetPrice").html(window.currentCurrency + window.chartValues[window.chartValues.length - 1]);
                            }, 0);
                        })
                        
                    );

                })
            );
        };
    };
}

function getApiKeyIndex() {
    apiKeyIndex++;
    apiKeyIndex = apiKeyIndex % apiKeys.length
    return apiKeys[apiKeyIndex]
};

$(document).ready(function() {
    mainCode();
});