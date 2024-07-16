import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner,Badge } from "@chakra-ui/react";

function CardImage(props) {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageAvailable, setImageAvailable] = useState(true);
  const { id, src, alt, discount } = props;

  const handleImageClick = () => {
    navigate(`/product/${id}`);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageAvailable(false);
    setImageLoading(false); 
  };

  return (
    <div
      className="card-image"
      style={{ cursor: "pointer", position: "relative" }} 
      onClick={handleImageClick}
    >
      {imageLoading && (
        <Spinner
          size="sm" 
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      )}
      {imageAvailable ? (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: imageLoading ? "none" : "block" }}
        />
      ) : (
        <img
          src="https://placehold.co/400/dbe2ef/3f72af?text=Image+not+available"
          alt="Image not available"
        />
      )}
      {discount > 0 && (
        <Badge
          borderRadius="full"
          px="2"
          colorScheme="teal"
          position="absolute"
          top="8px"
          right="8px"
          zIndex="1"
        >
          {discount}% OFF
        </Badge>
      )}
    </div>
  );
}

export default CardImage;
