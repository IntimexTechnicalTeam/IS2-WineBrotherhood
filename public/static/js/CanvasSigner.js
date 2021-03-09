var intimex = intimex || {};
(function () {
    var _config = {
        color: "#000000"
        , width: 2
        , initCanvas: null
    };

    if ($ == 'undefined') { throw new Error('Jquery Not Found!'); }
    //Declear CanvasSigner constructor
    function CanvasSigner(canvas, signature, config) {
        var signer = this;
        this.isWriting = false;
        this.config = $.extend(_config, config);
        this.Canvas = $(canvas)[0];
        this.Signature = $(signature)[0];

        if (this.Canvas && this.Signature) {
            this.Canvas.width = this.Signature.width;
            this.Canvas.height = this.Signature.height;
        }
        $(this.Canvas).bind("mousedown touchstart", function (event) { return signer.PenDown(signer, event); })
            .bind("mousemove touchmove", function (event) { return signer.PenWrite(signer, event); })
            .bind("mouseup mouseleave", function (event) { return signer.PenUp(signer, event); });

        this.initCanvas();
        return this;
    }
    //Declear Method
    CanvasSigner.prototype.initCanvas = function () {
        var rect = this.Canvas.getBoundingClientRect();
        this.Canvas.width = rect.width;
        this.Canvas.height = rect.height;
        var context = this.Canvas.getContext('2d');
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        if (this.config.initCanvas) {
            this.config.initCanvas(context);
        }
    }

    CanvasSigner.prototype.export = function () {
        if (this.Canvas) {
            var result = this.Canvas.toDataURL();
            if (this.Signature) this.Signature.src = result;
            return result;
        } else {
            return "";
        }
    }

    function getMousePos(canvas, evt) {
        var eventType = evt.type;
        if (eventType == "touchstart" || eventType == "touchmove") {
            evt = evt.originalEvent.touches[0];
        }
        //var rect = canvas.getBoundingClientRect();
        return {
            //x: canvas.width * (evt.clientX - canvas.offsetLeft) / canvas.offsetWidth,
            //y: canvas.height * (evt.clientY - canvas.offsetTop) /canvas.offsetHeight

            x: (evt.clientX - canvas.offsetLeft),
            y: (evt.clientY - canvas.offsetTop+$(window).scrollTop())
        };
    }

    CanvasSigner.prototype.PenDown = function (signer, pen) {
        //(window.getSelection ? window.getSelection() : document.selection).empty();

        if (pen.which !== 0 || pen.type == "touchstart") {
            var context = signer.Canvas.getContext("2d"),
                //position = getMousePos(signer.Canvas, ( pen.type=="touchmove"?pen.touches[0]:pen) );
                position = getMousePos(signer.Canvas, pen);
            signer.isWriting = true;
            context.beginPath();
            context.lineWidth = signer.config.width;
            context.strokeStyle = signer.config.color;
            context.moveTo(position.x, position.y);
        } else {
            signer.isWriting = false;
        }
    };

    CanvasSigner.prototype.PenUp = function (signer, pen) {
        signer.isWriting = false;
    };

    CanvasSigner.prototype.PenWrite = function (signer, pen) {
        pen.preventDefault();
        if (signer.isWriting) {
            //position = getMousePos(signer.Canvas, ( pen.type=="touchmove"?pen.touches[0]:pen) );
            position = getMousePos(signer.Canvas, pen);
            var context = signer.Canvas.getContext("2d");
            context.lineTo(position.x, position.y);
            context.stroke();
        }
    };
    intimex.CanvasSigner = CanvasSigner;
})();