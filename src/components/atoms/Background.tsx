import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

type Props = {
    background?: string
}

const image1 = { uri: 'https://lh3.googleusercontent.com/pw/AM-JKLUSfB05Qgngw6wUjj2ftIF-JWXmkUVxBHW6GAx3MAh6yPZT-fxdXg898mtJGGvOsQwhACB6TdBasWcC32uuC2jz6NKm0IeKjx_W4Rl9tAM2umuGzn8yXATds1etlrMiWueczh0mjSI_t3jZ0lH-yQA=w453-h979-no?authuser=0' };
const image2 = { uri: 'https://lh3.googleusercontent.com/pw/AM-JKLVDD2WJLp7NAR8bl-vo2FUc67aDa0vrwdAvwwMdf6DlQDJuDgYp86eLGYT_PC-a0aQfuuRm1ZWUKcxrOmpVsN9JhpMxNdfyZ0kPdu03uSLuYLLtbrPrYwOaFjxI_3lpqHgdw4v2U6QkcnBKq1w_jhg=w453-h979-no?authuser=0' };
const image3 = { uri: 'https://lh3.googleusercontent.com/pw/AM-JKLWiOuK9wliIFMKVC8_SsUcoZa4r8Vzsur_YQG9cnEWYmeHqA33QRnzxwVo7W8amL8VbPmbKw_8p_YeTWYglro2f5X_yC4Fp7WzDjvgTbWElyltAA6eWXofX-FsuMRysw3hKR7d0nYa4Fx6jqpP6Aog=w453-h979-no?authuser=0'}

export const Background: React.FC<Props> = ({ background }) => {
  let image = { uri: 'https://lh3.googleusercontent.com/pw/AM-JKLUSfB05Qgngw6wUjj2ftIF-JWXmkUVxBHW6GAx3MAh6yPZT-fxdXg898mtJGGvOsQwhACB6TdBasWcC32uuC2jz6NKm0IeKjx_W4Rl9tAM2umuGzn8yXATds1etlrMiWueczh0mjSI_t3jZ0lH-yQA=w453-h979-no?authuser=0' };;
  
  if(background === null)
    image = image1
  if(background == 'image2')
    image = image2
  if(background == 'image3')
    image = image3
  
    return ( 
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
