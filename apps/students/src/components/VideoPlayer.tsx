"use client"

import React, {useEffect, useRef, useState} from 'react';
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Backward02Icon,
  Forward02Icon,
  MaximizeScreenIcon,
  MinimizeScreenIcon,
  PauseIcon,
  PlayIcon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons"


const VideoPlayer = ({src, poster}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleLoadedMetadata = () => setDuration(video.duration);
        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        }
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play().then();
        }
        setIsPlaying(!isPlaying);
    }

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !isMuted;
        setIsMuted(!isMuted);
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const newVolume = parseFloat(e.target.value);
        video.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const progressBar = progressBarRef.current;
        if (!video || !progressBar) return;

        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * duration;
    }

    const skip = (seconds: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement !== null);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        const container = videoRef.current?.parentElement;
        if (!container) return;

        if (!isFullscreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen().then();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().then();
            }
        }
        setIsFullscreen(!isFullscreen);
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div
        className="group relative w-full overflow-hidden rounded-3xl bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(!isPlaying)}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={"h-full w-full"}
        />

        {/*PLAY / PAUSE BUTTON*/}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
            showControls && !isPlaying ? "opacity-100" : "opacity-0"
          }`}
          onClick={togglePlay}
        >
          <button className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 transition-all hover:scale-110 hover:bg-primary">
            <HugeiconsIcon icon={PlayIcon} />
          </button>
        </div>

        <div
          className={`absolute right-0 bottom-0 left-0 m-2 rounded-2xl border border-muted-foreground bg-linear-to-t p-4 backdrop-blur-2xl transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}

              {/* Skip Backward */}
              <button
                onClick={() => skip(-10)}
                className="text-white transition-colors hover:text-primary"
              >
                <HugeiconsIcon icon={Backward02Icon} />
              </button>

              <button
                onClick={togglePlay}
                className="text-white transition-colors hover:text-primary"
              >
                {isPlaying ? (
                  <HugeiconsIcon icon={PauseIcon} />
                ) : (
                  <HugeiconsIcon icon={PlayIcon} />
                )}
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => skip(10)}
                className="text-white transition-colors hover:text-primary"
              >
                <HugeiconsIcon icon={Forward02Icon} />
              </button>

              {/* Volume */}
              <div className="group/volume flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-white transition-colors hover:text-primary"
                >
                  {isMuted || volume === 0 ? (
                    <HugeiconsIcon icon={VolumeOffIcon} />
                  ) : (
                    <HugeiconsIcon icon={VolumeHighIcon} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-0 accent-primary opacity-0 transition-all group-hover/volume:w-20 group-hover/volume:opacity-100"
                />
              </div>

              {/* Time */}
              <span className="text-sm flex font-normal tracking-wider text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div
              ref={progressBarRef}
              className="group/progress mb-4 h-1.5 w-[60%] cursor-pointer  rounded-full bg-muted-foreground"
              onClick={handleProgressClick}
            >
              <div
                className="relative h-full rounded-full bg-primary transition-all group-hover/progress:h-2"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover/progress:opacity-100" />
              </div>
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white transition-colors hover:text-primary"
            >
              {isFullscreen ? (
                <HugeiconsIcon icon={MinimizeScreenIcon} />
              ) : (
                <HugeiconsIcon icon={MaximizeScreenIcon} />
              )}
            </button>
          </div>
        </div>
      </div>
    )
};

export default VideoPlayer;