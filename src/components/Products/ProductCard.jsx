/* eslint-disable react/prop-types */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, refetch, isFavorite }) => {
  const { _id, name, imageUrl, price, category, brand, createdAt, description } = product;

  const handleState = () => {
    if (isFavorite) {
      setTimeout(() => {
        refetch();
      }, 700);
    }
  };

//   slice only date from createdAt
    const date = new Date(createdAt);
    const createdAtDate = date.toDateString();
    const createdAtTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        });
    const created = `${createdAtDate} at ${createdAtTime}`;


  return (
    <Card 
      data-aos="fade-up" 
      data-aos-duration="1000" 
      data-aos-anchor-placement="top-bottom" 
      data-aos-delay="0" 
      className="shadow-lg hover:drop-shadow-2xl"
    >
      <CardHeader className="bg-customGulabi min-h-32 mb-4">
        <img 
          data-aos="zoom-in" 
          data-aos-duration="1000" 
          data-aos-anchor-placement="top-bottom" 
          data-aos-delay="0" 
          src={imageUrl} 
          alt={`${name} image`} 
        />
      </CardHeader>
      <CardContent>
        <div data-aos="fade-right" data-aos-duration="600" data-aos-anchor-placement="top-bottom" data-aos-delay="0">
          <CardTitle className="mb-1">{name}</CardTitle>
          <CardDescription className="text-[12px] mb-2">{description}</CardDescription>
          <CardDescription>Category: {category}</CardDescription>
          <CardDescription>Brand: {brand}</CardDescription>
          <CardDescription>Price: ${price}</CardDescription>
          <CardDescription className="text-xs mt-1">Posted: {created}</CardDescription>
        </div>
        {/* <Link onClick={() => handleState()} to={`/product/${_id}`}>
          <Button 
            data-aos="fade-up" 
            data-aos-duration="500" 
            data-aos-anchor-placement="top-bottom" 
            data-aos-delay="0" 
            className="mt-4 w-full bg-customBlue hover:bg-customBlue text-white"
          >
            View Product
          </Button>
        </Link> */}
      </CardContent>
    </Card>
  );
};

export default ProductCard;