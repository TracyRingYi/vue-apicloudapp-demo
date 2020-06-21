<template>
	<div class="has-tab map">
		<div class="map-countainer">
			<van-cell-group>
				<van-cell :title="address" icon="location-o" />
			</van-cell-group>
			<div class="map-box"></div>
		</div>
	</div>
</template>

<script>
import { Cell, CellGroup, Toast } from 'vant'
export default {
	name: 'map',
	components: {
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup
	},
	data() {
		return {
			address: '广州',
			aMap: null
		}
	},
	mounted() {
		this.initMap()
	},
	beforeDestroy() {
		if (this.aMap) {
			this.aMap.close()
		}
	},
	methods: {
		initMap() {
			if (this.global.isApp) {
				try {
					let aMap = api.require('aMap')
					let setCenter = (coords) => {
						aMap.setCenter({
							coords
						})
					}
					let getAddress = (lon, lat) => {
						aMap.getNameFromCoords(
							{
								lon,
								lat
							},
							callback((ret) => {
								let { building, address } = ret
								this.address = building + ',' + address
							})
						)
					}
					let callback = (fn) => {
						return (ret, err) => {
							if (ret.status) {
								fn(ret)
							} else {
								Toast.fail(JSON.stringify(err))
							}
						}
					}
					let boxOffset = $api.offset($api.dom('.map-box'))
					aMap.open(
						{
							rect: {
								x: boxOffset.l,
								y: boxOffset.t,
								w: boxOffset.w,
								h: boxOffset.h
							},
							showUserLoaction: true,
							center: {
								lon: 113.27,
								lat: 23.13
							},
							zoomLevel: 14,
							fixedOn: ''
						},
						callback(() => {
							aMap.getLocation(
								callback((ret) => {
									let { lon, lat } = ret
									getAddress(lon, lat)
									setCenter({ lon, lat })
								})
							)
						})
					)
					this.aMap = aMap
				} catch (err) {
					console.warn(err)
				}
			}
		}
	}
}
</script>

<style lang="scss">
.map {
	.map-box {
		background: #ccc;
		height: 120px;
		margin: 10px 15px;
	}
}
</style>
