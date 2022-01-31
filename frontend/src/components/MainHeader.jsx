import React from "react";

function MainHeader({ title }) {
  return (
    <div class="p-3 mb-2 bg-primary text-white rounded">
      <h4 class="p-0 m-0">{title}</h4>
    </div>
  );
}

export default MainHeader;
