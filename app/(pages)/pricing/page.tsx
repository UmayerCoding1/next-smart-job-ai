import PricingPage from '@/components/ui/pricing/Pricing';
import React from 'react';


export const metadata ={
    title: 'Pricing | Smart Job AI',
    description: 'Pricing page of Smart Job AI AI-powered job platform.',
}

const page = () => {
    return (
        <div>
            <PricingPage/>
        </div>
    );
};

export default page;