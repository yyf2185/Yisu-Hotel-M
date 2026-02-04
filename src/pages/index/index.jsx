import { View, Text, Button } from '@tarojs/components'
import { request } from '@tarojs/taro'
import { useState } from 'react'
import './index.less'

export default function Index () {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResponse('')
    try {
      const res = await request({
        url: '/api/test',
        method: 'GET'
      })
      setResponse(JSON.stringify(res.data, null, 2))
    } catch (error) {
      setResponse('Error: ' + (error.message || 'Connection failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className='index'>
      <Text className='title'>前后端连通性测试</Text>
      <Button className='test-btn' onClick={testConnection} loading={loading}>
        测试 GET 请求
      </Button>
      {response && (
        <View className='response'>
          <Text className='response-title'>响应结果：</Text>
          <Text className='response-content'>{response}</Text>
        </View>
      )}
    </View>
  )
}
