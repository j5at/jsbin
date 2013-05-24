//= require "addthisloaders"

var $loader = $('#addthisloaders'),
    loadergroups = {};

$loader.bind('init', function () {
  var i = 0,
    j = 0,
    k = 0,
    loader = {},
    groupOrder = [],
    group = {},
    groupLabel = '',
    lcGroup = '';

  // reset
  loadergroups = {};
  $loader.empty();

  for (i = 0; i < addthisloaders.length, loader = addthisloaders[i]; i++) {
    groupLabel = loader.group || 'Other';
    lcGroup = groupLabel.toLowerCase().replace(/[^a-z0-9]/ig, '');
    if (groupOrder.indexOf(lcGroup) === -1) {
      group = { label: groupLabel, addthisloaders: [], key: lcGroup };
      loadergroups[lcGroup] = group;
      groupOrder.push(lcGroup);
    } else {
      group = loadergroups[lcGroup];
    }

    group.addthisloaders.push(loader);
  }

  var html = ['<option value="none">None</option>'];

  for (i = 0; i < groupOrder.length; i++) {
    group = loadergroups[groupOrder[i]];
    html.push('<option value="" data-group="' + group.label + '" class="heading">-------------</option>');

    for (j = 0; j < group.addthisloaders.length, loader = group.addthisloaders[j]; j++) {
      html.push('<option value="' + group.key + ':' + j + '">' + loader.label + '</option>');
    }
  }

  $loader.html( html.join('') );
}).trigger('init');


$loader.bind('change', function () {
  if (!this.value) return;

  var selected = this.value.split(':'),
      group = loadergroups[selected[0]],
      loader = group.addthisloaders[selected[1]],

      pubid = window.prompt('Please enter a pubid', 'atblog');

  insertATResources(loader.url + (pubid ? '#pubid=' + pubid : ''), true, true);
}).on('click', function () {
  analytics.loaderMenu();
});




var $block = $('#addthisblocks'),
    blockgroups = {};

$block.bind('init', function () {
  var i = 0,
    j = 0,
    k = 0,
    block = {},
    groupOrder = [],
    group = {},
    groupLabel = '',
    lcGroup = '';

  // reset
  blockgroups = {};
  $block.empty();

  for (i = 0; i < addthisblocks.length, block = addthisblocks[i]; i++) {
    groupLabel = block.group || 'Other';
    lcGroup = groupLabel.toLowerCase().replace(/[^a-z0-9]/ig, '');
    if (groupOrder.indexOf(lcGroup) === -1) {
      group = { label: groupLabel, addthisblocks: [], key: lcGroup };
      blockgroups[lcGroup] = group;
      groupOrder.push(lcGroup);
    } else {
      group = blockgroups[lcGroup];
    }

    group.addthisblocks.push(block);
  }

  var html = ['<option value="none">None</option>'];

  for (i = 0; i < groupOrder.length; i++) {
    group = blockgroups[groupOrder[i]];
    html.push('<option value="" data-group="' + group.label + '" class="heading">-------------</option>');

    for (j = 0; j < group.addthisblocks.length, block = group.addthisblocks[j]; j++) {
      html.push('<option value="' + group.key + ':' + j + '">' + block.label + '</option>');
    }
  }

  $block.html( html.join('') );
}).trigger('init');


$block.bind('change', function () {
  if (!this.value) return;

  var selected = this.value.split(':'),
      group = blockgroups[selected[0]],
      block = group.addthisblocks[selected[1]];

  insertATResources(makeATBlocks(block.html), false, false);
}).on('click', function () {
  analytics.blockMenu();
});



var $layer = $('#addthislayers'),
    layergroups = {};

$layer.bind('init', function () {
  var i = 0,
    j = 0,
    k = 0,
    layer = {},
    groupOrder = [],
    group = {},
    groupLabel = '',
    lcGroup = '';

  // reset
  layergroups = {};
  $layer.empty();

  for (i = 0; i < addthislayers.length, layer = addthislayers[i]; i++) {
    groupLabel = layer.group || 'Other';
    lcGroup = groupLabel.toLowerCase().replace(/[^a-z0-9]/ig, '');
    if (groupOrder.indexOf(lcGroup) === -1) {
      group = { label: groupLabel, addthislayers: [], key: lcGroup };
      layergroups[lcGroup] = group;
      groupOrder.push(lcGroup);
    } else {
      group = layergroups[lcGroup];
    }

    group.addthislayers.push(layer);
  }

  var html = ['<option value="none">None</option>'];

  for (i = 0; i < groupOrder.length; i++) {
    group = layergroups[groupOrder[i]];
    html.push('<option value="" data-group="' + group.label + '" class="heading">-------------</option>');

    for (j = 0; j < group.addthislayers.length, layer = group.addthislayers[j]; j++) {
      html.push('<option value="' + group.key + ':' + j + '">' + layer.label + '</option>');
    }
  }

  $layer.html( html.join('') );
}).trigger('init');


$layer.bind('change', function () {
  if (!this.value) return;

  var selected = this.value.split(':'),
      group = layergroups[selected[0]],
      layer = group.addthislayers[selected[1]];

  insertATResources(makeATScript(layer.src), false, true);
}).on('click', function () {
  analytics.layerMenu();
});




// convert at shorthand elements to long-form HTML
function makeATBlocks(html) {
  var index = 0, chunk, pos, result = [];
  while (pos != -1) {
    pos = html.indexOf('>', index);
    if (pos > 0) {
      chunk = html.substring(index, pos + 1);
      result.push(window.addthiselements[chunk]);
      index = pos + 1;
    }
  }
  return result.join('\n');
}

function makeATScript(src) {
  return '<script>\n' + src + '\n</script>';
}


function insertATResources(urls, script, bottom) {
  if (!$.isArray(urls)) {
    urls = [urls];
  }

  var i = 0,
      length = urls.length,
      url = '',
      code = editors.html.getCode(),
      state = {
        line: editors.html.editor.currentLine(),
        character: editors.html.editor.getCursor().ch,
        add: 0
      },
      html = [],
      file = '';

  for (i = 0; i < length; i++) {
    url = urls[i];

    file = url.split('/').pop();

    if (file && code.indexOf(file + '"')) {
      // attempt to lift out similar scripts
      if (isCssFile(file)) {
        code = code.replace(new RegExp('<link.*href=".*?/' + file + '".*?/>\n?'), '');
      } else {
        code = code.replace(new RegExp('<script.*src=".*?/' + file + '".*?><' + '/script>\n?'), '');
      }
      state.add--;
    }

    if (script) {
      html.push('<' + 'script src="' + url + '"><' + '/script>');
    } else {
      html.push(url);
    }

    state.add++;
  }
  
  if (bottom) {
    if (code.indexOf('</body>') !== -1) {
      code = code.replace(/<\/body>/i, html.join('\n') + '\n</body>');
    } else {
      code += html.join('\n');
    }
  } else {
    if (code.indexOf('<body>') !== -1) {
      code = code.replace(/<body>/i, '<body>\n' + html.join('\n'));
    } else {
      code = html.join('\n') + code;
    }
  }

  editors.html.setCode(code);
  editors.html.editor.setCursor({ line: state.line + state.add, ch: state.character });

}