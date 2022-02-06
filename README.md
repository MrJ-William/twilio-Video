# twilio-Video
Twilioを利用したビデオ通話アプリケーション

## アプリケーション概要
###### このアプリケーションは、ビデオ通話機能をReactNativeによって作成しました。Twilioを使用し、簡易的にビデオ通話が実現されます。またTypeScriptにより型指定を行なっているため、未然にエラーを防ぐことができます。


### 使用技術
○React Native
○TypeScript
○Twilio

### 主な使用ライブラリ
○react-native-callkeep
○react-native-onesignal
○react-native-vector-icons

## Twilio機能でビデオ通話を実装
> 公式サイト `https://www.twilio.com/ja/docs/video`

#### Twilioでの実装方法

##### 今回使用したもの
○ WebRTC Go Room を使用

##### Room作成方法
```html
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.video.rooms.create({uniqueName: 'DailyStandup'})
                  .then(room => console.log(room.sid));
```

##### Roomに参加する
```html
const { createLocalVideoTrack } = require('twilio-video');

createLocalVideoTrack().then(track => {
  const localMediaContainer = document.getElementById('local-media');
  localMediaContainer.appendChild(track.attach());
});
```



