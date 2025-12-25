'use client';
import { RootState } from '@/app/redux/store';
import { cn } from '@/lib/utils';
import {  Calendar, Clock, Sparkles, TrendingUp,  Users } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';

interface cardData {
    title: string;
    value?: number;
    Icon: React.ElementType;
    content: React.ReactNode
}

const ApplicationSummary = () => {
    const cardData = CardData();
    console.log(cardData)

    return (
        <div className='grid grid-cols-5 gap-5 mt-5'>
            {cardData.map((card, index) => (
                <SummaryCard key={index} cardData={card} />
            ))}
        </div>
    );
};

export default ApplicationSummary;


const SummaryCard = ({className,cardData} : {className?: string,cardData: cardData}) => {
    return (
        <CardContent className={cn(
           
            cardData.title === 'Total Applications' && 'border-l-black',
            cardData.title === 'New' && 'border-l-blue-500',
            cardData.title === 'Under Review' && 'border-l-orange-500',
            cardData.title === 'Interview' && 'border-l-[#00B8DB]',
            cardData.title === 'AI avg score' && 'border-l-green-500',

            className)}>
            
            <div className='flex items-center justify-between'>
               
                 <p className='text-sm font-medium text-neutral-500'>{cardData.title}</p>
                <cardData.Icon size={10} className='text-neutral-500'/>
        </div>

        <div>
            <h1 className='text-3xl font-semibold'>{cardData.value}</h1>
        {cardData.content}
        </div>
        </CardContent>
    );
}



const CardContent = ({className,children} : {className?: string,children: React.ReactNode} ) => {

return (
    <div className={cn('w-full h-[100px]     border border-neutral-200  border-l-4 p-3 rounded-lg flex flex-col justify-between',className)}>
            {children}
        </div>
)
}



const CardData  = () => {
     const {applications} = useSelector((state: RootState) => state.applicationCounterR);
  console.log('UI page', applications);
    return [
{
        title: 'Total Applications',
        value: applications.all,
        Icon : Users,
        content: <div className='text-sm flex items-center gap-1'>
                <div className=' text-green-500 flex items-center gap-1'>
                    <TrendingUp className="h-3 w-3"/>
                    <span>12%</span>
                </div>

                <span className='text-neutral-500 text-[10px] font-medium'>Form last 7 day</span>
        </div>
    },
    {
        title: 'New',
        value: applications.new,
        Icon : Sparkles,
        content: <p className='text-neutral-500 text-[10px] font-medium'>Awaiting review</p>
    },
    {
        title: 'Under Review',
        value: applications.reviewed,
        Icon : Clock,

        content: <p className='text-neutral-500 text-[10px] font-medium'>In progress</p>
    },
    {
        title: 'Interview',
        value: applications.interview,
        Icon : Calendar,

        content: <p className='text-neutral-500 text-[10px] font-medium'>Scheduled</p>
    },
    {
        title: 'AI avg score',
       
        Icon : Sparkles,

        content: <p className='text-neutral-500 text-[10px] font-medium'>Scheduled</p>
    },
    ]
}
 
