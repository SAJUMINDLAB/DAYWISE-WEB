import React from 'react';

const ClassicTemplate = ({ sectionOrder, renderSection }) => {
  return (
    <div className="template-classic">
      <div id="section-home">
        {renderSection('main')}
      </div>
      {sectionOrder.map(section => (
        <React.Fragment key={section.id}>
          {renderSection(section.id)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ClassicTemplate;
