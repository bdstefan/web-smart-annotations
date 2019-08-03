// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
let revertColor = document.getElementById('revertColor');
let annotate    = document.getElementById('annotate');
let currentURL;

chrome.tabs.query(
    {'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
      //getCurrentURL(tabs[0].url);
      currentURL = tabs[0].url;
});

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});


changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

revertColor.onclick = ()=> {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "white";'});
  });
};

annotate.onclick = ()=> {
  confirm("Confirm annotation for " + currentURL + " ?");
};