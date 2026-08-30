import React from 'react';

/**
 * High quality SVG Brand & Technology Icons for Developer Portfolio Tech Stack
 */
export default function TechIcon({ name, className = "w-4 h-4 shrink-0" }) {
  const norm = (name || "").trim().toLowerCase();

  switch (norm) {
    // ─── LANGUAGES ───
    case 'java':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <path fill="#5382A1" d="M12.4 20.3c0 0-1.8.2-2.8.7-.9.4-.9.9.2 1 2.2.3 5.4.3 8.3-.1 1-.1 1.7-.5 1-.8-.8-.4-2.8-.7-2.8-.7s1.3-.4 3.4.1c2.1.5 2.7 1.4.9 2-4.1 1.2-12.7 1-15.1.2-1.3-.5-1.5-1.5.3-2.1 2.4-.7 6.6-1.1 6.6-1.1z"/>
          <path fill="#E76F00" d="M14.6 17.6c-2.3.2-4.6.4-5.9.9-1.2.5-.9 1.1.4 1.3 3.3.4 8.7.2 12.3-.2 1.3-.2 2.3-.6 1.4-1-1.3-.4-3.8-.8-5.3-.9 0 0 2.2-.6 4.8-.1 2.7.5 3.3 1.5 1.1 2.1-4.7 1.3-14.7 1.3-17.7.3-1.6-.5-1.7-1.6.4-2.2 3.1-.8 8.5-1.2 8.5-1.2zm-.9-5.7c1.3 1.4-.4 2.8-1.5 3.9 2.5-1.2 4.6-2.5 3.4-4.5-.9-1.4-2.8-2-3.8-3.4-1.9-2.5 1.1-5.1 1.1-5.1s-3.7 2.6-2.3 5.3c1.3 2.4 2.4 2.8 3.1 3.8zm3.2-1.8c.8 1.1-.3 2.1-1.1 3 1.8-.9 3.4-2 2.5-3.5-.7-1.1-2.1-1.6-2.8-2.6-1.4-1.9.8-3.9.8-3.9s-2.8 2-1.7 4.1c1 1.9 1.8 2.2 2.3 2.9z"/>
          <path fill="#E76F00" d="M21.2 25.5c-4.2 1.4-14.1 1.5-17.6.4-1.4-.4-1.1-1.2.6-1.6 3.1-.7 7.7-.9 10.7-.9 0 0-2.3-.2-4.4.1-3 .4-4.4 1.3-2.5 1.8 4 1 12.5 1 15.9.1 1.4-.4 1.2-1.1-.3-1.4-2.3-.4-5.6-.6-5.6-.6s2.3-.4 5.3.1c3.2.5 3.6 1.5.9 2z"/>
        </svg>
      );

    case 'python':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#3776AB" d="M11.9 2c-4.2 0-3.9 1.8-3.9 1.8l.1 1.9h4v.6H6.3s-2.6-.3-2.6 3.8c0 4.1 2.3 4 2.3 4h1.4v-2c0-2.3 2-2.2 2-2.2h3.9s1.9 0 1.9-1.9V4s.3-2-3.3-2zm-2.2 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"/>
          <path fill="#FFD438" d="M12.1 22c4.2 0 3.9-1.8 3.9-1.8l-.1-1.9h-4v-.6h5.8s2.6.3 2.6-3.8c0-4.1-2.3-4-2.3-4h-1.4v2c0 2.3-2 2.2-2 2.2h-3.9s-1.9 0-1.9 1.9V20s-.3 2 3.3 2zm2.2-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"/>
        </svg>
      );

    case 'c++':
    case 'cpp':
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <path fill="#00599C" d="M28.8 8.6L18 2.4c-1.2-.7-2.8-.7-4 0L3.2 8.6C2 9.3 1.2 10.7 1.2 12v12.4c0 1.4.8 2.7 2 3.4L14 34c1.2.7 2.8.7 4 0l10.8-6.2c1.2-.7 2-2 2-3.4V12c0-1.3-.8-2.7-2-3.4z" transform="scale(0.88) translate(2, -1)"/>
          <path fill="#FFFFFF" d="M13.2 19.3c-2 0-3.5-1.5-3.5-3.5s1.5-3.5 3.5-3.5c1.4 0 2.5.8 3 1.9l2-1.2c-.9-1.7-2.8-2.9-5-2.9-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8c2.2 0 4.1-1.2 5-2.9l-2-1.2c-.5 1.1-1.6 1.7-3 1.7zm6.3-4.3h-1.2v1.6h1.2v1.2h1.6v-1.2h1.2V15h-1.2v-1.2h-1.6V15zm4.8 0h-1.2v1.6h1.2v1.2h1.6v-1.2h1.2V15h-1.2v-1.2h-1.6V15z"/>
        </svg>
      );

    case 'go':
    case 'golang':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#00ADD8" d="M1.5 10.3c.4 1.3 1.4 2.2 2.6 2.4v1.4c-2-.3-3.6-1.8-4-3.8h1.4zm10.7-5.5h-5v1.4h5v-1.4zm0 2.8h-7v1.4h7V7.6zm0 2.8h-6v1.4h6v-1.4zm3.9-3.2c-2.3 0-4.1 1.8-4.1 4.1s1.8 4.1 4.1 4.1c1.5 0 2.8-.8 3.5-2h-3.5v-1.4h5v.2c0 2.9-2.3 5.1-5 5.1-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6c1.6 0 3 .7 4 1.7l-1 1.1c-.8-.8-1.8-1.3-3-1.3zm7.9 4.1c0 2.8-2.3 5.1-5.1 5.1s-5.1-2.3-5.1-5.1 2.3-5.1 5.1-5.1 5.1 2.3 5.1 5.1zm-1.5 0c0-2-1.6-3.6-3.6-3.6s-3.6 1.6-3.6 3.6 1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6z"/>
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="22" height="22" x="1" y="1" fill="#3178C6" rx="3.5" />
          <path fill="#FFFFFF" d="M11.6 12.8h-2.1v6.4H7.8v-6.4H5.7v-1.5h5.9v1.5zm8.9 4.3c0 1.6-1.3 2.3-3.3 2.3-1.8 0-3-.6-3.6-1.2l.9-1.3c.6.5 1.5 1 2.6 1 1 0 1.6-.4 1.6-1 0-.6-.5-.9-1.7-1.3-1.8-.6-2.8-1.3-2.8-2.6 0-1.5 1.2-2.4 3-2.4 1.4 0 2.4.4 3.1.9l-.8 1.3c-.6-.4-1.3-.7-2.3-.7-.9 0-1.3.4-1.3.8 0 .5.4.8 1.6 1.2 2 .7 2.8 1.5 2.8 3z"/>
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="22" height="22" x="1" y="1" fill="#F7DF1E" rx="3.5" />
          <path fill="#000000" d="M7.7 18.2c.8.5 1.7.8 2.6.8 1.6 0 2.6-.8 2.6-2.3v-6h-1.9v5.9c0 .7-.4 1-1 1-.5 0-.9-.2-1.3-.5l-1 1.1zm8.8.2c2 0 3.3-1.1 3.3-2.7 0-1.6-1-2.4-2.7-3.1-1.2-.5-1.7-.8-1.7-1.4 0-.5.4-.9 1.2-.9.8 0 1.4.3 1.9.7l.9-1.2c-.7-.6-1.7-.9-2.8-.9-1.9 0-3.1 1.1-3.1 2.6 0 1.6 1 2.4 2.6 3 1.3.5 1.8.9 1.8 1.5 0 .6-.5 1-1.4 1-.9 0-1.8-.4-2.4-1l-1 1.2c.8 1 2 1.2 3.4 1.2z"/>
        </svg>
      );

    // ─── FRONTEND & MOBILE ───
    case 'react':
    case 'react.js':
    case 'react native':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case 'next.js':
    case 'nextjs':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="11" fill="#000000" stroke="#333333" strokeWidth="1"/>
          <path fill="#FFFFFF" d="M15.4 16.5h-1.6l-5-7.3V16.5H7.3V7.5h1.7l5 7.3V7.5h1.4v9z"/>
          <path fill="#EDEDED" d="M15.2 16.5L12.5 12h1.6l1.8 2.8z"/>
        </svg>
      );

    case 'tailwind css':
    case 'tailwind':
    case 'tailwindcss':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#38BDF8" d="M12 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.7 1.8 1.4 1.4 3 3 6.6 3 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.7-1.8C17.2 7.6 15.6 6 12 6zm-6.6 6.5C2.4 12.5.6 14 0 17c1.2-1.5 2.7-2.1 4.5-1.8 1 .2 1.8 1 2.7 1.8 1.4 1.4 3 3 6.6 3 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1-.2-1.8-1-2.7-1.8-1.4-1.4-3-3-6.6-3z"/>
        </svg>
      );

    // ─── BACKEND & APIS ───
    case 'node.js':
    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#5FA04E" d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2z"/>
          <path fill="#FFFFFF" d="M12 4.4L5.4 8.2v7.6L12 19.6l6.6-3.8V8.2L12 4.4zm3.3 10.2c-.3.2-.8.3-1.4.3-1.2 0-1.8-.6-1.8-1.7V11h1.5v2.2c0 .4.2.6.6.6.3 0 .6-.1.8-.2l.3 1.2zm-4.7 0c-.3.2-.8.3-1.4.3-1.2 0-1.8-.6-1.8-1.7V9.5h1.5v3.7c0 .4.2.6.6.6.3 0 .6-.1.8-.2l.3 1z"/>
        </svg>
      );

    case 'express.js':
    case 'express':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="22" height="22" x="1" y="1" fill="#1C1C1C" rx="4" stroke="#444" strokeWidth="1"/>
          <text x="12" y="15.5" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ex</text>
        </svg>
      );

    case 'fastapi':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="10.5" fill="#009688" />
          <path fill="#FFFFFF" d="M12.5 4L7 13.5h4.5L10.5 20l6.5-9.5h-4.5L12.5 4z" />
        </svg>
      );

    case 'rest apis':
    case 'rest api':
    case 'rest':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38BDF8" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="6" rx="2" stroke="#38BDF8" />
          <rect x="3" y="14" width="18" height="6" rx="2" stroke="#8B5CF6" />
          <circle cx="7" cy="7" r="1" fill="#38BDF8" />
          <circle cx="7" cy="17" r="1" fill="#8B5CF6" />
          <path d="M14 10v4M17 10v4" stroke="#4ADE80" strokeWidth="1.5" />
        </svg>
      );

    // ─── DATABASES ───
    case 'postgresql':
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#336791" d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.4 9.2.3-.6.6-1.5.7-2.3-.9-.2-2-.6-2.5-1.5-.4-.7-.2-1.7.3-2.3.8-.9 2.2-.9 3.3-.7.5-.8 1.1-1.6 1.8-2.2-1.3-.4-2.5-1.1-3.2-2.3-.8-1.3-.7-3.1.2-4.3 1.3-1.6 3.6-2.1 5.5-1.4 1.9.7 3.2 2.5 3.3 4.5.1 1.2-.3 2.3-.9 3.2 1.3.8 2.8 1.2 4.4 1.2.6 0 1.2-.1 1.8-.2-.3 1.8-1.5 3.3-3.2 3.9.6.9 1.1 1.9 1.5 3 2.6-1.7 4.4-4.6 4.4-7.9 0-5.5-4.5-10-10-10z"/>
        </svg>
      );

    case 'mongodb':
    case 'mongo':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#47A248" d="M12 1.5s-6.5 5.5-6.5 11.2c0 4.6 3.3 8.3 6.5 9.8 3.2-1.5 6.5-5.2 6.5-9.8C18.5 7 12 1.5 12 1.5zm.3 19.3v-8.2c0-.2-.1-.4-.3-.4s-.3.2-.3.4v8.2c-2.4-1.2-4.9-4.2-4.9-7.9 0-4.4 4.5-8.8 5.2-9.5.7.7 5.2 5.1 5.2 9.5 0 3.7-2.5 6.7-4.9 7.9z"/>
        </svg>
      );

    case 'mariadb':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#003545" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.5 14.8c-.8.5-2.2.8-3.5.8-2.6 0-4.3-1.1-4.8-2.9-.3-1 .1-2.1.8-2.8.9-1 2.4-1.5 3.9-1.5 1 0 1.9.2 2.6.6v-1c0-.9-.7-1.5-1.9-1.5-.9 0-1.8.3-2.5.8l-.6-1c.9-.6 2.1-1 3.3-1 2.2 0 3.3 1.2 3.3 3v5.2c0 .5.2.8.4 1l-1 1.3z"/>
          <path fill="#C08B5C" d="M13.4 12.8c-.9 0-1.8.3-2.2.8-.3.4-.5.9-.3 1.4.3 1 1.4 1.5 2.8 1.5.8 0 1.6-.2 2.1-.5v-2.6c-.6-.4-1.5-.6-2.4-.6z"/>
        </svg>
      );

    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#3ECF8E" d="M13.2 22.8c-.8.9-2.2.3-2.1-.9l.7-9.4H3.2c-1.1 0-1.8-1.2-1.2-2.1L10.8 1.2c.8-.9 2.2-.3 2.1.9l-.7 9.4h8.6c1.1 0 1.8 1.2 1.2 2.1l-8.8 9.2z"/>
        </svg>
      );

    // ─── AI & AUTOMATION ───
    case 'n8n':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#EA4B71" d="M3 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5.5 6.2l4.8 3.5m3.4 2.5l4.8 3.5" stroke="#FF6D5A" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      );

    case 'langchain':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="20" height="20" x="2" y="2" rx="4" fill="#00A67E" />
          <path fill="#FFFFFF" d="M7 8.5C7 7.7 7.7 7 8.5 7h7c.8 0 1.5.7 1.5 1.5v1.8c0 .8-.7 1.5-1.5 1.5h-7C7.7 11.8 7 11.1 7 10.3V8.5zm0 5.2c0-.8.7-1.5 1.5-1.5h7c.8 0 1.5.7 1.5 1.5v1.8c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-1.8z" />
          <circle cx="12" cy="12" r="1.5" fill="#F3E03B" />
        </svg>
      );

    case 'nlp':
    case 'ai workflows':
    case 'machine learning':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.2 4.7 3 6v3h8v-3c1.8-1.3 3-3.5 3-6a7 7 0 0 0-7-7z"/>
          <path d="M9 22h6M10 12h4M12 9v6" stroke="#38BDF8"/>
        </svg>
      );

    case 'ocr':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" stroke="#8B5CF6"/>
          <rect x="7" y="7" width="10" height="10" rx="1" stroke="#38BDF8" strokeWidth="1.4"/>
          <path d="M9 10h6M9 14h4" stroke="#4ADE80" strokeWidth="1.4"/>
        </svg>
      );

    case 'face recognition':
    case 'otp auth':
    case 'trust score ai':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7V4h4M21 7V4h-4M3 17v3h4M21 17v3h-4" stroke="#38BDF8"/>
          <circle cx="9" cy="10" r="1" fill="#34D399" />
          <circle cx="15" cy="10" r="1" fill="#34D399" />
          <path d="M9.5 15c.8.8 1.7 1.2 2.5 1.2s1.7-.4 2.5-1.2" />
        </svg>
      );

    // ─── DATA & ANALYTICS ───
    case 'power bi':
    case 'powerbi':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect x="3" y="13" width="4.5" height="8" rx="1" fill="#E6AD10"/>
          <rect x="9.5" y="8" width="4.5" height="13" rx="1" fill="#F2C811"/>
          <rect x="16" y="3" width="4.5" height="18" rx="1" fill="#F9DE69"/>
        </svg>
      );

    case 'pandas':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect x="3" y="3" width="7" height="8" rx="1.5" fill="#130654"/>
          <rect x="14" y="3" width="7" height="8" rx="1.5" fill="#FF4A00"/>
          <rect x="3" y="13" width="7" height="8" rx="1.5" fill="#E70488"/>
          <rect x="14" y="13" width="7" height="8" rx="1.5" fill="#00A5E0"/>
        </svg>
      );

    case 'numpy':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect width="22" height="22" x="1" y="1" rx="4" fill="#013243"/>
          <path fill="#4DABCF" d="M5 6.5h2.5L12 14.5V6.5h2.5V17.5H12L7.5 9.5v8H5V6.5zm11 0h3v11h-3V6.5z"/>
        </svg>
      );

    // ─── CLOUD & DEVOPS ───
    case 'aws':
    case 'aws fundamentals':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#FF9900" d="M6.8 14.8c-2.4 1.4-4.8 2.2-4.8 2.2s2.6 1.8 7.3 1.8c4.6 0 9.8-1.7 12.7-4.4.2-.2 0-.5-.3-.3-3.6 2.4-8.4 3.3-12.4 2.1-1-.3-1.9-.7-2.5-1.4z"/>
          <path fill="#FF9900" d="M21.5 13.8c-.3-.4-2-.4-2.8-.3-.3 0-.3.3 0 .4 1.3.8 2.9.7 3.3.4.4-.3.1-1.8-.5-2.6-.2-.3-.4-.2-.3.1.4 1 .3 2.1.3 2z"/>
          <path fill="#FFFFFF" d="M8.2 6.5L6.4 13h1.8l.4-1.6h2.2l.4 1.6H13L11.2 6.5H8.2zm1 2.2l.7 2.8H8.5l.7-2.8zm6 4.3l-1.3-4.5-1.2 4.5h-1.6L9.6 6.5h1.7l.9 4.3 1.2-4.3h1.4l1.2 4.3.9-4.3h1.7l-1.5 6.5h-1.9z"/>
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#F05032" d="M21.7 10.7L13.3 2.3c-.4-.4-1.1-.4-1.5 0L9.4 4.7 11.6 7c.5-.2 1.1-.1 1.5.3.4.4.6 1.1.4 1.6l2.1 2.1c.6-.2 1.2 0 1.6.4.6.6.6 1.6 0 2.2-.6.6-1.6.6-2.2 0-.5-.5-.6-1.2-.3-1.8L12.7 9.8c-.3.1-.7.1-1 0L9.5 12c.2.5.1 1.2-.3 1.6-.6.6-1.6.6-2.2 0-.6-.6-.6-1.6 0-2.2.4-.4 1-.6 1.6-.4L10.8 8.7 8.6 6.5 2.3 12.8c-.4.4-.4 1.1 0 1.5l8.4 8.4c.4.4 1.1.4 1.5 0l9.5-9.5c.4-.4.4-1.1 0-1.5z"/>
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FFFFFF">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );

    case 'github actions':
    case 'actions':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="10" fill="#2088FF" />
          <path fill="#FFFFFF" d="M7 11.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zm5 0a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0zM12 9v5M9.5 12h5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#2496ED" d="M13 8.5H11V6.5h2v2zm-2.5 0H8.5V6.5h2v2zm-2.5 0H6V6.5h2v2zm7.5 0h-2V6.5h2v2zm-7.5 3H6V9.5h2v2zm2.5 0H8.5V9.5h2v2zm2.5 0H11V9.5h2v2zm2.5 0h-2V9.5h2v2zm2.5 0h-2V9.5h2v2zm4.3-.4c-.3-.2-1.1-.3-1.6 0-.2-.9-.7-1.6-1.5-2.1l-.5-.3-.3.5c-.4.7-.4 1.6 0 2.3-.6.4-1.6.4-2.1.4H2.4c-.3 1.1-.3 2.9.4 4.3 1 2 2.8 3.3 5.4 3.7 4.6.6 9.1-.7 11.4-3.8 1.7-2.3 2-4.1 2-4.6-.4-.3-1.3-.4-1.6-.4z"/>
        </svg>
      );

    // ─── DEVELOPER TOOLS ───
    case 'postman':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="10" fill="#FF6C37" />
          <path fill="#FFFFFF" d="M15.5 8c-.6 0-1.2.3-1.5.8L11 7.2v1.5l2.6 1.4c-.1.3-.1.6 0 .9L10 13.5l-1.8-.7-.6 1.4 2.2.9c.2.6.7 1.1 1.4 1.2.9.2 1.8-.3 2.1-1.2l3.4-2.4c.6.2 1.3 0 1.7-.5.6-.7.5-1.8-.2-2.4-.7-.6-1.7-.8-2.7-.3zm.3 2.8c-.4.4-1.1.4-1.5 0-.4-.4-.4-1.1 0-1.5.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.5z"/>
        </svg>
      );

    case 'vs code':
    case 'vscode':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path fill="#007ACC" d="M17.5 2.1c-.4-.2-.9-.1-1.2.2L9.4 8.7 5.6 5.8c-.4-.3-1-.3-1.4 0L2.4 7.2c-.4.3-.5.9-.2 1.3l3.2 3.5-3.2 3.5c-.3.4-.2 1 .2 1.3l1.8 1.4c.4.3 1 .3 1.4 0l3.8-2.9 6.9 6.4c.3.3.8.4 1.2.2l4.8-2.3c.4-.2.7-.6.7-1.1V4.4c0-.5-.3-.9-.7-1.1l-4.7-2.2zm0 4.6v10.6l-5.6-5.3 5.6-5.3z"/>
        </svg>
      );

    case 'jupyter notebook':
    case 'jupyter':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" fill="none" stroke="#F37626" strokeWidth="1.8" />
          <circle cx="12" cy="5.5" r="2.2" fill="#E46E2E" />
          <circle cx="12" cy="18.5" r="1.6" fill="#6A6A6A" />
          <circle cx="5" cy="13.5" r="1.1" fill="#767676" />
        </svg>
      );

    // ─── DEFAULT FALLBACK ICON ───
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}
