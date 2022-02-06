import React, {useState, useRef, useContext, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
} from 'react-native-twilio-video-webrtc';

import {tailwind} from '../tailwind';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VideoChatScreen = () => {
  // state setting
  const {state, dispatch} = useContext(AppStore);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [status, setStatus] = useState('disconnected');
  const [videoTracks, setVideoTracks] = useState(new Map());
  const twilioRef = useRef(null);
  const [now, setNow] = useState(0);
  const [start, setStart] = useState(0);
  const [intervalId, setIntervalId] = useState<number>();
  const [laps, setLaps] = useState<number[]>([]);

  const _onEndButtonPress = () => {
    console.log('onEndButtonPress: ');
    twilioRef.current.disconnect();

    hangup();
  };

  const _onMuteButtonPress = () => {
    console.log('onMuteButtonPress: ');
    twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));

    setOnMute();
  };

  const _onDominantSpeakerDidChange = () => {
    console.log('onDominantSpeakerDidChange: ');
    twilioRef.current.toggleSoundSetup(!isSpeaker);
    setIsSpeaker(!isSpeaker);
  };

  const _onLocalVideoEnabled = () => {
    console.log('onLocalVideoEnabled: ');
    twilioRef.current
      .setLocalVideoEnabled(!isVideoEnabled)
      .then(isEnabled => setIsVideoEnabled(isEnabled));
  };

  const hangup = () => {
    dispatch({
      type: 'CHENGE_CALL_SETTEING',
      payload: {
        hangup: true,
      },
    });
  };

  const setOnMute = () => {
    dispatch({
      type: 'CHENGE_CALL_SETTEING',
      payload: {
        setOnMute: !state.callSetting?.setOnMute,
      },
    });
  };

  return (
    <View>
      <TwilioVideoParticipantView
        style={tailwind(
          'h-full flex justify-center items-center bg-gray-900 p-8 ',
        )}
      />
      <View style={tailwind('absolute top-0 left-20 right-0 pt-16 ')}>
        <View
          style={tailwind(
            'absolute top-0 left-10 right-0 pt-16 text-white font-bold text-lg text-center',
          )}>
          <Text>
            <Timer
              interval={
                laps.reduce((prev, curr) => prev + curr, 0) + now - start
              }
            />
          </Text>
        </View>
      </View>

      <View style={tailwind('absolute bottom-0 left-0 right-0 px-10')}>
        <TouchableOpacity
          style={tailwind(
            'py-2 bg-white bg-opacity-50 rounded-lg border-2 border-white',
          )}
          onPress={() =>
            //本番用
            //   unlocking()
            console.log('鍵の開錠')
          }>
          <Text style={tailwind('text-lg font-bold text-white text-center')}>
            鍵を開ける
          </Text>
        </TouchableOpacity>

        <View
          style={tailwind('flex flex-row justify-around items-center my-6')}>
          <TouchableOpacity
            style={tailwind(
              'w-16 h-16 rounded-full border-2 border-white flex justify-center items-center ',
            )}
            onPress={_onDominantSpeakerDidChange}>
            <Icon
              name="volume-up"
              size={35}
              style={tailwind(`${isSpeaker ? 'text-red-600' : 'text-white'}`)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind(
              'w-16 h-16 rounded-full border-2 border-white flex justify-center items-center ',
            )}
            onPress={_onLocalVideoEnabled}>
            <Icon
              name={`${isVideoEnabled ? 'videocam' : 'videocam-off'}`}
              size={35}
              style={tailwind(
                `${isVideoEnabled ? 'text-white' : 'text-red-600'}`,
              )}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tailwind(
              'w-16 h-16 rounded-full border-2 border-white flex justify-center items-center ',
            )}
            onPress={_onMuteButtonPress}>
            <Icon
              name="mic-off"
              size={35}
              style={tailwind(
                `${isAudioEnabled ? 'text-white' : 'text-red-600'}`,
              )}
            />
          </TouchableOpacity>
        </View>

        <View style={tailwind('flex justify-around items-center mb-12')}>
          <TouchableOpacity
            style={tailwind(
              'flex justify-center items-center w-16 h-16 rounded-full shadow-origin bg-red-500',
            )}
            onPress={_onEndButtonPress}>
            <Icon name="call-end" size={35} style={tailwind('text-white')} />
          </TouchableOpacity>
        </View>
      </View>

      <TwilioVideo
        ref={twilioRef}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
      />
    </View>
  );
};

export default VideoChatScreen;
