var ico = [];

$(".tablink").click(function(){
    let type = $(this).data("type");
    $(".tablink").each(function(index){
        $(this).removeClass("active");
    });
    $("#ico-list").empty();
    $("#tablink-"+type).addClass("active");
    $("#tab-content-loader").css("display", "flex")
    requestList(type);
});

function requestList(type) {
    var url = "https://api.icowatchlist.com/public/v1/"+type;
    let promise = fetch(url);
    promise.then(function(response) {
        return response.json();
    }).then(function(data) {
        ico[type] = data.ico[type];
        renderList(type);
    }).catch(function(error) {
        renderList(type);
    });
}

function renderList(type) {
    ico[type].forEach(function(item) {
        var block = '<div class="content-item">'+
            '<div class="content-item-image">'+
                '<a href="'+item.website_link+'" target="_blank">'+
                    '<img src="'+item.image+'" alt="no image"/>'+
                '</a>'+
            '</div>'+
            '<div class="content-item-name">'+
                '<a href="'+item.website_link+'" target="_blank">'+
                    item.name+
                '</a>'+
            '</div>'+
            '<div class="content-item-desctiption">'+
                item.description+
            '</div>'+
            '<div class="content-item-start-date">'+
                item.start_time+
            '</div>'+
            '<div class="content-item-start-date">'+
                item.end_time+
            '</div>'+
        '</div>';
        $("#ico-list").append(block);
    });
    $("#tab-content-loader").hide();
}

requestList("live");
