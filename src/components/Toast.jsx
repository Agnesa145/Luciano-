export default function Toast({ message, type }) {
    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-accent" />
            <div className="toast-content">
                <span className="toast-icon">
                    {type === 'success' ? '✦' : 'ℹ'}
                </span>
                <p className="toast-msg">{message}</p>
            </div>

            <style jsx>{`
                .toast {
                    background: #0a0a0b;
                    border: 1px solid rgba(255,255,255,0.06);
                    color: white;
                    padding: 0;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.8);
                    animation: toastLuxe 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    margin-bottom: 15px;
                    min-width: 320px;
                }
                .toast-accent {
                    position: absolute; top: 0; left: 0; width: 4px; height: 100%;
                    background: var(--primary, #C5A028);
                }
                .toast-content {
                    padding: 20px 30px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .toast-icon { 
                    font-size: 1.1rem; 
                    color: var(--primary, #C5A028); 
                }
                .toast-msg { 
                    font-size: 0.8rem; 
                    font-weight: 500; 
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                @keyframes toastLuxe {
                    0% { transform: translateX(120%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
