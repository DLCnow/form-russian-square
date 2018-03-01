function Block() {
    //选择json里面那个类型的第几个数组
    this.allType = ["I", "L" ,"S" ,"Z" , "O","T","J"][~~(Math.random() * 7)];
    // console.log(this.allType);看看里面是啥
    //找到不同数组的长度
    this.allDirectionNumber = block_json[this.allType].length;
    //随机出一个方向的数组
    this.direction = ~~(Math.random() * this.allDirectionNumber);
    //定义block.code属性指向选出来的数组
    this.code = block_json[this.allType][this.direction];
    //定义砖块初始出来的位置
    this.row = 0;
    this.col = 4;
}

//渲染砖块
Block.prototype.render = function() {
    //遍历砖块的4*4矩阵
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            // game.setClass(this.row + i, this.col + j, "grey");
            //如果数组矩阵中的值为1就染色
            if (this.code[i][j] == 1) {
                //染色类型按照随机出来的allType数组来设置
                game.setClass(this.row + i, this.col + j, this.allType);
            }
        }
    }
}

//定义砖块下落的方法
Block.prototype.down = function() {
    //**************死亡判定在此***************//
    game.map.code[0].forEach(function(item) {
        if (item != 0) {
            clearInterval(game.timer);
            alert("Game Over!");
            return
        }
    })
    if (this.check(this.row + 1, this.col)) {
        this.row++;
    } else {
        this.addDie();
        game.block = new Block();
        this.remove();
    }
}

//当发生碰撞时的检测
Block.prototype.check = function(row, col) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //如果方块下一帧的值和地图下一帧的值同时不为0，说明两个位置毗邻相撞
            if (this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0) {
                return false;
            }
        }
    }
    return true;
}

//定义砖块向左的方法
Block.prototype.left = function() {
    if (this.check(this.row, this.col - 1)) {
        this.col--;
    }
}

//定义砖块向右的方法
Block.prototype.right = function() {
    if (this.check(this.row, this.col + 1)) {
        this.col++;
    }
}

//定义死亡方块
Block.prototype.addDie = function() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //如果这个块不是0表示有颜色
            if (this.code[i][j] != 0) {
                game.map.code[this.row + i][this.col + j] = this.allType;
            }
        }
    }
}

//定义旋转方法
Block.prototype.rotate = function() {
    //备份旧的方向
    var oldDirection = this.direction;
    //方向只有两种或四种，不能超过数组的长度-1
    if (this.direction == block_json[this.allType].length - 1) {
        this.direction = 0;
    } else {
        this.direction++;
    }
    //给让this.code时刻保持最新状态
    this.code = block_json[this.allType][this.direction];
    //如果下一帧和map相撞，就撤回原来的状态
    if (!this.check(this.row, this.col)) {
        this.direction = oldDirection;
        this.code = block_json[this.allType][this.direction];
    }
}

//一键到底
Block.prototype.goDown = function() {
    while (this.check(this.row + 1, this.col)) {
        this.row++;
    }
}

//消行判定
Block.prototype.remove = function() {
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 12; j++) {
            if (!game.map.code[i].includes(0)) {
                game.map.code.splice(i, 1);
                game.map.code.unshift(new Array(12).fill(0));
                document.getElementById("remove").play();
            }
        }
    }
}