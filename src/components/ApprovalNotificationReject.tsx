// --- Icon Components (Simulating Lucide Icons using Inline SVG) ---
const Icon = ({ children, className = 'w-5 h-5' }: { children: React.ReactNode, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {children}
    </svg>
);

const CheckCircle = (props: { className?: string }) => (
    <Icon className={props.className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
);

const XCircle = (props: { className?: string }) => (
    <Icon className={props.className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </Icon>
);

export default function ApprovalNotificationReject() {
    return (
        <div className="min-h-screen  bg-transparent flex items-center justify-center p-4">
            <div className="bg-blue-900  w-1/3 p-6 text-white rounded-lg  text-center">
                {/* Reject Icon */}
                <div className="flex justify-center mb-4">
                    <XCircle className="w-16 h-16 text-red-500" />
                </div>
                
                {/* Main Heading */}
                <h1 className="text-3xl font-bold mb-8">Report Rejected</h1>
                
                {/* Submission Date */}
                <div className="mb-8">
                    <p className=" mb-2">Rejected on:</p>
                    <p className="text-xl font-semibold">April 23, 2024 09:45 AM</p>
                </div>

                {/* Rejected By */}
                <div className="mb-8">
                    <p className=" mb-2">Rejected by:</p>
                    <p className="text-xl font-semibold">Jane Smith</p>
                    <p className=" mb-2">(Head of production)</p>
                </div>


                {/* Manager Feedback */}
                <div className="bg-blue-700 rounded-lg p-6 mb-8">
                    <p className="text-lg mb-4">
                        Manager Feedback:
                    </p>
                    <p className="italic">
                        "Unfortunately, we cannot approve this request at the moment. We are currently facing resource constraints - insufficient manpower and material shortage. Please scale down the task requirements or wait until additional resources become available. Resubmit once adjustments are made."
                    </p>
                    
                </div>

                {/* View report button
                <div className="flex justify-center">
                    <button className="bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 ">
                        VIEW REPORT
                    </button>
                </div> */}
            </div>
        </div>
    );
}