var update;

function Block(x, y, elemid, parent, gridpath, starter) {
	GameObject.call(this);
	var self = this;
	
	self.x = x;
	self.y = y;
	self.parent = parent;
	self.gridpath = gridpath;
	self.starter = starter;
	
	generate();
	
	function generate() {
		self.element = document.createElement('td');
		self.element.className = 'Cell CellState1';
		self.element.id = elemid;
		self.element.onclick = function(){
			if (self.parent.getState() > 0) {
				nextState = self.getState() + 1;
				if (nextState > 3) {
					nextState = 1;
				}
				if (self.starter[x][y] == 1) {
					self.setState(nextState);
					this.className = 'Cell CellState' + nextState.toString();
				}
				if (update) {
					clearTimeout(update);
				}
				update = setTimeout(function() {
					self.parent.game.update()
				}, 1500);
			}
		};
	}
	
	var parentSetState = self.setState;
	self.setState = function(state) {
		parentSetState(state);
		self.element.className = 'Cell CellState' + state.toString();
	}
}

Block.prototype = Object.create(GameObject.prototype);