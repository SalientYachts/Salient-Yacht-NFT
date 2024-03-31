
import { LoadingOverlay, Text, Box, Paper, Container, AspectRatio, Group, Select } from '@mantine/core';
import axios from 'axios';
import * as React from 'react'
import { useEffect, useState } from 'react'
import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts/core';
import { useForceUpdate } from '@mantine/hooks';



const API_URL = "https://app.salientyachts.com"




export default function InvitationClicks() {

  const forceUpdate = useForceUpdate();
  const [categories, setCategories] = useState([])
  const [chartData, setChartData] = useState([])
  const [clickCount, setClickCount] = useState(0)

  const [loading, setLoading] = useState(true)


  const options = {
    title: {
      show: false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: false },
        saveAsImage: { show: true }
      }
    },
    xAxis: {
      type: "category",
      data: categories,
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        inside: false,
        color: '#fff'
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: chartData,
      }
    ]
  };

  const [option, setOption]: any = useState('30days')

  useEffect(() => {

    async function getStatistics() {
      forceUpdate()
      const token = localStorage.getItem('SYtoken');
      var headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }

      const res = await axios.get(`${API_URL}/api/invitation_clicks/?option=${option}`, { headers: headers })
      //console.log('Response: ', res.data.chartData)
      if (res.data) {

        setCategories(res.data.categories)
        setChartData(res.data.chartData)
        setClickCount(res.data.clickCount)
        setLoading(false)

      }
    }
    getStatistics()
  }, [option])


  return (

    <>

      <Box pb='5px' sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", height: '100%', }}>

        <Paper withBorder p="md" radius="xl" sx={{
          backgroundColor: '#292b30', width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          boxShadow: "1px -1px 12px 3px #0cfbf8",
        }}>
          <Box sx={{
            display: "flex", flexDirection: "row", alignItems: 'center', width: '100%',
            borderBottom: '1px solid #E7E3F0', justifyContent: 'space-between',
          }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Text mb={1} sx={{ size: "20px" }}>
                Last {option == '7days' ? '7 days' : option == '30days' ? '30 days' : '12 months'}  statistics
              </Text>

              <Text mb={6} sx={{ size: "24px" }}>
                {clickCount}
                <span>
                  {" "}
                  Clicks
                </span>
              </Text>
            </Box>

            <Select
              style={{ margin: '10px', color: 'white', }}
              onChange={setOption}
              value={option}
              data={[
                { value: '7days', label: 'Last 7 days' },
                { value: '30days', label: 'Last 30 days' },
                { value: '12months', label: 'Last 12 months' },
              ]} />
          </Box>

          <Box px={0} mx='auto' sx={{
            position: 'relative', width: '100%',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',
          }} >

            <LoadingOverlay visible={loading} overlayBlur={2} radius="xl" zIndex={999} />

            <ReactECharts
              option={options}
              theme={"dark"}
              style={{ width: '100%', height: '385px' }}
            />

          </Box>
        </Paper>
      </Box>
    </>


  )

}
