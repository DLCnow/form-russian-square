//我认为地图的作用是保留上一帧的状态
function Map() {
    //初始化地图
    this.code = (function() {
        var arr = [];
        for (var i = 0; i < 20; i++) {
            arr.push([]);
            for (var j = 0; j < 12; j++) {
                arr[i].push(0);
            }
        }
        // arr[10][5] = "L";
        // arr[11][5] = "L";
        // arr[12][5] = "L";
        // arr[13][5] = "L";
        // arr[14][5] = "L";
        // arr[15][5] = "L";
        // arr[16][5] = "L";
        // arr[17][5] = "L";
        // arr[18][5] = "L";
        // arr[19][5] = "L";
        arr.push(Array(12).fill(1));

        return arr;
    })();

}

//渲染地图
Map.prototype.render = function() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 12; j++) {
            this.code[i][j] != 0 && game.setClass(i, j, this.code[i][j]);
        }
    }
}