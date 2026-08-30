document.addEventListener("DOMContentLoaded", function () {
    const detailsElements = document.querySelectorAll("details");
    detailsElements.forEach((details) => {
        details.addEventListener("toggle", function () {
            if (this.open) {
                if (typeof MathJax !== "undefined") {
                    if (MathJax.Hub) { // MathJax V2
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this]);
                    } else if (MathJax.typesetPromise) { // MathJax V3
                        MathJax.typesetPromise([this]).catch((err) => console.log(err.message));
                    }
                }
            }
        });
    });
});
