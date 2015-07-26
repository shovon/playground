require('shelljs/global');

var files = [

  "license.txt",

  "src/lib/Ease.js",

  "src/Playground.js",
  "src/Utils.js",

  "src/Events.js",
  "src/States.js",
  "src/Application.js",
  "src/GameLoop.js",
  "src/Gamepads.js",
  "src/Keyboard.js",
  "src/Pointer.js",
  "src/Loader.js",
  "src/Mouse.js",
  "src/Sound.js",
  "src/SoundWebAudioAPI.js",
  "src/SoundAudio.js",
  "src/Touch.js",
  "src/Tween.js",
  "src/Atlases.js",
  "src/Fonts.js",
  "src/DefaultState.js",
  "src/LoadingScreen.js"

];

var builds = {

  "playground.js": [
    "src/lib/CanvasQuery.js",
    "src/layer/Layer.js",
    "src/layer/Transitions.js",
    "src/layer/LoadingScreen.js"
  ],

  "playground-base.js": [

  ]

};

for (var key in builds) {

  var extra = builds[key];

  var all = files.concat(extra)
  var output = "";

  for (var i = 0; i < all.length; i++) {


    output += "\n\n/* file: " + all[i] + " */\n\n";
    output += cat(all[i]);

  }

  output.to("build/" + key);

  output = 'var PLAYGROUND;\n' + output;
  output += '\nmodule.exports = playground;';
  output += 'playground.Application = PLAYGROUND.Application;';
  output.to("build/commonjs/" + key);

}

function genBuild(input, outfile) {
  var extra = builds[input];
  var all = files.concat(extra);
  var output = '';

  all.forEach(function (el) {
    output += '\n\n/* file: ' + el + ' */\n\n';
    output += cat(el);
  });

  output = 'var PLAYGROUND;\n' +  output;
  output += '\nmodule.exports = playground;';
  output += 'playground.Application = PLAYGROUND.Application;';

  // console.log(output);
  output.to(outfile);
}

genBuild('playground.js', './index.js');
genBuild('playground-base.js', './base.js');
