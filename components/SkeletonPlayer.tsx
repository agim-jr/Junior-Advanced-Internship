export default function SkeletonPlayer() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <div
        style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '1152px',
            margin: '0 auto',
            padding: '16px',
            marginLeft: '256px',
            transition: 'margin-left 0.3s ease',
          }}
          className="skeleton-player-header"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                height: '20px',
                width: '80px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
            <div
              style={{
                height: '24px',
                width: '200px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
            <div style={{ width: '80px' }}></div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginLeft: '256px',
          transition: 'margin-left 0.3s ease',
        }}
        className="skeleton-player-content"
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
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              padding: '24px',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', gap: '24px' }}>
              <div
                style={{
                  width: '128px',
                  height: '192px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
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
                    marginBottom: '8px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <div
                  style={{
                    height: '18px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    width: '60%',
                    marginBottom: '16px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div
                    style={{
                      height: '16px',
                      width: '80px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '16px',
                      width: '100px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid #e5e7eb',
                padding: '16px 24px',
                gap: '32px',
              }}
            >
              <div
                style={{
                  height: '24px',
                  width: '100px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
              <div
                style={{
                  height: '24px',
                  width: '100px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
              />
            </div>

            <div style={{ padding: '32px' }}>
              <div
                style={{
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    height: '8px',
                    backgroundColor: '#d1d5db',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      height: '14px',
                      width: '40px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <div
                    style={{
                      height: '14px',
                      width: '40px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '50%',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '4px',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <div
                  style={{
                    height: '16px',
                    width: '100px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    margin: '0 auto 8px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <div
                  style={{
                    height: '20px',
                    width: '200px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    margin: '0 auto 8px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <div
                  style={{
                    height: '16px',
                    width: '150px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    margin: '0 auto',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
              </div>
            </div>
          </div>
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
          .skeleton-player-header,
          .skeleton-player-content {
            margin-left: 0 !important;
          }
          .skeleton-player-content {
            padding-top: 60px;
          }
        }
      `}</style>
    </div>
  );
}
