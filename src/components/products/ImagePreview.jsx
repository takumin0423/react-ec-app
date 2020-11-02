import React from 'react';

const ImagePreview = (props) => {
  return (
      <div className="thumbnail-image" onClick={() => props.delete(props.id)}>
        <img src={props.path} alt="画像が表示できません"/>
      </div>
  );
};

export default ImagePreview;