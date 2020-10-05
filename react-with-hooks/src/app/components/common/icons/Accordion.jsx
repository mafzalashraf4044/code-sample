import React from 'react';

const Accordion = props => (
  <svg width="1em" height="1em" viewBox="0 0 64 64" {...props}>
    <defs>
      <clipPath id="prefix__a">
        <path d="M0 0h64v64H0z" />
      </clipPath>
    </defs>
    <g data-name="custom \u2013 1" clipPath="url(#prefix__a)">
      <path
        d="M32 64a32 32 0 1132-32 32.027 32.027 0 01-32 32zm0-59.483A27.483 27.483 0 1059.483 32 27.525 27.525 0 0032 4.517zm1.762 37.836a2.259 2.259 0 01-3.194 0l-14.54-14.54a2.289 2.289 0 01-.661-1.6 2.207 2.207 0 01.661-1.6 2.261 2.261 0 013.194 0l12.943 12.949 12.943-12.943a2.258 2.258 0 013.192 3.194z"
        fill="#a3adb3"
        fillRule="evenodd"
      />
    </g>
  </svg>
);

export default Accordion;
