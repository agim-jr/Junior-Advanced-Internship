export default function SkeletonLibrary() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
    }}>
      <div style={{
        marginLeft: '256px',
        transition: 'margin-left 0.3s ease',
      }}
      className="library-content">
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '32px 16px',
        }}>
          <section style={{ marginBottom: '48px' }}>
            <div style={{
              width: '200px',
              height: '36px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              marginBottom: '24px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px',
            }}>
              {[...Array(8)].map((_, index) => (
                <div key={index}>
                  <div style={{
                    width: '100%',
                    aspectRatio: '2/3',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '6px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }} />
                  <div style={{
                    marginTop: '8px',
                    width: '100%',
                    height: '16px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }} />
                  <div style={{
                    marginTop: '4px',
                    width: '80%',
                    height: '16px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <div style={{
              width: '150px',
              height: '36px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              marginBottom: '24px',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px',
            }}>
              {[...Array(4)].map((_, index) => (
                <div key={index}>
                  <div style={{
                    width: '100%',
                    aspectRatio: '2/3',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '6px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }} />
                  <div style={{
                    marginTop: '8px',
                    width: '100%',
                    height: '16px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }} />
                  <div style={{
                    marginTop: '4px',
                    width: '80%',
                    height: '16px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }} />
                </div>
              ))}
            </div>
          </section>
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
          .library-content {
            margin-left: 0 !important;
            padding-top: 60px;
          }
        }
      `}</style>
    </div>
  );
}
