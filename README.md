# twilio-Video
Twilioを利用したビデオ通話アプリケーション

## アプリケーション概要
###### このアプリケーションは、ビデオ通話機能をReactNativeによって作成しました。Twilioを使用し、簡易的にビデオ通話が実現されます。またTypeScriptにより型指定を行なっているため、未然にエラーを防ぐことができます。


### 使用技術
*React Native
*TypeScript
*Twilio

### 主な使用ライブラリ
*react-native-callkeep
*react-native-onesignal
*react-native-vector-icons

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

### Android Studio
##### Android Studio 公式
> `https://developer.android.com/studio`

1. React Native アプリケーションを Android エミュレータで動作させるには、ADV（Android Virtual Device）をインストールする必要があります。
メニューの「Tools」 > 「AVD Manager」を開いて、任意の Android デバイス（ここでは「Pixel 2 API 29」）を追加してください。

2. 「Actions」の「▶️（起動ボタン）」を押して、Android エミュレータを起動します。

3. Android SDK を PATH に追加するために、~/.bash_profile を開いて、次の記述を追加してください。
```html
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

4. ~/.bash_profile の設定を反映します。
```html
$ source ~/.bash_profile
```

5. React Native アプリケーションを Android で起動します。
```html
$ npx react-native run-android
```


