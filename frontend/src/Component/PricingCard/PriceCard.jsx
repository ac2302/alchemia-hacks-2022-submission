import React from 'react'
import '../PricingCard/pricecard.css';
function PriceCard() {
  return (
    <>
        <div className='price-card' >
            <div className='name' >Name:</div>
            <div className='price' >Price:</div>
        </div>

        <div className='disc' >
            <div className='title' >Discription</div>
            <div className='text' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam illo fugiat ut mollitia esse incidunt deleniti, voluptat.</div>
        </div>
    </>
  )
}

export default PriceCard