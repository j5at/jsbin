//= require "../chrome/storage"

var addthiselements = {
  "<tb>": '<div class="addthis_toolbox">',
  "</tb>": '</div>',
  "<bc>": '<a class="addthis_button_compact"></a>',
  "<bp>": '<a class="addthis_button_preferred"></a>',
  "<b:f>": '<a class="addthis_button_facebook"></a>',
  "<b:t>": '<a class="addthis_button_twitter"></a>',
  "<b:li>": '<a class="addthis_button_linkedin"></a>'
};

var addthisblocks = [
    {
        "html": "<tb><bp><bp><bp><bp><bc></tb>",
        "label": "toolbox, preferred",
        "group": "toolboxes"
    }
];

window.addthisblocks = addthisblocks; // expose a command line API
window.addthiselements = addthiselements;

addthisblocks.userSpecified = JSON.parse(localStorage.getItem('addthisblocks') || "[]");
for (var i = 0; i < addthisblocks.userSpecified.length; i++) {
  addthisblocks.push(addthisblocks.userSpecified[i]);
}

addthisblocks.add = function (widget) {
  // Extract each script from a list (as documented) or use the default way
  if (widget.scripts) {
    widget.scripts.forEach(function (script) {
      script.group = widget.text;
      script.label = script.text;
      this.userSpecified.push(script);
      addthisblocks.push(script);
    }.bind(this));
  } else {
    // Adding a widget according to the above schema
    widget.group = 'Custom';
    this.userSpecified.push(widget);
    addthisblocks.push(widget);
  }
  try {
    localStorage.setItem('addthisblocks', JSON.stringify(this.userSpecified));
  } catch (e) {} // just in case of DOM_22 error, makes me so sad to use this :(
  $('#addthisblocks').trigger('init');
};

addthisblocks.clear = function () {
  addthisblocks.userSpecified = [];
  localStorage.removeItem('addthisblocks');
  var length = addthisblocks.length;
  for (var i = 0; i < length; i++) {
    if (addthisblocks[i].group === 'Custom') {
      addthisblocks.splice(i, 1);
      length--;
    }
  }
  // force a refresh?
  $('#addthisblocks').trigger('init');
};

var addthisloaders = [
    {
        "url": "//cache-local.addthis.com/cachefly/js/300/addthis_widget.js",
        "label": "cache-local",
        "group": "AddThis 3.0"
    },
    {
        "url": "//cache-test.addthis.com/cachefly/js/300/addthis_widget.js",
        "label": "cache-test",
        "group": "AddThis 3.0"
    },
    {
        "url": "//s7.addthis.com/js/300/addthis_widget.js",
        "label": "s7/edge",
        "group": "AddThis 3.0"
    },
    {
        "url": "//cache-local.addthis.com/cachefly/js/250/addthis_widget.js?delayUpgrade=1",
        "label": "cache-local",
        "group": "AddThis 2.5"
    },
    {
        "url": "//cache-test.addthis.com/cachefly/js/250/addthis_widget.js?delayUpgrade=1",
        "label": "cache-test",
        "group": "AddThis 2.5"
    },
    {
        "url": "//s7.addthis.com/js/250/addthis_widget.js?delayUpgrade=1",
        "label": "s7/edge",
        "group": "AddThis 2.5"
    }
];

window.addthisloaders = addthisloaders; // expose a command line API

addthisloaders.userSpecified = JSON.parse(localStorage.getItem('addthisloaders') || "[]");
for (var i = 0; i < addthisloaders.userSpecified.length; i++) {
  addthisloaders.push(addthisloaders.userSpecified[i]);
}

addthisloaders.add = function (widget) {
  // Extract each script from a list (as documented) or use the default way
  if (widget.scripts) {
    widget.scripts.forEach(function (script) {
      script.group = widget.text;
      script.label = script.text;
      this.userSpecified.push(script);
      addthisloaders.push(script);
    }.bind(this));
  } else {
    // Adding a widget according to the above schema
    widget.group = 'Custom';
    this.userSpecified.push(widget);
    addthisloaders.push(widget);
  }
  try {
    localStorage.setItem('addthisloaders', JSON.stringify(this.userSpecified));
  } catch (e) {} // just in case of DOM_22 error, makes me so sad to use this :(
  $('#addthisloaders').trigger('init');
};

addthisloaders.clear = function () {
  addthisloaders.userSpecified = [];
  localStorage.removeItem('addthisloaders');
  var length = addthisloaders.length;
  for (var i = 0; i < length; i++) {
    if (addthisloaders[i].group === 'Custom') {
      addthisloaders.splice(i, 1);
      length--;
    }
  }
  // force a refresh?
  $('#addthisloaders').trigger('init');
};
