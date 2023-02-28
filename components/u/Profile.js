import React from 'react';

export default function Profile({profile}) {
  return (
    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      {Object.keys(profile.fields).map((field) => (
        <div key={field} className="sm:col-span-1">
          <dt className="text-sm font-medium text-gray-700">{field}</dt>
          <dd className="mt-1 text-sm text-gray-900">{profile.fields[field]}</dd>
        </div>
      ))}
      <div className="sm:col-span-2">
        <dt className="text-sm font-medium text-gray-700">About</dt>
        <dd
          className="mt-1 max-w-prose space-y-5 text-sm text-gray-900 text-left"
          dangerouslySetInnerHTML={{ __html: profile.about }}
        />
      </div>
    </dl>
  );
}
