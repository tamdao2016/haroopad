/**
 * require.js 환경 설정
 */
requirejs.config({
    baseUrl: 'js/app',
    waitSeconds: 30,
    locale: 'ko-kr',
    paths: {
        vendors: '../vendors',
        tpl: '../../tpl',
        text: '../vendors/text',
        editor: 'editor/main'
    },
    config: {
        text: {
            //Valid values are 'node', 'xhr', or 'rhino'
            env: 'xhr'
        }
    },
    urlArgs: 'v0.1.0'
});

requirejs.onError = function (e) {
    alert('requireJS Error raised, check the console');
    console.log(e);
};

requirejs([
        'editor',
        'file/main',
        'preferences/main'
    ], function(editor, shortcut) {

        var res;
        // var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        //   mode: 'markdown',
        //   lineNumbers: true,
        //   theme: "solarized dark",
        //   keyMap: "vim",
        //   viewportMargin: 40,
        //   lineWrapping: true,
        //   extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
        // });

        marked.setOptions({
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          langPrefix: 'language-',
          highlight: function(code, lang) {
            if (lang === 'js') {
              //TODO
              // return highlighter.javascript(code);
            }
            return code;
          }
        });

        /**
         * 코드미러 내용 변경 이벤트 핸들러
         * @return {[type]} [description]
         */
        function changeHandler() {
            //TODO: throttle 적용
          res = marked(editor.getValue());
          $('#haroo article').html(res);
        }

        editor.on("change", changeHandler);
        changeHandler();

        shortcut.bind('open_file', function(str) {
            // $('#code').val(str);
            editor.setValue(str);
        });

        shortcut.bind('save_file', function() {
          editor.getValue();
        });

});