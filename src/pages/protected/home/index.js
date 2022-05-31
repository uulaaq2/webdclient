import React from 'react';

const index = () => {
  return (
    <>
    <div data-color-mode="auto" data-light-theme="light" data-dark-theme="dark_dimmed" className="p-3">
<h4>Synced to system</h4>
<code className="d-block mt-1 mb-3 color-fg-muted">
  data-color-mode="auto" data-light-theme="light" data-dark-theme="dark_dimmed"
</code>
<button className="btn">Button</button>
<span className="Label ml-2">Label</span>
<span className="Counter ml-2">123</span>
</div>
  </>
  );
};

export default index;