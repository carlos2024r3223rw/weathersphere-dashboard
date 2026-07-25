import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="grid md:grid-cols-3">
      {/* Search Bar Skeleton */}
      <div style={{ gridColumn: '1 / -1', height: '56px' }} className="skeleton" />
      
      {/* Current Weather Skeleton */}
      <div style={{ gridColumn: '1 / -1', height: '400px' }} className="skeleton" />
      
      {/* AQI Skeleton */}
      <div style={{ height: '250px' }} className="skeleton" />
      
      {/* Forecast Chart Skeleton */}
      <div className="skeleton md:col-span-2" style={{ height: '250px' }} />
      
      {/* Daily Forecast Skeleton */}
      <div style={{ gridColumn: '1 / -1', height: '200px' }} className="skeleton" />
    </div>
  );
}
