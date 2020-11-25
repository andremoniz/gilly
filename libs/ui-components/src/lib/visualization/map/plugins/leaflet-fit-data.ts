import 'leaflet';

declare let L;

L.Control.FitData = L.Control.extend({
	onAdd: function (map) {
		this.btn = L.DomUtil.create('button', 'p-button p-button-sm leaflet-fitdata-button');
		this.btn.innerHTML = `Fit Data`;
		return this.btn;
	},

	on: function (type, handler) {
		if (type === 'click') {
			this.onClick = handler;
			L.DomEvent.addListener(this.btn, 'click', this.onClick, this);
		}
	}
});

L.fitData = function (opts) {
	return new L.Control.FitData(opts);
};
