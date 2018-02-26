 function Game() {
     //定义初始化函数
     this.init();
     //让Game类成为中介者
     this.block = new Block();
     this.map = new Map();
     //添加事件监听
     this.bindEvent();
     //开始执行主函数
     this.start();
 }

 //初始化布局
 Game.prototype.init = function() {
     this.$dom = $("<table></table>")
     var tr, td;
     for (var i = 0; i < 20; i++) {
         tr = $("<tr></tr>");
         for (var j = 0; j < 12; j++) {
             td = $("<td></td>");
             $(td).appendTo(tr);
         }
         $(tr).appendTo(this.$dom);
     }
     $(this.$dom).appendTo("#app")
 }

 //定义一个设置类名的方法
 Game.prototype.setClass = function(row, col, classname) {
     $("tr").eq(row).children("td").eq(col).attr("class", classname)
 }

 //清除所有类名
 Game.prototype.clearClass = function() {
     for (var i = 0; i < 20; i++) {
         for (var j = 0; j < 12; j++) {
             $("tr").eq(i).children("td").eq(j).attr("class", "")
         }
     }
 }

 //定义事件监听函数
 Game.prototype.bindEvent = function() {
     var self = this;
     $(document).keydown(function(e) {
         switch (e.keyCode) {
             case 37:
                 self.block.left();
                 document.getElementById("left_right").play();
                 break;
             case 38:
                 self.block.rotate();
                 document.getElementById("up").play();
                 break;
             case 39:
                 self.block.right();
                 document.getElementById("left_right").play();
                 break;
             case 40:
                 self.block.down();
                 document.getElementById("down").play();
                 break;
             case 32:
                 self.block.goDown();
                 document.getElementById("goDown").play();
                 break;
         }
     })
 }

 //定义主函数
 Game.prototype.start = function() {
     var self = this;
     this.f = 0;
     this.timer = setInterval(function() {
         $("#info").html(self.f);
         self.clearClass();
         self.block.render();
         self.map.render();
         self.f++;
         if (self.f % 30 == 0) {
             self.block.down();
         }
     }, 20)
 }