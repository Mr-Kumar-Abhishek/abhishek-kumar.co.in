(function() {
    var script = document.createElement('script');
    // Using Mermaid v9 which still supports the global UMD build
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@9.4.3/dist/mermaid.min.js';
    script.onload = function() {
        mermaid.initialize({ startOnLoad: false });
        
        var mermaidBlocks = document.querySelectorAll("pre code.language-mermaid");
        
        mermaidBlocks.forEach(function (block) {
            var div = document.createElement("div");
            div.className = "mermaid";
            // Set textContent to avoid HTML escaping issues that innerHTML might cause
            div.textContent = block.textContent;
            block.parentNode.replaceWith(div);
        });
        
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    };
    
    document.head.appendChild(script);
})();
