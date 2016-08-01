OSH.UI.Loading = Class.create({
    initialize: function () {
        var loadingDiv = document.createElement("div");
        loadingDiv.setAttribute("class",'loading-container');

        OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_START,function(event){
            var htmlVar="";
            htmlVar += "	<div class=\"loading-dot-container\">";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div><span class=\"loading-label\">Buffering<\/span><\/div>";
            htmlVar += "	<\/div>";

            loadingDiv.innerHTML = htmlVar;
            document.body.appendChild(loadingDiv);
        });

        OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_STOP,function(event){
            document.body.removeChild(loadingDiv);
        });

        /*document.observe("dom:loaded", function() {
            var htmlVar="";
            htmlVar += "	<div class=\"loading-dot-container\">";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div><span class=\"loading-label\">Buffering<\/span><\/div>";
            htmlVar += "	<\/div>";

            loadingDiv.innerHTML = htmlVar;
            document.body.appendChild(loadingDiv);
        });*/
    }
});

new OSH.UI.Loading();