import { useEffect, useRef, useState } from "react";
import type { ChartEntry as ChartEntryType } from "../../types/chart";

interface Props {
  entry: ChartEntryType;
  isPlaying: boolean;
  onPlay: () => void;
}

function SpotifyIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1DB954" />
      <path
        fill="white"
        d="M16.94 10.55c-2.73-1.62-7.23-1.77-9.83-0.98a0.79 0.79 0 1 1-.46-1.51c2.99-.91 7.96-.73 11.1 1.13a0.79 0.79 0 0 1-.81 1.36zm-.09 2.96a0.66 0.66 0 0 1-.91.22c-2.28-1.4-5.75-1.8-8.44-0.99a0.66 0.66 0 0 1-.38-1.26c3.07-.93 6.9-.48 9.51 1.12a0.66 0.66 0 0 1 .22.91zm-1.04 2.84a0.52 0.52 0 0 1-.72.17c-1.99-1.22-4.49-1.49-7.44-.82a0.52 0.52 0 1 1-.23-1.02c3.23-.74 6-.43 8.22.95a0.52 0.52 0 0 1 .17.72z"
      />
    </svg>
  );
}

function AppleMusicIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#FC3C44" />
      <path
        fill="white"
        d="M16.5 7.2l-7 1.5v7.1c-.43-.25-.94-.4-1.5-.4-1.38 0-2.5.9-2.5 2s1.12 2 2.5 2 2.5-.9 2.5-2V11l5-1.07v4.87c-.43-.25-.94-.4-1.5-.4-1.38 0-2.5.9-2.5 2s1.12 2 2.5 2 2.5-.9 2.5-2V7.2z"
      />
    </svg>
  );
}

function AmazonMusicIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#00A8E1" />
      <path
        fill="white"
        d="M14.5 7h-5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V13h3c1.66 0 3-1.34 3-3s-1.34-3-3-3zm0 4h-3V9h3c.55 0 1 .45 1 1s-.45 1-1 1z"
      />
      <path
        fill="white"
        d="M5.5 17.5c2.5 1.2 5.2 1.5 7.5 1 .4-.1.3-.5-.1-.5-2 .3-4.3 0-6.4-1-.4-.2-.7.3-1 .5z"
      />
    </svg>
  );
}

function DeezerIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#A238FF" />
      <rect x="4" y="14" width="3" height="5" rx="0.5" fill="#fff" />
      <rect x="8.5" y="11" width="3" height="8" rx="0.5" fill="#fff" />
      <rect x="13" y="8" width="3" height="11" rx="0.5" fill="#fff" />
      <rect x="17.5" y="5" width="3" height="14" rx="0.5" fill="#fff" />
    </svg>
  );
}

function YouTubeMusicIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#FF0000" />
      <circle cx="12" cy="12" r="6" fill="white" />
      <polygon points="10,9 16,12 10,15" fill="#FF0000" />
    </svg>
  );
}

export function ChartEntry({ entry, isPlaying, onPlay }: Props) {
  const { position, trackName, artistName, imageUrl, previewUrl, itunesUrl } =
    entry;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showLinks, setShowLinks] = useState(false);

  const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(`${artistName} ${trackName}`)}`;
  const amazonUrl = `https://music.amazon.co.uk/search/${encodeURIComponent(`${artistName} ${trackName}`)}`;
  const deezerUrl = `https://www.deezer.com/search/${encodeURIComponent(`${artistName} ${trackName}`)}`;
  const youtubeMusicUrl = `https://music.youtube.com/search?q=${encodeURIComponent(`${artistName} ${trackName}`)}`;

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <li className="flex items-stretch border-2 border-black bg-white hover:brightness-95 transition-all">
      {/* Position badge */}
      <div className="border-r border-black bg-totp-yellow flex items-center justify-center shrink-0 w-10 sm:w-12">
        <span className="font-chart text-black text-3xl leading-none">
          {position}
        </span>
      </div>

      {/* Artist + track name + streaming column */}
      <div className="flex-1 min-w-0 flex border-r border-black">
        {/* Text */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="bg-totp-orange border-b border-black px-3 py-3 flex-1 flex items-center">
            <p className="font-black text-black uppercase text-sm leading-none truncate tracking-wide">
              {artistName}
            </p>
          </div>
          <div className="bg-totp-blue px-3 py-3 flex-1 flex items-center">
            <p className="font-bold text-white uppercase text-xs leading-none truncate tracking-wide">
              {trackName}
            </p>
          </div>
        </div>
        {/* Streaming icons — slide in on toggle */}
        <div
          className={`overflow-hidden transition-all duration-300 shrink-0 bg-totp-yellow border-l border-black ${showLinks ? "w-28" : "w-0 border-l-0"}`}
        >
          <div className="grid grid-cols-3 w-28 h-full">
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Spotify"
              className="flex items-center justify-center hover:brightness-95 transition-all"
            >
              <SpotifyIcon size={24} />
            </a>
            {itunesUrl ? (
              <a
                href={itunesUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Listen on Apple Music"
                className="flex items-center justify-center hover:brightness-95 transition-all"
              >
                <AppleMusicIcon size={24} />
              </a>
            ) : (
              <div />
            )}
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Amazon Music"
              className="flex items-center justify-center hover:brightness-95 transition-all"
            >
              <AmazonMusicIcon size={24} />
            </a>
            <a
              href={deezerUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Deezer"
              className="flex items-center justify-center hover:brightness-95 transition-all"
            >
              <DeezerIcon size={24} />
            </a>
            <a
              href={youtubeMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on YouTube Music"
              className="flex items-center justify-center hover:brightness-95 transition-all"
            >
              <YouTubeMusicIcon size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Album art + play button — collapses to 0 on mobile until streaming links expanded; on desktop always visible and moved to far right via order */}
      <div
        className={`relative h-20 shrink-0 overflow-hidden transition-all duration-300 sm:w-20 sm:order-4 ${showLinks ? "w-20" : "w-0"}`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        {previewUrl && (
          <>
            <audio ref={audioRef} src={previewUrl} />
            <button
              onClick={onPlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <rect x="4" y="3" width="4" height="14" rx="1" />
                  <rect x="12" y="3" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <polygon points="5,3 17,10 5,17" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>

      {/* Toggle button — far right on mobile, left of art on desktop */}
      <button
        onClick={() => setShowLinks((s) => !s)}
        aria-label={showLinks ? "Hide streaming links" : "Show streaming links"}
        className="border-l border-black bg-totp-yellow shrink-0 w-6 sm:w-8 sm:order-3 flex flex-col items-center justify-center gap-1 hover:brightness-95 transition-all"
      >
        {/* Headphones icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
          <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
        {/* Chevron */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: showLinks ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.3s",
          }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </li>
  );
}
