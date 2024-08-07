import { someFunction } from 'some-file';

const baz = Math.random();
const foo = someFunction();
const bar = baz + 1;

$(document).ready(function() {
    var test = Highcharts.maps.nicaragua.map((region, i) => {
        return {
            ...region,
            drilldown: region.key,
            value: i
        };
    });

    Highcharts.mapChart('nicaragua', {
        chart: {
            events: {
                drilldown: function(e) {
                    if (!e.seriesOptions) {
                        var chart = this;
                        var mapkey = 'maps/' + e.point.drilldown;
                        $.get(mapkey + '.json')
                            .done(function(data) {
                                data.data = data.data.map((region, i) => ({ ...region, value: i }));
                                chart.addSeriesAsDrilldown(e.point, {
                                    name: e.point.name,
                                    data: data.data,
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}'
                                    }
                                });
                            })
                            .fail(function() {
                                alert('Error al cargar los datos. Por favor, intente nuevamente.');
                            });
                    }
                }
            }
        },
        title: {
            text: 'Mapa de Nicaragua'
        },
        subtitle: {
            text: 'NIC',
            floating: true,
            align: 'right',
            y: 50,
            style: {
                fontSize: '16px'
            }
        },
        colorAxis: {
            min: 0,
            minColor: '#99DAFF',
            maxColor: '#569CC4'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        plotOptions: {
            map: {
                states: {
                    hover: {
                        color: '#EEDD66'
                    }
                }
            }
        },
        series: [{
            data: test,
            name: 'NIC',
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }],
        drilldown: {
            activeDataLabelStyle: {
                color: '#FFFFFF',
                textDecoration: 'none',
                textOutline: '1px #000000'
            },
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    x: 0,
                    y: 60
                }
            }
        }
    });
});
