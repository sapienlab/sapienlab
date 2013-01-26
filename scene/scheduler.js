define([], function() {

	return {

		targets : {},

		scenes : {},

		add : function(scene) {
			console.log(scene);
			var target = scene.get('target');
			var sceneId = scene.get('id');
			if (!this.targets[target])
				this.targets[target] = {
					scenes : {},
					actualScene : null
				};
			this.targets[target].scenes[sceneId] = scene;
			this.scenes[sceneId] = scene;
			window[scene.get('id')] = scene;
		},

		remove : function(sceneId) {
			var scene = this.byId(sceneId);
			var sceneId = scene.get('id');
			if (!scene)
				return;
			var target = this.targets[scene.get('target')];
			delete target.scenes[sceneId];
			delete this.scenes[sceneId];

			if (target.actualScene && target.actualScene.get('id') == sceneId) {
				target.actualScene.emit('Deselect');
				target.actualScene = null;
				// TODO if target.scenes.length > 0, then select ones
			}
		},

		select : function(sceneId) {
			var scene = this.byId(sceneId);
			console.log(scene.get('id'), this);
			var target = scene.get('target');
			if (!scene)
				console.error('The scene ' + sceneId + ' is not associated with this Scene Scheduler instance');
			if (this.targets[target].acualScene)
				this.targets[target].acualScene.emit('Deselect');
			this.targets[target].acualScene = scene;
			if (scene._isFirstSelection) {
				scene._isFirstSelection = false;
				scene.emit('FirstSelection');
			}
			scene.emit('Select');			
			console.log('selection now: ' + scene.get('id')+ ', targer: ' + target + 'scene', scene);					
		},

		byId : function(sceneId) {
			if ( typeof sceneId === 'object')
				return this.scenes[sceneId.get('id')];
			return this.scenes[sceneId];
		}
	}

});
