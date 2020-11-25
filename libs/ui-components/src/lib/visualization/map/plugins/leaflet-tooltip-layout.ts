import 'leaflet';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

declare let L;

export class LeafletTooltipLayout {
	map: any;
	markerList: any[] = [];

	polylineLayerGroup: L.LayerGroup;

	_onPolylineCreated = null;

	redrawLines$ = new Subject<boolean>();
	removeAllPolyline$ = new Subject<any>();

	useInternalEvents = true;

	constructor(opts?: any) {
		this.useInternalEvents = opts.useInternalEvents || false;

		this.redrawLines$.pipe(debounceTime(333)).subscribe((maintainAllPolyline) => {
			this.redrawLines(maintainAllPolyline);
		});

		this.removeAllPolyline$.pipe(debounceTime(333)).subscribe(() => {
			this.removeAllPolyline();
		});
	}

	initialize(leafletMap, onPolylineCreated?) {
		this.map = leafletMap;
		this.markerList = [];

		this.polylineLayerGroup = L.layerGroup().addTo(this.map);

		//default style
		if (onPolylineCreated) {
			this._onPolylineCreated = onPolylineCreated;
		} else {
			this._onPolylineCreated = (ply) => {
				ply.setStyle({
					color: '#90A4AE'
				});
			};
		}

		this.redrawLines(true);

		// event registrations
		this.map.on('zoomstart', () => {
			if (this.useInternalEvents) {
				this.removeAllPolyline$.next();
			}
		});

		this.map.on('zoomend', () => {
			if (this.useInternalEvents) {
				// this.redrawLines$.next(true);
			}
		});

		this.map.on('dragend', () => {
			if (this.useInternalEvents) {
				this.redrawLines$.next();
			}
		});

		this.map.on('resize', () => {
			if (this.useInternalEvents) {
				this.redrawLines$.next();
			}
		});
	}

	redrawLines(maintainAllPolyline?) {
		if (!maintainAllPolyline) {
			this.removeAllPolyline();
		}
		this.setRandomPos();
		this.layoutByForce();
		this.setEdgePosition();
		this.drawLine(this.map);
	}

	addMarker(marker) {
		this.markerList.push(marker);
	}

	deleteMarker(marker) {
		let i = this.markerList.indexOf(marker);
		if (i !== -1) {
			this.markerList.splice(i, 1);
		}
	}

	resetMarker(marker, show = true) {
		if (!marker.getTooltip()) return;

		var name = marker.getTooltip().getContent();
		var options = marker.getTooltip().options;
		try {
			marker.unbindTooltip();

			marker.bindTooltip(name, {
				pane: options.pane,
				offset: options.offset,
				className: options.className,
				permanent: show,
				interactive: true,
				direction: 'left',
				sticky: 'none',
				opacity: options.opacity
			});
			this.markerList.push(marker);
		} catch (e) {
			console.error(e);
		}
	}

	getMarkers() {
		return this.markerList;
	}

	setMarkers(arr) {
		arr.forEach((marker) => this.resetMarker(marker));
		this.markerList = arr;
		this.redrawLines();
	}

	removeAllMarkers() {
		this.removeAllPolyline();
		this.markerList.forEach((marker) => this.resetMarker(marker, false));
		this.markerList = [];
	}

	getLine(marker) {
		return marker.__ply;
	}

	removeAllPolyline() {
		this.polylineLayerGroup.clearLayers();
	}

	/**
	 * Draw lines between markers and tooltips
	 * @param map leaflet map
	 */
	drawLine(map) {
		this.removeAllPolyline();
		for (var i = 0; i < this.markerList.length; i++) {
			if (!this.markerList[i].getTooltip()._container || !this.markerList[i]._icon) continue;

			var marker = this.markerList[i];
			var markerDom = marker._icon;
			var markerPosition = this.getPosition(markerDom);
			var label = marker.getTooltip();

			var labelDom = label._container;
			var labelPosition = this.getPosition(labelDom);

			var x1 = labelPosition.x;
			var y1 = labelPosition.y;

			var x = markerPosition.x;
			var y = markerPosition.y;

			x1 -= 5;
			y1 += 2;
			if (x1 - x !== 0 || y1 - y !== 0) {
				if (x1 + labelDom.offsetWidth < markerPosition.x) {
					x1 += labelDom.offsetWidth;
				}
				if (y1 + labelDom.offsetHeight < markerPosition.y) {
					y1 += labelDom.offsetHeight;
				}
				var lineDest = L.point(x1, y1);
				var destLatLng = map.layerPointToLatLng(lineDest);

				setTimeout(
					((marker, destLatLng) => () => {
						let ply = L.polyline([marker.getLatLng(), destLatLng]);
						this._onPolylineCreated && this._onPolylineCreated(ply);
						marker.__ply = ply;
						this.polylineLayerGroup.addLayer(ply);
						ply.addTo(map);
					})(marker, destLatLng),
					0
				);
			}
		}
	}

	setRandomPos() {
		for (var i = 0; i < this.markerList.length; i++) {
			if (!this.markerList[i].getTooltip()._container || !this.markerList[i]._icon) continue;

			var marker = this.markerList[i];
			var label = marker.getTooltip();
			var labelDom = label._container;
			var markerDom = marker._icon;
			var markerPosition = this.getPosition(markerDom);
			// var angle = Math.floor(Math.random() * 19 + 1) * 2 * Math.PI / 20;
			var angle = ((2 * Math.PI) / 6) * i;
			var x = markerPosition.x;
			var y = markerPosition.y;
			var dest = L.point(
				Math.ceil(x + 50 * Math.sin(angle)),
				Math.ceil(y + 50 * Math.cos(angle))
			);
			L.DomUtil.setPosition(labelDom, dest);
		}
	}

