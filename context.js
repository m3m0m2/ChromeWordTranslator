// Copyright (c) 2010 Mauro Meneghin. All rights reserved.
// web: http://g1ld0.is-a-geek.net/

//arrays of menu items
var context_desc=[],context_url=[],context_id=[];

function settings(info)
{
        chrome.tabs.create({url: "settings.html" });
}
function doTranslation(info, tab) 
{
  var word=escape(info.selectionText);
  var id=info.menuItemId;
  var i,url;
  for(i=0; i<context_url.length; i++)
  {
    if(id==context_id[i])
    {
      url=context_url[i].replace(/\{0\}/g,word);
      chrome.tabs.create({"url":url, "selected":false});
      break;
    }
  }
}
function updateContextMenu()
{
  var i,id;

  context_desc=localStorage["links_desc"];
  if(! context_desc)
    context_desc=[];
  else
  {
    try {
    context_desc=JSON.parse(context_desc);
    }catch(e)
    {
      alert('error: parsing context_desc');
      context_desc=[];
    }
  }

  context_url=localStorage["links_url"];
  if(! context_url)
    context_url=[];
  else
  {
    try {
      context_url=JSON.parse(context_url);
    }catch(e)
    {
      alert('error: parsing context_url');
      context_url=[];
    }
  }

  //chrome.contextMenus.removeAll();
  for(i=0; i<context_id.length; i++)
  {
    chrome.contextMenus.remove(context_id[i]);
  }
  context_id=[];

  for(i=0; i<context_desc.length; i++)
  {
    id = chrome.contextMenus.create({"title": context_desc[i], "contexts":["selection"],
                                        "onclick": doTranslation});
    context_id[i]=id;
  }
//  id=chrome.contextMenus.create({title: "Add Languages", contexts:["selection"], onclick: settings});
//  context_id[i]=id;
}

//to have menu at startup
chrome.contextMenus.create({title: "Add Languages", contexts:["page"], onclick: settings});
updateContextMenu();

