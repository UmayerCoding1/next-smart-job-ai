import React from 'react';

const Limitations = () => {
    return (
        <div>
            <h2 className='text-3xl font-semibold text-black/70'>02. Limitation </h2>
            <p>While we strive to offer the best tools to connect job seekers and employers, there are limitations to our services you should be aware of.</p>

            <div className='mt-10'>
                <ul className='list-disc list-inside'>
                    <li >We do not guarantee employment, job offers, or interviews.</li>
                    <li >Users are responsible for verifying the accuracy of job postings and recruiters.</li>
                    <li >SmartJobAI is not liable for any decisions made by employers or candidates.</li>
                    <li >Platform access may occasionally be interrupted due to technical or maintenance issues.</li>
                    <li >AI recommendations are based on algorithms and may not always reflect your preferences or qualifications.</li>
                </ul>
            </div>
        </div>
    );
};

export default Limitations;