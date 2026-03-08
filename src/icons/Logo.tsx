import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center gap-1 select-none group">
            <svg 
                viewBox="0 0 160 50" 
                className="w-[140px] h-auto drop-shadow-sm" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Brand Swoosh over the T */}
                <path 
                    d="M15 12c10 0 18-3 24-8 2-1 4-2 6-3-10 0-20 4-26 8-2 1-3 2-4 3z" 
                    fill="#FFFFFF" 
                    className="group-hover:fill-[#0AD1FF] transition-colors duration-300"
                />
                
                {/* Wordmark - TiketQ */}
                <text 
                    x="10" 
                    y="38" 
                    fill="#FFFFFF" 
                    style={{ 
                        fontFamily: "'Montserrat', sans-serif", 
                        fontWeight: 900, 
                        fontSize: '32px', 
                        letterSpacing: '-1.5px' 
                    }}
                >
                    tiket
                    <tspan fill="#FFFFFF" style={{ fontWeight: 400 }}>Q</tspan>
                </text>
                
                {/* Second swoosh for the Q tail */}
                <path 
                    d="M102 38c6 2 12 1 18-3 2-1 3-3 4-5-8 4-16 5-22 8z" 
                    fill="#0AD1FF"
                />
            </svg>
        </div>
    )
}

export default Logo;