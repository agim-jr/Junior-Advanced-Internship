export default function SkeletonSelectedBook() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '24px',
        }}
        className="selected-book-skeleton"
      >
        <div
          style={{
            width: '192px',
            height: '288px',
            backgroundColor: '#e5e7eb',
            borderRadius: '8px',
            flexShrink: 0,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: '28px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              width: '70%',
              marginBottom: '12px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          <div
            style={{
              height: '20px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              width: '40%',
              marginBottom: '12px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          <div
            style={{
              height: '18px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              width: '90%',
              marginBottom: '8px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          <div
            style={{
              height: '18px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              width: '85%',
              marginBottom: '16px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          <div
            style={{
              height: '40px',
              backgroundColor: '#e5e7eb',
              borderRadius: '6px',
              width: '140px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @media (max-width: 1024px) {
          .selected-book-skeleton {
            flex-direction: column !important;
            align-items: center !important;
          }
        }
      `}</style>
    </div>
  );
}
