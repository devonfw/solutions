var totalPage = 0;
var pageSize = 10;

function getParameters() {
    const searchParams = new URLSearchParams(document.location.hash.length > 0 ? document.location.hash.substring(1) : "");
    var params = {};
    params.toString = () => searchParams.toString();
    params.set = (k, v) => searchParams.append(k, v);
    params.delete = (k, v) => {
        var allValues = searchParams.getAll(k);
        var newAllValues = allValues.filter(av => av != v);
        if (newAllValues.length != allValues.length) {
            searchParams.delete(k);
            newAllValues.forEach(av => searchParams.set(k, av));
            return true;
        }
        return false;
    }
    params.get = (k) => searchParams.getAll(k);
    params.keys = (k) => searchParams.keys(k);
    return params;
}

function search() {
    var parameters = getParameters();
    var solutions = solutionsJson;
    var curPage = 0;
    for (const filterName of parameters.keys()) {
        var filterValues = parameters.get(filterName);
        for (var i in filterValues) {
            if(filterName == 'page'){
                curPage = filterValues[i];
                parameters.delete('page',curPage);
                break;
        }
            var filterValue = filterValues[i];
            var filterSolutions = tagsJson[filterName][filterValue];
            var newSolutions = {};
            for (var solutionKey in solutions) {
                if (filterSolutions.includes(solutionKey)) {
                    newSolutions[solutionKey] = solutions[solutionKey];
                }
            }
            solutions = newSolutions;
        }
    }

    var dataSize = Object.keys(solutions).length;
    if (dataSize / pageSize > parseInt(dataSize/ pageSize)) {
        totalPage = parseInt(dataSize / pageSize) + 1;
    } else {
        totalPage = parseInt(dataSize / pageSize);
    }
    if(parseInt(curPage) == 0){
        renderSolutions(solutions,1)
    }
    else if(parseInt(curPage) == totalPage){
        renderSolutions(solutions,totalPage);
    }
    else{
        renderSolutions(solutions,curPage);
    }

    disableFilters(solutions);
    highlightSelected();

}

function renderSolutions(solutions,cur) {
    var filterpanelbody = $("#resultspanel");
    filterpanelbody.empty();

    var currentPage = cur;
    var countSolutions = 0;
    var dataSize = Object.keys(solutions).length;
    var startData = (currentPage - 1) * pageSize + 1;
    var endData = (currentPage * pageSize > dataSize ? dataSize : currentPage * pageSize);
    
    for (const solutionKey in solutions) {;
        if (Object.hasOwnProperty.call(solutions, solutionKey)) {
            countSolutions++;
            if (countSolutions >= startData && countSolutions <= endData) {
            const solution = solutions[solutionKey];
            var solutionDiv = $('<div id="solution_' + solutionKey + '" class="solution"></div>');
            var solutionHeadlineDiv = $('<div id="solution_' + solutionKey + '_headline" class="solutionheadline"></div>');
            var solutionHeadlineLink = $('<a id="solution_' + solutionKey + '_headline_link" class="solutionheadlinelink" href="' + solution.path + '"></a>');
            solutionHeadlineLink.text(solution.headline);
            solutionHeadlineLink.attr('target', '_blank')
            solutionHeadlineDiv.append(solutionHeadlineLink);
            solutionDiv.append(solutionHeadlineDiv);
            var solutionBodyDiv = $('<div id="solution_body_' + solutionKey + '" class="solutionbody"></div>');
            if (solution.image != "") {
                var solutionImage = $('<img id="solution_' + solutionKey + '_image" class="solutionimage" src="' + solution.image + '"></img>');
                solutionBodyDiv.append(solutionImage);
            }
            var solutionSnippetDiv = $('<div id="solution_' + solutionKey + '_snippet" class="solutionsnippet"></div>');
            solutionSnippetDiv.text(solution.snippet);
            solutionBodyDiv.append(solutionSnippetDiv);
            solutionDiv.append(solutionBodyDiv);
            filterpanelbody.append(solutionDiv);
            }
        }
    }

    createBtns(totalPage, currentPage);
}

function createBtns(totalPage, current) {
    $('#pagination').empty();
    let tempStr = "";
    let cur = parseInt(current);
    if (cur > 1) {
        tempStr += "<span class='pageBtn' id='prepage' href=\"#\" data-page = " + (cur - 1) + "><  Precious</span>"
    }
    for (var pageIndex = 1; pageIndex < totalPage + 1; pageIndex++) {
        tempStr += "<a class='pageBtn' id='page" + pageIndex + "'  data-page = " + (pageIndex) + "><span>" + pageIndex + "</span></a>";
    }
    if (cur < totalPage) {
        tempStr += "<span class='pageBtn' id='nextpage' href=\"#\"  data-page = " + (cur + 1) + ">Next  ></span>";;
    }
    tempStr += "</div>";
    $("#pagination").append(tempStr);
}

function bindClick() {
    var buttonArr = ['#prepage', '#nextpage'];
    for (var b in buttonArr) {
        var dom = buttonArr[b];
        $('#pagination').delegate(dom, 'click', function () {
            var page = $(this).data('page');
            let parameters = getParameters();
            let pageArr = parameters.get('page')
            for (var p in pageArr) {
                parameters.delete('page', pageArr[p]);
            }
            parameters.set('page', page);
            document.location.hash = "#" + parameters.toString();
            search();
            $('#page' + page).css({ background: '#007bff', color: '#fff' });
        });
        $('#pagination').delegate(dom, 'mouseover', function () {
            $('#' + $(this).attr("id")).css({ cursor: 'pointer' });
        });    
    }
    for (var num = 1; num <= totalPage; num++) {
        var singleDom = '#page' + num;
        $('#pagination').delegate(singleDom, 'click', function () {
            var page = $(this).data('page');
            let parameters = getParameters();
            let pageArr = parameters.get('page')
            for (var p in pageArr) {
                parameters.delete('page', pageArr[p]);
            }
            parameters.set('page', page);
            document.location.hash = "#" + parameters.toString()
            search();
            $('#page' + page).css({ background: '#007bff', color: '#fff'});
        });
        $('#pagination').delegate(singleDom, 'mouseover', function () {
            var page = $(this).data('page');
            $('#page' + page).css({ cursor: 'pointer' });
        });
    }
}


