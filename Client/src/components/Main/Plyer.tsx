import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { RootState } from '../../redux/store';
import PlayButton from '../../assets/images/playBtn.png';
import Pause from '../../assets/images/stopBtn.png';
import Mute from '../../assets/images/mute.png';
import Notmute from '../../assets/images/notmute.png';
import NextBtn from '../../assets/images/nextBtn.svg';
import PrevBtn from '../../assets/images/previousBtn.svg';
import data from './Data/data.json';

interface CustomAudioPlayerProps {
  url?: string;
  duration: number;
  setDuration: any;
  isPlaying: boolean;
  setIsPlaying: any;
  isMuted: boolean;
  setIsMuted: any;
  currentTime: number;
  setCurrentTime: any;
  currentUrl: string;
  setCurrentUrl: any;
  currentIdx: number;
  setCurrentIdx: any;
}

const Plyer: React.FC<CustomAudioPlayerProps> = ({
  url,
  duration,
  setDuration,
  isPlaying,
  setIsPlaying,
  isMuted,
  setIsMuted,
  currentTime,
  setCurrentTime,
  currentUrl,
  setCurrentUrl,
  currentIdx,
  setCurrentIdx,
}) => {
  const loginconfirm = useSelector((state: RootState) => state.login.loginState);
  const [volumeValue, setVolumeValue] = useState(0.8);
  const reactPlayerRef = useRef<ReactPlayer>(null);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (durations: number) => {
    setDuration(durations);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleNext = async () => {
    let nextIdx;
    console.log(currentUrl);

    if (currentIdx < data.length - 1) {
      nextIdx = currentIdx + 1;
    } else if (currentIdx === data.length - 1) {
      nextIdx = 0;
    }

    await setCurrentIdx(nextIdx);
    setCurrentUrl(data[nextIdx].url);
    setIsPlaying(true);
  };

  const handlePre = async () => {
    let prevIdx;

    if (currentIdx > 0) {
      prevIdx = currentIdx - 1;
    } else if (currentIdx === 0) {
      prevIdx = data.length - 1;
    }

    await setCurrentIdx(prevIdx);
    setCurrentUrl(data[prevIdx].url);
    setIsPlaying(true);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setVolumeValue(newValue);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);

    if (reactPlayerRef.current) {
      reactPlayerRef.current.seekTo(newTime, 'seconds');
    }
  };

  const handlePlaynext = async () => {
    let nextIdx;

    if (currentIdx < data.length - 1) {
      nextIdx = currentIdx + 1;
    } else if (currentIdx === data.length - 1) {
      nextIdx = 0;
    }

    await setCurrentIdx(nextIdx);
    setCurrentUrl(data[nextIdx].url);
    setIsPlaying(true);
  };

  return (
    <>
      {loginconfirm && (
        <div className="custom-audio-player w-[1300px] h-[150px] bg-[#444] bg-opacity-10 shadow-xl rounded-xl backdrop-blur-xl">
          <div className="player-controls w-full flex justify-center items-center">
            <div>
              <p className="text-xl font-['Anton-Regular']">{data[currentIdx].title}</p>
              <p className="mt-2">{data[currentIdx].ArtistName}</p>
            </div>

            <div className="flex flex-col mx-20">
              <div className="flex justify-around items-center">
                <button onClick={handlePre}>
                  <img src={PrevBtn} className="w-[40px] h-[40px]" />
                </button>
                <button onClick={handlePlayPause}>
                  {isPlaying ? (
                    <img src={Pause} className="w-[100px] h-[100px]" />
                  ) : (
                    <img src={PlayButton} className="w-[100px] h-[100px]" />
                  )}
                </button>
                <button onClick={handleNext}>
                  <img src={NextBtn} className="w-[40px] h-[40px]" />
                </button>
              </div>

              <div className="flex">
                <div className="time">{formatTime(currentTime)}</div>
                <input
                  className="w-[600px] mx-5 "
                  type="range"
                  min={0}
                  max={duration} // 영상의 총 길이를 최대 값으로 설정
                  step={0.01}
                  value={currentTime}
                  onChange={handleSeek}
                />

                {duration && <div className="time">{formatTime(duration)}</div>}
              </div>
            </div>

            <div className="flex mx-2">
              <button onClick={handleMuteUnmute}>
                {isMuted ? (
                  <img src={Mute} className="w-[27px] h-[27px] mr-4" />
                ) : (
                  <img src={Notmute} className="w-[27px] h-[30px] mr-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                value={volumeValue}
                step={0.01}
                onChange={handleVolumeChange}
              />
            </div>
          </div>

          <ReactPlayer
            url={url}
            playing={isPlaying}
            controls={true}
            muted={isMuted}
            width="0"
            height="300px"
            volume={volumeValue}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handlePlaynext}
            ref={reactPlayerRef}
          />
        </div>
      )}
    </>
  );
};

export default Plyer;
