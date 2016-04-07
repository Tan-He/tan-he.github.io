var CanvasDrawer = (function () {
    var canvas,
        canvasID,
        WIDTH,
        HEIGHT,
        ctx,
        objList = [],
        objNum = 8,
        strokeStyle = '#42A5F5',
        lineWidth = 3,
        toDegree = Math.PI / 180;

    function Circle(x, y, radius, moveY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.moveY = moveY;
    }

    Circle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    };

    function Square(x, y, length, moveY, angle, angularSpeed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.moveY = moveY;
        this.angle = angle;
        this.angularSpeed = angularSpeed;
    }

    Square.prototype.draw = function () {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * toDegree);
        ctx.strokeRect(-this.length / 2, -this.length / 2, this.length, this.length);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    function Triangle(x, y, length, moveY, angle, angularSpeed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.moveY = moveY;
        this.angle = angle;
        this.angularSpeed = angularSpeed;

        this.xFromOrigin = this.length / 2;
        this.yFromOrigin = Math.sqrt(3) / 4 * this.length;
    }

    Triangle.prototype.draw = function () {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * toDegree);

        ctx.beginPath();
        ctx.moveTo(-this.xFromOrigin, -this.yFromOrigin);
        ctx.lineTo(this.xFromOrigin, -this.yFromOrigin);
        ctx.lineTo(0, this.yFromOrigin);
        ctx.closePath();
        ctx.stroke();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    function setCanvasID(id) {
        canvasID = id;
    }

    function setCanvasSize(width, height) {
        WIDTH = width;
        HEIGHT = height;
    }

    function resize(width, height) {
        setCanvasSize(width, height);
        canvas.width = width;
        canvas.height = height;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
    }

    function getObjNum() {
        return objNum;
    }

    function setObjNum(num) {
        objNum = num;
    }

    function getStrokeStyle() {
        return strokeStyle;
    }

    function setStrokeStyle(color) {
        strokeStyle = color;
    }

    function getLineWidth() {
        return lineWidth;
    }

    function setLineWidth(width) {
        lineWidth = width;
    }

    function randomNum(max, min) {
        min = arguments[1] || 0;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getDirection() {
        return randomNum(2) === 0 ? -1 : 1;
    }

    function init() {
        canvas = document.getElementById(canvasID);
        ctx = canvas.getContext('2d');
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;

        for (var x = 0; x < objNum; x++) {
            objList.push(new Square(randomNum(WIDTH), randomNum(HEIGHT), randomNum(20, 25), randomNum(1, 4), randomNum(0, 90), randomNum(1, 3) * getDirection()));

            objList.push(new Circle(randomNum(WIDTH), randomNum(HEIGHT), randomNum(10, 13), randomNum(1, 4)));

            objList.push(new Triangle(randomNum(WIDTH), randomNum(HEIGHT), randomNum(20, 25), randomNum(1, 4), randomNum(0, 90), randomNum(1, 3) * getDirection()));
        }
    }

    function draw(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var x = 0; x < objNum * 3; x++) {
            var obj = objList[x];
            obj.y -= obj.moveY;
            if (!(obj instanceof Circle)) {
                obj.angle += obj.angularSpeed;
            }
            if (obj.y < -20) {
                obj.y = HEIGHT;
                obj.x = randomNum(WIDTH);
                //obj.moveY = randomNum(1, 4);
            }

            obj.draw();
        }
        window.requestAnimationFrame(draw);
    }

    function loadCanvas() {
        init();
        window.requestAnimationFrame(draw);
    }

    return {
        setCanvasID: setCanvasID,
        setCanvasSize: setCanvasSize,
        getObjNum: getObjNum,
        setObjNum: setObjNum,
        getStrokeStyle: getStrokeStyle,
        setStrokeStyle: setStrokeStyle,
        getLineWidth: getLineWidth,
        setLineWidth: setLineWidth,
        loadCanvas: loadCanvas,
        resize: resize
    };
})();