function highlightSelected() {
    $(".checkbox").text("check_box_outline_blank");
    var parameters = getParameters();
    for (const filterName of parameters.keys()) {
        var filterValues = parameters.get(filterName);
        for (var i in filterValues) {
            var filterValue = filterValues[i];
            $("#tag_" + filterName.replace(/[^a-zA-Z0-9]/g, "_") + '_' + filterValue.replace(/[^a-zA-Z0-9]/g, "_") + "_checkbox").text('check_box');
            $("#tag_" + filterName.replace(/[^a-zA-Z0-9]/g, "_") + '_' + filterValue.replace(/[^a-zA-Z0-9]/g, "_")).removeClass('disabled');
        }
    }
}

function disableFilters(solutions) {
    $(".disabled").removeClass("disabled");
    for (const filter in tagsJson) {
        if (Object.hasOwnProperty.call(tagsJson, filter)) {
            const tag = tagsJson[filter];
            var activeValues = [];
            for (const solutionKey in solutions) {
                if (Object.hasOwnProperty.call(solutions, solutionKey)) {
                    const solution = solutions[solutionKey];
                    if (solution["tags"][filter]) {
                        activeValues = activeValues.concat(solution["tags"][filter]);
                    }
                }
            }
            for (const tagValue in tag) {
                if (Object.hasOwnProperty.call(tag, tagValue)) {
                    console.log(filter + ":" + tagValue);
                    if (!activeValues.includes(tagValue)) {
                        $('#tag_' + filter.replace(/[^a-zA-Z0-9]/g, "_") + '_' + tagValue.replace(/[^a-zA-Z0-9]/g, "_")).addClass("disabled");
                    }
                }
            }
        }
    }
}

async function main() {
    indexJson = await $.ajax({
        url: "index.json?r=" + Math.random()*10000
    });

    solutionsJson = await $.ajax({
        url: "solutions.json?r=" + Math.random()*10000
    });

    tagsJson = await $.ajax({
        url: "tags.json?r=" + (Math.random()*10000)
    });


    for (const filter in tagsJson) {
        if (Object.hasOwnProperty.call(tagsJson, filter)) {
            const tag = tagsJson[filter];
            for (const tagValue in tag) {
                if (Object.hasOwnProperty.call(tag, tagValue)) {
                    var solutionIds = tag[tagValue];
                    solutionIds.forEach(solutionId => {
                        var solution = solutionsJson[solutionId];
                        if (solution) {
                            if (!solution["tags"]) {
                                solution["tags"] = {};
                            }
                            if (!solution["tags"][filter]) {
                                solution["tags"][filter] = [];
                            }
                            solution["tags"][filter].push(tagValue);
                        }
                    });

                }
            }
        }
    }
    console.log(solutionsJson);

    $("head").append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet">');
    var paginationDiv = $('<div id="pagination" class = "pagination"></div>');
    $("#content").append(paginationDiv);
    var parameters = getParameters();

    var filterspanel = $('<div id="filterspanel" class="filterspanel"></div>');
    for (const filter in tagsJson) {
        if (Object.hasOwnProperty.call(tagsJson, filter)) {
            const tag = tagsJson[filter];
            console.log(tag);
            var filterpanel = $('<div id="filterpanel_' + filter + '" class="filterpanel"></div>');
            var filterpanelhead = $('<div id="filterpanel_' + filter + '_head" class="filterpanelhead"></div>');
            filterpanelhead.text(filter);
            filterpanel.append(filterpanelhead);
            var filterpanelbody = $('<div id="filterpanel_' + filter + '_body" class="filterpanelbody"></div>');
            filterpanel.append(filterpanelbody);
            for (const tagValue in tag) {
                if (Object.hasOwnProperty.call(tag, tagValue)) {
                    var tagDiv = $('<div class="tag" id="tag_' + filter.replace(/[^a-zA-Z0-9]/g, "_") + '_' + tagValue.replace(/[^a-zA-Z0-9]/g, "_") + '"></div>');
                    tagDiv.text(tagValue);
                    tagDiv.prepend($('<span id="tag_' + filter.replace(/[^a-zA-Z0-9]/g, "_") + '_' + tagValue.replace(/[^a-zA-Z0-9]/g, "_") + '_checkbox" class="checkbox material-icons-sharp">check_box_outline_blank</span>'))
                    tagDiv.click((e) => {
                        if (!$(e.currentTarget).hasClass("disabled")) {
                            if (!parameters.delete(filter, tagValue)) {
                                parameters.set(filter, tagValue);
                            }
                            document.location.hash = "#" + parameters.toString()
                            search();
                        }
                    });
                    filterpanelbody.append(tagDiv);
                }
            }
            filterspanel.append(filterpanel);
        }
    }
    $("#content").append(filterspanel);
    var resultspanel = $('<div id="resultspanel" class="resultspanel"></div>');
    $("#content").append(resultspanel);
    search(); 
    bindClick();
}

main();