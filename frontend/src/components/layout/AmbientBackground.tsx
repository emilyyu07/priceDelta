import React from 'react';

interface AmbientBackgroundProps {
  showGlassPane?: boolean;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ showGlassPane = false }) => {
  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-background__base" />
      <div className="ambient-background__water ambient-background__water--one" />
      <div className="ambient-background__water ambient-background__water--two" />
      <div className="ambient-background__water ambient-background__water--three" />
      <div className="ambient-background__ripple ambient-background__ripple--one" />
      <div className="ambient-background__ripple ambient-background__ripple--two" />
      <div className="ambient-background__bloom ambient-background__bloom--left" />
      <div className="ambient-background__bloom ambient-background__bloom--right" />
      {showGlassPane && (
        <>
          <div className="ambient-background__glass" />
          <div className="ambient-background__gloss ambient-background__gloss--top" />
          <div className="ambient-background__gloss ambient-background__gloss--side" />
          <div className="ambient-background__grain" />
        </>
      )}
    </div>
  );
};