	scaleTo(a, b) {
		return L.point(a.x * b.x, a.y * b.y);
	}

	normalize(a) {
		var l = a.distanceTo(L.point(0, 0));
		if (l === 0) {
			return a;
		}
		return L.point(a.x / l, a.y / l);
	}

	fa(x, k) {
		return (x * x) / k;
	}

	fr(x, k) {
		return (k * k) / x;
	}

	/**
	 * get position from el.style.transform
	 */
	getPosition(el) {
		var translateString = el.style.transform.split('(')[1].split(')')[0].split(',');
		return L.point(parseInt(translateString[0]), parseInt(translateString[1]));
	}

	/**
	 * t is the temperature in the system
	 */
	computePositionStep(t) {
		var area = (window.innerWidth * window.innerHeight) / 10;
		var k = Math.sqrt(area / this.markerList.length);
		var dpos = L.point(0, 0);
		var v_pos;
		var v;
		var i;

		for (i = 0; i < this.markerList.length; i++) {
			v = this.markerList[i];

			if (!v.getTooltip()._container) continue;

			// get position of label v
			v.disp = L.point(0, 0);
			v_pos = this.getPosition(v.getTooltip()._container);

			// compute gravitational force
			for (var j = 0; j < this.markerList.length; j++) {
				var u = this.markerList[j];

				if (!u.getTooltip()._container) continue;

				if (i !== j) {
					var u_pos = this.getPosition(u.getTooltip()._container);
					dpos = v_pos.subtract(u_pos);
					if (dpos !== 0) {
						v.disp = v.disp.add(
							this.normalize(dpos).multiplyBy(
								this.fr(dpos.distanceTo(L.point(0, 0)), k)
							)
						);
					}
				}
			}
		}

		// compute force between marker and tooltip
		for (i = 0; i < this.markerList.length; i++) {
			v = this.markerList[i];

			if (!v.getTooltip()._container || !v._icon) continue;

			v_pos = this.getPosition(v.getTooltip()._container);
			dpos = v_pos.subtract(this.getPosition(v._icon));
			v.disp = v.disp.subtract(
				this.normalize(dpos).multiplyBy(this.fa(dpos.distanceTo(L.point(0, 0)), k))
			);
		}

		// calculate layout
		for (i = 0; i < this.markerList.length; i++) {
			var disp = this.markerList[i].disp;

			if (!this.markerList[i].getTooltip()._container) continue;

			var p = this.getPosition(this.markerList[i].getTooltip()._container);
			var d = this.scaleTo(
				this.normalize(disp),
				L.point(Math.min(Math.abs(disp.x), t), Math.min(Math.abs(disp.y), t))
			);
			p = p.add(d);
			p = L.point(Math.ceil(p.x), Math.ceil(p.y));
			L.DomUtil.setTransform(this.markerList[i].getTooltip()._container, p);
		}
	}

	layoutByForce() {
		var start = Math.ceil(window.innerWidth / 10);
		var times = 50;
		var t;
		for (var i = 0; i < times; i += 1) {
			t = start * (1 - i / (times - 1));
			this.computePositionStep(t);
		}

		for (i = 0; i < this.markerList.length; i++) {
			var disp = this.markerList[i].disp;

			if (!this.markerList[i].getTooltip()._container) continue;

			var p = this.getPosition(this.markerList[i].getTooltip()._container);
			var width = this.markerList[i].getTooltip()._container.offsetWidth;
			var height = this.markerList[i].getTooltip()._container.offsetHeight;
			p = L.point(Math.ceil(p.x - width / 2), Math.ceil(p.y - height / 2));
			L.DomUtil.setTransform(this.markerList[i].getTooltip()._container, p);
		}
	}

	setEdgePosition() {
		var bounds = this.map.getBounds();
		var northWest = this.map.latLngToLayerPoint(bounds.getNorthWest());
		var southEast = this.map.latLngToLayerPoint(bounds.getSouthEast());

		for (let i = 0; i < this.markerList.length; i++) {
			if (!this.markerList[i].getTooltip()._container || !this.markerList[i]._icon) continue;

			var tooltip = this.getPosition(this.markerList[i].getTooltip()._container);
			var marker = this.getPosition(this.markerList[i]._icon);
			var width = this.markerList[i].getTooltip()._container.offsetWidth;
			var height = this.markerList[i].getTooltip()._container.offsetHeight;

			var isEdge = false;
			if (marker.x > northWest.x && tooltip.x < northWest.x) {
				tooltip.x = northWest.x;
				isEdge = true;
			} else if (marker.x < southEast.x && tooltip.x > southEast.x - width) {
				tooltip.x = southEast.x - width;
				isEdge = true;
			}

			if (marker.y > northWest.y && tooltip.y < northWest.y) {
				tooltip.y = northWest.y;
				isEdge = true;
			} else if (marker.y < southEast.y && tooltip.y > southEast.y - height) {
				tooltip.y = southEast.y - height;
				isEdge = true;
			}

			if (!isEdge) {
				if (marker.x < northWest.x && tooltip.x > northWest.x - width) {
					tooltip.x = northWest.x - width;
				} else if (marker.x > southEast.x && tooltip.x < southEast.x) {
					tooltip.x = southEast.x;
				}

				if (marker.y < northWest.y && tooltip.y > northWest.y - height) {
					tooltip.y = northWest.y - height;
				} else if (marker.y > southEast.y && tooltip.y < southEast.y) {
					tooltip.y = southEast.y;
				}
			}

			L.DomUtil.setTransform(this.markerList[i].getTooltip()._container, tooltip);
		}
	}
}
