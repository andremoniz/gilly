import 'leaflet';

declare let L;

L.Control.ToggleTooltips = L.Control.extend({
	onAdd: function (map) {
		this.btn = L.DomUtil.create('button', 'p-button p-button-sm leaflet-toggletooltips-button');
        this.btn.innerHTML = `Toggle Tooltips`;
        
        this.map = map;

		return this.btn;
    },
    
    on: function (type, handler) {
        if (type === 'click') {
            this.onClick = handler;
            L.DomEvent.addListener(this.btn, 'click', this.onClick, this);
        }
    }
});

L.toggleTooltips = function (opts) {
    return new L.Control.ToggleTooltips(opts);
}
