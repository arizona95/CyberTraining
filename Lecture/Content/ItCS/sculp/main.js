
function runit() {
    var editor = ace.edit("editor");
    var output = ace.edit("output");
    output.setValue('');

   
    var message = {
      command: 'run',
      source_code: editor.getValue()
    }; 
    document.getElementById('theFrame').contentWindow.postMessage(message, '*');
   

}

$(document).ready(function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/python");
    
    
    editor.commands.addCommand({
        name: 'executeProgram',
        bindKey: {
            win: 'Ctrl-Enter',
            mac: 'Command-Enter',
        sender: 'editor|cli'
        },
        exec: function(env, args, request) {
         runit();
        }
    });
    
    var output = ace.edit("output");
    output.setTheme("ace/theme/monokai");
    output.renderer.setShowGutter(false);
    output.renderer.setShowPrintMargin(false);
    
    // on result from sandboxed frame:
    window.addEventListener('message', function(event) {
        output.insert(event.data.stdout);
    });
    
    document.getElementById("execute").addEventListener("click", runit)
});
