<template>
    <div style="height:100%">
        <div class="input-card">
            <h4>轨迹回放控制</h4>
            <div class="input-item">
                <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation" />
                <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation" />
            </div>
            <div class="input-item">
                <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation" />
                <input type="button" class="btn" value="停止动画" id="stop" @click="stopAnimation" />
            </div>
        </div>

        <div id="container" style="height:100%"></div>
        <input style="position: absolute;left: 100px;top: 20px;" type="button" id="btn" value="图层控制" onclick="kaiguan()" />
        <div style="position: absolute;right: 0px;top: 50px;">
            <!-- <el-button type="primary" style="position: absolute;  top: 34%; width: 18px; height: 67px;" @click="open()">打开</el-button> -->
            <el-card class="box-card" v-show="ishow">
                <!-- <el-tabs v-model="activeName" @tab-click="handleClick" height="250">
          <el-tab-pane label="用户列表" name="first">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="id" label="序号"></el-table-column>
              <el-table-column prop="userNick" label="用户昵称"></el-table-column>
              <el-table-column prop="reportTime" label="上报时间"></el-table-column>
              <el-table-column prop="operator" label="操作"></el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="集群列表" name="second">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="id" label="序号"></el-table-column>
              <el-table-column prop="userNick" label="集群名"></el-table-column>
              <el-table-column prop="num" label="组人数"></el-table-column>
              <el-table-column prop="createTime" label="创建时间"></el-table-column>
              <el-table-column prop="operator" label="操作"></el-table-column>
            </el-table>

          </el-tab-pane>
        </el-tabs> -->
                <!-- 分页区域 -->
                <div class="paginnation-container">
                    <el-pagination
                        :page-sizes="[5, 10, 15, 20]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalSize"
                        background
                    ></el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import AMap from 'AMap';
import Loca from 'Loca';
var map,lineArr,marker,polyline;

