// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  // Replace the current rules
  chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            schemes: [ 'http', 'https']
          }
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
  }])
});