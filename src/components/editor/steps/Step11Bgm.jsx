import React, { useRef } from 'react';
import { useBuilderStore } from '../../../store/useBuilderStore';
import { Music, PlayCircle, Upload, CheckCircle2, X } from 'lucide-react';

const Step11Bgm = () => {
  const bgmInfo = useBuilderStore(state => state.bgmInfo);
  const updateBgmInfo = useBuilderStore(state => state.updateBgmInfo);
  const fileInputRef = useRef(null);

  const tracks = [
    { id: 'track1', name: '캐논 변주곡 (Piano Ver.)', desc: '결혼식의 정석, 차분하고 아름다운 선율' },
    { id: 'track2', name: '결혼 행진곡 (Wedding March)', desc: '우아하고 성스러운 분위기의 클래식' },
    { id: 'track3', name: '쇼팽 녹턴 (Chopin Nocturne)', desc: '로맨틱하고 부드러운 무드의 야상곡' }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('청첩장 저장 용량 제한으로 인해 3MB 이하의 MP3 파일만 업로드 가능합니다.');
      return;
    }

    if (!file.type.includes('audio')) {
      alert('오디오 파일(MP3 등)만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      updateBgmInfo('customTrackUrl', base64String);
      updateBgmInfo('customTrackName', file.name);
      updateBgmInfo('selectedTrack', 'custom');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: '10px 0' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: bgmInfo.useBgm ? '#22222208' : '#fff', border: `1px solid ${bgmInfo.useBgm ? '#222' : '#ddd'}`, borderRadius: '8px' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: bgmInfo.useBgm ? '#222' : '#555', marginBottom: '4px' }}>배경음악 사용하기</div>
          <div style={{ fontSize: '0.8rem', color: '#888' }}>청첩장 접속 시 음악을 재생합니다.</div>
        </div>
        <button 
          onClick={() => updateBgmInfo('useBgm', !bgmInfo.useBgm)}
          style={{ width: '50px', height: '28px', backgroundColor: bgmInfo.useBgm ? '#222' : '#ccc', borderRadius: '14px', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}
        >
          <div style={{ position: 'absolute', top: '2px', left: bgmInfo.useBgm ? '24px' : '2px', width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
        </button>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '24px', lineHeight: '1.5', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        음악은 하객들에게 청첩장의 분위기를 가장 잘 전달하는 요소입니다.<br/>
        원하는 분위기의 음원을 선택해보세요.
      </div>

      {bgmInfo.useBgm && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '12px' }}>자동 재생 설정</div>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <PlayCircle size={20} color={bgmInfo.autoPlay ? '#333' : '#aaa'} />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: bgmInfo.autoPlay ? '#333' : '#888' }}>접속 시 자동 재생</div>
                  <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '4px' }}>모바일 브라우저 정책상 터치 전까지 재생이 지연될 수 있습니다.</div>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={bgmInfo.autoPlay}
                onChange={(e) => updateBgmInfo('autoPlay', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '12px' }}>음원 선택</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tracks.map((track) => (
                <label 
                  key={track.id}
                  style={{ 
                    display: 'flex', alignItems: 'center', padding: '16px', borderRadius: '8px', cursor: 'pointer',
                    border: `1px solid ${bgmInfo.selectedTrack === track.id ? '#222' : '#eee'}`,
                    backgroundColor: bgmInfo.selectedTrack === track.id ? '#fafafa' : '#fff'
                  }}
                >
                  <input 
                    type="radio" 
                    name="bgmTrack"
                    value={track.id}
                    checked={bgmInfo.selectedTrack === track.id}
                    onChange={() => updateBgmInfo('selectedTrack', track.id)}
                    style={{ marginRight: '16px', accentColor: '#222' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>{track.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{track.desc}</div>
                  </div>
                  <Music size={20} color={bgmInfo.selectedTrack === track.id ? '#222' : '#ddd'} />
                </label>
              ))}

              {/* 직접 업로드 옵션 */}
              <label 
                style={{ 
                  display: 'flex', alignItems: 'center', padding: '16px', borderRadius: '8px', cursor: 'pointer',
                  border: `1px solid ${bgmInfo.selectedTrack === 'custom' ? '#222' : '#eee'}`,
                  backgroundColor: bgmInfo.selectedTrack === 'custom' ? '#fafafa' : '#fff'
                }}
              >
                <input 
                  type="radio" 
                  name="bgmTrack"
                  value="custom"
                  checked={bgmInfo.selectedTrack === 'custom'}
                  onChange={() => {
                    if (bgmInfo.customTrackUrl) {
                      updateBgmInfo('selectedTrack', 'custom');
                    } else {
                      fileInputRef.current?.click();
                    }
                  }}
                  style={{ marginRight: '16px', accentColor: '#222' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>직접 업로드</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    {bgmInfo.customTrackName ? bgmInfo.customTrackName : '원하는 MP3 파일을 선택하세요 (최대 5MB)'}
                  </div>
                </div>
                {bgmInfo.customTrackUrl ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={20} color="#222" />
                    <button 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        updateBgmInfo('customTrackUrl', null);
                        updateBgmInfo('customTrackName', '');
                        updateBgmInfo('selectedTrack', 'track1'); // 삭제 시 기본 곡으로 원복
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', color: '#ff4d4f' }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); fileInputRef.current?.click(); }}
                    style={{ background: 'none', border: '1px solid #ddd', padding: '6px 10px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Upload size={14} /> 찾아보기
                  </button>
                )}
              </label>

              {/* 숨겨진 파일 인풋 */}
              <input 
                type="file" 
                accept="audio/*" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step11Bgm;