export default {
    mounted: function() {
        this.init();
    },
    name: 'wel',
    data() {
        return {
            drawer: false,
            ishow: false,
            totalSize: 0,
        };
    },
    computed: {},
    created() {},

    methods: {
        init() {
            this.map = new AMap.Map('container', {
                center: [121.534769, 31.082202],
                resizeEnable: true,
                layers: [
                    //使用多个图层
                    // new AMap.TileLayer.Satellite(),
                    // new AMap.TileLayer.RoadNet()
                ],
                zooms: [4, 18], //设置地图级别范围
                zoom: 2
            });
            AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
                this.map.addControl(new AMap.ToolBar());
                this.map.addControl(new AMap.Scale());
            });

            var marker2 = new AMap.Marker({
                position: [121.534769, 31.082202] //设备定位置
            });
            this.map.add(marker2); //添加到地图

            /*****************二、创建散点数据图层****************/

            var devicelayer = new Loca.PointLayer({
                map: this.map,
                eventSupport: true
            });
            var distdaricts = [
                { lng: 116.191031, lat: 39.988585, count: 10 },
                { lng: 116.389275, lat: 39.925818, count: 11 },
                { lng: 116.287444, lat: 39.810742, count: 12 },
                { lng: 116.481707, lat: 39.940089, count: 13 },
                { lng: 116.410588, lat: 39.880172, count: 14 },
                { lng: 116.394816, lat: 39.91181, count: 15 },
                { lng: 116.416002, lat: 39.952917, count: 16 }
            ];
            var citys = [
                { lnglat: [116.258446, 37.686622], name: '景县', style: 2 },
                { lnglat: [113.559954, 22.124049], name: '圣方济各堂区', style: 2 },
                { lnglat: [116.366794, 39.915309], name: '西城区', style: 2 },
                { lnglat: [116.486409, 39.921489], name: '朝阳区', style: 2 },
                { lnglat: [116.286968, 39.863642], name: '丰台区', style: 2 },
                { lnglat: [116.195445, 39.914601], name: '石景山区', style: 2 },
                { lnglat: [116.310316, 39.956074], name: '海淀区', style: 2 },
                { lnglat: [116.105381, 39.937183], name: '门头沟区', style: 2 },
                { lnglat: [116.139157, 39.735535], name: '房山区', style: 2 },
                { lnglat: [116.658603, 39.902486], name: '通州区', style: 2 },
                { lnglat: [116.653525, 40.128936], name: '顺义区', style: 2 },
                { lnglat: [116.235906, 40.218085], name: '昌平区', style: 2 },
                { lnglat: [116.338033, 39.728908], name: '大兴区', style: 2 },
                { lnglat: [116.637122, 40.324272], name: '怀柔区', style: 2 },
                { lnglat: [117.112335, 40.144783], name: '平谷区', style: 2 },
                { lnglat: [116.843352, 40.377362], name: '密云区', style: 2 },
                { lnglat: [115.985006, 40.465325], name: '延庆区', style: 2 },
                { lnglat: [113.56925, 22.136546], name: '路凼填海区', style: 2 },
                { lnglat: [117.195907, 39.118327], name: '和平区', style: 2 },
                { lnglat: [117.226568, 39.122125], name: '河东区', style: 2 },
                { lnglat: [117.217536, 39.101897], name: '河西区', style: 2 }
            ];
            var data = [
                {
                    attributes: {
                        OBJECTID: 1837,
                        Province_State: 'New York',
                        Country_Region: 'US',
                        Last_Update: 1587738652000,
                        Lat: 39.988585,
                        Long_: 116.191031,
                        Confirmed: 145855,
                        Recovered: 0,
                        Deaths: 16388,
                        Active: 129467,
                        Admin2: 'New York City',
                        FIPS: '36061',
                        Combined_Key: 'New York City, New York, US',
                        Incident_Rate: 1749.52862705275,
                        People_Tested: null,
                        People_Hospitalized: null,
                        UID: 84036061,
                        ISO3: 'USA'
                    }
                },
                {
                    attributes: {
                        OBJECTID: 1818,
                        Province_State: 'New York',
                        Country_Region: 'US',
                        Last_Update: 1587513600000,
                        Lat: 39.952917,
                        Long_: 116.416002,
                        Confirmed: 32124,
                        Recovered: 0,
                        Deaths: 1471,
                        Active: 30653,
                        Admin2: 'Nassau',
                        FIPS: '36059',
                        Combined_Key: 'Nassau, New York, US',
                        Incident_Rate: 2367.41335550112,
                        People_Tested: null,
                        People_Hospitalized: null,
                        UID: 84036059,
                        ISO3: 'USA'
                    }
                }
            ];

            // // 指定经纬度所在字段
            // devicelayer.setData(data, {
            //     lnglat: function a(obj) {
            //         return [obj.value.attributes.Long_, obj.value.attributes.Lat];
            //     }
            // });
            // devicelayer.setOptions({
            //     style: {
            //         // 圆形半径，单位像素
            //         radius: 5,
            //         // 填充颜色
            //         color: '#f3ad6a',
            //         // 描边颜色
            //         borderColor: '#5a6aff',
            //         // 描边宽度，单位像素
            //         borderWidth: 1,
            //         // 透明度 [0-1]
            //         opacity: 0.9
            //     }
            // });
            // devicelayer.render();

            // massmarker

            var style = [
                {
                    url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',
                    anchor: new AMap.Pixel(6, 6),
                    size: new AMap.Size(11, 11)
                }
            ];

            var mass = new AMap.MassMarks(citys, {
                opacity: 0.9,
                zIndex: 10,
                cursor: 'pointer',
                style: style
            });

            // var marker = new AMap.Marker({ content: ' ', map: map });

            // mass.on('mouseover', function(e) {
            //     marker.setPosition(e.data.lnglat);
            //     marker.setLabel({ content: e.data.name });
            // });

            mass.setMap(this.map);
            mass.setStyle(style);
            // var s=mass.getData();
            //**************************guijifenge**************************** */

            this.lineArr = [
                [116.478935, 39.997761],
                [116.478939, 39.997825],
                [116.478912, 39.998549],
                [116.478912, 39.998549],
                [116.478998, 39.998555],
                [116.478998, 39.998555],
                [116.479282, 39.99856],
                [116.479658, 39.998528],
                [116.480151, 39.998453],
                [116.480784, 39.998302],
                [116.480784, 39.998302],
                [116.481149, 39.998184],
                [116.481573, 39.997997],
                [116.481863, 39.997846],
                [116.482072, 39.997718],
                [116.482362, 39.997718],
                [116.483633, 39.998935],
                [116.48367, 39.998968],
                [116.484648, 39.999861]
            ];

            this.marker = new AMap.Marker({
                map: this.map,
                position: [116.478935, 39.997761],
                icon: 'https://webapi.amap.com/images/car.png',
                offset: new AMap.Pixel(-26, -13),
                autoRotation: true,
                angle: -90
            });
            // 绘制轨迹
            this.polyline = new AMap.Polyline({
                map: this.map,
                path: this.lineArr,
                showDir: true,
                strokeColor: 'black', //线颜色
                // strokeOpacity: 1,     //线透明度
                strokeWeight: 6 //线宽
                // strokeStyle: "solid"  //线样式
            });

            var passedPolyline = new AMap.Polyline({
                map: this.map,
                // path: lineArr,
                strokeColor: 'blue', //线颜色
                // strokeOpacity: 1,     //线透明度
                strokeWeight: 6 //线宽
                // strokeStyle: "solid"  //线样式
            });

            this.marker.on('moving', function(e) {
                passedPolyline.setPath(e.passedPath);
            });

            this.map.setFitView();
        },
        startAnimation(){
            this.marker.moveAlong(this.lineArr, 2000);
        },

        pauseAnimation() {
            this.marker.pauseMove();
        },

        resumeAnimation() {
            this.marker.resumeMove();
        },

        stopAnimation() {
            this.marker.stopMove();
        }
    }
};
</script>

<style scoped="scoped" lang="scss">
.box-card {
    width: 480px;
    height: 700px;
}
</style>
