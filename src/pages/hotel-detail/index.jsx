import React, { useEffect, useState } from 'react';
import { View, Text, Image, Swiper, SwiperItem, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.less';

export default function HotelDetail() {
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const { options } = pages[pages.length - 1];
    const { hotel_id, check_in, check_out } = options;

    Taro.request({
      url: `http://localhost:10086/api/mobile/hotels/${hotel_id}/detail`,
      method: 'GET',
      data: { check_in, check_out }
    }).then(res => {
      if (res.data.code === 200) {
        setHotelData(res.data.data);
      } else {
        Taro.showToast({ title: '获取数据失败', icon: 'none' });
      }
    }).catch(err => {
      Taro.showToast({ title: '网络错误', icon: 'none' });
      console.log('接口报错：', err);
    });
  }, []);

  if (!hotelData) {
    return (
      <View className="loading-container">
        <View className="loading-spinner"></View>
        <Text className="loading-text">正在加载酒店信息...</Text>
      </View>
    );
  }

  return (
    <View className="hotel-detail-page">
      {/* 顶部导航栏 */}
      <View className="nav-bar">
        <Button onClick={() => Taro.navigateBack()} style={{ border: 'none', background: 'transparent' }}>
          <Text style={{ fontSize: '16px' }}>← 返回</Text>
        </Button>
        <Text style={{ fontSize: '16px', fontWeight: '500' }}>酒店详情</Text>
      </View>

      {/* 图片轮播 */}
      <Swiper className="swiper" indicatorDots autoplay>
        {hotelData.images.map((img, i) => (
          <SwiperItem key={i}>
            <Image
              className="swiper-image"
              src={img}
              fallback="https://img0.baidu.com/it/u=123456,7890&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=300"
              lazyLoad={true}
            />
          </SwiperItem>
        ))}
      </Swiper>

      {/* 酒店基础信息 - 统一间距容器 */}
      <View className="hotel-info">
        <Text className="hotel-name">{hotelData.name}</Text>

        <View className="hotel-star">
          {[...Array(hotelData.star)].map((_, i) => (
            <Text key={i} className="star-icon">★</Text>
          ))}
        </View>

        <View className="hotel-address">
          <Text className="address-icon">📍</Text>
          <Text>{hotelData.address}</Text>
        </View>

        <View className="hotel-facilities">
          {hotelData.facilities.map((fac, i) => (
            <View key={i} className="facility-tag">{fac}</View>
          ))}
        </View>
      </View>

      {/* 房型列表 */}
      <Text className="room-list-title">可选房型</Text>
      {hotelData.roomTypes.map(room => (
        <View className="room-item" key={room.roomTypeId || room.id}>
          <Text className="room-name">{room.name}</Text>
          <View className="room-price-wrap">
            <Text className="room-price">¥{room.price}</Text>
            <Text className="room-price-unit">/晚</Text>
          </View>
        </View>
      ))}
    </View>
  );
}