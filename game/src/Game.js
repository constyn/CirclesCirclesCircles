Circles.Game = function (game) {
		this.circles = [];
		this.ball = {};
		this.ballMoving = false;
		this.rotating = true;
		this.level = 1;
};

Circles.Game.prototype = {
		create: function () {
				this.centerX = this.world.centerX;
				this.centerY = this.world.centerY;
				this.stage.backgroundColor = '#fff';
				var self = this;
				self.addCircle();
		  	self.ball = self.add.graphics(0, 0);
			  self.ball.beginFill(0x00bff3);
				self.ball.drawCircle(0, 0, 15);
				self.ball.endFill();
				self.ball.x = 10e9;
				self.ball.y = 10e9;
				self.physics.enable(self.ball, Phaser.Physics.ARCADE);
		},

		update: function () {
				var self = this;
				var intersects = false;
				_.each(this.circles, function(circle){
						if (self.rotating) {
								circle.gr.rotation += circle.speed * circle.dir;
						}
						var dist = self.dist2Points(self.ball.x, self.ball.y, circle.posX, circle.posY);
						margin =  circle.thickness / 2 + self.ball.width / 2;
						if(dist < circle.radius + margin && dist > circle.radius - margin) {
								var angle = self.normalizeAngle(Math.PI + Math.atan2(circle.posY - self.ball.y, circle.posX - self.ball.x) - circle.gr.rotation);
								var startAngle =  circle.startAngle;
								var endAngle = circle.endAngle;
								if(angle > startAngle && angle < endAngle) {
										intersects = true;
								}
						}
				});

				self.ball.clear();
				self.ball.beginFill(intersects? 0xffcc00 : 0x00bff3);
				self.ball.drawCircle(0, 0, self.ball.width);
				self.ball.endFill();

				if(intersects) {
						self.ball.x = 10e9;
						self.ball.y = 10e9;
						//self.rotating = false;
						self.ballMoving = false;
				}

				if (self.input.mousePointer.isDown && !this.ballMoving) {
						self.ball.x = self.input.x;
						self.ball.y = self.input.y;
						self.rotating = true;
						self.ballMoving = true;
				}

				if(self.ballMoving) {
						var speed = 8;
						var ang = Math.atan2(self.centerY - self.ball.y, self.centerX - self.ball.x);
						self.ball.x += speed * Math.cos(ang);
						self.ball.y += speed * Math.sin(ang);
						if(self.dist2Points(self.centerX, self.centerY,self.ball.x,self.ball.y) < speed) {
					  		self.ball.x = self.centerX;
								self.ball.y = self.centerY;
						}
				}
				if(Math.round(self.ball.x) === self.centerX && Math.round(self.ball.y) === self.centerY){
						self.ballMoving = false;
						self.ball.x = 10e9;
						self.ball.y = 10e9;
						self.nextLevel();
				}
		},

		normalizeAngle: function (ang) {
				var TWO_PI = Math.PI * 2;
			  return ang - TWO_PI * Math.floor((ang) / TWO_PI);
		},

		dist2Points: function (x1, y1, x2, y2) {
				return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		},

		nextLevel: function () {
			  this.level++;
				this.addCircle();
		},

		addCircle: function () {
				var graphics = this.add.graphics(this.centerX, this.centerY);
				var thickness = 30;
				var endAngle = 3 * Math.PI / 2;
				graphics.lineStyle(thickness, 0x333333);
				graphics.arc(0, 0, 40 * this.level, 0, endAngle, false);
				graphics.endFill();
				graphics.rotation = Math.random() * 360;
				var circle = {
						gr: graphics,
						radius: 40 * this.level,
						posX: this.centerX,
						posY: this.centerY,
						startAngle: 0,
						endAngle: endAngle,
						thickness: thickness,
						speed: Math.random() * 0.02 + 0.01,
						dir:this % 2 === 0? -1:1
				};
				this.circles.push(circle);
		}
};
