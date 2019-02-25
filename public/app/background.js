chrome.browserAction.onClicked.addListener(function(tab) {
    var url_encoded_url = encodeURIComponent(tab.url);
    console.log(url_encoded_url);
    console.log("HELLOOOOOOO")
    //var newURL = "http://www.leegly.com/sharer.php?u=" + url_encoded_url;
    //chrome.tabs.create({ url: newURL });
});

chrome.tabs.onRemoved.addListener((tab) => {
    console.log("Test");
});

chrome.commands.onCommand.addListener((command) => {
    switch(command){
        case "toggle-feature-foo":
            chrome.tabs.query({currentWindow: true, active:true},(tabs) =>{
            chrome.tabs.remove(tabs[0].id);
            });
            break;
        case "tab-left":
            chrome.tabs.query({currentWindow: true},(tabs) =>{
                chrome.tabs.query({currentWindow: true, active:true},(tabs_a) =>{
                    var current_tab = tabs_a[0];
                    for( i = 0; i < tabs.length; i++){
                        if(tabs[i].id == current_tab.id){
                            chrome.tabs.update(tabs[i - 1].id, {highlighted: true});
                        }
                    }
                });
            });
            break;
        case "tab-right":
            chrome.tabs.query({currentWindow: true},(tabs) =>{
                chrome.tabs.query({currentWindow: true, active:true},(tabs_a) =>{
                    var current_tab = tabs_a[0];
                    for( i = 0; i < tabs.length; i++){
                        if(tabs[i].id == current_tab.id){
                            console.log("Trying to move forward");
                            chrome.tabs.update(tabs[i + 1].id, {highlighted: true});
                        }
                    }
                    
                });
            //chrome.tabs.goBack(tabs[0].id);
            
            });    
            break;
    } 
});

chrome.tabs.onUpdated.addListener((tabid, tabinfo, tab) => {
    var url = tab.url;
    chrome.tabs.query({currentWindow: true, active:false},(tabs) =>{
        for( i = 0; i < tabs.length; i++){
            if(tabs[i].url == url && tabs[i].id != tab.id){
               chrome.tabs.update(tabs[i].id, {highlighted: true});
               chrome.tabs.remove(tab.id);
               
            }
        }
    }); 
});

