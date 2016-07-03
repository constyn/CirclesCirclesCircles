Circles.Game = function (game) {
	this.circles = [];
	this.ball = {};
	this.ballMoving = false;
};

Circles.Game.prototype = {

	create: function () {
			this.stage.backgroundColor = '#fff';
			var self = this;
			_.each(_.range(0, 5), function(i){
					var graphics = self.add.graphics(self.world.centerX, self.world.centerY);
					graphics.lineStyle(30, 0x333333);
					graphics.arc(0, 0, 40 * i, 0, 5, false);
					graphics.endFill();
					graphics.rotation = Math.random() * 360;
					self.circles.push({ gr: graphics, speed:Math.random() * 0.1, dir:i%2 === 0? -1:1});
			});

	  	self.ball = self.add.graphics(0, 0);
		  self.ball.beginFill(0x00bff3);
			self.ball.drawCircle(0, 0, 10);
			self.ball.endFill();
			self.physics.enable(self.ball, Phaser.Physics.ARCADE);
	},

	update: function () {
			var self = this;
			_.each(this.circles, function(circle){
					circle.gr.rotation += circle.speed * circle.dir;
			});

			//  only move when you click
			if (self.input.mousePointer.isDown && !this.ballMoving)
			{
					self.ball.x = self.input.x;
					self.ball.y = self.input.y;
			}
	},
};
