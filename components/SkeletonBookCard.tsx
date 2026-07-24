export default function SkeletonBookCard() {
  return (
    <div style={{ cursor: 'pointer' }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '2/3',
            backgroundColor: '#e5e7eb',
            borderRadius: '6px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
      </div>
      <div
        style={{
          marginTop: '8px',
          height: '16px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          width: '80%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
      <div
        style={{
          marginTop: '4px',
          height: '14px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          width: '60%',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
