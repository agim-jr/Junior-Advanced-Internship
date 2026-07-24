export default function SkeletonBookDetail() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div
        style={{
          marginLeft: '256px',
          transition: 'margin-left 0.3s ease',
        }}
        className="skeleton-book-detail"
      >
        <div
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '32px 16px',
          }}
        >
          <div
            style={{
              height: '20px',
              width: '80px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '24px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '32px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '32px',
              }}
              className="skeleton-book-info"
            >
              <div
                style={{
                  width: '256px',
                  height: '384px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '8px',
                  flexShrink: 0,
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    height: '24px',
                    width: '80px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '9999px',
                    marginBottom: '12px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <div
                  style={{
                    height: '36px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    width: '80%',
                    marginBottom: '12px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <div
                  style={{
                    height: '24px',
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
                    marginBottom: '24px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />

                <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                  <div
                    style={{
                      height: '18px',
                      width: '100px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '18px',
                      width: '80px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '18px',
                      width: '60px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        height: '28px',
                        width: '80px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '9999px',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      }}
                    />
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        height: '48px',
                        width: '120px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '8px',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '32px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  height: '28px',
                  width: '200px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  marginBottom: '16px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
              <div
                style={{
                  height: '16px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  width: '100%',
                  marginBottom: '8px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
              <div
                style={{
                  height: '16px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  width: '95%',
                  marginBottom: '8px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
              <div
                style={{
                  height: '16px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  width: '90%',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
            </div>
          ))}
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
          .skeleton-book-detail {
            margin-left: 0 !important;
            padding-top: 60px;
          }
          .skeleton-book-info {
            flex-direction: column !important;
            align-items: center !important;
          }
        }
      `}</style>
    </div>
  );
}
