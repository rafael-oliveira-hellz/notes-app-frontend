import {
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis'
import '../../../node_modules/react-vis/dist/style.css'

export const Charts = () => {
  const data = [
    {
      x: 1,
      y: 10
    },
    {
      x: 2,
      y: 5
    },
    {
      x: 3,
      y: 15
    },
    {
      x: 4,
      y: 10
    },
    {
      x: 5,
      y: 20
    },
    {
      x: 6,
      y: 15
    },
    {
      x: 7,
      y: 25
    },
    {
      x: 8,
      y: 20
    },
    {
      x: 9,
      y: 30
    },
    {
      x: 10,
      y: 25
    }
  ]

  return (
    <>
      <div style={{ marginTop: '15px' }}>
        <XYPlot height={500} width={500}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={data} color="red" />
          <LineSeries data={data} color="purple" />
          <LineSeries data={data} color="yellow" />
        </XYPlot>
      </div>
    </>
  )
}
