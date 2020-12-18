import ChartJS from 'chart.js'


class Chart {

    constructor(data) {
        this.data = data
        this.chart = null
    }

    transformDataToChartJSData(data, property = 'temp') {
        return data && data.map((dataItem) => {
            return {
                x: dataItem && dataItem.timestamp && new Date(dataItem.timestamp),
                y: dataItem && dataItem[property],
            }
        })
    }

    render() {

        const canvas = document.createElement('canvas')

        const ctx = canvas.getContext('2d')

        this.chart = new ChartJS(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Temperature',
                        backgroundColor: 'rgba(254, 0, 0, 0.3)',
                        borderColor: '#FF0000',
                        data: this.transformDataToChartJSData(this.data, 'temp'),
                    },
                    {
                        label: 'Feels like',
                        backgroundColor: 'rgba(0, 0, 254, 0.3)',
                        borderColor: '#0000FF',
                        data: this.transformDataToChartJSData(this.data, 'feelsLike'),
                    }
                ],
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }]
                }
            }
        })

        return canvas

    }

}

export default Chart