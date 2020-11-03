import React, {useState} from 'react';
import Swiper from 'react-id-swiper';
import NoImage from '../../assets/img/no_image.png';
import 'swiper/css/swiper.css';

const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true,
    spaceBetween: 30
  })

  const images = props.images

  return (
      <Swiper {...params}>
        {images.length === 0 ? (
            <div className="thumbnail-image">
              <img src={NoImage} alt="画像が表示できません"/>
            </div>
        ) : (
            images.map(image => (
                <div className="thumbnail-image">
                  <img src={image.path} alt="商品画像"/>
                </div>
            ))
        )}
      </Swiper>
  )
};

export default ImageSwiper;