// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let tabQueryInfo = {active: true, currentWindow: true};

let changeColor = document.getElementById('changeColor');
let revertColor = document.getElementById('revertColor');
let annotate    = document.getElementById('annotate');
let currentURL;


/**
 * Get active tab URL address
 */
chrome.tabs.query(tabQueryInfo, (tabs) => {currentURL = tabs[0].url;});

chrome.storage.sync.get('color', (data) => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});


changeColor.onclick = (element) => {
  let color = element.target.value;
  chrome.tabs.query(tabQueryInfo, (tabs) => {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

revertColor.onclick = ()=> {
  chrome.tabs.query(tabQueryInfo, (tabs) => {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "white";'});
  });
};

let getRadioSelectedValue = (name) => {
  let radios = document.getElementsByName(name);
  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
};

annotate.onclick = ()=> {
  let annotationObject = {
    'comment': document.getElementById('comment').value,
    'trust': getRadioSelectedValue('trust'),
    'realLocation': getRadioSelectedValue('location')
  };

  localStorage.setItem('annotation_' + currentURL, JSON.stringify(annotationObject));
  alert("Annotation save.")
};

