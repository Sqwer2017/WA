interface IwaLogoProps {
  className?: string;
  showTriad?: boolean;
}

export function IwaLogo({ className = 'w-10 h-10', showTriad = false }: IwaLogoProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {showTriad && (
        <polygon
          points="64,10 116,104 12,104"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
          opacity="0.45"
        />
      )}
      <circle cx="64" cy="64" r={showTriad ? 36 : 56} fill="#FFFFFF" />
      <g fill="#050507" stroke="#050507" strokeLinecap="round" strokeLinejoin="round">
        {/* Letter i */}
        <circle cx={showTriad ? 42 : 31} cy={showTriad ? 50 : 42} r={showTriad ? 4.3 : 6.5} stroke="none" />
        <rect
          x={showTriad ? 38 : 25}
          y={showTriad ? 57 : 53}
          width={showTriad ? 8 : 12}
          height={showTriad ? 21 : 32}
          rx={showTriad ? 4 : 6}
          stroke="none"
        />
        {/* Letter W */}
        <path
          d={
            showTriad
              ? 'M49 57V71C49 75.5 52.5 78 56.5 78C59 78 61 76.5 62 74.5C63 76.5 65 78 67.5 78C71.5 78 75 75.5 75 71V57'
              : 'M43 53V74C43 81 48.5 85 54.5 85C58.5 85 61.5 82.5 63 79.5C64.5 82.5 67.5 85 71.5 85C77.5 85 83 81 83 74V53'
          }
          fill="none"
          strokeWidth={showTriad ? 6.5 : 10}
        />
        {/* Letter A with inverted triangle cutout */}
        <path
          d={
            showTriad
              ? 'M81 78V62C81 58 83.5 55.5 87.5 55.5C91.5 55.5 94 58 94 62V78'
              : 'M91 85V61C91 55 95 51 101 51C107 51 111 55 111 61V85'
          }
          fill="none"
          strokeWidth={showTriad ? 6.5 : 10}
        />
        <polygon
          points={showTriad ? '84,63 91,63 87.5,69' : '95.5,62 106.5,62 101,71'}
          stroke="none"
        />
      </g>
    </svg>
  );
}
